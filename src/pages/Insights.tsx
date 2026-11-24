import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail, CheckCircle2 } from 'lucide-react';
import { insights } from '../content/insights';
import { Breadcrumb, PageHero, SectionTitle, Photo, InsightCard } from '../components/Common';
import { CTA } from '../components/Layout';

const categories = [
  'All Perspectives',
  'Industry Trends',
  'Technology & AI',
  'Business Strategy',
  'Operations & Supply Chain',
  'Case Studies',
  'Research & Reports',
] as const;

export function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Perspectives');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter articles based on category and search
  const filteredArticles = insights.filter((a) => {
    const matchesCategory =
      selectedCategory === 'All Perspectives' ||
      a.category === selectedCategory ||
      (selectedCategory === 'Insights' && true); // fallback for generic queries
    const matchesSearch =
      `${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Featured article is the first research/lead article
  const featuredArticle = insights[0];

  // Popular/recommended articles
  const recommendedArticles = insights.slice(1, 4);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <>
      <Breadcrumb label="Insights" />
      <PageHero
        eyebrow="IDEAS & PERSPECTIVES"
        image="insights-banner"
        alt="Business intelligence dashboards and performance analysis screens"
        title={
          <>
            Fresh thinking.
            <br />
            Practical perspectives.
          </>
        }
        description="Practical perspectives on strategy, technology, operations, and the evidence growing businesses need before wider industry collaboration."
      />

      {/* Featured Article Hero Highlight */}
      <section className="section container" style={{ paddingBottom: 40 }}>
        <SectionTitle
          eyebrow="FEATURED PERSPECTIVE"
          title="Lead research & current thinking."
        />
        <div
          style={{
            marginTop: 30,
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 48,
            alignItems: 'center',
            background: 'white',
            border: '1px solid var(--line)',
            padding: 32,
            borderRadius: 4,
          }}
          className="featured-highlight-card"
        >
          <div>
            <Photo name={featuredArticle.image} alt={featuredArticle.imageAlt} />
          </div>
          <div>
            <span
              style={{
                display: 'inline-block',
                background: 'var(--pale)',
                color: 'var(--accent)',
                padding: '4px 12px',
                fontSize: '0.8rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                borderRadius: 2,
                marginBottom: 16,
              }}
            >
              {featuredArticle.category}
            </span>
            <h2 style={{ fontSize: '1.65rem', lineHeight: 1.25, marginBottom: 16 }}>
              <Link to={`/insights/${featuredArticle.slug}`} style={{ color: 'inherit' }}>
                {featuredArticle.title}
              </Link>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: 24 }}>
              {featuredArticle.summary}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderTop: '1px solid var(--line)',
                paddingTop: 16,
              }}
            >
              <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                {featuredArticle.readTime} · Published{' '}
                {new Intl.DateTimeFormat('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  timeZone: 'UTC',
                }).format(new Date(`${featuredArticle.date}T00:00:00Z`))}
              </span>
              <Link
                to={`/insights/${featuredArticle.slug}`}
                className="button"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                Read article
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Articles Section */}
      <section className="container" style={{ paddingBottom: 80 }}>
        <SectionTitle
          eyebrow="EXPLORE BY CATEGORY"
          title="All research & viewpoints."
        >
          Filter across our core thought leadership domains or search for specific operational
          topics.
        </SectionTitle>

        <div className="filter-bar" style={{ marginTop: 30 }}>
          <div className="filter-buttons" aria-label="Filter insights by category">
            {categories.map((c) => {
              const isActive =
                selectedCategory === c ||
                (c === 'All Perspectives' && selectedCategory === 'Insights');
              return (
                <button
                  key={c}
                  className={isActive ? 'active' : ''}
                  aria-pressed={isActive}
                  onClick={() => setSelectedCategory(c)}
                >
                  {c}
                </button>
              );
            })}
          </div>

          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Search insights</span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perspectives"
            />
          </label>
        </div>

        <p className="sr-only" role="status">
          {filteredArticles.length} insights found
        </p>

        {/* Articles Grid */}
        <div className="insights-grid" style={{ marginTop: 35 }}>
          {filteredArticles.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
          {!filteredArticles.length && (
            <div className="empty-state">
              <h2>No matching perspectives</h2>
              <p>Try searching another keyword or reset the category filters to explore all topics.</p>
              <button
                className="button button-outline"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setSelectedCategory('All Perspectives');
                  setSearchQuery('');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Popular / Recommended Articles */}
      {selectedCategory === 'All Perspectives' && !searchQuery && (
        <section className="section soft-section">
          <div className="container">
            <SectionTitle
              eyebrow="POPULAR READING"
              title="Recommended executive analyses."
            >
              Articles most frequently read by operations, technology, and supply chain leaders.
            </SectionTitle>

            <div className="insights-grid" style={{ marginTop: 35 }}>
              {recommendedArticles.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Executive Newsletter Subscription Section */}
      <section className="section container">
        <div
          style={{
            background: 'var(--inverse-surface, #111)',
            color: 'var(--inverse, #fff)',
            padding: '56px 40px',
            borderRadius: 4,
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 48,
            alignItems: 'center',
          }}
          className="newsletter-box"
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: 12,
              }}
            >
              <Mail size={16} /> EXECUTIVE BRIEFING
            </span>
            <h2 style={{ color: 'inherit', fontSize: '1.8rem', lineHeight: 1.25, marginBottom: 14 }}>
              Stay ahead with LinkqGlobal Insights.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', margin: 0, fontSize: '0.98rem' }}>
              Subscribe to receive our monthly digest of empirical benchmarks, technology
              assessments, and strategic consulting viewpoints directly in your inbox.
            </p>
          </div>
          <div>
            {subscribed ? (
              <div
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: 24,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <CheckCircle2 size={24} color="var(--accent)" />
                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                  Thank you for subscribing. You will receive our next monthly executive briefing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label htmlFor="newsletter-email" className="sr-only">
                  Business email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="Enter your business email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.25)',
                    background: 'rgba(255,255,255,0.06)',
                    color: '#fff',
                    fontSize: '0.95rem',
                  }}
                />
                <button
                  type="submit"
                  className="button"
                  style={{
                    background: 'var(--accent)',
                    borderColor: 'var(--accent)',
                    color: '#fff',
                    justifyContent: 'center',
                  }}
                >
                  Subscribe to briefing
                </button>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                  We respect your privacy. No spam; unsubscribe at any time.
                </span>
              </form>
            )}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
