// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { services } from './content/services';
import { insights } from './content/insights';
import { staticRoutes, getPageMeta } from './content/metadata';
import axe from 'axe-core';
let mobileViewport = false;
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
      matches: query.includes('max-width')
        ? mobileViewport
        : query.includes('min-width')
          ? !mobileViewport
          : true,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  });
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});
afterEach(() => {
  mobileViewport = false;
  window.sessionStorage.clear();
  cleanup();
  vi.restoreAllMocks();
});
const open = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );

it('restores the saved scroll position when an industry page reloads', async () => {
  const route = '/industries/education';
  const originalDescriptor = Object.getOwnPropertyDescriptor(performance, 'getEntriesByType');
  Object.defineProperty(performance, 'getEntriesByType', {
    configurable: true,
    value: () => [{ type: 'reload' }],
  });

  try {
    window.sessionStorage.setItem(`linkq:scroll:${route}`, '640');
    open(route);
    await waitFor(() =>
      expect(window.scrollTo).toHaveBeenCalledWith({ top: 640, behavior: 'instant' }),
    );
  } finally {
    if (originalDescriptor) {
      Object.defineProperty(performance, 'getEntriesByType', originalDescriptor);
    } else {
      Reflect.deleteProperty(performance, 'getEntriesByType');
    }
  }
});

