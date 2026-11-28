import { z } from 'zod';

export const eventCoverCount = 27;

export const publicEventUrl = z.url().refine((value) => {
  if (!URL.canParse(value)) return false;
  const url = new URL(value);
  return url.protocol === 'https:' && !url.username && !url.password && !url.port &&
    /^[a-z0-9.-]+\.[a-z]{2,}$/i.test(url.hostname) &&
    !/\.(localhost|local|internal|test|example|invalid)$/i.test(url.hostname);
});

export const eventArtworkUrl = publicEventUrl.refine((value) => {
  if (!URL.canParse(value)) return false;
  const { hostname, pathname } = new URL(value);
  return /\.(?:png|jpe?g|webp|avif)$/i.test(pathname) &&
    ((hostname === 'events.linuxfoundation.org' && pathname.startsWith('/wp-content/uploads/')) ||
     (hostname === 'media-km.koelnmesse.io' && pathname.startsWith('/uploads/messelogos/')));
});

export const industryEventSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/).max(120),
  title: z.string().min(1).max(240),
  industry: z.string().min(1).max(120),
  format: z.string().min(1).max(80),
  startDate: z.iso.date(),
  endDate: z.iso.date(),
  venue: z.string().max(240),
  location: z.string().max(240),
  organizer: z.string().min(1).max(160),
  url: publicEventUrl,
  registrationUrl: publicEventUrl.optional(),
  free: z.boolean().optional(),
  artwork: z.object({
    url: eventArtworkUrl,
    kind: z.enum(['banner', 'logo']),
  }).nullable().default(null),
  coverIndex: z.number().int().min(0).max(eventCoverCount).optional(),
}).refine((event) => event.endDate >= event.startDate);

export const eventListingSchema = z.object({
  events: z.array(industryEventSchema),
  updatedAt: z.iso.datetime(),
});

export type IndustryEvent = z.infer<typeof industryEventSchema>;
export type EventListing = z.infer<typeof eventListingSchema>;
