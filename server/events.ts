import { createHash } from 'node:crypto';
import { load } from 'cheerio';
import { z } from 'zod';
import { eventArtworkUrl, eventCoverCount, industryEventSchema, publicEventUrl, type EventListing, type IndustryEvent } from '../shared/events.js';
import { db } from './db.js';

const refreshInterval = 6 * 60 * 60 * 1000;
const maxSnapshotAge = 7 * 24 * 60 * 60 * 1000;
const clean = (text: string) => text.replace(/\s+/g, ' ').trim();
const normalizeTitle = (text: string) => text.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');

function artwork(url: unknown, kind: 'banner' | 'logo') {
  const parsed = eventArtworkUrl.safeParse(url);
  return parsed.success ? { url: parsed.data, kind } : null;
}

export function uniqueEventArtwork(events: IndustryEvent[]) {
  const used = new Set<string>();
  return events.map((event) => {
    if (!event.artwork) return event;
    const url = new URL(event.artwork.url);
    const key = `${url.hostname}${url.pathname.replace(/-\d+x\d+(?=\.[^.]+$)/, '')}`;
    if (used.has(key)) return { ...event, artwork: null };
    used.add(key);
    return event;
  });
}

const coverSubjects = [
  { match: /virtual|online/i, covers: [10] },
  { match: /embedded|hardware|chip/i, covers: [2, 6, 14] },
  { match: /security|compliance|privacy/i, covers: [17, 3] },
  { match: /automotive|mobility/i, covers: [7, 20] },
  { match: /cloud|kube|infrastructure/i, covers: [21, 9, 3] },
  { match: /artificial intelligence|\bai\b|pytorch/i, covers: [4, 23] },
  { match: /education|training|workshop/i, covers: [24, 15, 16] },
];

function eventSlug(title: string, key: string) {
  const readable = title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '').slice(0, 72);
  return `${readable || 'event'}-${createHash('sha256').update(key).digest('hex').slice(0, 12)}`;
}

const calendarPlace = z.object({
  '@type': z.string(),
  name: z.string().optional(),
  url: publicEventUrl.optional().catch(undefined),
  address: z.object({
    addressLocality: z.string().optional(),
    addressCountry: z.string().optional(),
  }).optional().catch(undefined),
});
const linuxEvent = z.object({
  '@type': z.literal('Event'),
  name: z.string(),
  url: publicEventUrl,
  startDate: z.string(),
  endDate: z.string().optional(),
  eventStatus: z.string().optional(),
  location: z.union([calendarPlace, z.array(calendarPlace)]).optional(),
  organizer: z.object({ name: z.string() }).optional(),
  image: z.union([z.string(), z.array(z.string())]).optional().catch(undefined),
  offers: z.union([
    z.object({ url: publicEventUrl.optional(), price: z.union([z.string(), z.number()]).optional() }),
    z.array(z.object({ url: publicEventUrl.optional(), price: z.union([z.string(), z.number()]).optional() })),
  ]).optional().catch(undefined),
});
const itemList = z.object({
  '@type': z.literal('ItemList'),
  itemListElement: z.array(z.object({ item: z.unknown() })),
});

export function parseLinuxFoundation(html: string): IndustryEvent[] {
  const $ = load(html);
  const items = $('script[type="application/ld+json"]').toArray().flatMap((script) => {
    try {
      const list = itemList.safeParse(JSON.parse($(script).text()));
      return list.success ? list.data.itemListElement : [];
    } catch {
      return [];
    }
  });
  if (!items.length) throw new Error('Linux Foundation event metadata is missing.');

  return items.flatMap(({ item }) => {
    const parsed = linuxEvent.safeParse(item);
    if (!parsed.success) return [];
    const event = parsed.data;
    if (event.eventStatus && !/\/(EventScheduled|EventRescheduled|EventMovedOnline)$/.test(event.eventStatus)) return [];
    const locations = [event.location ?? []].flat();
    const venue = locations.find((location) => location['@type'] === 'Place');
    const virtual = locations.find((location) => location['@type'] === 'VirtualLocation');
    const offers = [event.offers ?? []].flat();
    const directLink = offers.find((offer) => offer.url)?.url ??
      (virtual?.url?.startsWith('https://register.linuxfoundation.org/') ? virtual.url : undefined);
    const startDate = event.startDate.slice(0, 10);
    const result = industryEventSchema.safeParse({
      slug: eventSlug(event.name, `lf:${event.url}:${startDate.slice(0, 4)}`),
      title: clean(event.name),
      industry: 'Technology',
      format: !venue && virtual ? 'Online conference' : 'Conference',
      startDate,
      endDate: event.endDate?.slice(0, 10) ?? startDate,
      venue: clean(venue?.name ?? ''),
      location: [venue?.address?.addressLocality, venue?.address?.addressCountry].filter(Boolean).join(', ') ||
        (virtual && !venue ? 'Online' : ''),
      organizer: clean(event.organizer?.name || 'The Linux Foundation'),
      url: event.url,
      registrationUrl: directLink,
      free: offers.some((offer) => offer.price === 0 || offer.price === '0') || undefined,
      artwork: [event.image ?? []].flat().map((url) => artwork(url, 'banner')).find(Boolean) ?? null,
    });
    return result.success ? [result.data] : [];
  });
}