async function selectDropdown(
  user: ReturnType<typeof userEvent.setup>,
  labelText: string,
  optionText: string,
) {
  const trigger = screen.getByLabelText(labelText);
  await user.click(trigger);
  const listbox = screen.getByRole('listbox');
  await user.click(within(listbox).getByRole('option', { name: optionText }));
}
describe('Website routes and key interactions', () => {
  it.each(staticRoutes)('renders the correct page and title at %s', (route) => {
    open(route);
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(document.title).toBe(getPageMeta(route).title);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
  it.each(['/', '/contact', '/collaboration', '/services/it-consulting', '/insights'])(
    'has no automated structural accessibility violations on %s',
    async (route) => {
      open(route);
      const result = await axe.run(document.body, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
        rules: { 'color-contrast': { enabled: false } },
      });
      expect(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      ).toEqual([]);
    },
  );
  it.each(services)('renders distinct $name content', (s) => {
    open(`/services/${s.slug}`);
    expect(screen.getByRole('heading', { level: 1, name: s.headline })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: s.capabilities[0].title })).toBeInTheDocument();
  });
  it('offers consulting through Industry without a Services navigation entry', () => {
    open('/');
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(navigation).getByRole('link', { name: /^Industry/ })).toHaveAttribute('href', '/industries');
    expect(within(navigation).queryByRole('button', { name: 'Services' })).not.toBeInTheDocument();
  });
  it('shows all eight industry links and a View all link in the Industry menu', () => {
    open('/');
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const industriesLink = within(navigation).getByRole('link', { name: /^Industry/ });
    fireEvent.pointerEnter(industriesLink.parentElement!, { pointerType: 'mouse' });
    expect(within(navigation).getByRole('link', { name: 'Manufacturing & Industrial' })).toHaveAttribute('href', '/industries/manufacturing-industrial');
    expect(within(navigation).getByRole('link', { name: 'Business Strategy' })).toHaveAttribute('href', '/industries/business-strategy');
    expect(within(navigation).getByRole('link', { name: 'Investment & Real Estate' })).toHaveAttribute('href', '/industries/investment-real-estate');
    expect(within(navigation).getByRole('link', { name: 'View all' })).toHaveAttribute('href', '/industries');
    expect(within(navigation).getAllByRole('link').filter((link) => link.closest('.industry-menu-links') && !link.classList.contains('industry-menu-view-all'))).toHaveLength(8);
    expect(within(navigation).queryByText('Consulting capabilities')).not.toBeInTheDocument();
  });
  it('opens the Collaboration menu with the same grid structure and links as Industry', () => {
    open('/');
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const collaborationLink = within(navigation).getByRole('link', { name: /^Collaboration/ });
    fireEvent.pointerEnter(collaborationLink.parentElement!, { pointerType: 'mouse' });
    expect(collaborationLink).toHaveAttribute('aria-expanded', 'true');
    const dropdown = document.getElementById('collaboration-dropdown')!;
    expect(within(dropdown).getByRole('heading', { level: 2, name: 'Collaboration' })).toBeInTheDocument();
    expect(within(dropdown).getByRole('link', { name: 'Global Partner Discovery & Matchmaking' })).toHaveAttribute('href', '/collaboration#partner-discovery');
    expect(within(dropdown).getByRole('link', { name: 'Market Entry & Expansion' })).toHaveAttribute('href', '/collaboration#market-entry');
    expect(within(dropdown).getByRole('link', { name: 'Partnership Facilitation & Negotiation' })).toHaveAttribute('href', '/collaboration#facilitation-negotiation');
    expect(within(dropdown).getByRole('link', { name: 'Verification & Certification Support' })).toHaveAttribute('href', '/collaboration#verification-certification');
    expect(within(dropdown).getByRole('link', { name: 'Global Partner Alignment' })).toHaveAttribute('href', '/collaboration#partner-alignment');
    expect(within(dropdown).getByRole('link', { name: 'Tie-up & Delivery Support' })).toHaveAttribute('href', '/collaboration#tie-up-delivery');
    expect(within(dropdown).getByRole('link', { name: 'View all' })).toHaveAttribute('href', '/collaboration');
  });
  it('toggles Industry and Collaboration dropdowns cleanly inside the mobile navigation drawer', async () => {
    mobileViewport = true;
    const user = userEvent.setup();
    open('/');
    await user.click(screen.getByRole('button', { name: 'Open navigation' }));
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(navigation).toHaveClass('is-open');

    const industryToggle = within(navigation).getByRole('link', { name: /^Industry/ });
    const collaborationToggle = within(navigation).getByRole('link', { name: /^Collaboration/ });

    // Open Industry dropdown on mobile
    await user.click(industryToggle);
    expect(industryToggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('industries-dropdown')).toBeInTheDocument();
    expect(document.getElementById('collaboration-dropdown')).not.toBeInTheDocument();

    // Switch to Collaboration -> opens Collaboration and closes Industry
    await user.click(collaborationToggle);
    expect(collaborationToggle).toHaveAttribute('aria-expanded', 'true');
    expect(industryToggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('collaboration-dropdown')).toBeInTheDocument();
    expect(document.getElementById('industries-dropdown')).not.toBeInTheDocument();

    // Tap Collaboration again -> collapses cleanly without leaving drawer
    await user.click(collaborationToggle);
    expect(collaborationToggle).toHaveAttribute('aria-expanded', 'false');
    expect(document.getElementById('collaboration-dropdown')).not.toBeInTheDocument();

    // Open Collaboration -> pick a step -> navigates & closes mobile drawer
    await user.click(collaborationToggle);
    await user.click(
      within(document.getElementById('collaboration-dropdown')!).getByRole('link', {
        name: 'Market Entry & Expansion',
      }),
    );
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Connecting Local Businesses to Global Opportunities',
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).not.toHaveClass('is-open');
  });
  it('routes the former approach page to Collaboration', async () => {
    open('/approach');
    expect(
      await screen.findByRole('heading', {
        level: 1,
        name: 'Connecting Local Businesses to Global Opportunities',
      }),
    ).toBeInTheDocument();
  });
  it('renders all six collaboration steps without step numbers, plus benefits, supported businesses, and services', () => {
    open('/collaboration');
    const main = screen.getByRole('main');
    expect(screen.getByRole('heading', { level: 2, name: 'A Structured Path to Global Collaboration' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Global Partner Discovery & Matchmaking' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Market Entry & Expansion' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Partnership Facilitation & Negotiation' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Verification & Certification Support' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Global Partner Alignment' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Tie-up & Delivery Support' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Building Meaningful Business Connections' })).toBeInTheDocument();
    expect(within(main).queryByText(/STEP 0[1-6]/)).not.toBeInTheDocument();
    expect(main.querySelector('.collaboration-step')).not.toBeInTheDocument();
    services.forEach((s) => {
      expect(screen.getByRole('heading', { level: 3, name: s.name })).toBeInTheDocument();
    });
  });
  it('starts a collaboration consultation with the correct focus without duplicate consult hero CTA', async () => {
    const user = userEvent.setup();
    open('/collaboration');
    const main = screen.getByRole('main');
    expect(within(main).queryByRole('link', { name: 'Book a Consultation' })).not.toBeInTheDocument();
    expect(within(main).getByRole('link', { name: 'Submit a Collaboration Inquiry' })).toBeInTheDocument();
    expect(main.querySelector('.collaboration-timeline-strip')).not.toBeInTheDocument();
    await user.click(within(main).getByRole('link', { name: 'Start a Collaboration' }));
    expect(screen.getByRole('combobox', { name: 'Consulting Focus' })).toHaveTextContent(
      'Collaboration Consulting',
    );
    expect(screen.getByRole('combobox', { name: 'Collaboration Objective' })).toBeInTheDocument();
  });
  it('preserves the Business Case Study guide in Insights under Case Studies', async () => {
    const user = userEvent.setup();
    open('/insights');
    await user.click(screen.getByRole('button', { name: 'Case Studies' }));
    expect(
      screen.getAllByRole('heading', {
        name: /Business Case Study: Understanding the Business Before Seeking a Global Partner/,
      })[0],
    ).toBeInTheDocument();
  });
  it('routes the retired Services overview to Industries', async () => {
    open('/services');
    expect(await screen.findByRole('heading', { level: 1, name: /Specialized sector knowledge/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Investment & Real Estate consulting/ })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Where we advise and transform.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Explore Business Strategy consulting/ })).toBeInTheDocument();
  });
  it('places data analytics and AI advice within the IT industry', () => {
    open('/industries/information-technology');
    expect(screen.getByRole('heading', { name: 'Put dependable data behind better technology decisions.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore Data Analytics & AI consulting' })).toHaveAttribute('href', '/services/data-analytics-ai');
  });
  it('preselects Business Strategy consulting focus from Business Strategy page without adding it to Industry options', async () => {
    const user = userEvent.setup();
    open('/industries/business-strategy');
    expect(screen.getByRole('heading', { level: 1, name: 'A clear direction for the decisions ahead.' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Consult with our experts' }));
    const industryTrigger = screen.getByRole('combobox', { name: 'Industry' });
    expect(industryTrigger).toHaveTextContent('Select your industry');
    await user.click(industryTrigger);
    const industryMenu = screen.getByRole('listbox');
    expect(within(industryMenu).queryByRole('option', { name: 'Business Strategy' })).not.toBeInTheDocument();
    expect(within(industryMenu).queryByRole('option', { name: 'Technology & Automation' })).not.toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByRole('combobox', { name: 'Consulting Focus' })).toHaveTextContent(
      'Business Strategy',
    );
  });
  it('preselects Investment & Real Estate for its consultation', async () => {
    const user = userEvent.setup();
    open('/industries/investment-real-estate');
    await user.click(screen.getByRole('link', { name: 'Consult with our experts' }));
    expect(screen.getByRole('combobox', { name: 'Industry' })).toHaveTextContent(
      'Investment & Real Estate',
    );
  });
  it('filters insights and presents a useful empty state', async () => {
    const user = userEvent.setup();
    open('/insights');
    await user.click(screen.getByRole('button', { name: 'Industry Trends' }));
    expect(
      screen.getAllByRole('heading', { name: 'A Thoughtful Approach to Digital Change in Education' })[0],
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: 'Building a Practical Digital Transformation Roadmap',
      }),
    ).not.toBeInTheDocument();
    await user.type(screen.getByRole('searchbox'), 'not-a-match');
    expect(screen.getByRole('heading', { name: 'No matching perspectives' })).toBeInTheDocument();
  });
  it('validates an empty form, invalid email, invalid phone, and unchecked consent without sending a request', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch');
    open('/contact');
    expect(screen.getByRole('heading', { level: 2, name: "Let's talk about your business goals." })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));
    expect(await screen.findByText('Full name must contain at least 2 characters.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid business email.')).toBeInTheDocument();
    expect(screen.getByText('Company / Organization must contain at least 2 characters.')).toBeInTheDocument();
    expect(screen.getByText('Select your industry.')).toBeInTheDocument();
    expect(screen.getByText('Select a consulting area.')).toBeInTheDocument();
    expect(screen.getByText('Subject must contain at least 3 characters.')).toBeInTheDocument();
    expect(screen.getByText('Business requirements must contain at least 20 characters.')).toBeInTheDocument();
    expect(screen.getByText('Please agree before submitting your inquiry.')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Full Name *'), 'QA User');
    await user.type(screen.getByLabelText('Business Email *'), 'invalid-email');
    await user.type(screen.getByLabelText('Phone Number (optional)'), 'abc');
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));
    expect(await screen.findByText('Enter a valid business email.')).toBeInTheDocument();
    expect(screen.getByText('Enter a valid phone number including country code.')).toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('submits a General Consulting inquiry without showing collaboration fields', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-GEN10001' }),
        { status: 201 },
      ),
    );
    open('/contact');
    await user.type(screen.getByLabelText('Full Name *'), 'Maya Menon');
    await user.type(screen.getByLabelText('Business Email *'), 'maya@industrial-co.com');
    await user.type(screen.getByLabelText('Company / Organization *'), 'Apex Industrial Ltd');
    await selectDropdown(user, 'Industry *', 'Manufacturing & Industrial');
    await selectDropdown(user, 'Consulting Focus *', 'Manufacturing Consulting');
    expect(screen.queryByLabelText(/Collaboration Objective/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Target Country \/ Region/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Partner Type/)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText('Subject *'), 'Manufacturing Process Improvement');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'We are expanding plant automation across two facilities and need lean workflow consulting.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByRole('heading', { name: 'Thank you for reaching out.' })).toBeInTheDocument();
    expect(screen.getByText('LQ-2026-GEN10001')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Return to website' })).toHaveAttribute('href', '/');
    expect(fetcher).toHaveBeenCalledOnce();
    const payload = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(payload.industry).toBe('Manufacturing & Industrial');
    expect(payload.service).toBe('Manufacturing Consulting');
    expect(payload.collaborationObjective).toBe('');
    expect(payload.targetCountryRegion).toBe('');
    expect(payload.partnerType).toBe('');
  });

  it('supports Technology Consulting selections with dynamic placeholder, counter, and independent focus', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-TECH2026' }), { status: 201 }),
    );
    open('/contact');
    const requirements = screen.getByLabelText('Your Business Requirements *');
    expect(requirements).toHaveAttribute(
      'placeholder',
      "Tell us about your business, your goals, the market you want to reach, and the support you're looking for.",
    );

    await selectDropdown(user, 'Industry *', 'Information Technology & Technology');
    expect(screen.getByLabelText('Consulting Focus *')).toHaveTextContent('Select a consulting area');
    await selectDropdown(user, 'Consulting Focus *', 'Data Analytics & AI');
    expect(requirements).toHaveAttribute(
      'placeholder',
      "Describe your business challenge, objectives, current situation, and the consulting support you're looking for.",
    );
    expect(screen.queryByLabelText(/Collaboration Objective/)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText('Full Name *'), 'Rohan Rao');
    await user.type(screen.getByLabelText('Business Email *'), 'rohan@cloudops.io');
    await user.type(screen.getByLabelText('Company / Organization *'), 'CloudOps Tech');
    await user.type(screen.getByLabelText('Phone Number (optional)'), '+44 20 7946 0958');
    await user.type(screen.getByLabelText('Subject *'), 'AI Implementation for Business Operations');
    const requirementsText = 'Evaluating predictive demand models across regional operations.';
    await user.type(requirements, requirementsText);
    expect(screen.getByText(`${requirementsText.length} / 3000`)).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByRole('heading', { name: 'Thank you for reaching out.' })).toBeInTheDocument();
  });

  it('shows and submits conditional Collaboration Consulting fields with downward listbox and passes axe WCAG checks', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(
        JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-COLLAB99' }),
        { status: 201 },
      ),
    );
    open('/contact');
    await selectDropdown(user, 'Industry *', 'Retail & Commerce');

    const focusTrigger = screen.getByLabelText('Consulting Focus *');
    await user.click(focusTrigger);
    expect(focusTrigger).toHaveAttribute('aria-expanded', 'true');
    const menu = screen.getByRole('listbox');
    expect(menu).toHaveClass('select-menu');
    const axeOpenSelect = await axe.run(document.body, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(axeOpenSelect.violations).toEqual([]);
    await user.click(within(menu).getByRole('option', { name: 'Collaboration Consulting' }));

    expect(screen.getByLabelText('Your Business Requirements *')).toHaveAttribute(
      'placeholder',
      "Tell us about your business, the market or country you want to reach, your collaboration goal, and the partner or business opportunity you're looking for.",
    );
    const objectiveSelect = screen.getByLabelText('Collaboration Objective *');
    const targetInput = screen.getByLabelText('Target Country / Region (optional)');
    const partnerSelect = screen.getByLabelText('Partner Type (optional)');
    expect(objectiveSelect).toBeInTheDocument();
    expect(targetInput).toBeInTheDocument();
    expect(partnerSelect).toBeInTheDocument();

    const axeExpanded = await axe.run(document.body, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(axeExpanded.violations).toEqual([]);

    await user.type(screen.getByLabelText('Full Name *'), 'Elena Becker');
    await user.type(screen.getByLabelText('Business Email *'), 'elena@nordicretail.de');
    await user.type(screen.getByLabelText('Company / Organization *'), 'Nordic Commerce GmbH');
    await selectDropdown(user, 'Collaboration Objective *', 'Distribution / Dealership Partnership');
    await user.type(targetInput, 'Germany, UAE, Southeast Asia');
    await selectDropdown(user, 'Partner Type (optional)', 'Distributor');
    await user.type(screen.getByLabelText('Subject *'), 'Global Distribution Partnership');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'Looking to appoint master distributors across DACH and Gulf retail markets in Q3.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByText('LQ-2026-COLLAB99')).toBeInTheDocument();
    const sent = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(sent.collaborationObjective).toBe('Distribution / Dealership Partnership');
    expect(sent.targetCountryRegion).toBe('Germany, UAE, Southeast Asia');
    expect(sent.partnerType).toBe('Distributor');
  }, 15000);

  it('reveals and enforces conditional Other specification inputs', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-OTHER77' }), { status: 201 }),
    );
    open('/contact');
    await selectDropdown(user, 'Industry *', 'Other');
    expect(screen.getByLabelText('Specify your industry *')).toBeInTheDocument();

    await selectDropdown(user, 'Consulting Focus *', 'Collaboration Consulting');
    await selectDropdown(user, 'Collaboration Objective *', 'Other');
    expect(screen.getByLabelText('Specify collaboration objective *')).toBeInTheDocument();
    await selectDropdown(user, 'Partner Type (optional)', 'Other');
    expect(screen.getByLabelText('Specify partner type (optional)')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Full Name *'), 'Samir Patel');
    await user.type(screen.getByLabelText('Business Email *'), 'samir@medtech.org');
    await user.type(screen.getByLabelText('Company / Organization *'), 'MedTech Partners');
    await user.type(screen.getByLabelText('Subject *'), 'International Supplier Partnership');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'Seeking certified component co-development partners for regulated medical devices.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByText('Please specify your industry.')).toBeInTheDocument();
    expect(screen.getByText('Please specify your collaboration objective.')).toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();

    await user.type(screen.getByLabelText('Specify your industry *'), 'Medical Devices');
    await user.type(screen.getByLabelText('Specify collaboration objective *'), 'Co-development & Regulatory Licensing');
    await user.type(screen.getByLabelText('Specify partner type (optional)'), 'Contract R&D Lab');
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByText('LQ-2026-OTHER77')).toBeInTheDocument();
    const sent = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(sent.industryOther).toBe('Medical Devices');
    expect(sent.collaborationObjectiveOther).toBe('Co-development & Regulatory Licensing');
    expect(sent.partnerTypeOther).toBe('Contract R&D Lab');
  }, 15000);

  it('clears hidden collaboration values when switching Consulting Focus away from Collaboration Consulting', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-SWITCH5' }), { status: 201 }),
    );
    open('/contact');
    await user.type(screen.getByLabelText('Full Name *'), 'Daniel Lee');
    await user.type(screen.getByLabelText('Business Email *'), 'daniel@fmcg-group.com');
    await user.type(screen.getByLabelText('Company / Organization *'), 'Pacific Holdings');
    await selectDropdown(user, 'Industry *', 'FMCG & Consumer Goods');

    await selectDropdown(user, 'Consulting Focus *', 'Collaboration Consulting');
    await selectDropdown(user, 'Collaboration Objective *', 'Market Entry & Expansion');
    await user.type(screen.getByLabelText('Target Country / Region (optional)'), 'Europe');
    await selectDropdown(user, 'Partner Type (optional)', 'Supplier');

    await selectDropdown(user, 'Consulting Focus *', 'IT Consulting');
    expect(screen.queryByLabelText(/Collaboration Objective/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Target Country \/ Region/)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/Partner Type/)).not.toBeInTheDocument();

    await user.type(screen.getByLabelText('Subject *'), 'ERP Infrastructure Upgrade');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'Consolidating legacy ERP databases across regional distribution centers.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByText('LQ-2026-SWITCH5')).toBeInTheDocument();
    const sent = JSON.parse(String(fetcher.mock.calls[0][1]?.body));
    expect(sent.service).toBe('IT Consulting');
    expect(sent.collaborationObjective).toBe('');
    expect(sent.targetCountryRegion).toBe('');
    expect(sent.partnerType).toBe('');
  });

  it('retains entered form data when navigating to Privacy Policy and returning to the contact form', async () => {
    const user = userEvent.setup();
    open('/contact');

    await user.type(screen.getByLabelText('Full Name *'), 'Kavya Nair');
    await user.type(screen.getByLabelText('Business Email *'), 'kavya@globaltrade.com');
    await user.type(screen.getByLabelText('Company / Organization *'), 'GlobalTrade Exports');
    await user.type(screen.getByLabelText('Phone Number (optional)'), '+91 9876543210');
    await selectDropdown(user, 'Industry *', 'Logistics & Distribution');
    await selectDropdown(user, 'Consulting Focus *', 'Collaboration Consulting');
    await selectDropdown(user, 'Collaboration Objective *', 'International Partner Search');
    await user.type(screen.getByLabelText('Target Country / Region (optional)'), 'Germany, UAE');
    await selectDropdown(user, 'Partner Type (optional)', 'Buyer');
    await user.type(screen.getByLabelText('Subject *'), 'European Logistics Tie-up');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'Seeking cold-chain distribution partners across Europe and Gulf hubs.',
    );
    await user.click(screen.getByRole('checkbox'));

    await user.click(screen.getByRole('link', { name: 'Privacy Policy' }));
    expect(await screen.findByRole('heading', { level: 1, name: 'Privacy policy' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'contact LinkqGlobal through the enquiry form' }));
    expect(await screen.findByLabelText('Full Name *')).toHaveValue('Kavya Nair');
    expect(screen.getByLabelText('Business Email *')).toHaveValue('kavya@globaltrade.com');
    expect(screen.getByLabelText('Company / Organization *')).toHaveValue('GlobalTrade Exports');
    expect(screen.getByLabelText('Phone Number (optional)')).toHaveValue('+91 9876543210');
    expect(screen.getByLabelText('Industry *')).toHaveTextContent('Logistics & Distribution');
    expect(screen.getByLabelText('Consulting Focus *')).toHaveTextContent('Collaboration Consulting');
    expect(screen.getByLabelText('Collaboration Objective *')).toHaveTextContent(
      'International Partner Search',
    );
    expect(screen.getByLabelText('Target Country / Region (optional)')).toHaveValue('Germany, UAE');
    expect(screen.getByLabelText('Partner Type (optional)')).toHaveTextContent('Buyer');
    expect(screen.getByLabelText('Subject *')).toHaveValue('European Logistics Tie-up');
    expect(screen.getByLabelText('Your Business Requirements *')).toHaveValue(
      'Seeking cold-chain distribution partners across Europe and Gulf hubs.',
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('orders Insights articles in descending date order with the latest/present date at the top without altering article content', () => {
    const timestamps = insights.map((item) => Date.parse(`${item.date}T00:00:00Z`));
    for (let i = 1; i < timestamps.length; i++) {
      expect(timestamps[i]).toBeLessThanOrEqual(timestamps[i - 1]);
    }
    expect(insights[0].date).toBe('2026-11-25');

    open('/insights');
    const grids = document.querySelectorAll('main .insights-grid');
    expect(grids.length).toBeGreaterThanOrEqual(1);
    for (const grid of Array.from(grids)) {
      const times = Array.from(grid.querySelectorAll('time')).map(
        (el) => el.getAttribute('dateTime') || '',
      );
      expect(times.length).toBeGreaterThan(0);
      for (let i = 1; i < times.length; i++) {
        expect(Date.parse(`${times[i]}T00:00:00Z`)).toBeLessThanOrEqual(
          Date.parse(`${times[i - 1]}T00:00:00Z`),
        );
      }
    }
    const primaryTimes = Array.from(grids[0].querySelectorAll('time')).map(
      (el) => el.getAttribute('dateTime') || '',
    );
    expect(primaryTimes[0]).toBe('2026-11-25');
    expect(screen.getByText(/Published 25 Nov 2026/)).toBeInTheDocument();
  });

  it('retains entered form values on backend failure and succeeds on retry', async () => {
    const user = userEvent.setup();
    const fetcher = vi
      .spyOn(global, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: 'The inquiry service is temporarily unavailable.' }), {
          status: 503,
        }),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({ message: 'Your inquiry has been recorded.', referenceNumber: 'LQ-2026-RETRY88' }),
          { status: 201 },
        ),
      );
    open('/contact');
    await user.type(screen.getByLabelText('Full Name *'), 'QA User');
    await user.type(screen.getByLabelText('Business Email *'), 'qa@example.test');
    await user.type(screen.getByLabelText('Company / Organization *'), 'QA Organization');
    await selectDropdown(user, 'Industry *', 'Manufacturing & Industrial');
    await selectDropdown(user, 'Consulting Focus *', 'Manufacturing Consulting');
    await user.type(screen.getByLabelText('Subject *'), 'A process review');
    await user.type(
      screen.getByLabelText('Your Business Requirements *'),
      'We would like to assess our production workflow.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('temporarily unavailable');
    expect(screen.queryByRole('heading', { name: 'Thank you for reaching out.' })).not.toBeInTheDocument();
    expect(screen.getByLabelText('Full Name *')).toHaveValue('QA User');
    expect(screen.getByLabelText('Subject *')).toHaveValue('A process review');
    expect(screen.getByRole('checkbox')).toBeChecked();

    await user.click(screen.getByRole('button', { name: 'Submit Inquiry' }));
    expect(await screen.findByText('LQ-2026-RETRY88')).toBeInTheDocument();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('renders the full inquiry form including conditional collaboration fields in mobile viewport without accessibility violations', async () => {
    const user = userEvent.setup();
    mobileViewport = true;
    open('/contact');
    await selectDropdown(user, 'Consulting Focus *', 'Collaboration Consulting');
    expect(screen.getByRole('group', { name: 'Collaboration Details' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit Inquiry' })).toBeEnabled();
    const axeMobile = await axe.run(document.body, {
      runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'] },
      rules: { 'color-contrast': { enabled: false } },
    });
    expect(axeMobile.violations).toEqual([]);
  });
  it('opens FAQ panels with keyboard input', async () => {
    const user = userEvent.setup();
    open('/services/it-consulting');
    const button = screen.getByRole('button', {
      name: 'How is the scope of an IT assessment agreed?',
    });
    button.focus();
    await user.keyboard('{Enter}');
    await waitFor(() => expect(button).toHaveAttribute('aria-expanded', 'true'));
  });
  it('carries a service enquiry into the contact form', async () => {
    const user = userEvent.setup();
    open('/services/manufacturing-consulting');
    const hero = screen.getByRole('region', { name: 'Manufacturing Consulting' });
    await user.click(within(hero).getByRole('link', { name: 'Book a consultation' }));
    expect(screen.getByRole('combobox', { name: 'Consulting Focus' })).toHaveTextContent(
      'Manufacturing Consulting',
    );
    expect(screen.getByRole('textbox', { name: 'Subject' })).toHaveValue(
      'Consultation about Manufacturing Consulting',
    );
  });
  it.each(services.slice(-3))('preselects $name in a consultation enquiry', async (service) => {
    const user = userEvent.setup();
    open(`/services/${service.slug}`);
    const hero = screen.getByRole('region', { name: service.name });
    await user.click(within(hero).getByRole('link', { name: 'Book a consultation' }));
    expect(screen.getByRole('combobox', { name: 'Consulting Focus' })).toHaveTextContent(
      service.name.replace(/ Consulting$/, ''),
    );
  });
  it.each(['Business Strategy', 'Technology & AI', 'Operations & Supply Chain'])('filters %s insights', async (category) => {
    const user = userEvent.setup();
    open('/insights');
    await user.click(screen.getByRole('button', { name: category }));
    expect(screen.getByRole('status')).toHaveTextContent(/insights found/);
  });
  it('keeps service details collapsed until a visitor asks for them', async () => {
    const user = userEvent.setup();
    open('/services/it-consulting');
    const trigger = screen.getByRole('button', { name: 'IT advisory' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('region', { name: 'IT advisory' })).toHaveTextContent(
      'IT strategy and roadmap development',
    );
  });
  it('renders a designed missing-page state', () => {
    open('/missing');
    expect(
      screen.getByRole('heading', { name: 'Let’s find your way forward.' }),
    ).toBeInTheDocument();
  });
});
