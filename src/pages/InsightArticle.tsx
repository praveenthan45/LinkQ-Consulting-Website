import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, Share2, Tag, BookOpen, Layers } from 'lucide-react';
import { insights } from '../content/insights';
import { services, servicePath } from '../content/services';
import { Breadcrumb, PageBanner, SectionTitle, InsightCard } from '../components/Common';
import { CTA } from '../components/Layout';
import { NotFound } from './Pages';

export function InsightArticle() {
  const { slug } = useParams();
  const a = insights.find((x) => x.slug === slug);
  if (!a) return <NotFound />;

  // Find related articles
  const relatedArticles = insights.filter((item) =>
    a.relatedArticles?.includes(item.slug) || (item.category === a.category && item.slug !== a.slug),
  ).slice(0, 2);

  // Find related consulting services
  const mappedServices = services.filter((s) => a.relatedServices?.includes(s.slug));

  return (
    <>
      {/* 1. Article Title, 2. Category, 3. Hero Image, 4. Introduction */}
      <PageBanner
        edgeBreadcrumb={<Breadcrumb label={a.category} parent={{ to: '/insights', label: 'Insights' }} />}
        image={a.image}
        alt={a.imageAlt || `${a.category} perspective`}
        className="article-banner"
      >
        <div className="article-heading">
          <span className="eyebrow">{a.category.toUpperCase()} PERSPECTIVE</span>
          <h1 id="insight-title">{a.title}</h1>
          <p className="article-lead">{a.summary}</p>
          <div className="article-meta">
            <time dateTime={a.date}>
              {new Intl.DateTimeFormat('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
              }).format(new Date(`${a.date}T00:00:00Z`))}
            </time>{' '}
            · {a.readTime}
            {a.source && ' · Source briefing'}
            {a.aiGenerated && ' · AI-generated guidance'}
          </div>
        </div>
      </PageBanner>

      {/* Main Article Content & 5. Structured Headings */}
      <article className="container article" aria-labelledby="insight-title">
        {a.source && (
          <p>
            Published by {a.source.publisher} on <time dateTime={a.source.date}>{a.source.date}</time>.
            {' '}<a href={a.source.url}>Read the original source</a>
          </p>
        )}
        {a.aiGenerated && <p>This AI-generated article covers general industry practices.</p>}
        {a.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}

        {/* 6. Key Takeaways Callout Box */}
        {a.keyTakeaways && a.keyTakeaways.length > 0 && (
          <div
            style={{
              background: 'var(--pale)',
              borderLeft: '4px solid var(--accent)',
              padding: '28px 32px',
              marginBlock: '40px',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <h3
              style={{
                fontSize: '1.15rem',
                margin: '0 0 16px 0',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'var(--text)',
              }}
            >
              <CheckCircle2 size={22} color="var(--accent)" />
              Executive Takeaways
            </h3>
            <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {a.keyTakeaways.map((takeaway, index) => (
                <li key={index} style={{ fontSize: '0.96rem', lineHeight: 1.55, color: 'var(--text)' }}>
                  {takeaway}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 8. Related Consulting Services */}
        {mappedServices.length > 0 && (
          <div
            style={{
              marginTop: 48,
              paddingTop: 36,
              borderTop: '1px solid var(--line)',
            }}
          >
            <span className="eyebrow">PRACTICAL APPLICATION</span>
            <h3 style={{ fontSize: '1.25rem', marginTop: 8, marginBottom: 16 }}>
              Related Consulting Capabilities
            </h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.94rem', marginBottom: 20 }}>
              Our advisory teams help enterprises translate the concepts discussed in this article
              into structured implementation plans.
            </p>
            <div className="related-services" style={{ marginTop: 20 }}>
              {mappedServices.map((service) => (
                <Link to={servicePath(service)} key={service.slug} className="topic-card">
                  <div className="topic-card-header">
                    <service.icon size={22} className="topic-icon" />
                    <h3>{service.name}</h3>
                  </div>
                  <p>{service.description}</p>
                  <span className="card-action">
                    Learn more <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="article-end" style={{ marginTop: 40 }}>
          <p>
            This perspective provides general educational information and consulting analysis.
            Strategic and operational decisions should reflect your organization’s unique context,
            dependencies, and risk tolerance.
          </p>
          <Link to="/insights" className="text-link">
            Explore more perspectives
            <span className="link-line" />
          </Link>
        </div>
      </article>

      {/* 7. Related Articles Section */}
      {relatedArticles.length > 0 && (
        <section className="section soft-section">
          <div className="container">
            <SectionTitle
              eyebrow="FURTHER READING"
              title="Related perspectives you may find valuable."
              link={{ to: '/insights', label: 'All perspectives' }}
            />
            <div className="insights-grid" style={{ marginTop: 35 }}>
              {relatedArticles.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. CTA where relevant */}
      <CTA />
    </>
  );
}
