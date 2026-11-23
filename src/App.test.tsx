// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render, screen, cleanup, waitFor, within } from '@testing-library/react';
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
  it.each(['/', '/contact', '/services/it-consulting', '/insights'])(
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
  it('opens the services menu and closes with Escape returning focus', async () => {
    const user = userEvent.setup();
    open('/');
    const trigger = screen.getByRole('button', { name: 'Services' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveFocus();
  });
  it('filters insights and presents a useful empty state', async () => {
    const user = userEvent.setup();
    open('/insights');
    await user.click(screen.getByRole('button', { name: 'Education' }));
    expect(
      screen.getByRole('heading', { name: 'A thoughtful approach to digital change in education' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: 'Building a practical digital transformation roadmap',
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
      screen.getByLabelText('Consulting service *'),
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
    expect(screen.getByRole('combobox', { name: 'Consulting service' })).toHaveValue(
      'Manufacturing Consulting',
    );
    expect(screen.getByRole('textbox', { name: 'Subject' })).toHaveValue(
      'Consultation about Manufacturing Consulting',
    );
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
