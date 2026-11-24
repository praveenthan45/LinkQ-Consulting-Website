import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Zap } from 'lucide-react';
import { industries } from '../content/industries';
import { insights } from '../content/insights';
import { Breadcrumb, PageHero, SectionTitle, Photo, InsightCard } from '../components/Common';
import { CTA } from '../components/Layout';

export function Industries() {
  const featuredArticles = insights.slice(0, 3);

  return (
    <>
      <Breadcrumb label="Industry" />
      <PageHero
        eyebrow="INDUSTRY & ADVISORY"
        image="industries-banner"
        alt="Industrial facilities and supply chains supporting global commerce"
        title={
          <>
            Specialized sector knowledge.
            <br />
            Practical business impact.
          </>
        }
        description="Explore where local businesses can build a stronger case, verify readiness, and identify the right kind of global industry collaborator."
      />

      {/* Industry Cards Section */}
      <section className="section soft-section" id="sectors">
        <div className="container">
          <SectionTitle
            eyebrow="OUR FOCUS AREAS"
            title="Where we advise and transform."
          >
            Explore industry-specific advice that helps your business improve its operations and prepare for a wider partnership.
          </SectionTitle>

          <div className="industries-grid" style={{ marginTop: 40 }}>
            {industries.map((ind) => (
              <Link
                to={`/industries/${ind.slug}`}
                className="service-card"
                key={ind.slug}
                aria-label={`Explore ${ind.name} consulting`}
              >
                <div className="service-card-image">
                  <Photo name={ind.image} alt={ind.alt} />
                  <span className="service-icon" aria-hidden="true">
                    <ind.icon size={23} />
                  </span>
                </div>
                <div className="service-card-body">
                  <h3>{ind.name}</h3>
                  <p>{ind.description}</p>
                  <div className="service-tags" style={{ marginTop: 12 }}>
                    {ind.challenges.slice(0, 2).map((c) => (
                      <span key={c.title}>{c.title}</span>
                    ))}
                  </div>
                  <span className="card-link" style={{ marginTop: 16 }}>
                    Explore {ind.shortName}
                    <span className="link-line" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sector Transformation & Opportunities Section */}
      <section className="section container">
        <SectionTitle
          eyebrow="BUSINESS TRANSFORMATION"
          title="Common hurdles. Clear, pragmatic answers."
          link={{ to: '/collaboration', label: 'Collaboration journey' }}
        >
          A global tie-up starts with local readiness. We help you understand the business case, the evidence a partner may need, and the operating changes that support growth.
        </SectionTitle>

        <div className="values-grid">
          <div className="value-card">
            <Zap size={28} />
            <h3>Process Modernization</h3>
            <p>
              Remove operational bottlenecks, eliminate redundant handoffs, and compress cycle
              times across plant, distribution, and administrative operations.
            </p>
          </div>
          <div className="value-card">
            <ShieldCheck size={28} />
            <h3>Resilient Architectures</h3>
            <p>
              Upgrade legacy systems with scalable, secure architectures designed for real-world
              reliability, compliance, and cyber resilience.
            </p>
          </div>
          <div className="value-card">
            <Compass size={28} />
            <h3>Measurable Value Realization</h3>
            <p>
              Ground all consulting initiatives in quantifiable KPIs: OEE, inventory velocity,
              customer OTIF delivery, and sustainable margin enhancement.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Industry Insights */}
      <section className="section container">
        <SectionTitle
          eyebrow="INDUSTRY PERSPECTIVES"
          title="Thought leadership across sectors."
          link={{ to: '/insights', label: 'Explore all insights' }}
        >
          Read our latest analysis and evidence-based guidance on technology adoption, operational
          resilience, and business strategy.
        </SectionTitle>

        <div className="insights-grid" style={{ marginTop: 35 }}>
          {featuredArticles.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <CTA />
    </>
  );
}
