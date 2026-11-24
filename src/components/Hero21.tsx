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
          Local ambition.
          <br />
          Global <em>opportunity.</em>
        </h1>
        <p>
          We help growing businesses prepare for global collaboration.
          <br className="intro-break" /> From the business case to verification and partner search,
          <br className="desktop-break" /> we turn a promising opportunity into a practical plan.
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
