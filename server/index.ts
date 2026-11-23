import 'dotenv/config';
import { createApp } from './app.js';
import { db } from './db.js';
if (
  process.env.NODE_ENV === 'production' &&
  (!process.env.DATABASE_URL || !process.env.ALLOWED_ORIGINS)
)
  throw new Error('Production requires DATABASE_URL and ALLOWED_ORIGINS.');
const app = createApp();
const server = app.listen(Number(process.env.PORT || 3001), '127.0.0.1', () =>
  console.info(`LinkqGlobal API listening at http://127.0.0.1:${process.env.PORT || 3001}`),
);
async function shutdown() {
  server.close(async () => {
    await db.$disconnect();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
