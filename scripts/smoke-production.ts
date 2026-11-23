import 'dotenv/config';
import request from 'supertest';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
process.env.NODE_ENV = 'production';
const { createApp } = await import('../server/app.js');
const { db } = await import('../server/db.js');
const { staticRoutes } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const app = createApp();
for (const route of staticRoutes) {
  const response = await request(app).get(route);
  if (
    response.status !== 200 ||
    !response.text.includes('<h1') ||
    !response.text.includes('<title>') ||
    !response.text.includes('name="description"')
  )
    throw new Error(`Production route failed: ${route}`);
}
if ((await request(app).get('/not-a-real-route')).status !== 404)
  throw new Error('404 status check failed');
if ((await request(app).get('/images/not-a-real-image.webp')).status !== 404)
  throw new Error('Missing asset status check failed');
const health = await request(app).get('/api/health');
if (health.status !== 200) throw new Error('Production database health check failed');
await db.$disconnect();
console.info(
  `Production HTTP checks passed: ${staticRoutes.length} prerendered pages, metadata, missing routes/assets, and PostgreSQL health.`,
);
