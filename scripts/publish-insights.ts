import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { z } from 'zod';
import { insights, type InsightArticleData } from '../src/content/insights.js';

import { collectPhoto } from './insight-sources.js';

const archive = new URL('../src/content/dailyInsights.json', import.meta.url);
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
const earliest = new Date(Date.parse(`${date}T00:00:00Z`) - 3 * 86_400_000).toISOString().slice(0, 10);
const dryRun = process.argv.includes('--dry-run');

const topics = [
  { term: 'manufacturing', photoQuery: 'assembly line', headline: /manufacturing|industrial production|factory/i, service: 'manufacturing-consulting', image: 'insight-manufacturing', alt: 'Industrial machinery', category: 'Industry Trends' },
  { term: 'supply chain', photoQuery: 'container port', headline: /supply chain|freight|logistics|cargo/i, service: 'supply-chain-operations', image: 'insight-supply', alt: 'Supply chain operations', category: 'Operations & Supply Chain' },
  { term: 'artificial intelligence', photoQuery: 'server rack', headline: /artificial intelligence|machine learning|automated decision/i, service: 'data-analytics-ai', image: 'insight-analytics', alt: 'Data and analytics workplace', category: 'Technology & AI' },
  { term: 'food labeling', photoQuery: 'supermarket shelves', headline: /food label|nutrition label|consumer product|food packaging/i, service: 'fmcg-consulting', image: 'insight-fmcg', alt: 'Consumer goods on shelves', category: 'Industry Trends' },
  { term: 'education technology', photoQuery: 'computer lab', headline: /education technology|educational technology|digital learning|education data/i, service: 'education-consulting', image: 'insight-education', alt: 'Education technology setting', category: 'Industry Trends' },
] as const;
type Topic = (typeof topics)[number];

const sourceItem = z.object({
  document_number: z.string().regex(/^[A-Za-z0-9-]+$/),
  title: z.string().trim().min(1).max(350),
  abstract: z.string().trim().nullish(),
  publication_date: z.iso.date(),
  html_url: z.url().refine((value) => {
    const url = new URL(value);
    return url.origin === 'https://www.federalregister.gov' && url.pathname.startsWith('/documents/');
  }),
});

async function collect(topic: Topic) {
  const url = new URL('https://www.federalregister.gov/api/v1/documents.json');
  url.search = new URLSearchParams({
    per_page: '12',
    order: 'newest',
    'conditions[term]': topic.term,
    'conditions[publication_date][gte]': earliest,
    'conditions[publication_date][lte]': date,
  }).toString();
  for (const field of Object.keys(sourceItem.shape)) url.searchParams.append('fields[]', field);
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`Federal Register request returned ${response.status}`);
  const { results } = z.object({ results: z.array(z.unknown()) }).parse(await response.json());
  return results.flatMap((item) => {
    const result = sourceItem.safeParse(item);
    if (!result.success || result.data.publication_date < earliest || result.data.publication_date > date) return [];
    if (!topic.headline.test(result.data.title)) return [];
    return [{ topic, item: result.data }];
  });
}

function baseArticle(topic: Topic) {
  return {
    date,
    category: topic.category,
    image: topic.image,
    imageAlt: topic.alt,
    relatedServices: [topic.service],
    relatedArticles: [],
  };
}

async function publish() {
  const saved: InsightArticleData[] = JSON.parse(await readFile(archive, 'utf8'));
  if (saved.some((article) => article.date === date)) {
    console.log(`Already published a batch for ${date} (India time).`);
    return;
  }

  const batches = await Promise.allSettled(topics.map(collect));
  const candidates = batches.flatMap((batch, index) => {
    if (batch.status === 'fulfilled') return batch.value;
    console.warn(`Source query failed for ${topics[index].term}: ${batch.reason}`);
    return [];
  }).sort((a, b) => b.item.publication_date.localeCompare(a.item.publication_date));
  if (batches.every((batch) => batch.status === 'rejected')) {
    throw new Error('All Federal Register lookups failed. No posts were written.');
  }

  const seenSlugs = new Set(insights.map((article) => article.slug));
  const seenUrls = new Set(saved.flatMap((article) => [
    article.source?.url,
    ...(article.sources?.map((source) => source.url) ?? []),
  ]));
  const usedPhotos = new Set<string>();
  const posts: InsightArticleData[] = [];
  const photos: { name: string; large: Buffer; small: Buffer }[] = [];

  for (const { topic, item } of candidates) {
    const slug = `source-fr-${item.document_number.toLowerCase()}`;
    if (seenSlugs.has(slug) || seenUrls.has(item.html_url)) continue;
    seenSlugs.add(slug);
    seenUrls.add(item.html_url);
    const words = item.abstract?.split(/\s+/) ?? [];
    const excerpt = words.slice(0, 20).join(' ');
    const article: InsightArticleData = {
      ...baseArticle(topic),
      slug,
      title: item.title,
      summary: `A U.S. Federal Register update related to ${topic.term}. Follow the original notice for details.`,
      readTime: '1 min briefing',
      sections: excerpt ? [['From the original notice', `“${excerpt}${words.length > 20 ? '…' : ''}”`]] : [],
      keyTakeaways: [],
      source: { publisher: 'U.S. Federal Register', url: item.html_url, date: item.publication_date },
    };

    if (!dryRun) {
      const photo = await collectPhoto(topic.photoQuery, usedPhotos).catch((error: unknown) => {
        console.warn(`Using the existing topic image for ${topic.term}: ${error}`);
        return undefined;
      });
      if (photo) {
        const name = `daily-insights/${slug}`;
        photos.push({ name, large: photo.large, small: photo.small });
        article.image = name;
        article.imageAlt = photo.credit.title;
        article.imageCredit = photo.credit;
      }
    }
    posts.push(article);
    if (posts.length === 3) break;
  }

  if (!posts.length) {
    console.log('No fresh, relevant source notices. No posts were written.');
    return;
  }
  if (dryRun) {
    console.log(posts.map(({ title, source }) => ({ title, source: source?.url })));
    return;
  }

  if (photos.length) {
    await mkdir(new URL('../public/images/daily-insights/', import.meta.url), { recursive: true });
    for (const photo of photos) {
      await writeFile(new URL(`../public/images/${photo.name}.webp`, import.meta.url), photo.large);
      await writeFile(new URL(`../public/images/${photo.name}-small.webp`, import.meta.url), photo.small);
    }
  }
  const pending = new URL(`${archive.href}.tmp`);
  await writeFile(pending, `${JSON.stringify([...posts, ...saved], null, 2)}\n`);
  await rename(pending, archive);
  console.log(`Prepared ${posts.length} source briefings for ${date}.`);
}

await publish();
