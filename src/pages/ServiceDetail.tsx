import { Link, useParams } from 'react-router-dom';
import { Check, ClipboardList, FileCheck2, Layers3 } from 'lucide-react';
import { services, servicePath } from '../content/services';
import { serviceStories } from '../content/serviceStories';
import { Breadcrumb, PageBanner, SectionTitle, CheckList } from '../components/Common';
import { DepthImage, Reveal } from '../components/Motion';
import { CTA } from '../components/Layout';
import { Accordion } from '../components/Accordion21';
import { NotFound } from './Pages';

export function ServiceDetailPage() {
  const { slug } = useParams();
  const s = services.find((item) => item.slug === slug);
  if (!s || !serviceStories[s.slug]) return <NotFound />;
  const story = serviceStories[s.slug];
  const consultationUrl = `/contact?service=${encodeURIComponent(s.name)}`;
  return (
    <div className="service-detail compact-service" key={s.slug}>
      <Breadcrumb label={s.name} parent={{ to: '/services', label: 'Services' }} />
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
          <Link className="button" to={consultationUrl}>
            Book a consultation
          </Link>
          <div className="masthead-tags">
            {s.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </PageBanner>
      <nav className="service-section-nav" aria-label="On this service page">
        <div className="container">
          <span>Explore this service</span>
          {[
            ['overview', 'How we help'],
            ['expertise', 'Capabilities'],
            ['engagement', 'What you receive'],
            ['questions', 'FAQs'],
          ].map(([id, label]) => (
            <Link key={id} to={`#${id}`}>
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <section className="section container service-introduction" id="overview">
        <Reveal className="service-lead-grid">
          <div>
            <span className="eyebrow">WHEN TO TALK TO US</span>
            <h2>{story.positioning}</h2>
            <p>{story.lead}</p>
          </div>
          <CheckList items={s.challenges.slice(0, 3)} />
        </Reveal>
      </section>
      <div className="service-story-wrap">
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
      <section className="section container service-expertise" id="expertise">
        <Reveal>
          <SectionTitle eyebrow="OUR CAPABILITIES" title="Explore the support you need.">
            Open a topic to see what an engagement can cover.
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
      <section className="section container engagement-section" id="engagement">
        <Reveal className="engagement-intro">
          <span className="eyebrow">WHAT YOU RECEIVE</span>
          <h2>
            A clear direction.
            <br />
            <em>Practical next steps.</em>
          </h2>
          <p>Scope, deliverables, and implementation support are agreed before work begins.</p>
          <Link className="button" to={consultationUrl}>
            Discuss this service
          </Link>
          <Link className="text-link" to="/approach">
            How we work
            <span className="link-line" />
          </Link>
        </Reveal>
        <div className="deliverables-list">
          {story.deliverables.map((deliverable, index) => {
            const Icon = [ClipboardList, FileCheck2, Layers3][index];
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
      <section className="section faq-background" id="questions">
        <div className="container faq-section">
          <Reveal>
            <span className="eyebrow">A FEW USEFUL ANSWERS</span>
            <h2>Before you book.</h2>
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
      <section className="section container related-section">
        <Reveal>
          <SectionTitle eyebrow="OTHER AREAS OF EXPERTISE" title="Need a different perspective?" />
          <div className="related-services">
            {services
              .filter((item) => item.slug !== s.slug)
              .map((item) => (
                <Link to={servicePath(item)} key={item.slug}>
                  <item.icon size={24} />
                  <h3>{item.name}</h3>
                </Link>
              ))}
          </div>
        </Reveal>
      </section>
      <CTA service={s.name} />
    </div>
  );
}
