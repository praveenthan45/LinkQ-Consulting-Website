import { services } from './services';
import { insights } from './insights';
export const siteUrl = (import.meta.env.VITE_SITE_URL || '').replace(/\/$/, '');
export const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/industries',
  '/approach',
  '/insights',
  '/contact',
  '/privacy-policy',
  '/terms-of-use',
  '/cookie-policy',
  ...services.map((s) => `/services/${s.slug}`),
  ...insights.map((a) => `/insights/${a.slug}`),
];
const titles: Record<string, [string, string]> = {
  '/': [
    'Business clarity. Practical progress.',
    'LinkqGlobal Consulting connects business priorities with practical consulting across IT, manufacturing, FMCG, education, and automation.',
  ],
  '/about': [
    'About LinkqGlobal',
    'Meet LinkqGlobal Consulting and explore our business-focused approach to practical improvement and organizational change.',
  ],
  '/services': [
    'Our consulting services',
    'Explore IT, manufacturing, FMCG, education, and technology and automation consulting capabilities shaped around your business goals.',
  ],
  '/industries': [
    'Industries we focus on',
    'Explore the operating contexts, business challenges, and consulting needs of technology, manufacturing, consumer goods, and educational organizations.',
  ],
  '/approach': [
    'Our consulting approach',
    'Discover a structured consulting methodology: discovery, current-state assessment, opportunity identification, roadmaps, implementation support, and review.',
  ],
  '/insights': [
    'Ideas & perspectives',
    'Read practical perspectives on digital transformation, manufacturing visibility, FMCG distribution, education, and business process automation.',
  ],
  '/contact': [
    'Start a conversation',
    'Tell LinkqGlobal Consulting about your business priorities and explore the consulting support that may be right for your organization.',
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
  const a = insights.find((a) => path === `/insights/${a.slug}`);
  const entry = s
    ? [s.name, s.intro]
    : a
      ? [a.title, a.summary]
      : titles[path] || [
          'Page not found',
          'Find your way to LinkqGlobal consulting services, insights, and contact information.',
        ];
  return {
    title: `${entry[0]} | LinkqGlobal Consulting`,
    description: entry[1],
    image: `${siteUrl}/images/${s?.coverImage || a?.image || 'hero'}.webp`,
    canonical: siteUrl ? `${siteUrl}${path}` : '',
    noindex: !siteUrl || !staticRoutes.includes(path),
    service: s,
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
