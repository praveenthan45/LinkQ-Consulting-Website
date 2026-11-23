import 'dotenv/config';
import EmbeddedPostgres from 'embedded-postgres';
import { execFileSync } from 'node:child_process';
const pg = new EmbeddedPostgres({ port: 54329, user: 'linkq', password: 'local_development_only' });
const client = pg.getPgClient('postgres', '127.0.0.1');
await client.connect();
const existing = await client.query("SELECT 1 FROM pg_database WHERE datname = 'linkq_test'");
if (!existing.rowCount) await client.query('CREATE DATABASE linkq_test');
await client.end();
const testUrl =
  'postgresql://linkq:local_development_only@127.0.0.1:54329/linkq_test?schema=public';
execFileSync(process.execPath, ['node_modules/prisma/build/index.js', 'migrate', 'deploy'], {
  env: { ...process.env, DATABASE_URL: testUrl },
  stdio: 'inherit',
});
console.info('Isolated local test database prepared.');
