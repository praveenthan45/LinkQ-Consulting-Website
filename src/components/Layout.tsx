import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { services, servicePath } from '../content/services';
import { industries } from '../content/industries';
import { collaborationSteps } from '../content/collaboration';
import { SEOManager } from './SEO';
import { Reveal, ScrollProgress } from './Motion';

export function Logo({ light = false, adaptive = false }: { light?: boolean; adaptive?: boolean }) {
  return (
    <Link
      to="/"
      className={`logo ${light ? 'logo-light' : ''}`}
      aria-label="LinkqGlobal Consulting home"
      onClick={(event) => {
        if (window.location.pathname !== '/') return;
        event.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
        });
      }}
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
      </span>
    </Link>
  );
}

const navigation = [
  ['/', 'Home'],
  ['/industries', 'Industry'],
  ['/collaboration', 'Collaboration'],
  ['/insights', 'Insights'],
  ['/about', 'About us'],
  ['/contact', 'Contact'],
] as const;

const navLinksAfterDropdowns = [
  ['/about', 'About us'],
  ['/contact', 'Contact'],
] as const;

const desktopHoverQuery = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

export function Layout() {
  const [mobile, setMobile] = useState(false);
  const [industriesDropdown, setIndustriesDropdown] = useState(false);
  const [collaborationDropdown, setCollaborationDropdown] = useState(false);
  const [compactHeader, setCompactHeader] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [focusedNav, setFocusedNav] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const location = useLocation();
  const initialLocation = useRef(location);
  const scrollStorageKey = `linkq:scroll:${location.pathname}${location.search}${location.hash}`;

  const selectedService = services.find((service) => location.pathname === servicePath(service));
  const consultationUrl = selectedService
    ? `/contact?service=${encodeURIComponent(selectedService.name)}`
    : '/contact';

  const menuButton = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const industriesPanel = useRef<HTMLDivElement>(null);
  const collaborationPanel = useRef<HTMLDivElement>(null);
  const industriesCloseTimer = useRef<number | undefined>(undefined);

  const activeNav = location.pathname.startsWith('/services')
    ? '/industries'
    : location.pathname.startsWith('/industries')
      ? '/industries'
      : navigation.find(([to]) =>
          to === '/'
            ? location.pathname === '/'
            : location.pathname === to || location.pathname.startsWith(`${to}/`),
        )?.[0];

  const underlineTarget = hoveredNav ?? (industriesDropdown ? '/industries' : collaborationDropdown ? '/collaboration' : (focusedNav ?? activeNav));

  function cancelDropdownClose() {
    window.clearTimeout(industriesCloseTimer.current);
  }

  function closeAllMenus() {
    cancelDropdownClose();
    setIndustriesDropdown(false);
    setCollaborationDropdown(false);
    setMobile(false);
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
    setIndustriesDropdown(false);
    setCollaborationDropdown(false);
    setCompactHeader(false);
    setHoveredNav(null);
    setFocusedNav(null);
    const navigation = performance.getEntriesByType?.('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    if (location === initialLocation.current && navigation?.type === 'reload') {
      try {
        const savedPosition = window.sessionStorage.getItem(scrollStorageKey);
        if (savedPosition !== null) {
          const top = Number(savedPosition);
          if (Number.isFinite(top) && top >= 0) {
            const frame = requestAnimationFrame(() => window.scrollTo({ top, behavior: 'instant' }));
            return () => cancelAnimationFrame(frame);
          }
        }
      } catch {
        // Leave refresh restoration to the browser when storage is unavailable.
      }
      return;
    }

    if (location.hash) {
      const frame = requestAnimationFrame(() =>
        document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView(),
      );
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  useEffect(() => {
    function saveScrollPosition() {
      try {
        window.sessionStorage.setItem(scrollStorageKey, String(window.scrollY));
      } catch {
        // Native browser restoration still works when storage is blocked.
      }
    }
    window.addEventListener('pagehide', saveScrollPosition);
    return () => window.removeEventListener('pagehide', saveScrollPosition);
  }, [scrollStorageKey]);

  useEffect(() => {
    return () => {
      window.clearTimeout(industriesCloseTimer.current);
    };
  }, []);

  useEffect(() => {
    function updateHeader() {
      const scrollTop = window.scrollY;
      setCompactHeader((compact) => scrollTop > (compact ? 24 : 96));
    }
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateHeader);
  }, []);

  useEffect(() => {
    function close(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (industriesDropdown || collaborationDropdown) {
          cancelDropdownClose();
          setIndustriesDropdown(false);
          setCollaborationDropdown(false);
        } else if (mobile) {
          setMobile(false);
          menuButton.current?.focus();
        }
      }
    }
    function outside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIndustriesDropdown(false);
        setCollaborationDropdown(false);
      }
    }
    document.addEventListener('keydown', close);
    document.addEventListener('click', outside);
    return () => {
      document.removeEventListener('keydown', close);
      document.removeEventListener('click', outside);
    };
  }, [industriesDropdown, collaborationDropdown, mobile]);

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
            onClick={() => {
              const next = !mobile;
              setMobile(next);
              if (!next) {
                cancelDropdownClose();
                setIndustriesDropdown(false);
                setCollaborationDropdown(false);
              }
            }}
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
                  if (item) {
                    const target = item.dataset.navTarget ?? null;
                    setHoveredNav(target);
                    if (target !== '/industries') {
                      cancelDropdownClose();
                      setIndustriesDropdown(false);
                    }
                    if (target !== '/collaboration') setCollaborationDropdown(false);
                  }
                }}
                onPointerLeave={(event) => {
                  if (
                    event.pointerType !== 'mouse' ||
                    !window.matchMedia(desktopHoverQuery).matches
                  )
                    return;
                  setHoveredNav(null);
                  cancelDropdownClose();
                  industriesCloseTimer.current = window.setTimeout(() => {
                    setIndustriesDropdown(false);
                    setCollaborationDropdown(false);
                  }, 180);
                }}
                onFocusCapture={(event) => {
                  setHoveredNav(null);
                  const item = (event.target as HTMLElement).closest<HTMLElement>(
                    '[data-nav-target]',
                  );
                  if (item) setFocusedNav(item.dataset.navTarget ?? null);
                }}
                onBlurCapture={(event) => {
                  if (window.matchMedia('(max-width: 1023px)').matches) return;
                  if (!event.currentTarget.contains(event.relatedTarget)) {
                    setFocusedNav(null);
                    setIndustriesDropdown(false);
                    setCollaborationDropdown(false);
                  }
                }}
              >
                {location.pathname !== '/' && (
                  <NavLink to="/" end data-nav-target="/" onClick={closeAllMenus}>
                    Home
                    {underline('/')}
                  </NavLink>
                )}

                {/* Industries Dropdown / Link */}
                <div
                  className="services-nav"
                  data-nav-target="/industries"
                  onPointerEnter={(event) => {
                    if (
                      event.pointerType !== 'mouse' ||
                      !window.matchMedia(desktopHoverQuery).matches
                    )
                      return;
                    cancelDropdownClose();
                    setIndustriesDropdown(true);
                    setCollaborationDropdown(false);
                  }}
                  onPointerLeave={(event) => {
                    if (
                      event.pointerType !== 'mouse' ||
                      !window.matchMedia(desktopHoverQuery).matches
                    )
                      return;
                    cancelDropdownClose();
                    industriesCloseTimer.current = window.setTimeout(() => {
                      if (!industriesPanel.current?.contains(document.activeElement))
                        setIndustriesDropdown(false);
                    }, 220);
                  }}
                  onBlur={(event) => {
                    if (window.matchMedia('(max-width: 1023px)').matches) return;
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      cancelDropdownClose();
                      setIndustriesDropdown(false);
                    }
                  }}
                >
                  <NavLink
                    to="/industries"
                    className={`nav-service ${location.pathname.startsWith('/industries') || location.pathname.startsWith('/services/') ? 'active' : ''}`}
                    aria-expanded={industriesDropdown}
                    aria-controls="industries-dropdown"
                    onClick={(event) => {
                      if (window.matchMedia('(max-width: 1023px)').matches) {
                        event.preventDefault();
                        setCollaborationDropdown(false);
                        setIndustriesDropdown((open) => !open);
                        return;
                      }
                      closeAllMenus();
                    }}
                  >
                    Industry <ChevronDown size={13} className={industriesDropdown ? 'rotated' : ''} />
                    {underline('/industries')}
                  </NavLink>
                  {industriesDropdown && (
                    <div ref={industriesPanel} className="mega-menu" id="industries-dropdown">
                      <div className="industry-menu-content">
                        <h2>Industry</h2>
                        <div className="industry-menu-links">
                          {industries.map((ind) => (
                            <Link key={ind.slug} to={`/industries/${ind.slug}`} onClick={closeAllMenus}>
                              <ind.icon size={19} />
                              <span>{ind.name}</span>
                            </Link>
                          ))}
                          <Link className="industry-menu-view-all" to="/industries" onClick={closeAllMenus}>
                            View all <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className="services-nav"
                  data-nav-target="/collaboration"
                  onPointerEnter={(event) => {
                    if (event.pointerType !== 'mouse' || !window.matchMedia(desktopHoverQuery).matches) return;
                    cancelDropdownClose();
                    setIndustriesDropdown(false);
                    setCollaborationDropdown(true);
                  }}
                  onPointerLeave={(event) => {
                    if (event.pointerType !== 'mouse' || !window.matchMedia(desktopHoverQuery).matches) return;
                    cancelDropdownClose();
                    industriesCloseTimer.current = window.setTimeout(() => {
                      if (!collaborationPanel.current?.contains(document.activeElement)) setCollaborationDropdown(false);
                    }, 220);
                  }}
                  onBlur={(event) => {
                    if (window.matchMedia('(max-width: 1023px)').matches) return;
                    if (!event.currentTarget.contains(event.relatedTarget)) setCollaborationDropdown(false);
                  }}
                >
                  <NavLink
                    to="/collaboration"
                    className={`nav-service ${location.pathname === '/collaboration' ? 'active' : ''}`}
                    aria-expanded={collaborationDropdown}
                    aria-controls="collaboration-dropdown"
                    onClick={(event) => {
                      if (window.matchMedia('(max-width: 1023px)').matches) {
                        event.preventDefault();
                        setIndustriesDropdown(false);
                        setCollaborationDropdown((open) => !open);
                        return;
                      }
                      closeAllMenus();
                    }}
                  >
                    Collaboration <ChevronDown size={13} className={collaborationDropdown ? 'rotated' : ''} />
                    {underline('/collaboration')}
                  </NavLink>
                  {collaborationDropdown && (
                    <div ref={collaborationPanel} className="mega-menu" id="collaboration-dropdown">
                      <div className="industry-menu-content">
                        <h2>Collaboration</h2>
                        <div className="industry-menu-links">
                          {collaborationSteps.map((step) => (
                            <Link
                              key={step.id}
                              to={`/collaboration#${step.id}`}
                              onClick={closeAllMenus}
                            >
                              <step.icon size={19} aria-hidden="true" />
                              <span>{step.navLabel}</span>
                            </Link>
                          ))}
                          <Link
                            className="industry-menu-view-all"
                            to="/collaboration"
                            onClick={closeAllMenus}
                          >
                            View all <ArrowRight size={14} aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <NavLink to="/insights" data-nav-target="/insights" onClick={closeAllMenus}>
                  Insights
                  {underline('/insights')}
                </NavLink>

                {navLinksAfterDropdowns.map(([to, label]) => (
                  <NavLink key={to} to={to} data-nav-target={to} onClick={closeAllMenus}>
                    {label}
                    {underline(to)}
                  </NavLink>
                ))}
              </div>
            </LayoutGroup>
            <Link to={consultationUrl} className="button nav-cta" onClick={closeAllMenus}>
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

export function CTA({
  service,
  title = 'Ready to move forward?',
  subtitle = 'Tell us about your business, your growth goals, and the collaboration you hope to build. We’ll discuss a practical next step.',
  buttonLabel = 'Book a consultation',
}: {
  service?: string;
  title?: string;
  subtitle?: string;
  buttonLabel?: string;
}) {
  const to = service ? `/contact?service=${encodeURIComponent(service)}` : '/contact';
  return (
    <section className="cta-section">
      <div className="container cta-inner">
        <Reveal className="cta-copy">
          <span className="eyebrow">LET’S PLAN THE NEXT STEP</span>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </Reveal>
        <Reveal className="cta-action" delay={100}>
          <Link to={to} className="button button-white">
            {buttonLabel}
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
      <div className="container footer-wrap">
        <div className="footer-grid">
          <Reveal className="footer-brand">
            <Logo light />
            <p>
              Business-focused collaboration
              <br />
              connecting local ambition with global opportunity.
            </p>
            <span className="footer-note">A clearer path to the right partner.</span>
          </Reveal>
          <Reveal delay={70}>
            <h3>Industry</h3>
            {industries.map((ind) => (
              <Link key={ind.slug} to={`/industries/${ind.slug}`}>
                {ind.name}
              </Link>
            ))}
          </Reveal>
          <Reveal delay={140}>
            <h3>Explore LinkqGlobal</h3>
            <Link to="/about">About us</Link>
            <Link to="/contact">Contact</Link>
            <div className="footer-legal-links" aria-label="Legal">
              <Link to="/privacy-policy">Privacy policy</Link>
              <Link to="/terms-of-use">Terms of use</Link>
            </div>
          </Reveal>
          <Reveal className="footer-contact" delay={210}>
            <h3>Let’s connect</h3>
            <p>Tell us about your priorities.</p>
            <Link to="/contact" className="text-link">
              Book a consultation
            </Link>
          </Reveal>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} LinkqGlobal Consulting · All rights reserved.</span>
          <span className="footer-powered">
            Powered by{' '}
            <a href="https://www.gentizeinnovations.com/" target="_blank" rel="noopener noreferrer">
              Gentize
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
