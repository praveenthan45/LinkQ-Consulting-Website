import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const { staticRoutes } = await import(pathToFileURL(path.resolve('.ssr/entry-server.js')).href);
const titles = new Set<string>();
let links = 0,
  assets = 0,
  fragments = 0;
for (const route of staticRoutes) {
  const html = await readFile(path.join('dist', route, 'index.html'), 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  if (!title || titles.has(title)) throw new Error(`Missing/duplicate title: ${route}`);
  titles.add(title);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) throw new Error(`Invalid h1 count: ${route}`);
  if (!html.includes('name="description"')) throw new Error(`Missing description: ${route}`);
  for (const match of html.matchAll(/(?:src|href)="(\/[^"?#]*)/g)) {
    const ref = match[1];
    if (
      ref.startsWith('/assets/') ||
      ref.startsWith('/brand/') ||
      ref.startsWith('/images/') ||
      ref.startsWith('/fonts/') ||
      ref === '/favicon.svg'
    ) {
      await access(path.join('dist', ref));
      assets++;
    } else if (!staticRoutes.includes(ref) && ref !== '/') {
      throw new Error(`Broken internal link ${ref} on ${route}`);
    } else links++;
  }
  for (const match of html.matchAll(/srcset="([^"]+)"/gi)) {
    for (const candidate of match[1].split(',')) {
      const ref = candidate.trim().split(/\s+/)[0];
      if (ref.startsWith('/images/')) {
        await access(path.join('dist', ref));
        assets++;
      }
    }
  }
  for (const match of html.matchAll(/href="([^"]+)"/g)) {
    if (!match[1].startsWith('/') && !match[1].startsWith('#')) continue;
    const target = new URL(match[1], `http://localhost${route}`);
    if (!target.hash) continue;
    const targetHtml =
      target.pathname === route
        ? html
        : await readFile(path.join('dist', target.pathname, 'index.html'), 'utf8');
    const id = decodeURIComponent(target.hash.slice(1));
    if (!targetHtml.includes(`id="${id}"`))
      throw new Error(`Missing link target ${target.pathname}#${id} on ${route}`);
    fragments++;
  }
}
console.info(
  `Verified ${staticRoutes.length} prerendered routes, ${titles.size} unique titles, ${links} internal links, ${fragments} section targets, and ${assets} local asset references.`,
);
