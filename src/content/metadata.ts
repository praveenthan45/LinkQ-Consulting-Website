import { services } from './services';
import { insights } from './insights';
import { industries } from './industries';

export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');

export const staticRoutes = [
  '/',
  '/about',
  '/industries',
  '/collaboration',
  '/insights',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  ...services.map((s) => `/services/${s.slug}`),
  ...industries.map((i) => `/industries/${i.slug}`),
  ...insights.map((a) => `/insights/${a.slug}`),
];

const titles: Record<string, [string, string]> = {
  '/': [
    'Local ambition. Global opportunity.',
    'LinkqGlobal helps growing local businesses build a business case, prepare verification and certification evidence, and seek suitable global industry collaborators.',
  ],
  '/about': [
    'About LinkqGlobal',
    'Learn how LinkqGlobal helps local businesses prepare for global industry collaboration through business analysis, readiness work, and partner planning.',
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
  '/cookie-policy': [
    'Cookie policy',
    'Learn about the LinkqGlobal website implementation, which does not set analytics, advertising, or tracking cookies.',
  ],
};

export function getPageMeta(path: string) {
  const s = services.find((s) => path === `/services/${s.slug}`);
  const ind = industries.find((i) => path === `/industries/${i.slug}`);
  const a = insights.find((a) => path === `/insights/${a.slug}`);

  const entry = s
    ? [s.name, s.intro]
    : ind
      ? [ind.name, ind.description]
      : a
        ? [a.title, a.summary]
        : titles[path] || [
            'Page not found',
            'Find your way to LinkqGlobal consulting services, insights, and contact information.',
          ];

  return {
    title: `${entry[0]} | LinkqGlobal Consulting`,
    description: entry[1],
    image: `${siteUrl}/images/${s?.coverImage || ind?.heroImage || ind?.image || a?.image || (path === '/collaboration' ? 'collab-hero' : 'hero')}.webp`,
    canonical: siteUrl ? `${siteUrl}${path}` : '',
    noindex: !siteUrl || !staticRoutes.includes(path),
    service: s,
    industry: ind,
    article: a,
  };
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function renderHead(path: string) {
  const m = getPageMeta(path);
  const structured = {
    '@context': 'https://schema.org',
    '@type': m.service ? 'Service' : m.article ? 'Article' : 'Organization',
    ...(m.service
      ? {
          name: m.service.name,
          description: m.description,
          provider: { '@type': 'Organization', name: 'LinkqGlobal Consulting' },
        }
      : m.article
        ? { headline: m.article.title, datePublished: m.article.date, description: m.description }
        : { name: 'LinkqGlobal Consulting', description: m.description }),
    ...(m.canonical ? { url: m.canonical } : {}),
  };
  return `<title>${esc(m.title)}</title><meta name="description" content="${esc(m.description)}"/><meta name="robots" content="${m.noindex ? 'noindex, nofollow' : 'index, follow'}"/><meta property="og:type" content="${m.article ? 'article' : 'website'}"/><meta property="og:title" content="${esc(m.title)}"/><meta property="og:description" content="${esc(m.description)}"/><meta property="og:site_name" content="LinkqGlobal Consulting"/>${m.canonical ? `<link rel="canonical" href="${esc(m.canonical)}"/><meta property="og:url" content="${esc(m.canonical)}"/><meta property="og:image" content="${esc(m.image)}"/>` : ''}<meta name="twitter:card" content="summary_large_image"/><meta name="twitter:title" content="${esc(m.title)}"/><meta name="twitter:description" content="${esc(m.description)}"/><script type="application/ld+json">${JSON.stringify(structured).replace(/</g, '\\u003c')}</script>`;
}
