import sharp from 'sharp';
import { eventArtworkUrl } from '../shared/events.js';

const maxBytes = 5 * 1024 * 1024;
const cache = new Map<string, { expires: number; image: Promise<Buffer | undefined> }>();
let activeDownloads = 0;

async function downloadArtwork(url: string) {
  const response = await fetch(url, {
    redirect: 'error',
    signal: AbortSignal.timeout(9_000),
  });
  const type = response.headers.get('content-type')?.split(';')[0];
  if (!response.ok || !response.body || !type || !/^image\/(png|jpeg|webp|avif)$/.test(type) ||
    Number(response.headers.get('content-length')) > maxBytes) {
    await response.body?.cancel();
    return undefined;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > maxBytes) {
      await reader.cancel();
      return undefined;
    }
    chunks.push(value);
  }

  return sharp(Buffer.concat(chunks), { limitInputPixels: 16_000_000 })
    .rotate()
    .resize(960, 600, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 83 })
    .toBuffer();
}

export async function getOrganizerArtwork(url: string) {
  if (!eventArtworkUrl.safeParse(url).success) return undefined;
  const now = Date.now();
  const previous = cache.get(url);
  if (previous && previous.expires > now) return previous.image;
  if (activeDownloads >= 16) return undefined;
  cache.delete(url);
  if (cache.size >= 128) {
    const oldest = cache.keys().next();
    if (!oldest.done) cache.delete(oldest.value);
  }

  activeDownloads += 1;
  const entry = {
    expires: now + 6 * 60 * 60 * 1000,
    image: downloadArtwork(url).catch(() => undefined).then((image) => {
      if (!image) entry.expires = Date.now() + 60_000;
      return image;
    }).finally(() => { activeDownloads -= 1; }),
  };
  cache.set(url, entry);
  return entry.image;
}
