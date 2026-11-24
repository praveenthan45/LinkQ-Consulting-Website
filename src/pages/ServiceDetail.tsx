import { Link, useParams } from 'react-router-dom';
import {
  Check,
  ClipboardList,
  FileCheck2,
  Layers3,
  ArrowUpRight,
} from 'lucide-react';
import { services, servicePath } from '../content/services';
import { serviceStories } from '../content/serviceStories';
import { serviceCollaboration } from '../content/serviceCollaboration';
import { industries } from '../content/industries';
import { insights } from '../content/insights';
import {
  Breadcrumb,
  PageBanner,
  SectionTitle,
  CheckList,
  InsightCard,
} from '../components/Common';
import { DepthImage, Reveal } from '../components/Motion';
import { CTA } from '../components/Layout';
import { Accordion } from '../components/Accordion21';
import { OurLeaders } from '../components/OurLeaders';
import { serviceLeaders, defaultLeaders } from '../content/serviceLeaders';
import { NotFound } from './Pages';

// Service to industry mappings
const serviceToIndustries: Record<string, string[]> = {
  'it-consulting': ['information-technology', 'education', 'manufacturing-industrial', 'investment-real-estate'],
  'manufacturing-consulting': [
    'manufacturing-industrial',
    'logistics-distribution',
    'fmcg-consumer-goods',
  ],
  'fmcg-consulting': ['fmcg-consumer-goods', 'retail-commerce', 'logistics-distribution'],
  'education-consulting': ['education', 'information-technology'],
  'technology-automation': [
    'manufacturing-industrial',
    'logistics-distribution',
    'information-technology',
  ],
  'business-strategy': [
    'business-strategy',
    'investment-real-estate',
    'retail-commerce',
    'fmcg-consumer-goods',
    'information-technology',
    'manufacturing-industrial',
  ],
  'data-analytics-ai': [
    'investment-real-estate',
    'information-technology',
    'retail-commerce',
    'fmcg-consumer-goods',
    'logistics-distribution',
  ],
  'supply-chain-operations': [
    'investment-real-estate',
    'logistics-distribution',
    'retail-commerce',
    'fmcg-consumer-goods',
    'manufacturing-industrial',
  ],
};

// Service to insights mappings
const serviceToInsights: Record<string, string[]> = {
  'it-consulting': ['practical-digital-transformation-roadmap', 'data-readiness-before-an-ai-pilot'],
  'manufacturing-consulting': [
    'manufacturing-process-visibility',
    'processes-suitable-for-automation',
  ],
  'fmcg-consulting': ['fmcg-distribution-planning', 'handoffs-behind-supply-chain-delays'],
  'education-consulting': [
    'digital-opportunities-in-education',
    'practical-digital-transformation-roadmap',
  ],
  'technology-automation': [
    'processes-suitable-for-automation',
    'data-readiness-before-an-ai-pilot',
  ],
  'business-strategy': [
    'turning-strategy-into-decision-rules',
    'practical-digital-transformation-roadmap',
  ],
  'data-analytics-ai': [
    'data-readiness-before-an-ai-pilot',
    'manufacturing-process-visibility',
  ],
  'supply-chain-operations': [
    'handoffs-behind-supply-chain-delays',
    'fmcg-distribution-planning',
  ],
};

