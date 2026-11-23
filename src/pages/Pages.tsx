import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Compass,
  Target,
  MessagesSquare,
  Search,
  ChartNoAxesCombined,
  Lightbulb,
  ListChecks,
  Handshake,
  RefreshCw,
} from 'lucide-react';
import {
  Breadcrumb,
  PageHero,
  PageBanner,
  SectionTitle,
  Photo,
  ServicesGrid,
  Process,
  InsightCard,
} from '../components/Common';
import { CTA } from '../components/Layout';
import { services, servicePath } from '../content/services';
import { insights } from '../content/insights';
export function About() {
  return (
    <>
      <Breadcrumb label="About us" />
      <PageHero
        eyebrow="MEET LINKQGLOBAL"
        title={
          <>
            A connected perspective.
            <br />A practical purpose.
          </>
        }
        description="Business-focused consulting for a changing world. We help organizations understand their challenges, make informed decisions, and plan their next steps with clarity."
        image="collaboration"
        alt="Bright collaborative business workspace"
        className="about-hero"
      />
      <section className="section soft-section">
        <div className="container two-column">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              See the whole picture.
              <br />
              Focus on what matters.
            </h2>
          </div>
          <div>
            <p>
              LinkqGlobal Consulting brings together advisory capabilities across information
              technology, manufacturing, consumer goods, education, and automation. Our starting
              point is the way your organization works: its priorities, people, processes, and
              systems.
            </p>
            <p>
              We use structured assessments, collaborative discussions, and practical planning to
              connect business challenges with appropriate recommendations. The aim is a clear
              direction that your organization can evaluate and act on.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle eyebrow="OUR PURPOSE" title="Make progress more practical.">
          We believe consulting should help people understand the choices in front of them—and feel
          equipped to take the next step.
        </SectionTitle>
        <div className="values-grid">
          {[
            {
              icon: Target,
              title: 'Business-aligned thinking',
              text: 'Recommendations begin with your objectives, constraints, and operating context. We consider the tradeoffs involved in every decision.',
            },
            {
              icon: MessagesSquare,
              title: 'Clear, open collaboration',
              text: 'A useful engagement makes room for different perspectives. We communicate clearly and work with the people who understand the business.',
            },
            {
              icon: Compass,
              title: 'Direction you can use',
              text: 'We translate assessment findings into priorities, responsibilities, and practical next steps. Deliverables and scope are agreed with you.',
            },
          ].map((v) => (
            <div className="value-card" key={v.title}>
              <v.icon size={28} />
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section soft-section">
        <div className="container two-column">
          <div>
            <span className="eyebrow">HOW WE ENGAGE</span>
            <h2>
              A conversation first.
              <br />A shared plan next.
            </h2>
          </div>
          <div>
            <p>
              Each engagement begins by understanding the business need. We discuss the objectives,
              information available, people involved, and support required before agreeing the
              scope.
            </p>
            <p>
              Our work may include current-state assessment, opportunity identification, roadmap
              development, or implementation support. The combination depends on your organization
              and the decisions you need to make.
            </p>
            <Link className="text-link" to="/approach">
              Explore our approach
              <span className="link-line" />
            </Link>
            <br />
            <Link className="text-link" to="/industries">
              Explore the industries we focus on
              <span className="link-line" />
            </Link>
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
export function Services() {
  return (
    <>
      <Breadcrumb label="Our services" />
      <PageHero
        eyebrow="OUR CONSULTING EXPERTISE"
        image="digital-workplace"
        alt="A shared business workspace with laptops and digital tools"
        title={
          <>
            Specialist expertise.
            <br />
            Connected by your goals.
          </>
        }
        description="From technology decisions to operational improvement, explore consulting capabilities shaped around the needs of your organization."
      />
      <section className="section soft-section">
        <div className="container">
          <ServicesGrid />
        </div>
      </section>
      <section className="section container">
        <SectionTitle
          eyebrow="A CLEAR WAY FORWARD"
          title="The right support starts with understanding."
          link={{ to: '/approach', label: 'How we work' }}
        >
          Every engagement is shaped around your context, with an agreed scope, clear deliverables,
          and practical priorities.
        </SectionTitle>
        <Process />
      </section>
      <CTA />
    </>
  );
}
export { ServiceDetailPage as ServiceDetail } from './ServiceDetail';
export function Industries() {
  return (
    <>
      <Breadcrumb label="Industries" />
      <PageHero
        eyebrow="INDUSTRY PERSPECTIVE"
        image="global-logistics"
        alt="Connected logistics and distribution infrastructure"
        title={
          <>
            Different contexts.
            <br />A deeper understanding.
          </>
        }
        description="Every industry has its own operating realities. We connect consulting capabilities with the business needs, processes, and decisions that shape your sector."
      />
      <div className="container">
        {services.map((s) => (
          <section className="industry-row" id={s.slug} key={s.slug}>
            <Photo name={s.image} alt={s.alt} />
            <div>
              <span className="eyebrow">{s.shortName.toUpperCase()}</span>
              <h2>{s.headline}</h2>
              <p>{s.context}</p>
              <div className="industry-details">
                <strong>Common needs</strong>
                <p>{s.challenges.slice(0, 2).join('. ')}.</p>
                <strong>Typical engagement areas</strong>
                <p>{s.tags.join(' · ')}</p>
              </div>
              <Link className="text-link" to={servicePath(s)}>
                Explore relevant consulting
                <span className="link-line" />
              </Link>
            </div>
          </section>
        ))}
      </div>
      <CTA />
    </>
  );
}
const method = [
  {
    icon: Search,
    title: 'Discovery & business understanding',
    text: 'We begin with conversations about your goals, working environment, stakeholders, and constraints. Together, we define the questions the engagement needs to answer.',
    output: 'A shared understanding of objectives, scope, and responsibilities.',
  },
  {
    icon: ChartNoAxesCombined,
    title: 'Current-state assessment',
    text: 'We examine available information, map relevant processes, and speak with the people involved. Findings distinguish observed evidence from assumptions that need further investigation.',
    output: 'A documented picture of current processes, systems, and constraints.',
  },
  {
    icon: Lightbulb,
    title: 'Opportunity identification',
    text: 'We connect assessment findings with improvement opportunities. We consider feasibility, dependencies, operational impact, and the effort required to make a change.',
    output: 'A set of opportunities with practical evaluation criteria.',
  },
  {
    icon: ListChecks,
    title: 'Recommendations & roadmap',
    text: 'We discuss options and tradeoffs with your team, then define priorities, ownership, and a sensible sequence of work. Recommendations reflect your available capacity and objectives.',
    output: 'An actionable roadmap with clear priorities and decision points.',
  },
  {
    icon: Handshake,
    title: 'Implementation support',
    text: 'Where included in the scope, we work with your team to support agreed changes. This can involve planning, coordination, requirements clarification, and adoption support.',
    output: 'Coordinated support for the agreed implementation activities.',
  },
  {
    icon: RefreshCw,
    title: 'Review & continuous improvement',
    text: 'We review progress against agreed objectives, discuss what the evidence shows, and identify adjustments. Improvement remains a continuing business responsibility.',
    output: 'A review of progress, lessons, and appropriate next steps.',
  },
];
export function Approach() {
  return (
    <>
      <Breadcrumb label="Our approach" />
      <PageHero
        eyebrow="THE WAY WE WORK"
        image="engineering-planning"
        alt="Planning documents and drawings used to structure work"
        title={
          <>
            Good questions.
            <br />
            Clear direction. Shared progress.
          </>
        }
        description="A structured approach to business improvement, shaped around your organization. We combine careful discovery with practical planning and open collaboration."
      />
      <section className="section soft-section">
        <div className="container">
          <Process />
        </div>
      </section>
      <section className="section container methodology">
        {method.map((m) => (
          <div key={m.title} className="method-stage">
            <m.icon size={33} />
            <div>
              <h2>{m.title}</h2>
              <p>{m.text}</p>
              <div className="deliverable">{m.output}</div>
            </div>
          </div>
        ))}
        <p style={{ marginTop: 30 }}>
          Every engagement is different. The stages, deliverables, and level of support are agreed
          according to scope, available information, and client requirements.
        </p>
      </section>
      <CTA />
    </>
  );
}
export function Insights() {
  const [category, setCategory] = useState('Insights');
  const [search, setSearch] = useState('');
  const filtered = insights.filter(
    (a) =>
      (category === 'Insights' || a.category === category) &&
      `${a.title} ${a.summary}`.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <>
      <Breadcrumb label="Insights" />
      <PageHero
        eyebrow="IDEAS & PERSPECTIVES"
        image="business-analytics"
        alt="Business information and analysis used to inform decisions"
        title={
          <>
            Fresh thinking.
            <br />
            Practical perspectives.
          </>
        }
        description="Clear, considered ideas on technology, operations, and organizational change. Written to help you ask better questions and plan your next step."
      />
      <section className="container" style={{ paddingBottom: 90 }}>
        <div className="filter-bar">
          <div className="filter-buttons" aria-label="Filter insights by category">
            {['Insights', 'Technology', 'Manufacturing', 'FMCG', 'Education', 'Automation'].map(
              (c) => (
                <button
                  key={c}
                  className={category === c ? 'active' : ''}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ),
            )}
          </div>
          <label className="search-field">
            <Search size={17} />
            <span className="sr-only">Search insights</span>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search perspectives"
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {filtered.length} insights found
        </p>
        <div className="insights-grid">
          {filtered.map((a) => (
            <InsightCard key={a.slug} article={a} />
          ))}
          {!filtered.length && (
            <div className="empty-state">
              <h2>No matching perspectives</h2>
              <p>Try another search or explore insights.</p>
              <button
                className="button button-outline"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setCategory('Insights');
                  setSearch('');
                }}
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
      <CTA />
    </>
  );
}
export function InsightArticle() {
  const { slug } = useParams();
  const a = insights.find((x) => x.slug === slug);
  if (!a) return <NotFound />;
  return (
    <>
      <Breadcrumb label={a.category} parent={{ to: '/insights', label: 'Insights' }} />
      <PageBanner
        image={a.image}
        alt={`${a.category} business environment`}
        className="article-banner"
      >
        <div className="article-heading">
          <span className="eyebrow">{a.category.toUpperCase()} PERSPECTIVE</span>
          <h1 id="insight-title">{a.title}</h1>
          <p className="article-lead">{a.summary}</p>
          <div className="article-meta">
            <time dateTime={a.date}>23 November 2026</time> · {a.readTime}
          </div>
        </div>
      </PageBanner>
      <article className="container article" aria-labelledby="insight-title">
        {a.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <div className="article-end">
          <p>
            This perspective provides general educational information. Decisions should reflect your
            organization’s context and an appropriate assessment of requirements.
          </p>
          <Link to="/insights" className="text-link">
            Explore more perspectives
            <span className="link-line" />
          </Link>
        </div>
      </article>
      <CTA />
    </>
  );
}
export function NotFound() {
  return (
    <section className="not-found container">
      <Compass size={46} />
      <span className="eyebrow" style={{ justifyContent: 'center' }}>
        A DIFFERENT DIRECTION
      </span>
      <h1>Let’s find your way forward.</h1>
      <p>
        The page you’re looking for isn’t here. Explore our services or head back to a familiar
        starting point.
      </p>
      <div className="actions" style={{ justifyContent: 'center' }}>
        <Link to="/" className="button">
          Back to home
        </Link>
        <Link to="/services" className="text-link">
          Explore our services
        </Link>
      </div>
    </section>
  );
}
