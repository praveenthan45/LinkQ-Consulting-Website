import { Link } from 'react-router-dom';
import { Plus, Check, Target, Network, SlidersHorizontal, Sprout, ArrowRight } from 'lucide-react';
import { Hero21 } from '../components/Hero21';
import { SectionTitle, InsightCard, Photo } from '../components/Common';
import { DepthImage, PerspectiveStack, Reveal } from '../components/Motion';
import { CTA } from '../components/Layout';
import { insights } from '../content/insights';
import { industries } from '../content/industries';

const homeIndustryPhotos = [
  { slug: 'manufacturing-industrial', label: 'Manufacturing', name: 'home-manufacturing', alt: 'Manufacturing team reviewing equipment on the factory floor' },
  { slug: 'fmcg-consumer-goods', label: 'Consumer Goods', name: 'home-fmcg', alt: 'Stocked grocery aisles in a retail store' },
  { slug: 'education', label: 'Education', name: 'collaborative-learning', alt: 'Learners collaborating around a laptop' },
];

export function Home() {
  return (
    <>
      <div className="home-landing">
        <Hero21 />
        <nav className="industry-strip" aria-label="Industries">
          <div className="container">
            {industries.slice(0, 5).map((industry) => (
              <Link to={`/industries/${industry.slug}`} key={industry.slug}>
                <industry.icon size={21} />
                <span>{industry.shortName}</span>
              </Link>
            ))}
            <Link to="/industries" className="strip-view-all">
              <span>View all</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </nav>
      </div>
      <section className="section container introduction">
        <Reveal>
          <span className="eyebrow">LOCAL STRENGTH. GLOBAL POSSIBILITIES.</span>
          <div className="intro-grid">
            <h2>
              A stronger business case.
              <br />A more connected
              <br />
              <em>way forward.</em>
            </h2>
            <div>
              <p className="lead-paragraph">
                A capable local business needs more than an introduction to work globally. It needs a clear offer, credible evidence, and a partner that fits.
              </p>
              <p>
                We study your business, review readiness and certification needs, then help plan suitable industry connections and the work that follows.
              </p>
              <Link to="/about" className="text-link">
                Get to know LinkqGlobal
                <span className="link-line" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="section container connected-section">
        <div className="connected-copy">
          <Reveal>
            <span className="eyebrow">SEE THE CONNECTIONS THAT MATTER</span>
            <h2>
              One business.
              <br />
              A wider market.
              <br />
              <em>The right connection.</em>
            </h2>
            <p>
              We bring your goals, evidence, and operating capacity together before approaching a potential global partner.
            </p>
            <Link to="/collaboration" className="text-link">
              Explore the collaboration journey
              <span className="link-line" />
            </Link>
          </Reveal>
        </div>
        <PerspectiveStack />
      </section>
      <section className="section business-challenges">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="WHERE WE CAN HELP"
              title="Build the case for your next connection."
            >
              Each step prepares your business for a more useful partner conversation.
            </SectionTitle>
          </Reveal>
          <div className="challenge-grid">
            {[
              {
                icon: Target,
                title: 'Business case',
                text: 'Explain your offer, market opportunity, capacity, and the value a partner could bring.',
              },
              {
                icon: Network,
                title: 'Verification readiness',
                text: 'Review business records, product claims, and the evidence a partner or market may require.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Partner fit',
                text: 'Identify the type of industry organization that matches your goals and operating reality.',
              },
              {
                icon: Sprout,
                title: 'Tie-up support',
                text: 'Shape the first discussions, agreed responsibilities, pilot steps, and review points.',
              },
            ].map((item) => (
              <Reveal key={item.title}>
                <item.icon size={28} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="commitment-section">
        <div className="container commitment-grid">
          <DepthImage
            name="advisory"
            alt="Colleagues collaborating in a professional project discussion"
            caption="Good work begins with a shared understanding."
          />
          <Reveal>
            <span className="eyebrow">WORKING WITH LINKQGLOBAL</span>
            <h2>
              Your business readiness
              <br />
              shapes the connection.
            </h2>
            <p>
              We begin with what your team can deliver today. A sound collaboration plan makes the opportunity, evidence, constraints, and next decisions clear to both sides.
            </p>
            <ul className="commitment-list">
              {[
                'A business case grounded in your current capacity',
                'Verification and certification needs identified early',
                'Partner criteria agreed before outreach',
                'Clear responsibilities for a pilot or tie-up',
              ].map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/collaboration" className="text-link">
              How we support collaboration
              <span className="link-line" />
            </Link>
          </Reveal>
        </div>
      </section>
      <section className="section container industry-home">
        <SectionTitle
          eyebrow="INDUSTRY CONTEXT"
          title="Advice shaped by the work you do."
          link={{ to: '/industries', label: 'Explore our industries' }}
        >
          Different operating environments call for different questions.
        </SectionTitle>
        <div className="industry-photogrid">
          {homeIndustryPhotos.map((industry) => (
            <Link to={`/industries/${industry.slug}`} key={industry.slug}>
              <Photo name={industry.name} alt={industry.alt} />
              <div>
                <span>{industry.label}</span>
                <Plus size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="section insights-home">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="IDEAS & PERSPECTIVES"
              title="Thinking worth taking into your next meeting."
              link={{ to: '/insights', label: 'Explore insights' }}
            >
              Original, practical perspectives on technology, operations, and change.
            </SectionTitle>
          </Reveal>
          <div className="insights-grid">
            {insights.slice(0, 3).map((article) => (
              <Reveal key={article.slug}>
                <InsightCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTA />
    </>
  );
}
