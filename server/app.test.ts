import 'dotenv/config';
import { beforeAll, afterAll, describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { randomUUID } from 'node:crypto';
// Only the dedicated test database is used; development enquiries are untouched.
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL ||
  'postgresql://linkq:local_development_only@127.0.0.1:54329/linkq_test?schema=public';
if (!new URL(process.env.DATABASE_URL).pathname.endsWith('_test'))
  throw new Error('Tests require a dedicated database whose name ends in _test.');
const { createApp } = await import('./app');
const { db } = await import('./db');
const valid = {
  fullName: 'LinkqGlobal QA',
  businessEmail: 'qa@example.test',
  phoneNumber: '',
  organization: 'Automated QA',
  industry: 'Manufacturing',
  service: 'Manufacturing Consulting',
  subject: 'Integration validation',
  message: 'Test-only record validating the complete PostgreSQL enquiry workflow.',
  consentGiven: true,
  website: '',
};
const keys: string[] = [];
function key() {
  const k = randomUUID();
  keys.push(k);
  return k;
}
beforeAll(async () => {
  await db.$queryRaw`SELECT 1`;
});
afterAll(async () => {
  await db.enquiry.deleteMany({ where: { idempotencyKey: { in: keys } } });
  await db.$disconnect();
});
describe('Enquiry API with real PostgreSQL', () => {
  it('reports database health', async () => {
    const res = await request(createApp()).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.database).toBe('connected');
  });
  it('validates required fields and explicit consent', async () => {
    const res = await request(createApp())
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, businessEmail: 'bad', consentGiven: false, message: 'short' });
    expect(res.status).toBe(422);
    expect(res.body.fields).toHaveProperty('businessEmail');
    expect(res.body.fields).toHaveProperty('consentGiven');
  });
  it('normalizes input and stores an enquiry with UTC consent evidence', async () => {
    const k = key();
    const res = await request(createApp())
      .post('/api/enquiries')
      .set('Idempotency-Key', k)
      .send({ ...valid, fullName: '  LinkqGlobal QA  ', businessEmail: '  QA@EXAMPLE.TEST  ' });
    expect(res.status).toBe(201);
    expect(Object.keys(res.body)).toEqual(['message']);
    const row = await db.enquiry.findUniqueOrThrow({ where: { idempotencyKey: k } });
    expect(row.fullName).toBe('LinkqGlobal QA');
    expect(row.businessEmail).toBe('qa@example.test');
    expect(row.consentGiven).toBe(true);
    expect(row.consentTimestamp).toBeInstanceOf(Date);
    expect(row.status).toBe('new');
  });
  it('handles concurrent retries without duplicate records', async () => {
    const k = key();
    const app = createApp();
    const send = () => request(app).post('/api/enquiries').set('Idempotency-Key', k).send(valid);
    const responses = await Promise.all([send(), send()]);
    expect(responses.map((r) => r.status).sort()).toEqual([200, 201]);
    expect(await db.enquiry.count({ where: { idempotencyKey: k } })).toBe(1);
    const changed = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', k)
      .send({ ...valid, subject: 'A different request' });
    expect(changed.status).toBe(409);
  });
  it('rejects missing submission keys, unknown fields, and honeypot content', async () => {
    const app = createApp();
    expect((await request(app).post('/api/enquiries').send(valid)).status).toBe(400);
    expect(
      (
        await request(app)
          .post('/api/enquiries')
          .set('Idempotency-Key', key())
          .send({ ...valid, admin: true })
      ).status,
    ).toBe(422);
    expect(
      (
        await request(app)
          .post('/api/enquiries')
          .set('Idempotency-Key', key())
          .send({ ...valid, website: 'spam' })
      ).status,
    ).toBe(422);
  });
  it('limits repeat requests and returns a retry header', async () => {
    const app = createApp({ rateLimitMax: 1 });
    await request(app).post('/api/enquiries').set('Idempotency-Key', key()).send(valid);
    const res = await request(app).post('/api/enquiries').set('Idempotency-Key', key()).send(valid);
    expect(res.status).toBe(429);
    expect(res.headers['retry-after']).toBeDefined();
  });
  it('does not expose stored enquiries and rejects unapproved origins', async () => {
    const app = createApp();
    expect((await request(app).get('/api/enquiries')).status).toBe(404);
    expect(
      (
        await request(app)
          .post('/api/enquiries')
          .set('Origin', 'https://unapproved.example')
          .send(valid)
      ).status,
    ).toBe(403);
  });
  it('handles oversized and malformed JSON safely', async () => {
    const app = createApp();
    expect(
      (
        await request(app)
          .post('/api/enquiries')
          .set('Content-Type', 'application/json')
          .send('{broken')
      ).status,
    ).toBe(400);
    expect(
      (
        await request(app)
          .post('/api/enquiries')
          .send({ ...valid, message: 'x'.repeat(40000) })
      ).status,
    ).toBe(413);
  });
  it('returns a safe service error when database persistence fails', async () => {
    const spy = vi
      .spyOn(db.enquiry, 'create')
      .mockRejectedValueOnce(new Error('private database details'));
    const res = await request(createApp())
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send(valid);
    expect(res.status).toBe(503);
    expect(JSON.stringify(res.body)).not.toContain('private');
    spy.mockRestore();
  });
  it('keeps database success independent of email notification failure', async () => {
    process.env.SMTP_HOST = 'test-only';
    process.env.MAIL_FROM = 'qa@example.test';
    process.env.ENQUIRY_TO = 'qa@example.test';
    const notify = vi.fn().mockRejectedValue(new Error('test email outage'));
    const k = key();
    const res = await request(createApp({ notifier: notify }))
      .post('/api/enquiries')
      .set('Idempotency-Key', k)
      .send(valid);
    expect(res.status).toBe(201);
    expect(notify).toHaveBeenCalledOnce();
    await vi.waitFor(async () => {
      expect(
        (await db.enquiry.findUniqueOrThrow({ where: { idempotencyKey: k } })).notificationStatus,
      ).toBe('failed');
    });
    delete process.env.SMTP_HOST;
    delete process.env.MAIL_FROM;
    delete process.env.ENQUIRY_TO;
  });
});
