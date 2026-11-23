import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const server = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const template = await readFile('dist/index.html', 'utf8');
for (const route of [...server.staticRoutes, '/404']) {
  const html = template
    .replace('<!--app-head-->', server.renderHead(route))
    .replace('<!--app-html-->', server.render(route));
  if (route === '/404') {
    await writeFile('dist/404.html', html);
  } else {
    const target = path.join('dist', route);
    await mkdir(target, { recursive: true });
    await writeFile(path.join(target, 'index.html'), html);
  }
}
const base = server.siteUrl;
await writeFile(
  'dist/robots.txt',
  base
    ? `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${base}/sitemap.xml\n`
    : 'User-agent: *\nDisallow: /\n',
);
if (base)
  await writeFile(
    'dist/sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${server.staticRoutes.map((r: string) => `<url><loc>${base}${r}</loc></url>`).join('')}</urlset>`,
  );
console.info(
  `Prerendered ${server.staticRoutes.length} public routes plus the 404 page. ${base ? 'Canonical URLs and sitemap generated.' : 'Set VITE_SITE_URL for indexable production metadata and sitemap.'}`,
);
