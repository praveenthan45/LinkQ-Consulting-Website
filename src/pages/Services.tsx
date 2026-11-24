import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { services, servicePath } from '../content/services';
import { industries } from '../content/industries';
import { insights } from '../content/insights';
import {
  Breadcrumb,
  PageHero,
  SectionTitle,
  ServicesGrid,
  Process,
  InsightCard,
} from '../components/Common';
import { CTA } from '../components/Layout';
import { OurLeaders } from '../components/OurLeaders';
import { defaultLeaders } from '../content/serviceLeaders';

export function Services() {
  const featuredInsights = insights.slice(0, 3);

  return (
    <>
      <Breadcrumb label="Our services" />
      <PageHero
        eyebrow="OUR CONSULTING EXPERTISE"
        image="services-banner"
        alt="Consulting team reviewing digital strategy and implementation roadmap"
        title={
          <>
            Specialist expertise.
            <br />
            Connected by your goals.
          </>
        }
        description="From technology decisions and automation to supply chain optimization and corporate strategy, explore eight core consulting disciplines designed to deliver measurable operational outcomes."
      />

      {/* Introduction & 8 Core Service Cards */}
      <section className="section soft-section" id="service-portfolio">
        <div className="container">
          <SectionTitle
            eyebrow="CORE PRACTICE AREAS"
            title="Eight disciplines of practical advisory."
          >
            We connect functional specialization with cross-domain business understanding. Each
            practice is led by experienced consulting practitioners who combine strategic insight
            with hands-on delivery.
          </SectionTitle>

          <div style={{ marginTop: 40 }}>
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Capabilities & Client Benefits */}
      <section className="section container">
        <SectionTitle
          eyebrow="CLIENT VALUE PROPOSITION"
          title="What sets our consulting engagements apart."
          link={{ to: '/collaboration', label: 'How collaboration works' }}
        >
          We focus on evidence, practical constraints, and working solutions rather than generic
          presentations.
        </SectionTitle>

        <div className="values-grid">
          <div className="value-card">
            <CheckCircle2 size={28} color="var(--accent)" />
            <h3>Grounded in Reality</h3>
            <p>
              Recommendations reflect your actual operating capacity, legacy constraints, and team
              readiness—ensuring plans are practical to adopt and sustain.
            </p>
          </div>
          <div className="value-card">
            <Zap size={28} color="var(--accent)" />
            <h3>Vendor-Independent</h3>
            <p>
              We evaluate software platforms, cloud infrastructure, and hardware technologies
              objectively without reseller biases or contractual commissions.
            </p>
          </div>
          <div className="value-card">
            <ShieldCheck size={28} color="var(--accent)" />
            <h3>Clear Decision Milestones</h3>
            <p>
              Engagements are structured around measurable deliverables and decision gates, giving
              leadership total transparency and budget control.
            </p>
          </div>
        </div>
      </section>

      {/* Related Industries Mapping */}
      <section className="section soft-section" id="related-industries">
        <div className="container">
          <SectionTitle
            eyebrow="SECTOR ALIGNMENT"
            title="Delivering value across diverse industries."
            link={{ to: '/industries', label: 'Explore industry practices' }}
          >
            Our consulting solutions are customized for the regulatory, operational, and commercial
            contexts of six core business sectors.
          </SectionTitle>

          <div className="related-services" style={{ marginTop: 30 }}>
            {industries.map((ind) => (
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
        </div>
      </section>

      {/* Our Leaders Section */}
      <OurLeaders
        leaders={defaultLeaders}
        title="Our leaders"
        eyebrow="EXPERIENCED CONSULTING LEADERS"
      />

      {/* Relevant Insights */}
      <section className="section container">
        <SectionTitle
          eyebrow="STRATEGIC PERSPECTIVES"
          title="Insights from our consulting practice."
          link={{ to: '/insights', label: 'View all perspectives' }}
        >
          Read actionable viewpoints on technology adoption, operational efficiency, and business
          modernization.
        </SectionTitle>

        <div className="insights-grid" style={{ marginTop: 35 }}>
          {featuredInsights.map((article) => (
            <InsightCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* Engagement Process */}
      <section className="section soft-section">
        <div className="container">
          <SectionTitle
            eyebrow="A CLEAR WAY FORWARD"
            title="The right support starts with understanding."
            link={{ to: '/collaboration', label: 'Collaboration journey' }}
          >
            Every engagement is shaped around your context, with an agreed scope, clear
            deliverables, and practical priorities.
          </SectionTitle>
          <Process />
        </div>
      </section>

      <CTA />
    </>
  );
}
