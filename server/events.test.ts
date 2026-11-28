import { describe, expect, it } from 'vitest';
import { parseKoelnmesse, parseLinuxFoundation, uniqueEventArtwork } from './events.js';

describe('organizer event feeds', () => {
  it('keeps the organizer’s dates and registration link and skips cancelled events', () => {
    const item = {
      '@type': 'Event',
      name: 'Example Virtual Forum',
      url: 'https://events.linuxfoundation.org/example-forum/',
      startDate: '2027-03-01',
      endDate: '2027-03-02',
      eventStatus: 'https://schema.org/EventScheduled',
      image: ['https://events.linuxfoundation.org/wp-content/uploads/2027/forum.png'],
      location: [{
        '@type': 'VirtualLocation',
        url: 'https://register.linuxfoundation.org/example-forum',
      }],
    };
    const list = {
      '@type': 'ItemList',
      itemListElement: [
        { item },
        { item: { ...item, name: 'Cancelled forum', eventStatus: 'https://schema.org/EventCancelled' } },
        { item: { ...item, name: 'Unsafe link', url: 'javascript:alert(1)' } },
      ],
    };
    const events = parseLinuxFoundation(`<script type="application/ld+json">${JSON.stringify(list)}</script>`);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      title: item.name,
      startDate: item.startDate,
      endDate: item.endDate,
      location: 'Online',
      registrationUrl: item.location[0].url,
      artwork: { kind: 'banner', url: item.image[0] },
    });
  });

  it('keeps confirmed cross-month trade fairs, skipping malformed and month-only entries', () => {
    const fair = (date: string, link: string) => `
      <div class="item" data-begin-date="2027-01-30 00:00:00">
        <strong class="sort_fairname">Sample Trade Fair</strong>
        <strong class="inner_branche">Health</strong>
        <span class="date">${date}</span>
        <div class="img_holder"><img src="https://media-km.koelnmesse.io/uploads/messelogos/100px/fair.png"></div>
        <a title="Info" href="${link}">Organizer</a>
      </div>`;
    const events = parseKoelnmesse(`<div class="exh_holder">
      ${fair('30.01. - 01.02.2027, Cologne', 'https://www.koelnmesse.com/current-dates/')}
      ${fair('30.01. - 01.02.2027, Cologne', 'invalid-url')}
      ${fair('January 2027, Cologne', 'https://www.koelnmesse.com/current-dates/')}
    </div>`);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({
      industry: 'Health', startDate: '2027-01-30', endDate: '2027-02-01',
      location: 'Cologne, Germany',
      artwork: { kind: 'logo', url: 'https://media-km.koelnmesse.io/uploads/messelogos/100px/fair.png' },
    });
  });

  it('displays a shared organizer banner only once, including size variants', () => {
    const item = {
      '@type': 'Event',
      name: 'Sample forum',
      url: 'https://events.linuxfoundation.org/sample-forum/',
      startDate: '2027-03-01',
      image: 'https://events.linuxfoundation.org/wp-content/uploads/2027/forum.png',
    };
    const list = {
      '@type': 'ItemList',
      itemListElement: [
        { item },
        { item: { ...item, name: 'Related conference', image: item.image.replace('.png', '-600x400.png') } },
        { item: { ...item, name: 'Unsupported artwork', image: 'https://register.linuxfoundation.org/private.png' } },
      ],
    };
    const events = uniqueEventArtwork(parseLinuxFoundation(`<script type="application/ld+json">${JSON.stringify(list)}</script>`));
    expect(events.map((event) => event.artwork?.url ?? null)).toEqual([item.image, null, null]);
  });
});
