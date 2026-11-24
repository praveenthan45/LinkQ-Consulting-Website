// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup, fireEvent, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeAll, describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';
import { services } from './content/services';
import { staticRoutes, getPageMeta } from './content/metadata';
import axe from 'axe-core';
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    value: () => ({
      matches: true,
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
  cleanup();
  vi.restoreAllMocks();
});
const open = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
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
  it('shows six links and a View all link in the Industry menu', () => {
    open('/');
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const industriesLink = within(navigation).getByRole('link', { name: /^Industry/ });
    fireEvent.pointerEnter(industriesLink.parentElement!, { pointerType: 'mouse' });
    expect(within(navigation).getByRole('link', { name: 'Manufacturing & Industrial' })).toHaveAttribute('href', '/industries/manufacturing-industrial');
    expect(within(navigation).queryByRole('link', { name: 'Investment & Real Estate' })).not.toBeInTheDocument();
    expect(within(navigation).queryByRole('link', { name: 'Business Strategy' })).not.toBeInTheDocument();
    expect(within(navigation).getByRole('link', { name: 'View all' })).toHaveAttribute('href', '/industries');
    expect(within(navigation).getAllByRole('link').filter((link) => link.closest('.industry-menu-links') && !link.classList.contains('industry-menu-view-all'))).toHaveLength(6);
    expect(within(navigation).queryByText('Consulting capabilities')).not.toBeInTheDocument();
  });
  it('opens the Collaboration menu with links to each stage', () => {
    open('/');
    const navigation = screen.getByRole('navigation', { name: 'Main navigation' });
    const collaborationLink = within(navigation).getByRole('link', { name: /^Collaboration/ });
    fireEvent.pointerEnter(collaborationLink.parentElement!, { pointerType: 'mouse' });
    expect(collaborationLink).toHaveAttribute('aria-expanded', 'true');
    expect(within(navigation).getByRole('link', { name: 'Business case study' })).toHaveAttribute('href', '/collaboration#case-study');
    expect(within(navigation).getByRole('link', { name: 'Verification & certification' })).toHaveAttribute('href', '/collaboration#verification');
    expect(within(navigation).getByRole('link', { name: 'Global partner alignment' })).toHaveAttribute('href', '/collaboration#partner-matching');
    expect(within(navigation).getByRole('link', { name: 'Tie-up & delivery support' })).toHaveAttribute('href', '/collaboration#tie-up');
  });
  it('routes the former approach page to Collaboration', async () => {
    open('/approach');
    expect(await screen.findByRole('heading', { level: 1, name: /A stronger business case/ })).toBeInTheDocument();
  });
  it('starts a collaboration consultation with the correct focus', async () => {
    const user = userEvent.setup();
    open('/collaboration');
    await user.click(screen.getByRole('link', { name: 'Book a collaboration consultation' }));
    expect(screen.getByRole('combobox', { name: 'Consulting focus' })).toHaveValue('Collaboration Consulting');
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
  it('preselects Business Strategy for its consultation', async () => {
    const user = userEvent.setup();
    open('/industries/business-strategy');
    expect(screen.getByRole('heading', { level: 1, name: 'A clear direction for the decisions ahead.' })).toBeInTheDocument();
    await user.click(screen.getByRole('link', { name: 'Consult with our experts' }));
    expect(screen.getByRole('combobox', { name: 'Industry' })).toHaveValue('Business Strategy');
  });
  it('preselects Investment & Real Estate for its consultation', async () => {
    const user = userEvent.setup();
    open('/industries/investment-real-estate');
    await user.click(screen.getByRole('link', { name: 'Consult with our experts' }));
    expect(screen.getByRole('combobox', { name: 'Industry' })).toHaveValue('Investment & Real Estate');
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
  it('validates an empty form and does not send a request', async () => {
    const user = userEvent.setup();
    const fetcher = vi.spyOn(global, 'fetch');
    open('/contact');
    await user.click(screen.getByRole('button', { name: 'Send your enquiry' }));
    expect(await screen.findByText('Enter a valid business email.')).toBeInTheDocument();
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('shows service errors without claiming enquiry success', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'The enquiry service is temporarily unavailable.' }), {
        status: 503,
      }),
    );
    open('/contact');
    await user.type(screen.getByLabelText('Full name *'), 'QA User');
    await user.type(screen.getByLabelText('Business email *'), 'qa@example.test');
    await user.type(screen.getByLabelText('Company / organization *'), 'QA Organization');
    await user.selectOptions(screen.getByLabelText('Industry *'), 'Manufacturing');
    await user.selectOptions(
      screen.getByLabelText('Consulting focus *'),
      'Manufacturing Consulting',
    );
    await user.type(screen.getByLabelText('Subject *'), 'A process review');
    await user.type(
      screen.getByLabelText('Your business requirements *'),
      'We would like to assess our production workflow.',
    );
    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Send your enquiry' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('temporarily unavailable');
    expect(screen.queryByText('Your enquiry is with us.')).not.toBeInTheDocument();
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
    expect(screen.getByRole('combobox', { name: 'Consulting focus' })).toHaveValue(
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
    expect(screen.getByRole('combobox', { name: 'Consulting focus' })).toHaveValue(service.name);
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
