import EmbeddedPostgres from 'embedded-postgres';
import { existsSync } from 'node:fs';
import path from 'node:path';
const databaseDir = path.resolve('.local-db');
const postgres = new EmbeddedPostgres({
  databaseDir,
  port: 54329,
  user: 'linkq',
  password: 'local_development_only',
  persistent: true,
  onLog: (message) => console.info(message),
  onError: (message) => console.error(message),
});
if (!existsSync(path.join(databaseDir, 'PG_VERSION'))) await postgres.initialise();
await postgres.start();
try {
  await postgres.createDatabase('linkq');
} catch (error) {
  if (!(error instanceof Error && error.message.includes('already exists'))) throw error;
}
console.info('Local PostgreSQL running on 127.0.0.1:54329. Keep this terminal open.');
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  await postgres.stop();
  process.exit(0);
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
setInterval(() => {}, 60000);
