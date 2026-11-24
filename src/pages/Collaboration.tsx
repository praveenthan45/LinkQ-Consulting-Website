import { Link } from 'react-router-dom';
import { ArrowUpRight, ClipboardCheck, FileCheck2, Globe2, Handshake, SearchCheck, Users } from 'lucide-react';
import { Breadcrumb, PageHero, SectionTitle } from '../components/Common';
import { CTA } from '../components/Layout';
import { Reveal } from '../components/Motion';

const stages = [
  {
    id: 'case-study',
    number: '01',
    icon: ClipboardCheck,
    eyebrow: 'BUSINESS CASE STUDY',
    title: 'Understand the business before seeking a partner.',
    description: 'We study your product or service, customers, operating capacity, finances, and growth goals. The result is a concise business case that explains what you offer, where collaboration could help, and what still needs work.',
    actions: ['Review the business model and current market', 'Test the opportunity against capacity and costs', 'Define the type of global partner you need'],
    outcome: 'A partner-ready business case and a clear list of open questions.',
  },
  {
    id: 'verification',
    number: '02',
    icon: SearchCheck,
    eyebrow: 'VERIFICATION & CERTIFICATION',
    title: 'Make the evidence behind your business credible.',
    description: 'We check the documents, processes, product claims, and compliance needs relevant to the proposed market or partner. When a certification is needed, we help prepare the evidence and coordinate the next steps with the appropriate independent body.',
    actions: ['Check records, claims, and process controls', 'Identify relevant standards and evidence gaps', 'Plan independent testing or certification where required'],
    outcome: 'A verification record and a practical certification-readiness plan.',
  },
  {
    id: 'partner-matching',
    number: '03',
    icon: Globe2,
    eyebrow: 'GLOBAL PARTNER ALIGNMENT',
    title: 'Find a collaboration that fits both sides.',
    description: 'We define partner criteria with you, research suitable organizations, and prepare a focused introduction. Potential partners may include manufacturers, distributors, technology firms, investors, or other industry participants, depending on your goal.',
    actions: ['Set commercial and operational fit criteria', 'Research and screen relevant organizations', 'Prepare introductions and discussion materials'],
    outcome: 'A targeted partner shortlist and an agreed outreach plan.',
  },
  {
    id: 'tie-up',
    number: '04',
    icon: Handshake,
    eyebrow: 'TIE-UP & DELIVERY SUPPORT',
    title: 'Turn a promising introduction into workable terms.',
    description: 'We support the discussions that follow an introduction: scope, responsibilities, milestones, information exchange, and a pilot or first transaction. Each party remains responsible for its own commercial and legal decisions.',
    actions: ['Facilitate structured partner conversations', 'Define roles, dependencies, and pilot measures', 'Review progress and resolve delivery gaps'],
    outcome: 'A collaboration plan with owners, checkpoints, and next decisions.',
  },
];

export function Collaboration() {
  return (
    <>
      <Breadcrumb label="Collaboration" />
      <PageHero
        eyebrow="FROM LOCAL BUSINESS TO GLOBAL OPPORTUNITY"
        image="approach-banner"
        alt="Business team reviewing growth priorities around a table"
        title={<>A stronger business case.<br />A wider circle of partners.</>}
        description="We help established small businesses and growing startups prepare for global collaboration: understand the opportunity, verify the evidence, find a suitable industry partner, and plan the tie-up."
      />

      <section className="section soft-section" id="overview">
        <div className="container two-column">
          <Reveal>
            <span className="eyebrow">WHO WE WORK WITH</span>
            <h2>Built for businesses ready to take a considered next step.</h2>
          </Reveal>
          <Reveal delay={70}>
            <p className="lead-paragraph">A local business may have a strong product, capable team, and loyal customers, yet still need the right evidence and relationships to work across borders.</p>
            <p>Our role is to help make that next step practical. We bring business analysis, readiness work, partner research, and collaboration support into one scoped consultation. The route depends on your market, offering, and capacity.</p>
            <Link className="text-link" to="/contact?service=Collaboration%20Consulting">Discuss your collaboration goal <ArrowUpRight size={16} /></Link>
          </Reveal>
        </div>
      </section>

      {stages.map((stage, index) => (
        <section className={`section collaboration-stage-section${index % 2 === 1 ? ' soft-section' : ''}`} id={stage.id} key={stage.id}>
          <div className="container collaboration-stage">
            <Reveal className="collaboration-stage-heading">
              <span className="collaboration-step">{stage.number}</span>
              <span className="eyebrow"><stage.icon size={18} />{stage.eyebrow}</span>
              <h2>{stage.title}</h2>
              <p>{stage.description}</p>
            </Reveal>
            <Reveal className="collaboration-stage-detail" delay={80}>
              <h3>What we work through</h3>
              <ul>
                {stage.actions.map((action) => <li key={action}><FileCheck2 size={18} aria-hidden="true" />{action}</li>)}
              </ul>
              <div className="collaboration-outcome"><strong>Working output</strong><p>{stage.outcome}</p></div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section container" id="consultation">
        <SectionTitle eyebrow="START WITH A CONSULTATION" title="Tell us where you want to go.">
          We begin with your current business, the market or partner you hope to reach, and the evidence already available. We then agree which parts of the collaboration journey need support.
        </SectionTitle>
        <div className="values-grid collaboration-consultation-grid">
          <div className="value-card"><Users size={27} /><h3>Your business</h3><p>Share what you sell, who you serve, and the capacity you can commit.</p></div>
          <div className="value-card"><SearchCheck size={27} /><h3>Your readiness</h3><p>Identify the records, standards, and decisions needed before outreach.</p></div>
          <div className="value-card"><Handshake size={27} /><h3>Your next connection</h3><p>Define the partner type and collaboration outcome that would be useful.</p></div>
        </div>
      </section>
      <CTA service="Collaboration Consulting" title="Ready to explore a global collaboration?" subtitle="Tell us about your business and the partnership you have in mind. We’ll discuss a practical starting scope." buttonLabel="Book a collaboration consultation" />
    </>
  );
}
