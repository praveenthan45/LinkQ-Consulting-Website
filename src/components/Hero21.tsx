import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';

const messages = [
  {
    first: 'Local ambition.',
    second: 'Global',
    emphasis: 'opportunity.',
    description: 'We help growing businesses prepare for global collaboration. From the business case to verification and partner search, we turn a promising opportunity into a practical plan.',
  },
  {
    first: 'Build your case.',
    second: 'Show your',
    emphasis: 'value.',
    description: 'Turn your track record, capabilities, and growth goals into a business case a potential global partner can evaluate.',
  },
  {
    first: 'Be ready.',
    second: 'Build',
    emphasis: 'trust.',
    description: 'Know what a partner may ask for. We help you prepare the evidence, documents, and next steps for verification.',
  },
  {
    first: 'Find the right fit.',
    second: 'Grow',
    emphasis: 'together.',
    description: 'Identify international partners with complementary capabilities and agree on a practical first step together.',
  },
];

export function Hero21() {
  const [activeMessage, setActiveMessage] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setActiveMessage((current) => (current + 1) % messages.length);
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section className="home-masthead">
      <div className="masthead-world-map" aria-hidden="true" />
      <div className="masthead-shade" aria-hidden="true" />
      <div className="container masthead-content">
        <h1 className="masthead-message-stack">
          {messages.map((message, index) => (
            <span key={message.first} aria-hidden={index !== activeMessage}>
              {message.first}
              <br />
              {message.second} <em>{message.emphasis}</em>
            </span>
          ))}
        </h1>
        <p className="masthead-message-stack">
          {messages.map((message, index) => (
            <span key={message.first} aria-hidden={index !== activeMessage}>
              {message.description}
            </span>
          ))}
        </p>
        <div className="actions">
          <Link to="/collaboration" className="button">
            How collaboration works
          </Link>
          <Link to="/contact" className="text-link">
            Discuss your business
            <span className="link-line" />
          </Link>
        </div>
        <div className="masthead-foot">
          <span>BUSINESS CASE STUDY</span>
          <span>VERIFICATION & CERTIFICATION READINESS</span>
          <span>GLOBAL PARTNER ALIGNMENT</span>
        </div>
      </div>
      <span className="hero-scroll-cue" aria-hidden="true">
        SCROLL TO EXPLORE
        <span />
      </span>
    </section>
  );
}
