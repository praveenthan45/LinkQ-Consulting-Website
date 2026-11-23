import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { existsSync, copyFileSync, readFileSync } from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.chdir(root);
const websiteUrl = 'http://127.0.0.1:5173/';
const children = new Set();
let database;
let shuttingDown = false;
let servicesReady = false;

function findNpm() {
  const locations = [path.dirname(process.execPath)];
  if (process.platform === 'win32') {
    try {
      locations.push(
        ...execFileSync('where.exe', ['npm.cmd'], { encoding: 'utf8', windowsHide: true })
          .trim()
          .split(/\r?\n/)
          .map((location) => path.dirname(location)),
      );
    } catch {
      // The Node installation directory is also checked below.
    }
  }
  const cli = locations
    .map((location) => path.join(location, 'node_modules', 'npm', 'bin', 'npm-cli.js'))
    .find(existsSync);
  if (!cli)
    throw new Error('npm was not found. Install Node.js with npm included, then try again.');
  return cli;
}

function childProcess(args) {
  const child = spawn(process.execPath, args, {
    cwd: root,
    env: process.env,
    stdio: 'inherit',
    windowsHide: true,
  });
  children.add(child);
  child.once('exit', () => children.delete(child));
  return child;
}

async function npm(npmCli, ...args) {
  const child = childProcess([npmCli, ...args]);
  await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`npm ${args.join(' ')} failed. Review the terminal output above.`));
    });
  });
}

async function portIsOpen(port, hostname = '127.0.0.1') {
  return new Promise((resolve) => {
    const socket = net.createConnection({ host: hostname, port });
    const finish = (open) => {
      socket.destroy();
      resolve(open);
    };
    socket.setTimeout(1000);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
  });
}

async function websiteReady() {
  try {
    const response = await fetch(websiteUrl, { signal: AbortSignal.timeout(2000) });
    if (!response.ok || !(await response.text()).includes('id="root"')) return false;
    const identity = await fetch(`${websiteUrl}package.json`, {
      signal: AbortSignal.timeout(2000),
    });
    return identity.ok && (await identity.json()).name === 'linkq-global-consulting';
  } catch {
    return false;
  }
}

