export const insights = [
  {
    slug: 'practical-digital-transformation-roadmap',
    title: 'Building a practical digital transformation roadmap',
    category: 'Technology',
    image: 'technology',
    summary:
      'Start with business priorities, understand your current state, and turn a long list of ideas into a plan your team can act on.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Start with the work, rather than the technology',
        'A digital transformation roadmap is most useful when it begins with an operational question. Where do teams lose time? Which customer interactions are difficult to manage? What information is missing when a decision needs to be made? Capture a small number of priorities in plain language before discussing platforms.',
      ],
      [
        'Map the current state',
        'Bring together process owners, technology teams, and the people doing the work. Document the systems, manual handoffs, data sources, and recurring exceptions involved. Include existing strengths: a roadmap should preserve what works and address specific constraints.',
      ],
      [
        'Prioritize with explicit criteria',
        'Evaluate ideas against business value, feasibility, dependencies, adoption effort, and risk. Avoid prioritizing only by the appeal of a new tool. A modest integration that removes a repeated bottleneck may deserve attention before a large platform replacement.',
      ],
      [
        'Sequence change into manageable stages',
        'Define an initial discovery or pilot stage, followed by clear decision points. Assign an owner, describe the expected deliverable, and identify what evidence would justify moving forward. Include training, process updates, security review, and operational support in the plan.',
      ],
      [
        'Keep the roadmap open to evidence',
        'Review priorities as teams learn. Track a small set of relevant measures, such as processing time, exception volume, or reporting availability. Measures should have a documented baseline and an owner. A useful roadmap guides decisions while allowing responsible changes in direction.',
      ],
    ],
  },
  {
    slug: 'manufacturing-process-visibility',
    title: 'Better decisions begin with process visibility',
    category: 'Manufacturing',
    image: 'manufacturing',
    summary:
      'A practical look at the information, handoffs, and measures that help teams understand what is happening on the factory floor.',
    readTime: '4 min read',
    date: '2026-11-23',
    sections: [
      [
        'Follow one production flow',
        'Select a representative product or process and trace it from order release to completion. Record where work waits, changes hands, or returns for correction. Discuss observations with operators and supervisors before drawing conclusions.',
      ],
      [
        'Distinguish data from useful information',
        'A large volume of machine data does not automatically explain a production constraint. Decide which questions need answers: why a schedule changed, where work accumulated, or what caused a quality exception. Select measures that relate directly to those questions.',
      ],
      [
        'Agree definitions and ownership',
        'Terms such as downtime, rework, and output can be recorded differently across shifts. Agree definitions, collection methods, and review responsibilities. Consistent information is more useful than a sophisticated dashboard built on conflicting assumptions.',
      ],
      [
        'Improve the feedback loop',
        'Create a regular review where teams can connect observed problems with actions and owners. Start with a manageable set of measures and refine them as understanding improves. Digitization can support this process once the information requirements are clear.',
      ],
    ],
  },
  {
    slug: 'fmcg-distribution-planning',
    title: 'Rethinking the route from supply chain to shelf',
    category: 'FMCG',
    image: 'fmcg',
    summary:
      'Connect channel coverage, stock availability, and information flow when reviewing your distribution model.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Define the service you need to deliver',
        'Distribution planning starts with the outlets and customers you intend to serve. Consider order patterns, delivery frequency, product handling requirements, and the economics of each channel. A single model may not suit every part of the market.',
      ],
      [
        'Understand coverage and availability together',
        'An outlet can be listed as covered while the right stock is unavailable. Review sales activity, order fulfillment, stock visibility, and service exceptions together. Identify whether a gap comes from planning, execution, or information quality.',
      ],
      [
        'Examine distributor handoffs',
        'Clarify who owns forecasts, order capture, returns, stock reconciliation, and performance reviews. Where information is exchanged manually, look for delays and inconsistencies before selecting new software.',
      ],
      [
        'Build a testable improvement plan',
        'Choose a defined geography, channel, or product group for an initial change. Agree measures and responsibilities, review the effect, and account for seasonal or promotional factors. Expand the approach when the evidence supports it.',
      ],
    ],
  },
  {
    slug: 'digital-opportunities-in-education',
    title: 'A thoughtful approach to digital change in education',
    category: 'Education',
    image: 'education',
    summary:
      'Bring teaching needs, administrative workflows, accessibility, and adoption into the same conversation.',
    readTime: '4 min read',
    date: '2026-11-23',
    sections: [
      [
        'Listen to different institutional users',
        'Students, teaching staff, administrators, and institutional leaders experience the same system differently. Gather their needs through focused discussions and workflow reviews. Distinguish essential requirements from conveniences.',
      ],
      [
        'Review the complete student journey',
        'Look at admissions, enrollment, teaching delivery, assessments, support, and records. Identify where a student or staff member must repeat information, switch tools, or wait for an approval. These handoffs often reveal useful improvement opportunities.',
      ],
      [
        'Plan for accessibility and adoption',
        'Evaluate accessibility, device availability, connectivity, staff training, and support arrangements alongside software features. A platform that is difficult to use can create additional administrative work even when its features appear suitable.',
      ],
      [
        'Introduce change with clear ownership',
        'Select a manageable initial scope, define who supports users, and establish feedback channels. Review what works before extending the rollout. Institutional change needs time for people to learn and adapt.',
      ],
    ],
  },
  {
    slug: 'processes-suitable-for-automation',
    title: 'Which business processes are ready for automation?',
    category: 'Automation',
    image: 'automation',
    summary:
      'Assess stability, exceptions, data quality, and oversight before committing to an automation initiative.',
    readTime: '4 min read',
    date: '2026-11-23',
    sections: [
      [
        'Ask whether the process should change first',
        'Automating an unclear process can reproduce its problems faster. Map the steps, remove unnecessary handoffs, and clarify ownership before considering tools. Sometimes process simplification delivers the most appropriate improvement.',
      ],
      [
        'Check suitability in real conditions',
        'Consider transaction volume, rule stability, input quality, exception frequency, and system access. A process that works in a controlled demonstration may behave differently when documents vary or information is incomplete.',
      ],
      [
        'Design for exceptions and accountability',
        'Specify what happens when an automation cannot proceed. Define a responsible owner, a human review path, audit information, and a safe fallback. For AI-assisted work, consider uncertainty and the consequences of an incorrect output.',
      ],
      [
        'Pilot with meaningful measures',
        'Choose a bounded use case and compare its behavior with an agreed baseline. Include maintenance, review time, and operational support in the assessment. Progress to wider use only after considering the evidence and remaining risks.',
      ],
    ],
  },
] as const;
