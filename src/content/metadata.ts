import { services } from './services';
import { insights } from './insights';
import { industries } from './industries';

export const siteUrl = (import.meta.env.VITE_SITE_URL || '').trim().replace(/\/+$/, '');
export const brandName = 'LinkQ Global Consulting';
export const structuredDataId = 'page-structured-data';
const brandAliases = ['LinkQ Global', 'LinkQ'];

export const staticRoutes = [
  '/',
  '/about',
  '/industries',
  '/collaboration',
  '/insights',
  '/events',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  ...services.map((s) => `/services/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...insights.map((a) => `/insights/${a.slug}`),
];

const titles: Record<string, [string, string]> = {
  '/': [
    'Global Partnership Consulting for Small Businesses',
    'LinkQ Global Consulting helps small businesses build a business case, prepare for verification and certification, and find suitable international partners.',
  ],
  '/about': [
    'About us',
    'Meet LinkQ Global Consulting, a startup that helps local businesses build a business case, review their documentation, and prepare for global partnerships.',
  ],
  '/industries': [
    'Industry expertise',
    'Explore industry-specific consulting that prepares local businesses for credible global collaboration.',
  ],
  '/collaboration': [
    'Global collaboration journey',
    'Connecting local businesses to global opportunities through partner discovery, market entry planning, negotiation facilitation, verification support, partner alignment, and delivery coordination.',
  ],
  '/insights': [
    'Ideas & perspectives',
    'Read practical perspectives on enterprise technology, manufacturing, FMCG, retail distribution, automation, strategy, data and AI, and supply chains.',
  ],
  '/events': [
    'Industry events',
    'Browse upcoming international trade fairs and conferences by industry, date, and event type, with links to the organizers.',
  ],
  '/contact': [
    'Start a conversation',
    'Tell LinkqGlobal about your business and the global collaboration you hope to build. Start with a consultation.',
  ],
  '/privacy-policy': [
    'Privacy policy',
    'A draft explanation of the information collected through the LinkqGlobal website, its use, storage, retention, and your choices.',
  ],
  '/terms-of-use': [
    'Terms of use',
    'Draft terms for using the LinkqGlobal Consulting website, educational content, and enquiry service.',
  ],
};

export function getPageMeta(path: string) {
  path = path.replace(/\/+$/, '') || '/';
  const s = services.find((s) => path === `/services/${s.slug}`);
  const ind = industries.find((i) => path === `/industries/${i.slug}`);
  const a = insights.find((a) => path === `/insights/${a.slug}`);

  const entry = s
    ? [s.name, s.intro]
    : ind
      ? [ind.name, ind.description]
      : a
        ? [a.title, a.summary]
        : titles[path] || (path.startsWith('/events/') ? titles['/events'] : [
            'Page not found',
            'Find your way to LinkqGlobal consulting services, insights, and contact information.',
          ]);

  const canonical = siteUrl && staticRoutes.includes(path) ? `${siteUrl}${path}` : '';

  return {
    title: path === '/' ? `${brandName} | ${entry[0]}` : `${entry[0]} | ${brandName}`,
    description: entry[1],
    image: `${siteUrl}/images/${s?.coverImage || ind?.heroImage || ind?.image || a?.image || (path === '/collaboration' ? 'collab-hero' : path.startsWith('/events') ? 'events-forum' : 'hero')}.webp`,
    canonical,
    noindex: !canonical,
    service: s,
    industry: ind,
    article: a,
  };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function getStructuredData(meta: ReturnType<typeof getPageMeta>) {
  if (!meta.canonical) return '';

  const homeUrl = `${siteUrl}/`;
  const organizationId = `${homeUrl}#organization`;
  const context = 'https://schema.org';
  let data;
  if (meta.canonical === homeUrl) {
    data = {
      '@context': context,
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${homeUrl}#website`,
          url: homeUrl,
          name: brandName,
          alternateName: brandAliases,
          publisher: { '@id': organizationId },
        },
        {
          '@type': 'Organization',
          '@id': organizationId,
          url: homeUrl,
          name: brandName,
          alternateName: brandAliases,
          description: meta.description,
          logo: `${siteUrl}/brand/linkqglobal-wordmark.svg`,
        },
      ],
    };
  } else if (meta.service) {
    data = {
      '@context': context,
      '@type': 'Service',
      url: meta.canonical,
      name: meta.service.name,
      description: meta.description,
      provider: { '@type': 'Organization', '@id': organizationId, name: brandName },
    };
  } else if (meta.article) {
    data = {
      '@context': context,
      '@type': 'Article',
      url: meta.canonical,
      headline: meta.article.title,
      datePublished: meta.article.date,
      description: meta.description,
    };
  }

  return data ? JSON.stringify(data).replace(/</g, '\\u003c') : '';
}

export function renderHead(path: string) {
  const m = getPageMeta(path);
  const structured = getStructuredData(m);
  return `<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"/><meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow'}"/><meta property="og:type" content="${m.article ? 'article' : 'website'}"/><meta property="og:title" content="${esc(m.title)}"/><meta property="og:description" content="${esc(m.description)}"/><meta property="og:site_name" content="${esc(brandName)}"/>${m.canonical ? `<link rel="canonical" href="${esc(m.canonical)}"/><meta property="og:url" content="${esc(m.canonical)}"/><meta property="og:image" content="${esc(m.image)}"/>` : ''}<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(m.title)}"/><meta name="twitter:description" content="${esc(m.description)}"/>${structured ? `<script id="${structuredDataId}" type="application/ld+json">${structured}</script>` : ''}`;
}
