import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Target, Network, SlidersHorizontal, Sprout } from 'lucide-react';
import { Hero21 } from '../components/Hero21';
import { SectionTitle, Process, InsightCard, Photo } from '../components/Common';
import { DepthImage, PerspectiveStack, Reveal } from '../components/Motion';
import { CTA } from '../components/Layout';
import { insights } from '../content/insights';
import { services, servicePath } from '../content/services';

export function Home() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="home-landing">
        <Hero21 />
        <nav className="industry-strip" aria-label="Consulting expertise">
          <div className="container">
            {services.map((s) => (
              <Link to={servicePath(s)} key={s.slug}>
                <s.icon size={21} />
                <span>{s.name.replace(' Consulting', '')}</span>
              </Link>
            ))}
          </div>
        </nav>
      </div>
      <section className="section container introduction">
        <Reveal>
          <span className="eyebrow">BUSINESS IS CONNECTED. YOUR ADVICE SHOULD BE, TOO.</span>
          <div className="intro-grid">
            <h2>
              A wider perspective.
              <br />A more practical
              <br />
              <em>way forward.</em>
            </h2>
            <div>
              <p className="lead-paragraph">
                Technology, operations, and people shape the same business. We look at them
                together.
              </p>
              <p>
                We assess what is holding work back, clarify your options, and build a practical
                improvement plan around your priorities.
              </p>
              <Link to="/about" className="text-link">
                Get to know LinkqGlobal
                <span className="link-line" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
      <section className="section expertise-section">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="OUR CONSULTING SERVICES"
              title={
                <>
                  Expertise for the
                  <br />
                  decisions ahead.
                </>
              }
              link={{ to: '/services', label: 'Explore services' }}
            >
              Five areas of focus. One commitment to understanding how your business works.
            </SectionTitle>
          </Reveal>
          <div className="expertise-explorer">
            <div className="expertise-links">
              {services.map((s, index) => (
                <Link
                  key={s.slug}
                  to={servicePath(s)}
                  className={`expertise-row ${active === index ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <s.icon size={25} />
                  <div>
                    <h3>{s.name.replace(' Consulting', '')}</h3>
                    <p>{s.description}</p>
                  </div>
                  <Plus size={20} />
                </Link>
              ))}
            </div>
            <div className="expertise-preview">
              <DepthImage name={services[active].image} alt={services[active].alt} />
              <div className="expertise-preview-caption">
                <span className="eyebrow">A FOCUSED BUSINESS PERSPECTIVE</span>
                <h3>{services[active].headline}</h3>
                <span>{services[active].tags.join(' / ')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section container connected-section">
        <div className="connected-copy">
          <Reveal>
            <span className="eyebrow">SEE THE CONNECTIONS THAT MATTER</span>
            <h2>
              One organization.
              <br />
              Many moving parts.
              <br />
              <em>A shared direction.</em>
            </h2>
            <p>
              We connect your processes, systems, and people to recommend changes that work
              together.
            </p>
            <Link to="/approach" className="text-link">
              How our approach works
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
              title="Start with the challenge you need to solve."
            >
              A clear definition of the problem is the foundation for a useful engagement.
            </SectionTitle>
          </Reveal>
          <div className="challenge-grid">
            {[
              {
                icon: Target,
                title: 'Operational improvement',
                text: 'Understand bottlenecks, recurring exceptions, and the handoffs that slow work down.',
              },
              {
                icon: Network,
                title: 'Technology decisions',
                text: 'Assess systems and investments against your operational priorities and available capacity.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Process visibility',
                text: 'Define the information, ownership, and review routines that support better decisions.',
              },
              {
                icon: Sprout,
                title: 'Organizational change',
                text: 'Plan manageable changes with clear responsibilities and support for the people involved.',
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
      <section className="section container approach-home">
        <Reveal>
          <SectionTitle
            eyebrow="FROM UNDERSTANDING TO ACTION"
            title="A considered process. A practical plan."
            link={{ to: '/approach', label: 'Explore our methodology' }}
          >
            Every engagement starts with listening and develops around the decisions you need to
            make.
          </SectionTitle>
          <Process />
        </Reveal>
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
              Your business context
              <br />
              sets the direction.
            </h2>
            <p>
              We take time to understand what matters to your organization. Recommendations should
              make their reasoning clear, account for real constraints, and describe an achievable
              next step.
            </p>
            <ul className="commitment-list">
              {[
                'Business priorities before technology choices',
                'Cross-functional thinking and open discussion',
                'Clearly defined scope and responsibilities',
                'Practical plans with meaningful review points',
              ].map((item) => (
                <li key={item}>
                  <Check size={17} />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/about" className="text-link">
              Our consulting philosophy
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
          {services.slice(1, 4).map((s) => (
            <Link to={`/industries#${s.slug}`} key={s.slug}>
              <Photo name={s.image} alt={s.alt} />
              <div>
                <span>{s.shortName}</span>
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
