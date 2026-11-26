import { Link } from 'react-router-dom';
import { Compass, Target, MessagesSquare } from 'lucide-react';
import { Breadcrumb, PageHero, SectionTitle } from '../components/Common';
import { CTA } from '../components/Layout';

// Export dedicated pages
export { Services } from './Services';
export { ServiceDetailPage as ServiceDetail } from './ServiceDetail';
export { Industries } from './Industries';
export { IndustryDetailPage as IndustryDetail } from './IndustryDetail';
export { Collaboration } from './Collaboration';
export { Insights } from './Insights';
export { InsightArticle } from './InsightArticle';

export function About() {
  return (
    <>
      <PageHero
        edgeBreadcrumb={<Breadcrumb label="About us" />}
        eyebrow="MEET LINKQGLOBAL"
        title={
          <>
            Local capability.
            <br />Global possibility.
          </>
        }
        description="LinkqGlobal helps small businesses and growing startups prepare for meaningful collaboration with global industry partners."
        image="collaboration"
        alt="Bright collaborative business workspace"
        className="about-hero"
      />
      <section className="section soft-section">
        <div className="container two-column">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>
              Know your business.
              <br />
              Find the right connection.
            </h2>
          </div>
          <div>
            <p>
              LinkqGlobal Consulting works between ambitious local businesses and potential global industry collaborators. We start with your offering, customers, capacity, records, and the result you want from a partnership.
            </p>
            <p>
              We develop a business case, identify verification and certification requirements, research partner fit, and support the conversations that could lead to a practical tie-up.
            </p>
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionTitle eyebrow="OUR PURPOSE" title="Help local businesses collaborate beyond their market.">
          We connect preparation with opportunity, so founders and owners can approach wider industry conversations with a credible case and a clear plan.
        </SectionTitle>
        <div className="values-grid">
          {[
            {
              icon: Target,
              title: 'A clear business case',
              text: 'We examine the offer, market, economics, and capacity before recommending a partner route.',
            },
            {
              icon: MessagesSquare,
              title: 'Credible readiness',
              text: 'We review evidence and identify where independent verification or certification may be needed.',
            },
            {
              icon: Compass,
              title: 'A workable tie-up',
              text: 'We help both sides define the scope, responsibilities, and early milestones of a collaboration.',
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
              Your business first.
              <br />The partner search next.
            </h2>
          </div>
          <div>
            <p>
              Each engagement begins with a consultation about your business, the market you hope to reach, and the kind of partner you need. We agree what to study and which readiness questions need answers before outreach.
            </p>
            <p>
              The work can include a business case study, evidence review, certification readiness, partner research, introductions, or tie-up planning. The combination depends on your goals and the proposed collaboration.
            </p>
            <Link className="text-link" to="/collaboration">
              Explore collaboration
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

export function NotFound() {
  return (
    <section className="not-found container">
      <Compass size={46} />
      <span className="eyebrow" style={{ justifyContent: 'center' }}>
        A DIFFERENT DIRECTION
      </span>
      <h1>Let’s find your way forward.</h1>
      <p>
        The page you’re looking for isn’t here. Explore our industries or head back to a familiar
        starting point.
      </p>
      <div className="actions" style={{ justifyContent: 'center' }}>
        <Link to="/" className="button">
          Back to home
        </Link>
        <Link to="/industries" className="text-link">
          Explore industries
        </Link>
      </div>
    </section>
  );
}
