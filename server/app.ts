import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';
import { createHash, createHmac, randomBytes } from 'node:crypto';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { enquirySchema } from '../shared/enquiry.js';
import { db } from './db.js';
import { emailConfigured, sendNotification } from './mail.js';
import { getEventListing } from './events.js';
import { getOrganizerArtwork } from './event-artwork.js';
export function createApp({
  rateLimitMax = 5,
  notifier = sendNotification,
}: { rateLimitMax?: number; notifier?: typeof sendNotification } = {}) {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', Number(process.env.TRUST_PROXY || 0));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", 'data:'],
          fontSrc: ["'self'"],
          connectSrc: ["'self'"],
          objectSrc: ["'none'"],
          frameAncestors: ["'none'"],
          upgradeInsecureRequests: process.env.NODE_ENV === 'production' ? [] : null,
        },
      },
    }),
  );
  const allowed = (process.env.ALLOWED_ORIGINS || 'http://127.0.0.1:5173,http://localhost:5173')
    .split(',')
    .map((s) => s.trim());
  app.use('/api', (req, res, next) => {
    const origin = req.get('Origin');
    if (origin && !allowed.includes(origin))
      return res.status(403).json({ message: 'This origin is not permitted.' });
    next();
  });
  app.use(
    '/api',
    cors({
      origin: allowed,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Idempotency-Key'],
    }),
  );
  app.use(express.json({ limit: '32kb' }));
  app.get('/api/health', async (_req, res) => {
    try {
      await db.$queryRaw`SELECT 1`;
      res.json({ status: 'ok', database: 'connected' });
    } catch {
      res.status(503).json({ status: 'unavailable', database: 'unavailable' });
    }
  });
  app.get('/api/events', async (_req, res) => {
    try {
      const listing = await getEventListing();
      if (listing) {
        res.set('Cache-Control', 'public, max-age=300');
        return res.json(listing);
      }
    } catch {
      console.warn('event_listing_unavailable');
    }
    return res.status(503).json({ message: 'Event listings are temporarily unavailable.' });
  });
  app.get('/api/events/:slug/artwork', async (req, res) => {
    if (!/^[a-z0-9-]{1,120}$/.test(req.params.slug)) return res.sendStatus(404);
    const listing = await getEventListing().catch(() => undefined);
    const event = listing?.events.find((item) => item.slug === req.params.slug);
    if (!event?.artwork) return res.sendStatus(404);
    const image = await getOrganizerArtwork(event.artwork.url);
    if (!image) return res.sendStatus(502);
    return res.type('webp').set('Cache-Control', 'public, max-age=3600').send(image);
  });
  const salt = randomBytes(32);
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: rateLimitMax,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    keyGenerator: (req) =>
      createHmac('sha256', salt)
        .update(ipKeyGenerator(req.ip || '127.0.0.1'))
        .digest('hex'),
    message: { message: 'Too many enquiries. Please wait before trying again.' },
  });
  function createReferenceNumber() {
    return `LQ-${new Date().getUTCFullYear()}-${randomBytes(4).toString('hex').toUpperCase()}`;
  }

  app.post('/api/enquiries', limiter, async (req, res) => {
    if (!req.is('application/json'))
      return res.status(415).json({ message: 'Send JSON data to this endpoint.' });
    const parsed = enquirySchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(422).json({
        message: 'Please check the form fields.',
        fields: parsed.error.flatten().fieldErrors,
      });
    const idempotencyKey = req.get('Idempotency-Key');
    if (
      !idempotencyKey ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)
    )
      return res.status(400).json({ message: 'A valid submission key is required.' });
    const { website: _website, ...data } = parsed.data;
    const contentHash = createHash('sha256').update(JSON.stringify(data)).digest('hex');
    try {
      const previous = await db.enquiry.findUnique({
        where: { idempotencyKey },
        select: { contentHash: true, referenceNumber: true },
      });
      if (previous) {
        if (previous.contentHash !== contentHash)
          return res
            .status(409)
            .json({ message: 'This submission key was already used for different information.' });
        return res.status(200).json({
          message: 'Your inquiry has been recorded.',
          referenceNumber: previous.referenceNumber,
        });
      }
      const enquiry = await db.enquiry.create({
        data: {
          ...data,
          referenceNumber: createReferenceNumber(),
          phoneNumber: data.phoneNumber || null,
          industryOther: data.industryOther || null,
          collaborationObjective: data.collaborationObjective || null,
          collaborationObjectiveOther: data.collaborationObjectiveOther || null,
          targetCountryRegion: data.targetCountryRegion || null,
          partnerType: data.partnerType || null,
          partnerTypeOther: data.partnerTypeOther || null,
          consentTimestamp: new Date(),
          idempotencyKey,
          contentHash,
          notificationStatus: emailConfigured() ? 'pending' : 'not_configured',
        },
      });
      if (emailConfigured())
        void notifier(enquiry)
          .then(() =>
            db.enquiry.update({ where: { id: enquiry.id }, data: { notificationStatus: 'sent' } }),
          )
          .catch(async () => {
            console.warn('enquiry_notification_failed');
            try {
              await db.enquiry.update({
                where: { id: enquiry.id },
                data: { notificationStatus: 'failed' },
              });
            } catch {
              console.warn('notification_status_update_failed');
            }
          });
      return res.status(201).json({
        message: 'Your inquiry has been recorded.',
        referenceNumber: enquiry.referenceNumber,
      });
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
        const previous = await db.enquiry
          .findUnique({
            where: { idempotencyKey },
            select: { contentHash: true, referenceNumber: true },
          })
          .catch(() => null);
        if (previous?.contentHash === contentHash)
          return res.status(200).json({
            message: 'Your inquiry has been recorded.',
            referenceNumber: previous.referenceNumber,
          });
        return res.status(409).json({ message: 'This submission key was already used.' });
      }
      console.warn('enquiry_storage_failed');
      return res.status(503).json({
        message: 'The inquiry service is temporarily unavailable. Please try again later.',
      });
    }
  });
  app.use('/api', (_req, res) => res.status(404).json({ message: 'Endpoint not found.' }));
  app.get('/services', (_req, res) => res.redirect(308, '/industries'));
  app.get('/approach', (_req, res) => res.redirect(308, '/collaboration'));
  if (process.env.NODE_ENV === 'production') {
    const dist = path.resolve('dist');
    app.use(express.static(dist, { index: false, redirect: false }));
    app.get(/^\/events\/[a-z0-9-]+\/?$/, async (req, res) => {
      const slug = req.path.split('/')[2];
      const listing = await getEventListing().catch(() => undefined);
      const status = !listing ? 503 : listing.events.some((event) => event.slug === slug) ? 200 : 404;
      res.status(status).sendFile(path.join(dist, 'events', '_detail.html'));
    });
    app.get('/{*path}', (req, res) => {
      const clean = path.normalize(req.path).replace(/^([/\\])+/, '');
      const target = path.resolve(dist, clean, 'index.html');
      if (target.startsWith(dist + path.sep) && existsSync(target)) res.sendFile(target);
      else if (req.path === '/') res.sendFile(path.join(dist, 'index.html'));
      else res.status(404).sendFile(path.join(dist, '404.html'));
    });
  }
  const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error?.type === 'entity.too.large')
      return void res.status(413).json({ message: 'The submission is too large.' });
    if (error instanceof SyntaxError)
      return void res.status(400).json({ message: 'The request body is not valid JSON.' });
    console.warn('request_failed');
    res.status(500).json({ message: 'An unexpected error occurred.' });
  };
  app.use(errorHandler);
  return app;
}
