import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { brandName, getPageMeta, getStructuredData, structuredDataId } from '../content/metadata';
export function SEOManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = getPageMeta(pathname);
    document.title = m.title;
    function setMeta(attribute: 'name' | 'property', key: string, value: string) {
      let node = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!value) {
        node?.remove();
        return;
      }
      if (!node) {
        node = document.createElement('meta');
        node.setAttribute(attribute, key);
        document.head.append(node);
      }
      node.content = value;
    }
    setMeta('name', 'description', m.description);
    setMeta('name', 'robots', m.noindex ? 'noindex, nofollow' : 'index, follow');
    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:type', m.article ? 'article' : 'website');
    setMeta('property', 'og:site_name', brandName);
    setMeta('property', 'og:url', m.canonical);
    setMeta('property', 'og:image', m.canonical ? m.image : '');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (m.canonical) {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.append(link);
      }
      link.href = m.canonical;
    } else {
      link?.remove();
    }
    const structured = getStructuredData(m);
    let data = document.head.querySelector<HTMLScriptElement>(`#${structuredDataId}`);
    if (structured) {
      if (!data) {
        data = document.createElement('script');
        data.id = structuredDataId;
        data.type = 'application/ld+json';
        document.head.append(data);
      }
      data.textContent = structured;
    } else {
      data?.remove();
    }
  }, [pathname]);
  return null;
}
