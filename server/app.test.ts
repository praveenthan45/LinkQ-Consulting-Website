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
  industry: 'Manufacturing & Industrial',
  industryOther: '',
  service: 'Manufacturing Consulting',
  collaborationObjective: '',
  collaborationObjectiveOther: '',
  targetCountryRegion: '',
  partnerType: '',
  partnerTypeOther: '',
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
  it('normalizes input and stores an enquiry with UTC consent evidence and reference number', async () => {
    const k = key();
    const res = await request(createApp())
      .post('/api/enquiries')
      .set('Idempotency-Key', k)
      .send({
        ...valid,
        fullName: '  LinkqGlobal QA  ',
        businessEmail: '  QA@EXAMPLE.TEST  ',
        phoneNumber: '+49 30 1234567',
      });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Your inquiry has been recorded.');
    expect(res.body.referenceNumber).toMatch(/^LQ-\d{4}-[0-9A-F]{8}$/);
    const row = await db.enquiry.findUniqueOrThrow({ where: { idempotencyKey: k } });
    expect(row.fullName).toBe('LinkqGlobal QA');
    expect(row.businessEmail).toBe('qa@example.test');
    expect(row.phoneNumber).toBe('+49 30 1234567');
    expect(row.referenceNumber).toBe(res.body.referenceNumber);
    expect(row.industryOther).toBeNull();
    expect(row.collaborationObjective).toBeNull();
    expect(row.consentGiven).toBe(true);
    expect(row.consentTimestamp).toBeInstanceOf(Date);
    expect(row.status).toBe('new');
  });
  it('rejects consulting services as industries, bad phone numbers, oversized requirements, and missing conditional Other specs', async () => {
    const app = createApp();
    const badIndustry = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, industry: 'Business Strategy' });
    expect(badIndustry.status).toBe(422);
    expect(badIndustry.body.fields).toHaveProperty('industry');

    const badPhone = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, phoneNumber: 'not-a-phone' });
    expect(badPhone.status).toBe(422);
    expect(badPhone.body.fields).toHaveProperty('phoneNumber');

    const tooLongMessage = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, message: 'x'.repeat(3001) });
    expect(tooLongMessage.status).toBe(422);
    expect(tooLongMessage.body.fields).toHaveProperty('message');

    const missingOtherIndustry = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, industry: 'Other', industryOther: '' });
    expect(missingOtherIndustry.status).toBe(422);
    expect(missingOtherIndustry.body.fields).toHaveProperty('industryOther');

    const missingObjective = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', key())
      .send({ ...valid, service: 'Collaboration Consulting', collaborationObjective: '' });
    expect(missingObjective.status).toBe(422);
    expect(missingObjective.body.fields).toHaveProperty('collaborationObjective');
  });
  it('stores conditional collaboration fields and strips stale collaboration values for non-collaboration inquiries', async () => {
    const app = createApp();
    const collabKey = key();
    const collabRes = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', collabKey)
      .send({
        ...valid,
        industry: 'Other',
        industryOther: 'Clean Energy',
        service: 'Collaboration Consulting',
        collaborationObjective: 'Other',
        collaborationObjectiveOther: 'Regional JV Assembly',
        targetCountryRegion: 'Germany, UAE',
        partnerType: 'Other',
        partnerTypeOther: 'Regional Assembly Partner',
      });
    expect(collabRes.status).toBe(201);
    const collabRow = await db.enquiry.findUniqueOrThrow({ where: { idempotencyKey: collabKey } });
    expect(collabRow.industryOther).toBe('Clean Energy');
    expect(collabRow.collaborationObjective).toBe('Other');
    expect(collabRow.collaborationObjectiveOther).toBe('Regional JV Assembly');
    expect(collabRow.targetCountryRegion).toBe('Germany, UAE');
    expect(collabRow.partnerType).toBe('Other');
    expect(collabRow.partnerTypeOther).toBe('Regional Assembly Partner');

    const switchedKey = key();
    const switchedRes = await request(app)
      .post('/api/enquiries')
      .set('Idempotency-Key', switchedKey)
      .send({
        ...valid,
        service: 'IT Consulting',
        collaborationObjective: 'Market Entry & Expansion',
        targetCountryRegion: 'Singapore',
        partnerType: 'Distributor',
      });
    expect(switchedRes.status).toBe(201);
    const switchedRow = await db.enquiry.findUniqueOrThrow({ where: { idempotencyKey: switchedKey } });
    expect(switchedRow.collaborationObjective).toBeNull();
    expect(switchedRow.targetCountryRegion).toBeNull();
    expect(switchedRow.partnerType).toBeNull();
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
  it('sends team notification and client acknowledgment only when email delivery is configured', async () => {
    const { sendNotification } = await import('./mail');
    const nodemailer = await import('nodemailer');
    const sendMail = vi.fn().mockResolvedValue({ messageId: 'qa-msg' });
    const createTransportSpy = vi
      .spyOn(nodemailer.default, 'createTransport')
      .mockReturnValue({
        sendMail,
      } as unknown as ReturnType<typeof nodemailer.default.createTransport>);

    const sampleRecord = {
      id: '00000000-0000-4000-8000-000000000001',
      referenceNumber: 'LQ-2026-MAILTEST',
      fullName: 'Mail QA',
      businessEmail: 'client@example.test',
      phoneNumber: null,
      organization: 'Mail QA Org',
      industry: 'Retail & Commerce',
      industryOther: null,
      service: 'Collaboration Consulting',
      collaborationObjective: 'Market Entry & Expansion',
      collaborationObjectiveOther: null,
      targetCountryRegion: 'Southeast Asia',
      partnerType: 'Distributor',
      partnerTypeOther: null,
      subject: 'ASEAN Expansion',
      message: 'Seeking distribution partners across Singapore and Malaysia.',
      consentGiven: true,
      consentTimestamp: new Date(),
      status: 'new',
      idempotencyKey: '00000000-0000-4000-8000-000000000002',
      contentHash: 'hash',
      notificationStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    delete process.env.SMTP_HOST;
    await sendNotification(sampleRecord);
    expect(createTransportSpy).not.toHaveBeenCalled();

    process.env.SMTP_HOST = 'smtp.example.test';
    process.env.MAIL_FROM = 'noreply@linkqglobal.test';
    process.env.ENQUIRY_TO = 'consulting@linkqglobal.test';
    await sendNotification(sampleRecord);

    expect(createTransportSpy).toHaveBeenCalledOnce();
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail.mock.calls[0][0].to).toBe('consulting@linkqglobal.test');
    expect(sendMail.mock.calls[0][0].text).toContain(
      'Collaboration objective: Market Entry & Expansion',
    );
    expect(sendMail.mock.calls[0][0].text).toContain('Target country / region: Southeast Asia');
    expect(sendMail.mock.calls[1][0].to).toBe('client@example.test');
    expect(sendMail.mock.calls[1][0].text).toContain('LQ-2026-MAILTEST');

    delete process.env.SMTP_HOST;
    delete process.env.MAIL_FROM;
    delete process.env.ENQUIRY_TO;
    createTransportSpy.mockRestore();
  });
});
