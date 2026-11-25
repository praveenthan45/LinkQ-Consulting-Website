import { Link, useParams } from 'react-router-dom';
import {
  Check,
  Cpu,
  ArrowUpRight,
} from 'lucide-react';
import { getIndustry } from '../content/industries';
import { services, servicePath } from '../content/services';
import { industryConsulting } from '../content/industryConsulting';
import { insights } from '../content/insights';
import { Breadcrumb, PageBanner, SectionTitle, Photo, InsightCard } from '../components/Common';
import { CTA } from '../components/Layout';
import { OurExperts } from '../components/OurExperts';
import { NotFound } from './Pages';

export function IndustryDetailPage() {
  const { slug } = useParams();
  const ind = getIndustry(slug || '');

  if (!ind) {
    return <NotFound />;
  }

  // Find relevant mapped services
  const mappedServices = services.filter(
    (service) => ind.relevantServices.includes(service.slug) &&
      !(ind.slug === 'information-technology' && service.slug === 'data-analytics-ai'),
  );
  const dataAiService = ind.slug === 'information-technology'
    ? services.find((service) => service.slug === 'data-analytics-ai')
    : undefined;

  // Find relevant mapped insights
  const mappedInsights = insights.filter((a) => ind.relevantInsights.includes(a.slug));

  const consultationUrl = `/contact?industry=${encodeURIComponent(ind.name)}`;
  const isBusinessStrategy = ind.slug === 'business-strategy';

  return (
    <div className="industry-detail" key={ind.slug}>
      {/* 1. Hero & Overview Section */}
      <PageBanner
        edgeBreadcrumb={<Breadcrumb label={ind.name} parent={{ to: '/industries', label: 'Industry' }} />}
        image={ind.heroImage}
        alt={ind.heroAlt}
        className="service-masthead"
        label={ind.name}
      >
        <div className="service-masthead-copy">
          <span className="eyebrow">
            <ind.icon size={18} />
            {ind.name.toUpperCase()}
          </span>
          <h1>{ind.headline}</h1>
          <p>{ind.description}</p>
          <div>
            <Link className="button" to={consultationUrl}>
              Consult with our experts
            </Link>
          </div>
        </div>
      </PageBanner>

      {/* Overview Detail Paragraphs */}
      <section className="section soft-section" id="overview">
        <div className={`container two-column${isBusinessStrategy ? ' strategy-overview-grid' : ''}`}>
          <div className="industry-overview-visual">
            <div>
              <span className="eyebrow">{isBusinessStrategy ? 'STRATEGY OVERVIEW' : 'INDUSTRY OVERVIEW'}</span>
              <h2>
                {isBusinessStrategy
                  ? 'Turning priorities into practical choices.'
                  : `Navigating market shifts in ${ind.shortName.toLowerCase()}.`}
              </h2>
            </div>
            <div className="industry-overview-photo">
              <Photo name={ind.image} alt={ind.alt} />
            </div>
          </div>
          <div className="industry-overview-copy">
            {ind.overview.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? 'lead-paragraph' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Digital Transformation Opportunities */}
      <section className="section container" id="digital-transformation">
        <SectionTitle
          eyebrow="DIGITAL ARCHITECTURE"
          title="Digital transformation initiatives built for scale."
        >
          Pragmatic improvements that connect technology investments with the decisions and work
          they need to support.
        </SectionTitle>

        <div className="two-column" style={{ marginTop: 40, gap: 40 }}>
          {ind.digitalTransformation.map((dt) => (
            <div
              key={dt.title}
              style={{
                background: 'white',
                border: '1px solid var(--line)',
                padding: '36px 32px',
                borderRadius: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <Cpu size={24} color="var(--accent)" />
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{dt.title}</h3>
              </div>
              <p style={{ color: 'var(--muted)', marginBottom: 20 }}>{dt.description}</p>
              <ul className="check-list">
                {dt.initiatives.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Operational Improvement Areas */}
      <section className="section soft-section" id="operational-improvement">
        <div className="container">
          <SectionTitle
            eyebrow="OPERATIONAL RIGOR"
            title="Operational improvement disciplines."
          >
            Targeted workflow interventions delivering immediate cost efficiency and long-term
            stability.
          </SectionTitle>

          <div className="industry-detail-card-grid">
            {ind.operationalImprovement.map((op, index) => (
              <article className="industry-detail-card" key={op.area}>
                <span className="industry-card-number" aria-hidden="true">
                  {index + 1}
                </span>
                <h3>{op.area}</h3>
                <p className="operational-improvement-focus">
                  <strong>Focus:</strong> {op.focus}
                </p>
                <p className="operational-improvement-impact">
                  <strong>Impact:</strong> {op.impact}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How Our Consulting Expertise Supports the Industry */}
      <section className="section container" id="consulting-support">
        <SectionTitle
          eyebrow="OUR ENGAGEMENT APPROACH"
          title={`How LinkqGlobal supports ${ind.shortName.toLowerCase()} leaders.`}
          link={{ to: '/collaboration', label: 'How collaboration works' }}
        >
          We connect sector-specific consulting with the business case, evidence, and partner planning needed for a wider industry collaboration.
        </SectionTitle>

        <div className="industry-detail-card-grid">
          {ind.consultingSupport.map((support, index) => (
            <article className="industry-detail-card" key={support.pillar}>
              <span className="industry-card-number" aria-hidden="true">
                {index + 1}
              </span>
              <h3>{support.pillar}</h3>
              <p>{support.description}</p>
            </article>
          ))}
        </div>
      </section>

      {dataAiService && (
        <section className="section soft-section" id="data-ai">
          <div className="container">
            <SectionTitle
              eyebrow="DATA ANALYTICS & AI"
              title="Put dependable data behind better technology decisions."
              link={{ to: servicePath(dataAiService), label: 'Explore Data Analytics & AI consulting' }}
            >
              Start with the decision to improve. We assess data quality, shape useful reporting, and test AI ideas with clear evaluation and human oversight.
            </SectionTitle>
            <div className="values-grid" style={{ marginTop: 35 }}>
              {dataAiService.capabilities.slice(0, 3).map((capability) => (
                <div className="value-card" key={capability.title}>
                  <dataAiService.icon size={26} color="var(--accent)" />
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Consulting disciplines applied to this industry */}
      <section className="section soft-section" id="relevant-services">
        <div className="container">
          <SectionTitle
            eyebrow="CONSULTING FOR THIS INDUSTRY"
            title={`Practical support for ${ind.shortName}.`}
          >
            These consulting areas address the decisions and operating challenges specific to {ind.shortName}.
          </SectionTitle>

          <div className="related-services" style={{ marginTop: 30 }}>
            {mappedServices.map((service) => (
              <div key={service.slug} className="topic-card industry-consulting-card">
                <div className="topic-card-header">
                  <service.icon size={22} className="topic-icon" />
                  <h3>{service.name}</h3>
                </div>
                <p>{industryConsulting[ind.slug]?.[service.slug] ?? service.description}</p>
                <ul>
                  {service.capabilities.slice(0, 2).map((capability) => (
                    <li key={capability.title}>{capability.title}</li>
                  ))}
                </ul>
                <Link to={servicePath(service)} className="card-action">
                  Explore consulting detail <ArrowUpRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industry-Related Insights */}
      {mappedInsights.length > 0 && (
        <section className="section container" id="relevant-insights">
          <SectionTitle
            eyebrow="PERSPECTIVES & ANALYSIS"
            title={`Latest thought leadership in ${ind.shortName}.`}
            link={{ to: '/insights', label: 'Browse all articles' }}
          >
            Practical insights on strategy, technology integration, and operational execution.
          </SectionTitle>

          <div className="insights-grid" style={{ marginTop: 35 }}>
            {mappedInsights.map((article) => (
              <InsightCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <OurExperts area={ind.slug} />
      <CTA />
    </div>
  );
}
