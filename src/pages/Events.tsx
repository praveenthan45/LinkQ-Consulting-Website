import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowRight, CalendarDays, ExternalLink, MapPin, Search } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { Breadcrumb, Photo } from '../components/Common';
import { eventListingSchema, type EventListing, type IndustryEvent } from '../../shared/events';
import { NotFound } from './Pages';
import './events.css';

const dateFormat = new Intl.DateTimeFormat('en-IN', {
  timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric',
});
const monthFormat = new Intl.DateTimeFormat('en-IN', { timeZone: 'UTC', month: 'long', year: 'numeric' });
const pageSize = 12;

function useEventListing() {
  const [listing, setListing] = useState<EventListing>();
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function loadEvents() {
      try {
        const response = await fetch('/api/events', { signal: controller.signal });
        if (!response.ok) throw new Error('Event feed unavailable');
        const next = eventListingSchema.parse(await response.json());
        if (!controller.signal.aborted) setListing(next);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      }
    }
    void loadEvents();
    return () => controller.abort();
  }, [attempt]);

  return { listing, failed, retry: () => { setFailed(false); setAttempt((current) => current + 1); } };
}

function EventFeedStatus({ failed, retry }: { failed: boolean; retry: () => void }) {
  return (
    <div className="events-empty" role="status">
      <p>{failed ? 'The event feed is temporarily unavailable.' : 'Loading upcoming events from organizers…'}</p>
      {failed && <button type="button" className="button" onClick={retry}>Try again</button>}
    </div>
  );
}

