import { Link, useParams } from 'react-router-dom';
import {
  Check,
  AlertCircle,
  Lightbulb,
  Cpu,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { getIndustry } from '../content/industries';
import { services, servicePath } from '../content/services';
import { industryConsulting } from '../content/industryConsulting';
import { industryCollaboration } from '../content/industryCollaboration';
import { insights } from '../content/insights';
import { Breadcrumb, PageBanner, SectionTitle, Photo, InsightCard } from '../components/Common';
import { CTA } from '../components/Layout';
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

  return (
    <div className="industry-detail" key={ind.slug}>
      {/* Breadcrumb */}
      <Breadcrumb label={ind.name} parent={{ to: '/industries', label: 'Industry' }} />

      {/* 1. Hero & Overview Section */}
      <PageBanner
        image={ind.heroImage}
        alt={ind.heroAlt}
        className="service-masthead"
        caption={ind.shortName}
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
        <div className="container two-column">
          <div>
            <span className="eyebrow">{ind.slug === 'business-strategy' ? 'STRATEGY OVERVIEW' : 'INDUSTRY OVERVIEW'}</span>
            <h2>
              {ind.slug === 'business-strategy'
                ? 'Turning priorities into practical choices.'
                : `Navigating market shifts in ${ind.shortName.toLowerCase()}.`}
            </h2>
            <div style={{ marginTop: 24 }}>
              <Photo name={ind.image} alt={ind.alt} />
            </div>
          </div>
          <div>
            {ind.overview.map((paragraph, idx) => (
              <p key={idx} className={idx === 0 ? 'lead-paragraph' : ''}>
                {paragraph}
              </p>
            ))}
            <div
              style={{
                marginTop: 32,
                padding: 24,
                background: 'var(--card-bg, #fff)',
                border: '1px solid var(--line)',
                borderRadius: 4,
              }}
            >
              <h3 style={{ fontSize: '1.05rem', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Award size={20} color="var(--accent)" />
                {ind.slug === 'business-strategy' ? 'Our Strategic Value Proposition' : 'Our Sector Value Proposition'}
              </h3>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--muted)' }}>
                {ind.valueProposition}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Current Industry Challenges */}
      <section className="section container" id="challenges">
        <SectionTitle
          eyebrow={ind.slug === 'business-strategy' ? 'STRATEGIC CHALLENGES' : 'SECTOR CHALLENGES'}
          title={`Critical headwinds facing ${ind.shortName}.`}
        >
          We help executive leadership isolate systemic root causes and implement resilient
          countermeasures.
        </SectionTitle>

        <div className="values-grid" style={{ marginTop: 35 }}>
          {ind.challenges.map((challenge) => (
            <div className="value-card" key={challenge.title}>
              <AlertCircle size={26} color="var(--accent)" />
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Strategic Business Opportunities */}
      <section className="section soft-section" id="opportunities">
        <div className="container">
          <SectionTitle
            eyebrow="STRATEGIC OPPORTUNITIES"
            title={`High-value growth & efficiency frontiers.`}
          >
            Position your organization ahead of market disruptions by capitalizing on high-leverage
            commercial and operating advantages.
          </SectionTitle>

          <div className="values-grid" style={{ marginTop: 35 }}>
            {ind.businessOpportunities.map((opp) => (
              <div
                className="value-card"
                key={opp.title}
                style={{ background: 'white', border: '1px solid var(--line)' }}
              >
                <Lightbulb size={26} color="var(--accent)" />
                <h3>{opp.title}</h3>
                <p>{opp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Digital Transformation Opportunities */}
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

      {/* 5. Operational Improvement Areas */}
      <section className="section soft-section" id="operational-improvement">
        <div className="container">
          <SectionTitle
            eyebrow="OPERATIONAL RIGOR"
            title="Operational improvement disciplines."
          >
            Targeted workflow interventions delivering immediate cost efficiency and long-term
            stability.
          </SectionTitle>

          <div className="values-grid" style={{ marginTop: 35 }}>
            {ind.operationalImprovement.map((op) => (
              <div
                key={op.area}
                className="value-card"
                style={{ background: 'white', border: '1px solid var(--line)' }}
              >
                <TrendingUp size={26} color="var(--accent)" />
                <h3>{op.area}</h3>
                <p>
                  <strong>Focus:</strong> {op.focus}
                </p>
                <p style={{ marginTop: 8, color: 'var(--text)', fontWeight: 500 }}>
                  <strong>Impact:</strong> {op.impact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. How Our Consulting Expertise Supports the Industry */}
      <section className="section container" id="consulting-support">
        <SectionTitle
          eyebrow="OUR ENGAGEMENT APPROACH"
          title={`How LinkqGlobal supports ${ind.shortName.toLowerCase()} leaders.`}
          link={{ to: '/collaboration', label: 'How collaboration works' }}
        >
          We connect sector-specific consulting with the business case, evidence, and partner planning needed for a wider industry collaboration.
        </SectionTitle>

        <div className="values-grid" style={{ marginTop: 35 }}>
          {ind.consultingSupport.map((support) => (
            <div className="value-card" key={support.pillar}>
              <Layers size={26} color="var(--accent)" />
              <h3>{support.pillar}</h3>
              <p>{support.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container" id="collaboration-opportunity">
        <SectionTitle
          eyebrow="GLOBAL COLLABORATION"
          title={`Taking ${ind.shortName} into a wider market.`}
          link={{ to: '/collaboration', label: 'Explore collaboration' }}
        >
          We help local businesses prepare for a credible conversation with a suitable global industry partner.
        </SectionTitle>
        <div className="values-grid collaboration-consultation-grid">
          <div className="value-card"><h3>Build the case</h3><p>{industryCollaboration[ind.slug].caseStudy}</p></div>
          <div className="value-card"><h3>Verify readiness</h3><p>{industryCollaboration[ind.slug].readiness}</p></div>
          <div className="value-card"><h3>Find partner fit</h3><p>{industryCollaboration[ind.slug].partner}</p></div>
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

      {/* 7. Consulting disciplines applied to this industry */}
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

      {/* 8. Industry-Related Insights */}
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
      <CTA />
    </div>
  );
}
