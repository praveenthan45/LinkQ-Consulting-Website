export interface ServiceStory {
  summary: string;
  positioning: string;
  lead: string;
  chapters: {
    label: string;
    title: string;
    summary: string;
    image: string;
    alt: string;
    focus: string[];
  }[];
  deliverables: { title: string; text: string }[];
}

export const serviceStories: Record<string, ServiceStory> = {
  'it-consulting': {
    summary:
      'Make confident technology decisions. We assess your systems, clarify priorities, and plan improvements that support the way your business works.',
    positioning: 'Technology that serves your business.',
    lead: 'Get a clear view of your applications, infrastructure, and data before choosing what to improve or replace.',
    chapters: [
      {
        label: 'STRATEGY & SYSTEMS',
        title: 'Choose the right next investment.',
        summary:
          'We connect business requirements with practical system options, so decisions go beyond software features and product demonstrations.',
        image: 'digital-workplace',
        alt: 'Team collaborating on a technology project',
        focus: [
          'IT strategy and modernization roadmaps',
          'ERP, CRM, and application evaluation',
          'Integration and ownership requirements',
        ],
      },
      {
        label: 'CLOUD & DATA',
        title: 'Build a reliable foundation.',
        summary:
          'We review infrastructure, information flows, and governance to identify what needs attention before a migration or wider rollout.',
        image: 'data-center',
        alt: 'Enterprise data center server racks',
        focus: [
          'Cloud readiness and migration planning',
          'Data quality and reporting needs',
          'Security and governance considerations',
        ],
      },
    ],
    deliverables: [
      {
        title: 'A current-state assessment',
        text: 'Your systems, dependencies, and priority gaps in one clear view.',
      },
      {
        title: 'A practical options review',
        text: 'Requirements and tradeoffs to guide a technology decision.',
      },
      {
        title: 'A sequenced roadmap',
        text: 'Recommended next steps, responsibilities, and decision points.',
      },
    ],
  },
  'manufacturing-consulting': {
    summary:
      'Improve production flow, planning, and operational visibility. We help identify the constraints behind delays, rework, and inconsistent processes.',
    positioning: 'A clearer view of your operation.',
    lead: 'Understand where production slows down and which improvements deserve attention first.',
    chapters: [
      {
        label: 'PROCESS IMPROVEMENT',
        title: 'Find the bottleneck. Plan the change.',
        summary:
          'We follow the workflow with your operations team, review recurring exceptions, and identify improvements suited to the production environment.',
        image: 'engineering-planning',
        alt: 'Engineer reviewing technical production drawings',
        focus: [
          'Workflow and bottleneck assessment',
          'Lean practices and standard work',
          'Capacity and production planning',
        ],
      },
      {
        label: 'OPERATIONAL VISIBILITY',
        title: 'Make shop-floor information useful.',
        summary:
          'We define the measures, data collection, and review routines that help teams understand production and quality performance.',
        image: 'industrial-engineering',
        alt: 'Engineer inspecting an electronic component',
        focus: [
          'Production and quality measures',
          'Shop-floor data capture',
          'Practical digitization priorities',
        ],
      },
    ],
    deliverables: [
      {
        title: 'A process assessment',
        text: 'A clear picture of constraints, handoffs, and recurring exceptions.',
      },
      {
        title: 'An improvement plan',
        text: 'Priorities based on operational impact, effort, and dependencies.',
      },
      {
        title: 'A review framework',
        text: 'Useful measures, ownership, and a routine for reviewing progress.',
      },
    ],
  },
  'fmcg-consulting': {
    summary:
      'Connect sales, distribution, and supply planning. We help consumer goods businesses improve the handoffs that affect product availability and commercial execution.',
    positioning: 'From demand to distribution.',
    lead: 'See where sales plans, stock availability, and channel execution become disconnected.',
    chapters: [
      {
        label: 'ROUTE TO MARKET',
        title: 'Strengthen the route to your customer.',
        summary:
          'We examine sales coverage, distributor responsibilities, and service requirements to identify practical channel improvements.',
        image: 'retail-distribution',
        alt: 'Products arranged for customers in a retail store',
        focus: [
          'Channel and distributor assessment',
          'Sales coverage and service planning',
          'Commercial performance reporting',
        ],
      },
      {
        label: 'SUPPLY & INVENTORY',
        title: 'Coordinate the plan with the stock.',
        summary:
          'We review how demand assumptions, promotions, replenishment, and warehouse processes connect, then clarify requirements for better information flow.',
        image: 'global-logistics',
        alt: 'Organized shipping containers at a logistics terminal',
        focus: [
          'Demand and inventory coordination',
          'Warehousing and order fulfillment',
          'Distribution systems and sales automation',
        ],
      },
    ],
    deliverables: [
      {
        title: 'A channel assessment',
        text: 'Coverage, service requirements, and gaps across your distribution network.',
      },
      {
        title: 'An operating roadmap',
        text: 'Prioritized actions across sales, stock, and supply planning.',
      },
      {
        title: 'Reporting requirements',
        text: 'Shared measures and responsibilities for commercial reviews.',
      },
    ],
  },
  'education-consulting': {
    summary:
      'Support institutional improvement with clearer processes and better technology choices. We advise schools, colleges, training providers, and other educational organizations.',
    positioning: 'Stronger systems behind learning.',
    lead: 'Connect institutional priorities with the everyday needs of students, educators, and administrators.',
    chapters: [
      {
        label: 'INSTITUTIONAL OPERATIONS',
        title: 'Make administration easier to navigate.',
        summary:
          'We review the student lifecycle and institutional workflows to identify duplicated work, unclear responsibilities, and information gaps.',
        image: 'university-campus',
        alt: 'Educational institution campus and shared spaces',
        focus: [
          'Institutional development priorities',
          'Admissions and student lifecycle workflows',
          'Resource planning and process ownership',
        ],
      },
      {
        label: 'DIGITAL EDUCATION',
        title: 'Choose tools around teaching needs.',
        summary:
          'We assess learning and administrative platforms against user requirements, accessibility, integration needs, and the support required for adoption.',
        image: 'university-library',
        alt: 'Library resources supporting teaching and learning',
        focus: [
          'LMS and student information systems',
          'Digital readiness and integration',
          'Staff support and change planning',
        ],
      },
    ],
    deliverables: [
      {
        title: 'A workflow assessment',
        text: 'Selected academic and administrative processes, with clear improvement opportunities.',
      },
      {
        title: 'Technology requirements',
        text: 'User needs and criteria for evaluating institutional systems.',
      },
      {
        title: 'A phased roadmap',
        text: 'Priorities, responsibilities, and adoption requirements for planned changes.',
      },
    ],
  },
  'technology-automation': {
    summary:
      'Find the work worth automating. We assess workflows, compare options, and plan automation with clear ownership and appropriate human oversight.',
    positioning: 'Automate the right work.',
    lead: 'Start with the process, its exceptions, and the people responsible for it.',
    chapters: [
      {
        label: 'WORKFLOW & INTEGRATION',
        title: 'Understand the task before the tool.',
        summary:
          'We map manual handoffs and repetitive steps, then assess whether simplification, integration, or automation is the most suitable response.',
        image: 'business-analytics',
        alt: 'Business information being reviewed on a laptop',
        focus: [
          'Process mapping and suitability reviews',
          'Workflow and API integration planning',
          'RPA feasibility and use-case priorities',
        ],
      },
      {
        label: 'RESPONSIBLE AUTOMATION',
        title: 'Plan for the exceptions, too.',
        summary:
          'We define review points, fallback procedures, and support responsibilities for AI-assisted workflows and industrial automation opportunities.',
        image: 'performance-reporting',
        alt: 'Operational reporting displayed on a monitor',
        focus: [
          'Document processing and decision support',
          'Operational monitoring and data capture',
          'Human review and accountable ownership',
        ],
      },
    ],
    deliverables: [
      {
        title: 'An opportunity assessment',
        text: 'Suitable processes, key constraints, and risks to address.',
      },
      {
        title: 'A prioritized use-case list',
        text: 'Options compared by value, feasibility, and implementation effort.',
      },
      {
        title: 'A pilot plan',
        text: 'Scope, acceptance criteria, review points, and fallback procedures.',
      },
    ],
  },
  'business-strategy': {
    summary:
      'Choose where to focus and how to follow through. We test assumptions, connect market opportunities with internal capacity, and turn priorities into an owned plan.',
    positioning: 'Direction that leads to decisions.',
    lead: 'Bring the choices, tradeoffs, and people needed to deliver a strategy into the same conversation.',
    chapters: [
      {
        label: 'STRATEGIC CHOICES',
        title: 'Focus on the opportunities that fit.',
        summary:
          'We examine customer needs, market evidence, and organizational strengths before comparing growth options. The result is a clearer basis for saying yes, no, or not yet.',
        image: 'strategy-planning',
        alt: 'Two professionals working through a plan on a whiteboard',
        focus: ['Market and customer questions', 'Capability and resource constraints', 'Explicit strategic tradeoffs'],
      },
      {
        label: 'EXECUTION & OWNERSHIP',
        title: 'Make the next steps visible.',
        summary:
          'We translate direction into a sequence of initiatives with owners, dependencies, and review points, so the plan can guide day-to-day decisions.',
        image: 'strategy-priorities',
        alt: 'Colleagues arranging priorities on a whiteboard with sticky notes',
        focus: ['Operating model and decision rights', 'Initiative sequencing', 'Measures and management reviews'],
      },
    ],
    deliverables: [
      { title: 'A strategic assessment', text: 'The choices to make, evidence available, and assumptions to test.' },
      { title: 'A focused direction', text: 'Priorities and tradeoffs linked to your capabilities and goals.' },
      { title: 'An execution roadmap', text: 'Owners, dependencies, milestones, and review points for the agreed plan.' },
    ],
  },
  'data-analytics-ai': {
    summary:
      'Use data to answer real business questions. We assess information quality, shape useful reporting, and evaluate AI opportunities with clear controls and success criteria.',
    positioning: 'Clarity before the model.',
    lead: 'Start with the decision to improve, then examine whether the data and approach are fit for that purpose.',
    chapters: [
      {
        label: 'DATA FOUNDATIONS',
        title: 'Make information dependable.',
        summary:
          'We trace important data back to its source, compare definitions across teams, and identify gaps that would weaken reporting or an AI pilot.',
        image: 'analytics-data',
        alt: 'Laptop displaying data charts beside a working notebook',
        focus: ['Data sources and definitions', 'Quality and ownership', 'Decision-focused reporting requirements'],
      },
      {
        label: 'AI WITH PURPOSE',
        title: 'Test a use case before scaling it.',
        summary:
          'We frame a bounded problem, set evaluation criteria, and define where people review outputs and handle exceptions.',
        image: 'analytics-ai',
        alt: 'Laptop showing a coding and data analysis interface',
        focus: ['Feasibility and risk assessment', 'Pilot measures and baselines', 'Human review and monitoring'],
      },
    ],
    deliverables: [
      { title: 'A data readiness review', text: 'Key sources, quality issues, definitions, and ownership gaps.' },
      { title: 'An analytics brief', text: 'The questions, measures, and reporting needs that matter to users.' },
      { title: 'An AI pilot plan', text: 'A bounded use case with evaluation, oversight, and decision points.' },
    ],
  },
  'supply-chain-operations': {
    summary:
      'Improve the flow of goods and information from suppliers to customers. We map constraints, clarify responsibilities, and prioritize changes to planning and fulfillment.',
    positioning: 'See the whole flow.',
    lead: 'Find the handoffs behind shortages, delays, and avoidable work before choosing the next improvement.',
    chapters: [
      {
        label: 'PLANNING & SUPPLY',
        title: 'Connect demand to available capacity.',
        summary:
          'We review forecasting, supplier commitments, lead times, and planning routines to understand where expectations diverge from reality.',
        image: 'supply-flow',
        alt: 'Shipping containers and cranes at a working port',
        focus: ['Demand and supply planning', 'Supplier lead-time visibility', 'Capacity and risk scenarios'],
      },
      {
        label: 'INVENTORY & DELIVERY',
        title: 'Follow the order to the customer.',
        summary:
          'We trace stock and orders through receiving, storage, picking, and fulfillment, then identify the exceptions and measures that need attention.',
        image: 'supply-inventory',
        alt: 'Warehouse employees discussing logistics around a forklift',
        focus: ['Inventory and replenishment rules', 'Warehouse handoffs', 'Order and service performance'],
      },
    ],
    deliverables: [
      { title: 'A flow assessment', text: 'Constraints and responsibilities across supply, stock, and delivery.' },
      { title: 'An improvement plan', text: 'Priorities based on service impact, feasibility, and dependencies.' },
      { title: 'A review framework', text: 'Shared measures and routines for availability, lead time, and exceptions.' },
    ],
  },
};