export function parseKoelnmesse(html: string): IndustryEvent[] {
  const $ = load(html);
  const rows = $('.exh_holder .item[data-begin-date]').toArray();
  if (!rows.length) throw new Error('Koelnmesse event rows are missing.');

  return rows.flatMap((row) => {
    const entry = $(row);
    const title = clean(entry.find('.sort_fairname').text());
    const url = entry.find('a[title="Info"]').first().attr('href');
    const startDate = (entry.attr('data-begin-date') ?? '').slice(0, 10);
    const range = clean(entry.find('.date').text()).match(/^(?:\d{2}\.\d{2}\.\s*-\s*)?(\d{2})\.(\d{2})\.(\d{4}),\s*(.+)$/);
    if (!range) return []; // A month-only announcement is not a confirmed date.
    const [, day, month, year, location] = range;
    const calendarUrl = publicEventUrl.safeParse(entry.find('a[title="Kalendar"]').first().attr('href'));
    const fair = calendarUrl.success ? new URL(calendarUrl.data).searchParams.get('fair') : null;
    const result = industryEventSchema.safeParse({
      slug: eventSlug(title, `km:${fair || url}:${startDate.slice(0, 4)}`),
      title,
      industry: clean(entry.find('.inner_branche').first().text() || entry.find('.inner_category').first().text()) || 'Trade & business',
      format: 'Trade fair',
      startDate,
      endDate: `${year}-${month}-${day}`,
      location: clean(location) === 'Cologne' ? 'Cologne, Germany' : clean(location),
      venue: '',
      organizer: 'Koelnmesse',
      url,
      artwork: artwork(entry.find('.img_holder img').first().attr('src'), 'logo'),
    });
    return result.success ? [result.data] : [];
  });
}

const sources = [
  { id: 'linux-foundation', url: 'https://events.linuxfoundation.org/about/calendar/', parse: parseLinuxFoundation },
  { id: 'koelnmesse', url: 'https://www.koelnmesse.com/current-dates/all-trade-fairs/', parse: parseKoelnmesse },
];

let refreshing: Promise<void> | undefined;

export function refreshEventFeeds() {
  refreshing ??= Promise.all(sources.map(async (source) => {
    try {
      const current = await db.eventFeedSnapshot.findUnique({
        where: { source: source.id },
        select: { fetchedAt: true, events: true },
      });
      const first = Array.isArray(current?.events) ? current.events[0] : null;
      const includesArtwork = first && typeof first === 'object' && 'artwork' in first;
      if (current && includesArtwork && Date.now() - current.fetchedAt.getTime() < refreshInterval) return;
      const response = await fetch(source.url, {
        redirect: 'error',
        headers: { Accept: 'text/html', 'User-Agent': 'LinkqGlobal-EventDirectory/1.0' },
        signal: AbortSignal.timeout(15_000),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const events = source.parse(await response.text());
      if (!events.length) throw new Error('No valid event records.');
      const values = { events, fetchedAt: new Date() };
      await db.eventFeedSnapshot.upsert({
        where: { source: source.id },
        update: values,
        create: { source: source.id, ...values },
      });
      console.info(`event_feed_updated ${source.id} ${events.length}`);
    } catch (error) {
      console.warn(`event_feed_refresh_failed ${source.id}`, error instanceof Error ? error.message : 'Unknown error');
    }
  })).then(() => undefined).finally(() => { refreshing = undefined; });
  return refreshing;
}

export function startEventFeedRefresh() {
  void refreshEventFeeds();
  const timer = setInterval(() => void refreshEventFeeds(), refreshInterval);
  timer.unref();
  return () => clearInterval(timer);
}

export async function getEventListing(): Promise<EventListing | undefined> {
  const snapshots = await db.eventFeedSnapshot.findMany({
    where: {
      source: { in: sources.map((source) => source.id) },
      fetchedAt: { gte: new Date(Date.now() - maxSnapshotAge) },
    },
    orderBy: { fetchedAt: 'desc' },
  });
  if (!snapshots.length) return undefined;

  const storedEvents = snapshots.flatMap((snapshot) => z.array(industryEventSchema).parse(snapshot.events));
  const today = new Date().toISOString().slice(0, 10);
  const seen = new Set<string>();
  const events = storedEvents
    .filter((event) => event.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate) || a.title.localeCompare(b.title))
    .filter((event) => {
      const key = `${normalizeTitle(event.title)}:${event.startDate}:${normalizeTitle(event.location)}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const availableCovers = new Set(Array.from({ length: eventCoverCount }, (_, index) => index + 1));
  let exhibitionCoverUsed = false;
  const eventsWithCovers = uniqueEventArtwork(events).map((event) => {
    if (event.artwork) return event;
    if (event.format === 'Trade fair') {
      if (exhibitionCoverUsed) return event;
      exhibitionCoverUsed = true;
      return { ...event, coverIndex: 0 };
    }
    const preferred = coverSubjects.find(({ match }) => match.test(`${event.title} ${event.format}`));
    const coverIndex = preferred?.covers.find((cover) => availableCovers.has(cover)) ??
      availableCovers.values().next().value;
    if (coverIndex === undefined) return event;
    availableCovers.delete(coverIndex);
    return { ...event, coverIndex };
  });
  return { events: eventsWithCovers, updatedAt: snapshots[0].fetchedAt.toISOString() };
}
