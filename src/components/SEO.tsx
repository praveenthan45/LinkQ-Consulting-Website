import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '../content/metadata';
export function SEOManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = getPageMeta(pathname);
    document.title = m.title;
    function setMeta(selector: string, attribute: string, value: string) {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${selector}]`);
      if (!node) {
        node = document.createElement('meta');
        const parts = selector.split('=');
        node.setAttribute(parts[0], parts[1].replaceAll('"', ''));
        document.head.append(node);
      }
      node.setAttribute(attribute, value);
    }
    setMeta('name="description"', 'content', m.description);
    setMeta('name="robots"', 'content', m.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property="og:title"', 'content', m.title);
    setMeta('property="og:description"', 'content', m.description);
    setMeta('property="og:type"', 'content', m.article ? 'article' : 'website');
    setMeta('property="og:site_name"', 'content', 'LinkqGlobal Consulting');
    setMeta('name="twitter:title"', 'content', m.title);
    setMeta('name="twitter:description"', 'content', m.description);
    if (m.canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.append(link);
      }
      link.href = m.canonical;
      setMeta('property="og:url"', 'content', m.canonical);
      setMeta('property="og:image"', 'content', m.image);
    }
    const data = document.head.querySelector('script[type="application/ld+json"]');
    if (data)
      data.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': m.service ? 'Service' : m.article ? 'Article' : 'Organization',
        name: m.service?.name || m.article?.title || 'LinkqGlobal Consulting',
        description: m.description,
        ...(m.canonical ? { url: m.canonical } : {}),
      });
  }, [pathname]);
  return null;
}
