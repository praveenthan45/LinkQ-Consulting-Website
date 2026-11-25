import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChartNoAxesCombined, ListChecks, Handshake, Check } from 'lucide-react';
import { services, servicePath, type Service } from '../content/services';
import { insights } from '../content/insights';
export function SectionTitle({
  eyebrow,
  title,
  children,
  link,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  link?: { to: string; label: string };
}) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
      {link && (
        <Link to={link.to} className="text-link">
          {link.label}
          <span className="link-line" />
        </Link>
      )}
    </div>
  );
}
export function Photo({
  name,
  alt,
  className = '',
  eager = false,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 767px)" srcSet={`/images/${name}-small.webp`} />
      <img
        src={`/images/${name}.webp`}
        alt={alt}
        width="1200"
        height="800"
        loading={eager ? 'eager' : 'lazy'}
      />
    </picture>
  );
}
export function Breadcrumb({
  label,
  parent,
}: {
  label: string;
  parent?: { to: string; label: string };
}) {
  return (
    <div className="breadcrumb container">
      <Link to="/">Home</Link>
      <span>/</span>
      {parent && (
        <>
          <Link to={parent.to}>{parent.label}</Link>
          <span>/</span>
        </>
      )}
      <span>{label}</span>
    </div>
  );
}
export function PageBanner({
  image,
  alt = '',
  className = '',
  children,
  caption,
  label,
  edgeBreadcrumb,
}: {
  image: string;
  alt?: string;
  className?: string;
  children: ReactNode;
  caption?: string;
  label?: string;
  edgeBreadcrumb?: ReactNode;
}) {
  return (
    <section className={`page-banner ${className}${edgeBreadcrumb ? ' page-banner--edge-image' : ''}`} aria-label={label}>
      <div className="container page-banner-inner">
        <div className="page-banner-copy">
          {edgeBreadcrumb}
          {children}
        </div>
        <figure className="page-banner-image">
          <Photo name={image} alt={alt} eager />
          {caption && <figcaption className="page-banner-caption">{caption}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  className = '',
  edgeBreadcrumb,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  alt?: string;
  className?: string;
  edgeBreadcrumb?: ReactNode;
}) {
  return (
    <PageBanner image={image} alt={alt} className={`page-hero ${className}`} edgeBreadcrumb={edgeBreadcrumb}>
      <div className="page-hero-copy">
        <span className="eyebrow">
          <span className="small-line" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </PageBanner>
  );
}
export function ServiceCard({ service: s }: { service: Service }) {
  return (
    <Link to={servicePath(s)} className="service-card">
      <div className="service-card-image">
        <Photo name={s.image} alt={s.alt} />
        <span className="service-icon">
          <s.icon size={23} />
        </span>
      </div>
      <div className="service-card-body">
        <h3>{s.name.replace(' Consulting', '')}</h3>
        <p>{s.description}</p>
        <div className="service-tags">
          {s.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <span className="card-link">
          Explore service
          <span className="link-line" />
        </span>
      </div>
    </Link>
  );
}
export function ServicesGrid({ omit }: { omit?: string }) {
  return (
    <div className="services-grid">
      {services
        .filter((s) => s.slug !== omit)
        .map((s) => (
          <ServiceCard key={s.slug} service={s} />
        ))}
    </div>
  );
}
export const stages = [
  {
    icon: Search,
    title: 'Discover',
    text: 'Listen, ask the right questions, and understand your business context.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Assess',
    text: 'Examine the current state, connect the dots, and identify what matters.',
  },
  {
    icon: ListChecks,
    title: 'Recommend',
    text: 'Build a clear, prioritized roadmap grounded in your objectives.',
  },
  {
    icon: Handshake,
    title: 'Support implementation',
    text: 'Work alongside your team to put the agreed plan into practice.',
  },
];
export function Process() {
  return (
    <div className="process-grid">
      {stages.map((s) => (
        <div className="process-item" key={s.title}>
          <div className="process-icon">
            <s.icon size={24} />
          </div>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </div>
      ))}
    </div>
  );
}
export function InsightCard({ article: a }: { article: (typeof insights)[number] }) {
  return (
    <Link className="insight-card" to={`/insights/${a.slug}`}>
      <div className="insight-image">
        <Photo name={a.image} alt={a.imageAlt} />
        <span className="category-tag">{a.category}</span>
      </div>
      <div className="insight-meta">
        <time dateTime={a.date}>
          {new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC',
          }).format(new Date(`${a.date}T00:00:00Z`)).toUpperCase()}
        </time>
        <span>{a.readTime}</span>
      </div>
      <h3>{a.title}</h3>
      <p>{a.summary}</p>
      <span className="card-link">
        Read perspective
        <span className="link-line" />
      </span>
    </Link>
  );
}
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="check-list">
      {items.map((item) => (
        <li key={item}>
          <Check size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
