import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { Breadcrumb, PageBanner, Photo, SectionTitle } from '../components/Common';
import { DepthImage, Reveal } from '../components/Motion';
import { OurExperts } from '../components/OurExperts';
import {
  collaborationBenefits,
  collaborationCta,
  collaborationHero,
  collaborationIntro,
  collaborationSteps,
  supportedOrganizations,
} from '../content/collaboration';
import { services, servicePath } from '../content/services';

export function Collaboration() {
  return (
    <div className="collaboration-page">
      {/* 1. Hero Section */}
      <PageBanner
        edgeBreadcrumb={<Breadcrumb label="Collaboration" />}
        image={collaborationHero.image}
        alt={collaborationHero.imageAlt}
        className="page-hero collaboration-hero"
        label="Global Collaboration Consulting"
      >
        <div className="page-hero-copy">
          <span className="eyebrow">
            <span className="small-line" />
            {collaborationHero.eyebrow}
          </span>
          <h1>{collaborationHero.headline}</h1>
          <p>{collaborationHero.description}</p>
          <div className="actions collaboration-hero-actions">
            <Link className="button" to={collaborationHero.primaryCta.to}>
              {collaborationHero.primaryCta.label}
            </Link>
          </div>
        </div>
      </PageBanner>

      {/* 2. Introduction Section */}
      <section className="section soft-section collaboration-intro-section" id="overview">
        <div className="container two-column">
          <Reveal>
            <span className="eyebrow">{collaborationIntro.eyebrow}</span>
            <h2>{collaborationIntro.heading}</h2>
          </Reveal>
          <Reveal delay={70}>
            {collaborationIntro.paragraphs.map((text, idx) => (
              <p key={idx} className={idx === 0 ? 'lead-paragraph' : ''}>
                {text}
              </p>
            ))}
            <div className="actions collaboration-intro-links">
              <Link
                className="text-link"
                to="/contact?service=Collaboration%20Consulting&subject=Start%20a%20Global%20Collaboration"
              >
                Start your collaboration discussion <ArrowUpRight size={15} />
              </Link>
              <Link className="text-link" to={collaborationIntro.caseStudyLink.to}>
                {collaborationIntro.caseStudyLink.label} <ArrowUpRight size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3. Collaboration Journey */}
      <section className="collaboration-journey-wrapper" id="journey" aria-label="Global collaboration journey">
        <div className="section container collaboration-journey-header">
          <Reveal>
            <SectionTitle
              eyebrow="GLOBAL COLLABORATION JOURNEY"
              title="From partner discovery to coordinated execution."
              link={{
                to: '/contact?service=Collaboration%20Consulting&subject=Start%20a%20Global%20Collaboration',
                label: 'Start a collaboration',
              }}
            >
              Each stage focuses on the practical preparation, facilitation, and operational coordination needed to build durable international partnerships.
            </SectionTitle>
          </Reveal>
        </div>

        {collaborationSteps.map((step, index) => {
          const isReversed = index % 2 === 1;
          return (
            <section
              className={`section collaboration-step-block${isReversed ? ' soft-section' : ''}`}
              id={step.id}
              key={step.id}
            >
              <div
                className={`container collaboration-step-layout${isReversed ? ' is-reversed' : ''}`}
              >
                <div className="collaboration-step-visual">
                  {step.id === 'verification-certification' ? (
                    <figure className="collaboration-verification-photo">
                      <Photo name={step.image} alt={step.imageAlt} />
                      <figcaption>{step.imageCaption}</figcaption>
                    </figure>
                  ) : (
                    <DepthImage
                      name={step.image}
                      alt={step.imageAlt}
                      caption={step.imageCaption}
                      reverse={isReversed}
                    />
                  )}
                  <div className="collaboration-outcome collaboration-visual-outcome">
                    <strong>Client value &amp; outcome</strong>
                    <p>{step.clientValue}</p>
                    {step.accuracyNote && (
                      <p className="collaboration-scope-note">{step.accuracyNote}</p>
                    )}
                  </div>
                </div>

                <Reveal className="collaboration-step-content" delay={60}>
                  <span className="eyebrow">
                    <step.icon size={17} aria-hidden="true" />
                    {step.eyebrow}
                  </span>
                  <h3>{step.title}</h3>
                  <p className="lead-paragraph collaboration-step-desc">{step.description}</p>

                  <div className="collaboration-stage-detail collaboration-step-panel">
                    <h4>What we do</h4>
                    <ul>
                      {step.whatWeDo.map((item) => (
                        <li key={item}>
                          <Check size={17} aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="collaboration-activities-block">
                      <h4>Key activities</h4>
                      <div className="collaboration-activity-tags">
                        {step.keyActivities.map((activity) => (
                          <span key={activity}>{activity}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="collaboration-step-actions">
                    <Link className="button" to={step.ctaTo}>
                      {step.ctaLabel}
                    </Link>
                    <Link className="text-link" to={step.relatedLink.to}>
                      {step.relatedLink.label} <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </Reveal>
              </div>
            </section>
          );
        })}
      </section>

      {/* 4. Collaboration Benefits Section */}
      <section className="section collaboration-band-section" id="benefits">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="WHY STRUCTURED COLLABORATION"
              title="Building Meaningful Business Connections"
              link={{ to: '/insights/business-case-study-global-collaboration', label: 'Business case framework' }}
            >
              Our advisory support helps local businesses approach international opportunities with thorough preparation, clearer mutual understanding, and disciplined follow-through.
            </SectionTitle>
          </Reveal>

          <div className="values-grid collaboration-benefits-grid">
            {collaborationBenefits.map((benefit, index) => (
              <Reveal className="value-card" key={benefit.title} delay={(index % 3) * 60}>
                <benefit.icon size={26} aria-hidden="true" />
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Who We Support */}
      <section className="section soft-section collaboration-band-section" id="who-we-support">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="WHO WE SUPPORT"
              title="Built for businesses exploring cross-border growth."
              link={{ to: '/industries', label: 'Explore industry practices' }}
            >
              We assist ambitious local producers, distributors, and service organizations preparing to connect with credible international counterparties.
            </SectionTitle>
          </Reveal>

          <div className="related-services collaboration-support-grid">
            {supportedOrganizations.map((profile) => (
              <Link to={profile.to} key={profile.title} className="topic-card">
                <div className="topic-card-header">
                  <profile.icon size={22} className="topic-icon" aria-hidden="true" />
                  <h3>{profile.title}</h3>
                </div>
                <p>{profile.description}</p>
                <span className="card-action">
                  {profile.focusLabel} <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Related Services */}
      <section className="section collaboration-band-section" id="related-services">
        <div className="container">
          <Reveal>
            <SectionTitle
              eyebrow="INTEGRATED CONSULTING PORTFOLIO"
              title="Specialized capabilities that reinforce your partnership readiness."
              link={{ to: '/industries', label: 'View sector focus' }}
            >
              Global collaborations depend on strong internal operations, sound strategy, reliable technology, and disciplined supply chains. Explore how our core consulting practices connect with your journey.
            </SectionTitle>

            <div className="related-services related-services--four" style={{ marginTop: 30 }}>
              {services.map((s) => (
                <Link to={servicePath(s)} key={s.slug} className="topic-card">
                  <div className="topic-card-header">
                    <s.icon size={22} className="topic-icon" aria-hidden="true" />
                    <h3>{s.name}</h3>
                  </div>
                  <p>{s.description}</p>
                  <span className="card-action">
                    Learn more <ArrowUpRight size={15} />
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <OurExperts area="collaboration" />

      {/* 7. Collaboration Inquiry CTA */}
      <section className="cta-section" id="inquiry">
        <div className="container cta-inner collaboration-cta-inner">
          <Reveal className="cta-copy">
            <span className="eyebrow">GLOBAL COLLABORATION INQUIRY</span>
            <h2>{collaborationCta.heading}</h2>
            <p>{collaborationCta.description}</p>
          </Reveal>
          <Reveal className="cta-action cta-actions" delay={100}>
            <Link to={collaborationCta.primaryButton.to} className="button button-white">
              {collaborationCta.primaryButton.label}
            </Link>
          </Reveal>
          <div className="cta-art" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
    </div>
  );
}
