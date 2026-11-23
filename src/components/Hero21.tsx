// LinkqGlobal editorial adaptation of the photographic 21st.dev hero composition.
import { Link } from 'react-router-dom';
export function Hero21() {
  return (
    <section className="home-masthead">
      <div className="masthead-photo">
        <img
          src="/images/office-terrace-sunset-banner.png"
          alt="Glass office meeting room and city skyline overlooking a terrace at sunset"
          width="1788"
          height="880"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="masthead-shade" />
      <div className="container masthead-content">
        <h1>
          Clear thinking.
          <br />
          Meaningful <em>progress.</em>
        </h1>
        <p>
          Business challenges rarely stand alone.
          <br className="intro-break" /> We connect strategy, operations, and technology
          <br className="desktop-break" /> to help you move forward with a practical plan.
        </p>
        <div className="actions">
          <Link to="/services" className="button">
            Discover our expertise
          </Link>
          <Link to="/contact" className="text-link">
            Discuss your business
            <span className="link-line" />
          </Link>
        </div>
        <div className="masthead-foot">
          <span>BUSINESS-ALIGNED ADVICE</span>
          <span>PRACTICAL IMPLEMENTATION PLANNING</span>
          <span>CONNECTED INDUSTRY PERSPECTIVES</span>
        </div>
      </div>
      <span className="hero-scroll-cue" aria-hidden="true">
        SCROLL TO EXPLORE
        <span />
      </span>
    </section>
  );
}