async function apiReady(port) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/health`, {
      signal: AbortSignal.timeout(2000),
    });
    const result = await response.json();
    return response.ok && result.status === 'ok' && result.database === 'connected';
  } catch {
    return false;
  }
}

async function waitUntil(check, label, timeout = 60000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline && !shuttingDown) {
    if (await check()) return;
    await new Promise((resolve) => setTimeout(resolve, 750));
  }
  throw new Error(`${label} did not become ready. Check the terminal output for errors.`);
}

async function openBrowser() {
  // PowerShell hands the URL to Windows directly. Passing `start` through a
  // quoted cmd.exe argument can leave a hidden command window waiting instead.
  const powershell = path.join(
    process.env.SystemRoot || 'C:\\Windows',
    'System32',
    'WindowsPowerShell',
    'v1.0',
    'powershell.exe',
  );
  console.info('Opening the website in your browser...');
  await new Promise((resolve, reject) => {
    const opener = spawn(
      powershell,
      [
        '-NoProfile',
        '-NonInteractive',
        '-Command',
        `Start-Process -FilePath '${websiteUrl}' -ErrorAction Stop`,
      ],
      { stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true },
    );
    let errorText = '';
    opener.stderr?.on('data', (chunk) => {
      errorText = (errorText + chunk.toString()).slice(-2000);
    });
    const timer = setTimeout(() => {
      opener.kill();
      reject(new Error('Windows did not finish opening the browser within 15 seconds.'));
    }, 15000);
    opener.once('error', (error) => {
      clearTimeout(timer);
      reject(error);
    });
    opener.once('close', (code) => {
      clearTimeout(timer);
      if (code === 0) resolve();
      else
        reject(new Error(errorText.trim() || `Windows browser opener exited with code ${code}.`));
    });
  });
}

async function shutdown(exitCode = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.info('\nStopping the services started by this launcher...');
  for (const child of children) {
    if (!child.pid || child.exitCode !== null) continue;
    if (process.platform === 'win32') {
      spawnSync('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], {
        stdio: 'ignore',
        windowsHide: true,
      });
    } else child.kill('SIGTERM');
  }
  if (database) {
    try {
      await database.stop();
    } catch {
      console.error('The local database could not shut down cleanly. Check before restarting.');
      exitCode = 1;
    }
  }
  process.exit(exitCode);
}

for (const signal of [
  'SIGINT',
  'SIGTERM',
  'SIGHUP',
  ...(process.platform === 'win32' ? ['SIGBREAK'] : []),
]) {
  process.on(signal, () => void shutdown());
}

async function main() {
  const [major, minor] = process.versions.node.split('.').map(Number);
  if (major < 22 || (major === 22 && minor < 12)) {
    throw new Error('Please install Node.js 22.12 or newer before running this project.');
  }
  const npmCli = findNpm();
  if (process.argv.includes('--check')) {
    const project = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'));
    for (const command of ['dev', 'db:generate', 'db:migrate']) {
      if (!project.scripts[command]) throw new Error(`Missing project command: ${command}`);
    }
    console.info('Launcher checks passed: Node.js, npm, project path, and startup commands.');
    return;
  }

  console.info('\nLinkqGlobal Consulting - local website launcher\n');
  if (!existsSync(path.join(root, 'node_modules', 'vite', 'package.json'))) {
    console.info('Installing project dependencies. This first run needs an internet connection...');
    await npm(npmCli, 'ci');
  }
  if (!existsSync(path.join(root, '.env'))) {
    copyFileSync(path.join(root, '.env.example'), path.join(root, '.env'));
    console.info('Created local configuration from .env.example.');
  }
  const { config } = await import('dotenv');
  config({ path: path.join(root, '.env'), quiet: true });
  process.env.NODE_ENV = 'development';
  const url = new URL(process.env.DATABASE_URL || '');
  if (!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    throw new Error('This shortcut starts local development. Set a local DATABASE_URL in .env.');
  }
  const apiPort = Number(process.env.PORT || 3001);
  if (!Number.isInteger(apiPort) || apiPort < 1 || apiPort > 65535) {
    throw new Error('PORT in .env must be a valid port number.');
  }
  const webExists = await portIsOpen(5173);
  const apiExists = await portIsOpen(apiPort);
  if (webExists && !(await websiteReady())) {
    throw new Error(
      'Port 5173 is used by another application. Close it and run this shortcut again.',
    );
  }

  if (webExists && apiExists && (await apiReady(apiPort))) {
    console.info('LinkqGlobal is already running. Reusing the existing website and API.');
  } else {
    console.info('Preparing the database client...');
    await npm(npmCli, 'run', 'db:generate');
    const bundledDatabase =
      ['localhost', '127.0.0.1'].includes(url.hostname) && url.port === '54329';
    if (bundledDatabase && !(await portIsOpen(54329))) {
      console.info('Starting local PostgreSQL...');
      const { default: EmbeddedPostgres } = await import('embedded-postgres');
      const databaseDir = path.join(root, '.local-db');
      database = new EmbeddedPostgres({
        databaseDir,
        port: 54329,
        user: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
        persistent: true,
        onLog: () => {},
        onError: (message) => console.error(message),
      });
      if (!existsSync(path.join(databaseDir, 'PG_VERSION'))) await database.initialise();
      await database.start();
      const databaseName = decodeURIComponent(url.pathname.slice(1));
      const client = database.getPgClient('postgres', '127.0.0.1');
      await client.connect();
      try {
        const existing = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [
          databaseName,
        ]);
        if (!existing.rowCount) await database.createDatabase(databaseName);
      } finally {
        await client.end();
      }
    }
    console.info('Applying database migrations...');
    await npm(npmCli, 'run', 'db:migrate');
    if (apiExists && !(await apiReady(apiPort))) {
      throw new Error(
        `Port ${apiPort} is occupied, but the enquiry API is unavailable. Close its old terminal and retry.`,
      );
    }
    // Start only missing services; another running copy is left untouched.
    const tasks = [];
    if (!webExists) tasks.push(['node_modules/vite/bin/vite.js', '--host', '127.0.0.1']);
    if (!apiExists) tasks.push(['node_modules/tsx/dist/cli.mjs', 'watch', 'server/index.ts']);
    for (const args of tasks) {
      const child = childProcess(args);
      child.once('error', (error) => {
        console.error(`Startup failed: ${error.message}`);
        void shutdown(1);
      });
      child.once('exit', () => {
        if (servicesReady && !shuttingDown) void shutdown(1);
      });
    }
    await waitUntil(
      () => Promise.all([websiteReady(), apiReady(apiPort)]).then((ready) => ready.every(Boolean)),
      'The website and enquiry API',
    );
  }

  servicesReady = true;
  console.info(`\nWebsite ready: ${websiteUrl}`);
  if (!process.argv.includes('--no-browser') && process.platform === 'win32') {
    try {
      await openBrowser();
      console.info('Browser launch completed.');
    } catch (error) {
      console.error(`Could not open the browser: ${error.message}`);
      console.info(`The site is still available. Open ${websiteUrl} in your browser.`);
      // Keep any running services alive, but let the batch file show the error
      // instead of silently closing when this invocation only reused services.
      process.exitCode = 1;
    }
  }
  if (children.size || database) {
    console.info('Keep this window open while using the site. Press Ctrl+C here to stop it.\n');
  } else console.info('The site is running in its existing terminal window.');
}

main().catch((error) => {
  console.error(`\n${error.message}`);
  void shutdown(1);
});
