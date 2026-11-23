import { Monitor, Factory, Package, GraduationCap, Workflow } from 'lucide-react';
export const services = [
  {
    slug: 'it-consulting',
    name: 'IT Consulting',
    shortName: 'Information technology',
    icon: Monitor,
    image: 'technology',
    alt: 'Technology colleagues discussing work on laptops through a glass meeting room wall',
    coverImage: 'it-advisory-cover',
    coverAlt: 'Server racks with connected electronic components and network wiring',
    description: 'Make technology decisions that move your business forward.',
    headline: 'Technology decisions. Business clarity.',
    intro:
      'Connect your systems, infrastructure, and technology investments with the priorities that matter to your organization. We assess where you are and help define a practical way forward.',
    tags: ['IT strategy', 'Digital transformation', 'Cloud advisory'],
    context:
      'For organizations balancing legacy systems, growing data needs, and new ways of working, technology choices are business choices. A clear view of dependencies helps teams invest with purpose.',
    challenges: [
      'Disconnected systems and duplicate data entry',
      'Legacy applications that constrain change',
      'Unclear ownership of technology priorities',
      'Infrastructure that needs to grow with demand',
    ],
    capabilities: [
      {
        title: 'IT advisory',
        text: 'Create a shared direction for technology decisions.',
        items: [
          'IT strategy and roadmap development',
          'Technology environment assessments',
          'Architecture planning',
          'IT governance considerations',
        ],
      },
      {
        title: 'Digital transformation',
        text: 'Understand readiness before committing to change.',
        items: [
          'Digital readiness assessments',
          'Business process digitization',
          'Legacy modernization planning',
          'Technology adoption roadmaps',
        ],
      },
      {
        title: 'Infrastructure & cloud',
        text: 'Plan resilient infrastructure around operational needs.',
        items: [
          'Infrastructure assessment',
          'Cloud readiness evaluation',
          'Migration planning',
          'Technology scalability',
        ],
      },
      {
        title: 'Enterprise applications',
        text: 'Assess how core applications support your teams.',
        items: [
          'ERP evaluation and advisory',
          'CRM solution assessment',
          'Application integration planning',
          'System optimization recommendations',
        ],
      },
      {
        title: 'Data & information',
        text: 'Build a foundation for useful, dependable reporting.',
        items: [
          'Data governance planning',
          'Reporting architecture',
          'Data integration assessment',
          'Analytics readiness',
        ],
      },
      {
        title: 'Cybersecurity advisory',
        text: 'Make security considerations part of technology planning.',
        items: [
          'Security posture assessments',
          'Risk identification',
          'Security governance recommendations',
          'Compliance readiness support',
        ],
      },
    ],
    outcomes: [
      'A prioritized technology roadmap',
      'Clearer system ownership and dependencies',
      'Better-informed platform and infrastructure decisions',
    ],
    faq: [
      [
        'How is the scope of an IT assessment agreed?',
        'We begin with business objectives, the systems in scope, available documentation, and stakeholder needs. The engagement proposal defines the assessment boundaries, deliverables, and responsibilities.',
      ],
      [
        'Can you advise without replacing our existing systems?',
        'Yes. An assessment may identify configuration, integration, governance, or process improvements that make better use of your current technology. Replacement is one option, rather than the starting assumption.',
      ],
      [
        'Is cybersecurity advisory a certified audit?',
        'Our advisory scope covers risk identification and planning. A certified audit or regulated assessment requires an appropriately qualified specialist and a separately agreed scope.',
      ],
    ],
  },
  {
    slug: 'manufacturing-consulting',
    name: 'Manufacturing Consulting',
    shortName: 'Manufacturing',
    icon: Factory,
    image: 'manufacturing',
    alt: 'Industrial production facility with manufacturing equipment',
    coverImage: 'manufacturing-cover',
    coverAlt: 'Orange robotic arms working along an industrial manufacturing line',
    description: 'Build more efficient, visible, and consistent operations.',
    headline: 'Better processes. Stronger manufacturing.',
    intro:
      'Understand what happens between planning and production. We help manufacturing organizations assess workflows, identify constraints, and develop practical improvement plans.',
    tags: ['Operational excellence', 'Lean processes', 'Smart manufacturing'],
    context:
      'Manufacturing teams work across tightly connected production, quality, maintenance, and supply processes. Improving one area requires understanding its effect on the whole operation.',
    challenges: [
      'Bottlenecks and unpredictable production flow',
      'Limited shop-floor performance visibility',
      'Excess stock alongside material shortages',
      'Inconsistent processes and recurring quality issues',
    ],
    capabilities: [
      {
        title: 'Operational excellence',
        text: 'See how work flows, and where it slows down.',
        items: [
          'Process efficiency assessment',
          'Workflow optimization',
          'Productivity improvement initiatives',
          'Continuous improvement planning',
        ],
      },
      {
        title: 'Lean manufacturing',
        text: 'Focus effort on activities that create value.',
        items: [
          'Waste identification',
          'Value stream mapping',
          'Process standardization',
          'Lean adoption roadmaps',
        ],
      },
      {
        title: 'Supply chain & inventory',
        text: 'Connect material availability with production needs.',
        items: [
          'Inventory process assessment',
          'Supply chain visibility',
          'Procurement workflow evaluation',
          'Demand and supply coordination',
        ],
      },
      {
        title: 'Production planning',
        text: 'Create a clearer picture of demand and capacity.',
        items: [
          'Production scheduling assessment',
          'Capacity planning',
          'Resource utilization',
          'Bottleneck analysis',
        ],
      },
      {
        title: 'Quality management',
        text: 'Address process causes behind quality variation.',
        items: [
          'Quality process assessment',
          'Root cause analysis',
          'Standard operating procedure improvement',
          'Quality monitoring recommendations',
        ],
      },
      {
        title: 'Smart manufacturing',
        text: 'Assess where digital tools can support operations.',
        items: [
          'Industry 4.0 readiness',
          'Industrial IoT opportunities',
          'Shop-floor digitization',
          'Manufacturing analytics planning',
        ],
      },
    ],
    outcomes: [
      'A clearer view of production constraints',
      'Practical priorities for process improvement',
      'A baseline for monitoring operational performance',
    ],
    faq: [
      [
        'Do we need to digitize the factory first?',
        'No. Process mapping and observation can reveal valuable improvements before new systems are introduced. Digital options should respond to a defined operational need.',
      ],
      [
        'Will an assessment disrupt production?',
        'Access and observation are planned with your operations team. Site safety, production schedules, and confidentiality requirements are included in the engagement plan.',
      ],
      [
        'How are improvement priorities selected?',
        'We consider the operational impact, implementation effort, safety, dependencies, and available evidence. Recommendations are discussed with the people responsible for the process.',
      ],
    ],
  },
  {
    slug: 'fmcg-consulting',
    name: 'FMCG Consulting',
    shortName: 'FMCG & consumer goods',
    icon: Package,
    image: 'fmcg',
    alt: 'Organized warehouse and distribution facility',
    coverImage: 'fmcg-cover',
    coverAlt: 'Supermarket aisle with shelves of packaged consumer goods',
    description: 'Connect supply, distribution, and commercial execution.',
    headline: 'From supply chain to shelf. With clarity.',
    intro:
      'Navigate distribution complexity, changing demand, and day-to-day commercial operations with a more connected view of your FMCG business.',
    tags: ['Route to market', 'Supply chain', 'Commercial operations'],
    context:
      'Consumer goods businesses coordinate product availability, channel needs, and customer expectations. Practical consulting examines the handoffs between these functions, rather than treating them in isolation.',
    challenges: [
      'Uneven sales coverage across channels',
      'Demand plans disconnected from actual orders',
      'Limited distributor and stock visibility',
      'Trade activity without clear evaluation criteria',
    ],
    capabilities: [
      {
        title: 'Business strategy',
        text: 'Connect commercial ambitions to operational choices.',
        items: [
          'Business model assessment',
          'Market opportunity analysis',
          'Category planning',
          'Growth strategy support',
        ],
      },
      {
        title: 'Distribution & channels',
        text: 'Understand how products reach the right outlets.',
        items: [
          'Channel performance evaluation',
          'Distributor network analysis',
          'Route-to-market planning',
          'Sales coverage improvement',
        ],
      },
      {
        title: 'Supply chain planning',
        text: 'Improve coordination from forecast to fulfillment.',
        items: [
          'Demand forecasting process assessment',
          'Inventory management',
          'Warehousing process analysis',
          'Supply chain coordination',
        ],
      },
      {
        title: 'Sales & commercial operations',
        text: 'Give sales teams clearer processes and information.',
        items: [
          'Sales process improvement',
          'Sales performance reporting',
          'Trade promotion planning',
          'Commercial execution support',
        ],
      },
      {
        title: 'Consumer & market insights',
        text: 'Frame research around decisions you need to make.',
        items: [
          'Customer segmentation',
          'Consumer behavior research planning',
          'Market trend analysis',
          'Product portfolio evaluation',
        ],
      },
      {
        title: 'Digital transformation',
        text: 'Identify practical tools for connected execution.',
        items: [
          'Sales automation opportunities',
          'Distribution management systems',
          'Reporting and analytics',
          'Operational workflow digitization',
        ],
      },
    ],
    outcomes: [
      'Better-defined channel and distribution priorities',
      'More coordinated demand and inventory planning',
      'Clearer commercial performance measures',
    ],
    faq: [
      [
        'Can you assess our existing distributor network?',
        'An agreed assessment can examine coverage, service levels, stock availability, information flow, and commercial responsibilities using your available data and stakeholder input.',
      ],
      [
        'Do you conduct consumer research?',
        'We can help define research questions, segmentation, and a research plan. Fieldwork, specialist research partners, and commercial terms are agreed separately when needed.',
      ],
      [
        'How do you approach distribution technology?',
        'We first map information gaps and user needs. System evaluation follows defined requirements for order capture, inventory visibility, reporting, and integration.',
      ],
    ],
  },
  {
    slug: 'education-consulting',
    name: 'Education Consulting',
    shortName: 'Education',
    icon: GraduationCap,
    image: 'education',
    alt: 'Adult learners attending a professional classroom presentation',
    coverImage: 'education-cover',
    coverAlt: 'Students and a lecturer discussing a topic in a university classroom',
    description: 'Support institutions, educators, and better ways of working.',
    headline: 'Stronger institutions. Thoughtful change.',
    intro:
      'Bring clarity to institutional planning, academic workflows, and digital education. We support schools, colleges, training providers, and educational organizations in planning practical improvements.',
    tags: ['Institutional strategy', 'Digital learning', 'Process improvement'],
    context:
      'Educational institutions need to balance academic purpose with complex administrative requirements. Improvement planning should respect the needs of students, educators, and institutional leaders.',
    challenges: [
      'Fragmented student and administrative workflows',
      'Digital tools with inconsistent adoption',
      'Resource planning across competing priorities',
      'Limited visibility into institutional objectives',
    ],
    capabilities: [
      {
        title: 'Institutional strategy',
        text: 'Translate institutional goals into an achievable plan.',
        items: [
          'Institutional development planning',
          'Operational assessments',
          'Strategic goal setting',
          'Organizational improvement',
        ],
      },
      {
        title: 'Digital education',
        text: 'Plan digital learning around teaching needs.',
        items: [
          'Digital learning readiness',
          'Learning management system evaluation',
          'Education technology planning',
          'Digital administration workflows',
        ],
      },
      {
        title: 'Academic processes',
        text: 'Support consistent and manageable academic delivery.',
        items: [
          'Academic workflow assessment',
          'Learning delivery process optimization',
          'Curriculum review support',
          'Performance measurement planning',
        ],
      },
      {
        title: 'Administration & operations',
        text: 'Review the processes behind the student experience.',
        items: [
          'Student lifecycle workflows',
          'Admission process assessment',
          'Administrative efficiency',
          'Resource planning',
        ],
      },
      {
        title: 'Technology integration',
        text: 'Connect institutional information and systems.',
        items: [
          'ERP and student information system advisory',
          'LMS integration planning',
          'Digital communication systems',
          'Education data management',
        ],
      },
      {
        title: 'Institutional development',
        text: 'Make change manageable for the people involved.',
        items: [
          'Program development support',
          'Student engagement strategies',
          'Staff capability development planning',
          'Change management',
        ],
      },
    ],
    outcomes: [
      'A shared institutional improvement roadmap',
      'Clearer academic and administrative responsibilities',
      'Technology choices aligned with teaching and service needs',
    ],
    faq: [
      [
        'Which types of institutions can engage?',
        'The service is designed for schools, colleges, training providers, and other educational organizations. Suitability and scope are discussed against the institution’s specific needs.',
      ],
      [
        'Do you guarantee accreditation or student outcomes?',
        'No. Advisory work supports planning and process improvement. Accreditation decisions and student outcomes depend on many factors outside a consulting engagement.',
      ],
      [
        'How do you approach education technology?',
        'We assess users, accessibility, existing systems, data needs, and teaching requirements before evaluating platforms. Adoption and staff support form part of the plan.',
      ],
    ],
  },
  {
    slug: 'technology-automation',
    name: 'Technology & Automation Consulting',
    shortName: 'Technology & automation',
    icon: Workflow,
    image: 'automation',
    alt: 'Industrial automation machinery and connected production systems',
    coverImage: 'automation-cover',
    coverAlt: 'Connected controllers and wiring inside an industrial automation cabinet',
    description: 'Turn repetitive work into opportunities for improvement.',
    headline: 'Practical automation. People at the center.',
    intro:
      'Find out where automation can make a useful difference. We assess operational workflows, evaluate feasibility, and plan changes with the people who will use and oversee them.',
    tags: ['Workflow automation', 'Systems integration', 'Intelligent automation'],
    context:
      'While IT consulting considers enterprise systems and technology direction, automation consulting focuses on how individual workflows operate. Sometimes a simpler process is the right answer; sometimes automation is appropriate.',
    challenges: [
      'Repetitive manual tasks and information handoffs',
      'Automation ideas without clear business ownership',
      'Disconnected applications and duplicate records',
      'Unclear exception handling and human oversight',
    ],
    capabilities: [
      {
        title: 'Business process automation',
        text: 'Understand a workflow before automating it.',
        items: [
          'Repetitive workflow assessment',
          'Process mapping',
          'Automation opportunity identification',
          'Workflow automation planning',
        ],
      },
      {
        title: 'Robotic process automation',
        text: 'Evaluate suitability beyond the initial demonstration.',
        items: [
          'RPA feasibility studies',
          'Use-case prioritization',
          'Process suitability evaluation',
          'Automation rollout roadmaps',
        ],
      },
      {
        title: 'Intelligent automation',
        text: 'Plan AI-assisted work with appropriate review.',
        items: [
          'AI-assisted workflow opportunities',
          'Document processing automation',
          'Decision-support systems',
          'Human oversight and governance',
        ],
      },
      {
        title: 'Industrial automation',
        text: 'Assess connected operations in their working environment.',
        items: [
          'Industrial automation readiness',
          'Equipment and system integration planning',
          'Process monitoring',
          'Operational data capture',
        ],
      },
      {
        title: 'Systems integration',
        text: 'Reduce gaps between applications and workflows.',
        items: [
          'API integration planning',
          'Cross-platform workflow connectivity',
          'Business application integration',
          'Data synchronization strategies',
        ],
      },
      {
        title: 'Automation strategy',
        text: 'Choose a manageable portfolio of improvements.',
        items: [
          'Automation maturity assessments',
          'Prioritization by business value',
          'Risk and feasibility evaluation',
          'Implementation planning',
        ],
      },
    ],
    outcomes: [
      'A prioritized set of suitable automation use cases',
      'Clearer exception handling and human oversight',
      'A practical pilot and rollout plan',
    ],
    faq: [
      [
        'Should every repetitive task be automated?',
        'No. We consider process stability, volume, exceptions, data quality, risk, and maintenance. Simplification or clearer responsibilities may be more appropriate.',
      ],
      [
        'How is this different from IT consulting?',
        'IT consulting addresses enterprise technology strategy, infrastructure, applications, and governance. Automation consulting focuses on specific business or industrial workflows and the feasibility of automating them.',
      ],
      [
        'How do people stay involved?',
        'Plans should define ownership, training, review points, exception handling, and fallback procedures. High-impact decisions need appropriate human oversight.',
      ],
    ],
  },
] as const;
export type Service = (typeof services)[number];
export const servicePath = (s: Pick<Service, 'slug'>) => `/services/${s.slug}`;
