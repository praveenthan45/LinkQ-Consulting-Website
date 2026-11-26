import sharp from 'sharp';
import { z } from 'zod';

export async function collectData(indicator: string) {
  const response = await fetch(
    `https://api.worldbank.org/v2/country/IND/indicator/${indicator}?format=json&mrnev=3`,
    { signal: AbortSignal.timeout(15_000) },
  );
  if (!response.ok) throw new Error(`World Bank returned HTTP ${response.status}`);
  const [, rows] = z.tuple([z.unknown(), z.array(z.object({
    date: z.string().regex(/^\d{4}$/),
    value: z.number(),
    indicator: z.object({ value: z.string() }),
  })).min(1)]).parse(await response.json());
  const title = rows[0].indicator.value;
  return {
    source: { publisher: 'World Bank Open Data', title, url: `https://data.worldbank.org/indicator/${indicator}?locations=IN` },
    evidence: `${title}, India. Historical observations by year: ${rows.map(({ date, value }) => `${date}: ${value}`).join(', ')}.`,
  };
}

const photoRecord = z.object({
  title: z.string().trim().min(1).max(240),
  creator: z.string().trim().min(1).max(200),
  license: z.enum(['by', 'by-sa', 'cc0', 'pdm']),
  license_url: z.url().refine((url) => url.startsWith('https://creativecommons.org/')),
  foreign_landing_url: z.url().refine((value) => {
    const url = new URL(value);
    return url.origin === 'https://commons.wikimedia.org' &&
      (url.pathname.startsWith('/wiki/File:') ||
        (url.pathname === '/w/index.php' && /^\d+$/.test(url.searchParams.get('curid') ?? '')));
  }),
  url: z.url().refine((url) => url.startsWith('https://upload.wikimedia.org/')),
  width: z.number().nullish(),
});

export async function collectPhoto(query: string, used: Set<string>) {
  const params = new URLSearchParams({
    q: query, source: 'wikimedia', license: 'by,by-sa,cc0,pdm', extension: 'jpg,jpeg',
    page_size: '12',
  });
  const response = await fetch(`https://api.openverse.org/v1/images/?${params}`, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Openverse returned HTTP ${response.status}`);
  const { results } = z.object({ results: z.array(z.unknown()) }).parse(await response.json());
  for (const result of results) {
    const parsed = photoRecord.safeParse(result);
    if (!parsed.success || used.has(parsed.data.foreign_landing_url)) continue;
    const photo = parsed.data;
    if (/hurricane|collapse|covid|shortage|empty shelves/i.test(photo.title)) continue;
    try {
      const imageUrl = new URL(photo.url);
      const path = imageUrl.pathname.match(/^\/wikipedia\/commons\/([a-f]\/[^/]+\/([^/]+))$/);
      const downloadUrl = path && (photo.width ?? 0) > 960
        ? new URL(`/wikipedia/commons/thumb/${path[1]}/960px-${path[2]}`, imageUrl.origin)
        : imageUrl;
      const file = await fetch(downloadUrl, { redirect: 'error', signal: AbortSignal.timeout(8_000) });
      if (!file.ok || !file.body || !file.headers.get('content-type')?.startsWith('image/jpeg')) continue;
      const chunks: Uint8Array[] = [];
      let bytes = 0;
      const reader = file.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bytes += value.byteLength;
        if (bytes > 8_000_000) {
          await reader.cancel();
          break;
        }
        chunks.push(value);
      }
      if (bytes > 8_000_000) continue;
      const image = sharp(Buffer.concat(chunks), { limitInputPixels: 28_000_000 }).autoOrient();
      const resize = (width: number) => image.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 83 }).toBuffer();
      const [large, small] = await Promise.all([resize(1200), resize(640)]);
      used.add(photo.foreign_landing_url);
      return {
        large, small,
        credit: { title: photo.title, creator: photo.creator, url: photo.foreign_landing_url, licenseUrl: photo.license_url },
      };
    } catch {
      // Try the next result if the remote file cannot be downloaded or decoded.
    }
  }
  throw new Error(`No usable openly licensed photo for ${query}`);
}
