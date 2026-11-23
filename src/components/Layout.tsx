import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { services, servicePath } from '../content/services';
import { SEOManager } from './SEO';
import { Reveal, ScrollProgress } from './Motion';
export function Logo({ light = false, adaptive = false }: { light?: boolean; adaptive?: boolean }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? 'logo-light' : ''}`}
      aria-label="LinkqGlobal Consulting home"
    >
      <span className="brand-lockup" aria-hidden="true">
        <img
          className={`brand-mark${adaptive ? ' brand-mark-default' : ''}`}
          src={`/brand/linkqglobal-wordmark${light ? '-light' : ''}.svg`}
          alt=""
          width="780"
          height="245"
        />
        {adaptive && (
          <img
            className="brand-mark brand-mark-light"
            src="/brand/linkqglobal-wordmark-light.svg"
            alt=""
            width="780"
            height="245"
          />
        )}
        <img
          className="brand-o"
          src="/brand/globe-emblem.png"
          alt=""
          width="1350"
          height="1200"
          fetchPriority={light ? 'auto' : 'high'}
        />
      </span>
    </Link>
  );
}
const navigation = [
  ['/', 'Home'],
  ['/about', 'About us'],
  ['/industries', 'Industries'],
  ['/approach', 'Our approach'],
  ['/insights', 'Insights'],
  ['/contact', 'Contact'],
] as const;
const desktopHoverQuery = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';
export function Layout() {
  const [mobile, setMobile] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [compactHeader, setCompactHeader] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [focusedNav, setFocusedNav] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const selectedService = services.find((service) => location.pathname === servicePath(service));
  const consultationUrl = selectedService
    ? `/contact?service=${encodeURIComponent(selectedService.name)}`
    : '/contact';
  const serviceButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const servicesPanel = useRef<HTMLDivElement>(null);
  const dropdownCloseTimer = useRef<number | undefined>(undefined);
  const activeNav = location.pathname.startsWith('/services')
    ? '/services'
    : navigation.find(([to]) =>
        to === '/'
          ? location.pathname === '/'
          : location.pathname === to || location.pathname.startsWith(`${to}/`),
      )?.[0];
  const underlineTarget = hoveredNav ?? (dropdown ? '/services' : (focusedNav ?? activeNav));
  function cancelDropdownClose() {
    window.clearTimeout(dropdownCloseTimer.current);
  }
  function underline(to: string) {
    return underlineTarget === to ? (
      <motion.span
        className="nav-underline"
        layoutId="nav-underline"
        aria-hidden="true"
        initial={false}
        transition={{ duration: reducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
      />
    ) : null;
  }
  useEffect(() => {
    cancelDropdownClose();
    setMobile(false);
    setDropdown(false);
    setCompactHeader(false);
    setHoveredNav(null);
    setFocusedNav(null);
    if (location.hash) {
      requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(),
      );
    } else window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);
  useEffect(() => () => window.clearTimeout(dropdownCloseTimer.current), []);
  useEffect(() => {
    function updateHeader() {
      const scrollTop = window.scrollY;
      // Separate thresholds keep the header steady near the transition point.
      setCompactHeader((compact) => scrollTop > (compact ? 24 : 96));
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);
  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (dropdown) {
          cancelDropdownClose();
          setDropdown(false);
          serviceButton.current?.focus();
        } else if (mobile) {
          setMobile(false);
          menuButton.current?.focus();
        }
      }
    }
    function outside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setDropdown(false);
    }
    document.addEventListener('keydown', close);
    document.addEventListener('click', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('click', outside);
    };
  }, [dropdown, mobile]);
  return (
    <>
      <SEOManager />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        className={`site-header${location.pathname === '/' ? ' is-home' : ''}${compactHeader ? ' is-scrolled' : ''}`}
      >
        <div className="header-inner container">
          <Logo adaptive />
          <button
            ref={menuButton}
            className="mobile-toggle icon-button"
            aria-label={mobile ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobile}
            aria-controls="main-navigation"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
          <nav
            ref={navRef}
            id="main-navigation"
            aria-label="Main navigation"
            className={mobile ? 'main-navigation is-open' : 'main-navigation'}
          >
            <LayoutGroup id="primary-navigation">
              <div
                className="nav-links"
                onPointerOver={(event) => {
                  if (
                    event.pointerType !== 'mouse' ||
                    !window.matchMedia(desktopHoverQuery).matches
                  )
                    return;
                  const item = (event.target as HTMLElement).closest<HTMLElement>(
                    '[data-nav-target]',
                  );
                  if (item) setHoveredNav(item.dataset.navTarget ?? null);
                }}
                onPointerLeave={() => setHoveredNav(null)}
                onFocusCapture={(event) => {
                  setHoveredNav(null);
                  const item = (event.target as HTMLElement).closest<HTMLElement>(
                    '[data-nav-target]',
                  );
                  if (item) setFocusedNav(item.dataset.navTarget ?? null);
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setFocusedNav(null);
                }}
              >
                {location.pathname !== '/' && (
                  <NavLink to="/" end data-nav-target="/">
                    Home
                    {underline('/')}
                  </NavLink>
                )}
                <NavLink to="/about" data-nav-target="/about">
                  About us{underline('/about')}
                </NavLink>
                <div
                  className="services-nav"
                  data-nav-target="/services"
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType !== 'mouse' ||
                      !window.matchMedia(desktopHoverQuery).matches
                    )
                      return;
                    cancelDropdownClose();
                    setDropdown(true);
                  }}
                  onPointerLeave={(event) => {
                    if (
                      event.pointerType !== 'mouse' ||
                      !window.matchMedia(desktopHoverQuery).matches
                    )
                      return;
                    cancelDropdownClose();
                    dropdownCloseTimer.current = window.setTimeout(() => {
                      if (!servicesPanel.current?.contains(document.activeElement))
                        setDropdown(false);
                    }, 220);
                  }}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      cancelDropdownClose();
                      setDropdown(false);
                    }
                  }}
                >
                  <button
                    ref={serviceButton}
                    className={`nav-service ${location.pathname.startsWith('/services') ? 'active' : ''}`}
                    aria-expanded={dropdown}
                    aria-controls="services-dropdown"
                    onClick={(event) => {
                      cancelDropdownClose();
                      setDropdown((open) =>
                        event.detail > 0 && window.matchMedia(desktopHoverQuery).matches
                          ? true
                          : !open,
                      );
                    }}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        cancelDropdownClose();
                        setDropdown(true);
                        requestAnimationFrame(() =>
                          servicesPanel.current?.querySelector<HTMLAnchorElement>('a')?.focus(),
                        );
                      }
                    }}
                  >
                    Services <ChevronDown size={13} className={dropdown ? 'rotated' : ''} />
                    {underline('/services')}
                  </button>
                  {dropdown && (
                    <div ref={servicesPanel} id="services-dropdown" className="mega-menu">
                      <div className="mega-links">
                        {services.map((s) => (
                          <Link key={s.slug} to={servicePath(s)}>
                            <s.icon size={21} />
                            <span>
                              <strong>{s.name}</strong>
                              <small>{s.description}</small>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {navigation.slice(2).map(([to, label]) => (
                  <NavLink key={to} to={to} data-nav-target={to}>
                    {label}
                    {underline(to)}
                  </NavLink>
                ))}
              </div>
            </LayoutGroup>
            <Link to={consultationUrl} className="button nav-cta">
              Book a consultation
            </Link>
          </nav>
        </div>
        <ScrollProgress />
      </header>
      <main id="main" tabIndex={-1}>
        <div className="page-content" key={location.pathname}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
export function CTA({ service }: { service?: string }) {
  const to = service ? `/contact?service=${encodeURIComponent(service)}` : '/contact';
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <Reveal className="cta-copy">
          <span className="eyebrow">LET’S PLAN THE NEXT STEP</span>
          <h2>Ready to move forward?</h2>
          <p>Share your priorities. We’ll review your enquiry and discuss the support you need.</p>
        </Reveal>
        <Reveal className="cta-action" delay={100}>
          <Link to={to} className="button button-white">
            Book a consultation
          </Link>
        </Reveal>
        <div className="cta-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <Reveal className="footer-brand">
          <Logo light />
          <p>
            Business-focused consulting
            <br />
            across technology and industry.
          </p>
          <span className="footer-note">Clarity for your next decision.</span>
        </Reveal>
        <Reveal delay={70}>
          <h3>Expertise</h3>
          {services.map((s) => (
            <Link key={s.slug} to={servicePath(s)}>
              {s.name.replace(' Consulting', '')}
            </Link>
          ))}
        </Reveal>
        <Reveal delay={140}>
          <h3>Explore LinkqGlobal</h3>
          {navigation.slice(1, 5).map(([to, label]) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
          <Link to="/services">Our services</Link>
        </Reveal>
        <Reveal className="footer-contact" delay={210}>
          <h3>Let’s connect</h3>
          <p>Tell us about your priorities.</p>
          <Link to="/contact" className="text-link">
            Book a consultation
          </Link>
        </Reveal>
      </div>
      <Reveal className="container footer-bottom">
        <span>© {new Date().getFullYear()} LinkqGlobal Consulting</span>
        <div>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms-of-use">Terms of use</Link>
          <Link to="/cookie-policy">Cookie policy</Link>
        </div>
      </Reveal>
    </footer>
  );
}