function EventArtwork({ event, detail = false }: { event: IndustryEvent; detail?: boolean }) {
  const [failed, setFailed] = useState(false);
  const artwork = failed ? null : event.artwork;
  const seed = Number.parseInt(event.slug.slice(-8), 16);
  const style = {
    '--event-cover-hue': 178 + (seed % 74),
    '--event-cover-focus': `${25 + (seed % 60)}%`,
    '--event-cover-image': event.coverIndex === undefined
      ? 'none'
      : `url('/images/event-covers/${event.coverIndex}.webp')`,
  } as CSSProperties;
  const kind = artwork?.kind ?? 'custom';

  return (
    <div
      className={`event-artwork event-artwork--${kind}${detail ? ' event-artwork--detail' : ''}`}
      style={style}
      aria-hidden="true"
    >
      {artwork && (
        <img
          src={`/api/events/${event.slug}/artwork`}
          alt=""
          loading={detail ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {kind !== 'banner' && (
        <div className="event-artwork-copy">
          <span>{event.format}</span>
          <strong>{event.title}</strong>
          <span>{dateFormat.format(new Date(event.startDate))}</span>
        </div>
      )}
    </div>
  );
}

function EventFacts({ event }: { event: IndustryEvent }) {
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);
  return (
    <ul className="event-facts">
      <li>
        <CalendarDays aria-hidden="true" />
        <span>
          <time dateTime={event.startDate}>{dateFormat.format(start)}</time>
          {event.startDate !== event.endDate && <> – <time dateTime={event.endDate}>{dateFormat.format(end)}</time></>}
        </span>
      </li>
      {(event.venue || event.location) && <li><MapPin aria-hidden="true" /><span>{[event.venue, event.location].filter(Boolean).join(' · ')}</span></li>}
    </ul>
  );
}

function EventTags({ event }: { event: IndustryEvent }) {
  return (
    <p className="event-tags">
      <span>{event.industry}</span><span>{event.format}</span>
      {event.free && <span>Free</span>}
    </p>
  );
}

function EventCard({ event }: { event: IndustryEvent }) {
  return (
    <article className="event-card">
      <EventArtwork event={event} />
      <div className="event-card-copy">
        <EventTags event={event} />
        <h3><Link to={`/events/${event.slug}`}>{event.title}</Link></h3>
        <p>{event.organizer}</p>
        <EventFacts event={event} />
        <Link to={`/events/${event.slug}`} className="event-card-link" aria-label={`View event: ${event.title}`}>
          View event <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export function Events() {
  const { listing, failed, retry } = useEventListing();
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');
  const [format, setFormat] = useState('');
  const [month, setMonth] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [limit, setLimit] = useState(pageSize);

  const events = listing?.events ?? [];
  const months = [...new Set(events.map((event) => event.startDate.slice(0, 7)))];
  const industries = [...new Set(events.map((event) => event.industry))].sort();
  const formats = [...new Set(events.map((event) => event.format))].sort();
  const keywords = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = events.filter((event) => {
    const text = [event.title, event.organizer, event.industry, event.format, event.venue, event.location].join(' ').toLowerCase();
    return (!month || event.startDate.startsWith(month)) &&
      (!industry || event.industry === industry) &&
      (!format || event.format === format) &&
      (!freeOnly || event.free === true) &&
      keywords.every((word) => text.includes(word));
  });
  const hasFilters = Boolean(search || industry || format || month || freeOnly);

  function clearFilters() {
    setSearch('');
    setIndustry('');
    setFormat('');
    setMonth('');
    setFreeOnly(false);
    setLimit(pageSize);
  }

  return (
    <>
      <section className="events-intro">
        <div className="events-hero-scene" aria-hidden="true">
          <Photo name="events-forum" alt="" />
        </div>
        <Breadcrumb label="Events" />
        <div className="container events-intro-copy">
          <h1>Industry events</h1>
          <form className="events-filters" role="search" aria-label="Find industry events" onChange={() => setLimit(pageSize)} onSubmit={(event) => {
            event.preventDefault();
            document.getElementById('upcoming-events')?.focus();
          }}>
            <div className="events-search-row">
              <label className="events-search">
                <span className="sr-only">Search events</span>
                <Search size={19} aria-hidden="true" />
                <input type="search" placeholder="Try hardware or Tokyo" value={search} onChange={(e) => setSearch(e.target.value)} />
              </label>
              <button type="submit" className="button">Search</button>
            </div>
            <div className="events-filter-row">
              <label>
                <span className="sr-only">When</span>
                <select value={month} onChange={(e) => setMonth(e.target.value)}>
                  <option value="">When</option>
                  {months.map((item) => <option key={item} value={item}>{monthFormat.format(new Date(`${item}-01`))}</option>)}
                </select>
              </label>
              <label>
                <span className="sr-only">Event Type</span>
                <select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="">Event Type</option>
                  {formats.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span className="sr-only">Admission</span>
                <select value={freeOnly ? 'free' : ''} onChange={(e) => setFreeOnly(e.target.value === 'free')}>
                  <option value="">Admission</option>
                  <option value="free">Free events</option>
                </select>
              </label>
              <label>
                <span className="sr-only">Industry</span>
                <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  <option value="">Industry</option>
                  {industries.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>
          </form>
          <p className="events-source-note">Listings from event organizers. Registration takes place on their websites.</p>
        </div>
      </section>
      <section className="section container events-directory" aria-labelledby="upcoming-events">
        <div className="events-results-heading">
          <h2 id="upcoming-events" tabIndex={-1}>Upcoming events</h2>
          {listing && <p role="status">{results.length} {results.length === 1 ? 'event' : 'events'}</p>}
        </div>
        {!listing ? <EventFeedStatus failed={failed} retry={retry} /> : results.length ? (
          <>
            <div className="events-grid">{results.slice(0, limit).map((event) => <EventCard key={event.slug} event={event} />)}</div>
            {limit < results.length && (
              <button className="button events-load-more" type="button" onClick={() => setLimit((current) => current + pageSize)}>
                Show more events
              </button>
            )}
          </>
        ) : (
          <div className="events-empty">
            {hasFilters ? (
              <><p>No events match those filters. Try a different keyword or clear your filters.</p><button type="button" className="button" onClick={clearFilters}>Clear filters</button></>
            ) : <p>There are no upcoming events listed right now.</p>}
          </div>
        )}
      </section>
    </>
  );
}

function EventDetails({ event, events }: { event: IndustryEvent; events: IndustryEvent[] }) {
  useEffect(() => {
    document.title = `${event.title} | LinkqGlobal Consulting`;
  }, [event.title]);

  const other = events.filter((item) => item.slug !== event.slug);
  const related = [...other.filter((item) => item.industry === event.industry),
    ...other.filter((item) => item.industry !== event.industry)].slice(0, 3);

  return (
    <>
      <Breadcrumb label={event.title} parent={{ to: '/events', label: 'Events' }} />
      <section className="section container event-detail">
        <div>
          <EventTags event={event} />
          <h1>{event.title}</h1>
          <p>Listed by {event.organizer}.</p>
          <EventFacts event={event} />
          <a className="button" href={event.registrationUrl ?? event.url} target="_blank" rel="noopener noreferrer">
            Register on organizer site
          </a>
          <p className="events-source-note">
            Confirm times, admission, and registration availability with the <a href={event.url} target="_blank" rel="noopener noreferrer">official event page <ExternalLink size={13} aria-hidden="true" /></a>.
          </p>
        </div>
        <EventArtwork event={event} detail />
      </section>
      {related.length > 0 && (
        <section className="section container events-related" aria-labelledby="related-events">
          <div className="events-results-heading">
            <h2 id="related-events">Related events</h2>
            <Link to="/events" className="text-link">View all events <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="events-grid">{related.map((item) => <EventCard key={item.slug} event={item} />)}</div>
        </section>
      )}
    </>
  );
}

export function EventDetail() {
  const { slug } = useParams();
  const { listing, failed, retry } = useEventListing();
  if (!listing) return (
    <section className="section container">
      <h1>Industry event</h1>
      <EventFeedStatus failed={failed} retry={retry} />
      <Link to="/events" className="text-link">Browse all events</Link>
    </section>
  );
  const event = listing.events.find((item) => item.slug === slug);
  return event ? <EventDetails event={event} events={listing.events} /> : <NotFound />;
}
