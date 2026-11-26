import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { z } from 'zod';
import { insights, type InsightArticleData } from '../src/content/insights.js';

const archive = new URL('../src/content/dailyInsights.json', import.meta.url);
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date());
const earliest = new Date(Date.parse(`${date}T00:00:00Z`) - 86_400_000).toISOString().slice(0, 10);
const dryRun = process.argv.includes('--dry-run');
const publisher = 'U.S. Federal Register';

const topics = [
  { term: 'manufacturing', headline: /manufacturing|industrial production|factory/i, service: 'manufacturing-consulting', image: 'insight-manufacturing', alt: 'Industrial machinery', category: 'Industry Trends' },
  { term: 'supply chain', headline: /supply chain|freight|logistics|cargo/i, service: 'supply-chain-operations', image: 'insight-supply', alt: 'Supply chain operations', category: 'Operations & Supply Chain' },
  { term: 'artificial intelligence', headline: /artificial intelligence|machine learning|automated decision/i, service: 'data-analytics-ai', image: 'insight-analytics', alt: 'Data and analytics workplace', category: 'Technology & AI' },
  { term: 'food labeling', headline: /food label|nutrition label|consumer product|food packaging/i, service: 'fmcg-consulting', image: 'insight-fmcg', alt: 'Consumer goods on shelves', category: 'Industry Trends' },
  { term: 'education technology', headline: /education technology|educational technology|digital learning|education data/i, service: 'education-consulting', image: 'insight-education', alt: 'Education technology setting', category: 'Industry Trends' },
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

const fallbackContent = z.object({
  title: z.string().trim().min(12).max(130),
  summary: z.string().trim().min(40).max(260),
  sections: z.array(z.object({
    heading: z.string().trim().min(4).max(90),
    text: z.string().trim().min(100).max(1800),
  })).min(3).max(4),
  keyTakeaways: z.array(z.string().trim().min(12).max(200)).min(2).max(4),
});
async function generateFallback(index: number, seen: Set<string>): Promise<InsightArticleData> {
  const topic = topics[(Math.floor(Date.parse(date) / 86_400_000) + index) % topics.length];
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('No fresh sources found. Configure OPENAI_API_KEY in GitHub Actions to enable the two fallback posts.');
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: process.env.OPENAI_INSIGHTS_MODEL || 'gpt-4.1-mini',
      store: false,
      max_output_tokens: 1800,
      instructions: 'Write evergreen, practical business guidance. Use plain text. Avoid citations, statistics, current events, named case studies, regulated advice, and any claim about client results. Return a JSON object with title, summary, sections (three objects each with heading and text), and keyTakeaways (two or three strings).',
      input: `Topic: ${topic.term}. Choose one specific operating decision for a small business. Avoid these previous titles: ${JSON.stringify([...seen].slice(0, 25))}.`,
      text: { format: { type: 'json_object' } },
    }),
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`Fallback generation returned HTTP ${response.status}`);
  const result = await response.json();
  const output = z.object({
    status: z.literal('completed'),
    output: z.array(z.object({ content: z.array(z.object({
      type: z.string(), text: z.string().optional(),
    })).optional() })),
  }).parse(result);
  const text = output.output.flatMap((item) => item.content ?? []).find((part) => part.type === 'output_text')?.text;
  if (!text) throw new Error('No fallback article was returned');
  const article = fallbackContent.parse(JSON.parse(text));
  const titleKey = article.title.toLowerCase();
  if (seen.has(titleKey)) throw new Error('Fallback article repeated an existing title');
  seen.add(titleKey);
  return {
    ...baseArticle(topic),
    ...article,
    sections: article.sections.map(({ heading, text }) => [heading, text]),
    slug: `daily-guidance-${date}-${index + 1}`,
    readTime: '3 min read',
    aiGenerated: true,
  };
}

async function publish() {
  const saved: InsightArticleData[] = JSON.parse(await readFile(archive, 'utf8'));
  if (saved.some((article) => article.date === date)) {
    console.log(`Already published a batch for ${date} (India time).`);
    return;
  }
  const existingSlugs = new Set(insights.map((article) => article.slug));
  const seenTitles = new Set(insights.map((article) => article.title.toLowerCase()));
  const batches = await Promise.allSettled(topics.map(collect));
  const candidates = batches.flatMap((batch, index) => {
    if (batch.status === 'fulfilled') return batch.value;
    console.warn(`Source query failed for ${topics[index].term}: ${batch.reason}`);
    return [];
  }).sort((a, b) => b.item.publication_date.localeCompare(a.item.publication_date));

  const posts: InsightArticleData[] = [];
  for (const { topic, item } of candidates) {
    const slug = `source-fr-${item.document_number.toLowerCase()}`;
    const titleKey = item.title.toLowerCase();
    if (existingSlugs.has(slug) || seenTitles.has(titleKey)) continue;
    existingSlugs.add(slug);
    seenTitles.add(titleKey);
    const words = item.abstract?.split(/\s+/) ?? [];
    const excerpt = words.slice(0, 20).join(' ');
    posts.push({
      ...baseArticle(topic),
      slug,
      title: item.title,
      summary: `An official U.S. Federal Register update relevant to ${topic.term}. Read the original notice for the complete details.`,
      readTime: '1 min briefing',
      sections: excerpt ? [['From the original notice', `“${excerpt}${words.length > 20 ? '…' : ''}”`]] : [],
      keyTakeaways: [],
      source: { publisher, url: item.html_url, date: item.publication_date },
    });
    if (posts.length === 3) break;
  }
  if (!posts.length) {
    if (dryRun && !process.env.OPENAI_API_KEY) {
      console.log('No fresh source items. A live run would generate two labeled fallback articles.');
      return;
    }
    posts.push(await generateFallback(0, seenTitles), await generateFallback(1, seenTitles));
  }
  console.log(posts.map(({ slug, title, source }) => ({ slug, title, source: source?.url })));
  if (!dryRun) await writeFile(archive, `${JSON.stringify([...posts, ...saved], null, 2)}\n`);
}

await publish();