export function ServiceDetailPage() {
  const { slug } = useParams();
  const s = services.find((item) => item.slug === slug);
  if (!s || !serviceStories[s.slug]) return <NotFound />;

  const story = serviceStories[s.slug];
  const consultationUrl = `/contact?service=${encodeURIComponent(s.name)}`;

  // Find related industries for this service
  const applicableIndustrySlugs = serviceToIndustries[s.slug] || [];
  const applicableIndustries = industries.filter((ind) =>
    applicableIndustrySlugs.includes(ind.slug),
  );

  // Find related insights for this service
  const relevantInsightSlugs = serviceToInsights[s.slug] || [];
  const relevantInsights = insights.filter((a) => relevantInsightSlugs.includes(a.slug));

  return (
    <div className="service-detail compact-service" key={s.slug}>
      <Breadcrumb label={s.name} parent={{ to: '/industries', label: 'Industries' }} />

      {/* 1. Service Title and Hero Introduction */}
      <PageBanner
        image={s.coverImage}
        alt={s.coverAlt}
        className="service-masthead"
        caption={s.shortName}
        label={s.name}
      >
        <div className="service-masthead-copy">
          <span className="eyebrow">
            <s.icon size={18} />
            {s.name.toUpperCase()}
          </span>
          <h1>{s.headline}</h1>
          <p>{story.summary}</p>
          <div>
            <Link className="button" to={consultationUrl}>
              Book a consultation
            </Link>
          </div>
          <div className="masthead-tags">
            {s.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </PageBanner>

      {/* Internal Navigation Anchor Bar */}
      <nav className="service-section-nav" aria-label="On this service page">
        <div className="container">
          <span>Explore this service</span>
          {[
            ['overview', 'Overview & challenges'],
            ['solutions', 'Solutions'],
            ['expertise', 'Capabilities'],
            ['engagement', 'Support & deliverables'],
            ['industries', 'Industries'],
            ['questions', 'FAQs'],
            ['leaders', 'Our leaders'],
          ].map(([id, label]) => (
            <Link key={id} to={`#${id}`}>
              {label}
            </Link>
          ))}
        </div>
      </nav>

      {/* 2. Overview & 3. Business Challenges We Solve */}
      <section className="section container service-introduction" id="overview">
        <Reveal className="service-lead-grid">
          <div>
            <span className="eyebrow">WHEN TO TALK TO US</span>
            <h2>{story.positioning}</h2>
            <p>{story.lead}</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--muted)', marginBottom: 16 }}>
              Key Challenges We Address
            </h3>
            <CheckList items={s.challenges} />
          </div>
        </Reveal>
      </section>

      {/* 5. Specific Solutions We Provide */}
      <div className="service-story-wrap" id="solutions">
        {story.chapters.map((chapter, index) => (
          <section
            className={`story-chapter container ${index ? 'chapter-reverse' : ''}`}
            key={chapter.title}
          >
            <DepthImage
              name={chapter.image}
              alt={chapter.alt}
              caption={chapter.label}
              reverse={!!index}
            />
            <Reveal className="chapter-copy">
              <span className="eyebrow">{chapter.label}</span>
              <h2>{chapter.title}</h2>
              <p>{chapter.summary}</p>
              <ul className="chapter-focus">
                {chapter.focus.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
        ))}
      </div>

      {/* 4. Our Capabilities and Expertise */}
      <section className="section container service-expertise" id="expertise">
        <Reveal>
          <SectionTitle eyebrow="OUR CAPABILITIES" title="Explore the support you need.">
            Open a topic to see what an engagement in {s.name.toLowerCase()} can cover.
          </SectionTitle>
          <Accordion
            className="faq-accordion capability-accordion"
            items={s.capabilities.map((capability, index) => ({
              id: `capability-${index}`,
              title: capability.title,
              content: (
                <>
                  <p>{capability.text}</p>
                  <ul className="capability-details">
                    {capability.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ),
            }))}
          />
        </Reveal>
      </section>

      {/* 6. Our Consulting & Implementation Support */}
      <section className="section container engagement-section" id="engagement">
        <Reveal className="engagement-intro">
          <span className="eyebrow">WHAT YOU RECEIVE</span>
          <h2>
            A clear direction.
            <br />
            <em>Practical next steps.</em>
          </h2>
          <p>
            Scope, deliverables, and implementation support are agreed before work begins. We work
            alongside your team to ensure recommendations are adopted and sustained.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginTop: 20 }}>
            <Link className="button" to={consultationUrl}>
              Discuss this service
            </Link>
            <Link className="text-link" to="/collaboration">
              How collaboration works
              <span className="link-line" />
            </Link>
          </div>
        </Reveal>
        <div className="deliverables-list">
          {story.deliverables.map((deliverable, index) => {
            const Icon = [ClipboardList, FileCheck2, Layers3][index % 3];
            return (
              <Reveal className="deliverable-item" key={deliverable.title} delay={index * 70}>
                <Icon size={25} />
                <div>
                  <h3>{deliverable.title}</h3>
                  <p>{deliverable.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* How this service supports a wider collaboration */}
      <section className="section soft-section" id="collaboration-readiness">
        <div className="container">
          <SectionTitle
            eyebrow="READY FOR COLLABORATION"
            title={`How ${s.shortName.toLowerCase()} supports a wider opportunity.`}
            link={{ to: '/collaboration', label: 'Explore collaboration' }}
          >
            {serviceCollaboration[s.slug]}
          </SectionTitle>
        </div>
      </section>

      {/* 8. Industries Where the Service is Applicable */}
      <section className="section container" id="industries">
        <SectionTitle
          eyebrow="INDUSTRY APPLICABILITY"
          title={`Sectors where ${s.shortName} creates high impact.`}
          link={{ to: '/industries', label: 'View all industries' }}
        >
          Explore how our {s.name.toLowerCase()} capabilities are tailored for the operational
          complexities of specific sectors.
        </SectionTitle>

        <div className="related-services" style={{ marginTop: 30 }}>
          {applicableIndustries.map((ind) => (
            <Link to={`/industries/${ind.slug}`} key={ind.slug} className="topic-card">
              <div className="topic-card-header">
                <ind.icon size={22} className="topic-icon" />
                <h3>{ind.name}</h3>
              </div>
              <p>{ind.description}</p>
              <span className="card-action">
                Learn more <ArrowUpRight size={15} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 11. FAQ Section */}
      <section className="section faq-background" id="questions">
        <div className="container faq-section">
          <Reveal>
            <span className="eyebrow">A FEW USEFUL ANSWERS</span>
            <h2>Before you book.</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 20 }}>
              Common questions clients ask before starting an engagement in {s.name.toLowerCase()}.
            </p>
            <Link className="text-link" to={consultationUrl}>
              Ask our team
              <span className="link-line" />
            </Link>
          </Reveal>
          <Reveal delay={70}>
            <Accordion
              className="faq-accordion"
              items={s.faq.map(([title, text], index) => ({
                id: `question-${index}`,
                title,
                content: <p>{text}</p>,
              }))}
            />
          </Reveal>
        </div>
      </section>

      {/* Our Leaders Section */}
      <div id="leaders">
        <OurLeaders
          leaders={serviceLeaders[s.slug] || defaultLeaders}
          title="Our leaders"
          eyebrow={`${s.name.toUpperCase()} LEADERSHIP`}
        />
      </div>

      {/* 10. Relevant Insights or Articles */}
      {relevantInsights.length > 0 && (
        <section className="section soft-section" id="insights">
          <div className="container">
            <SectionTitle
              eyebrow="RELEVANT INSIGHTS"
              title={`Perspectives on ${s.shortName.toLowerCase()}.`}
              link={{ to: '/insights', label: 'View all perspectives' }}
            >
              Read our latest research and consulting analysis related to this service area.
            </SectionTitle>

            <div className="insights-grid" style={{ marginTop: 35 }}>
              {relevantInsights.map((article) => (
                <InsightCard key={article.slug} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. Related Services */}
      <section className="section container related-section">
        <Reveal>
          <SectionTitle
            eyebrow="COMPLEMENTARY CAPABILITIES"
            title="Need a different perspective?"
            link={{ to: '/industries', label: 'Explore industries' }}
          />
          <div className="related-services" style={{ marginTop: 30 }}>
            {services
              .filter((item) => item.slug !== s.slug)
              .map((item) => (
                <Link to={servicePath(item)} key={item.slug} className="topic-card">
                  <div className="topic-card-header">
                    <item.icon size={22} className="topic-icon" />
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.description}</p>
                  <span className="card-action">
                    Learn more <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
          </div>
        </Reveal>
      </section>

      {/* 12. Consultation CTA */}
      <CTA service={s.name} />
    </div>
  );
}
