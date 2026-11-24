import { Linkedin } from 'lucide-react';
import { ServiceLeader } from '../content/serviceLeaders';
import { Reveal } from './Motion';

export function OurLeaders({
  leaders,
  title = 'Our leaders',
  eyebrow = 'PRACTICE LEADERSHIP',
}: {
  leaders: ServiceLeader[];
  title?: string;
  eyebrow?: string;
}) {
  return (
    <section className="leaders-section" id="leaders" aria-label="Practice leaders">
      <div className="container leaders-grid-layout">
        <Reveal className="leaders-heading">
          <span className="eyebrow eyebrow-light">{eyebrow}</span>
          <h2>{title}</h2>
        </Reveal>
        <div className="leaders-cards">
          {leaders.map((leader, index) => (
            <Reveal key={leader.name} delay={index * 50} className="leader-card">
              <div className="leader-image-wrap">
                <img
                  src={leader.image}
                  alt={leader.name}
                  width="240"
                  height="280"
                  loading="lazy"
                  className="leader-image"
                />
              </div>
              <div className="leader-info">
                <h3>{leader.name}</h3>
                <p>{leader.role}</p>
                <a
                  href={leader.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="leader-linkedin"
                  aria-label={`${leader.name} on LinkedIn`}
                >
                  <Linkedin size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
