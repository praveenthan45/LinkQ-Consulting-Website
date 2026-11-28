import dailyInsights from './dailyInsights.json';

export interface InsightArticleData {
  slug: string;
  title: string;
  category:
    | 'Industry Trends'
    | 'Technology & AI'
    | 'Business Strategy'
    | 'Operations & Supply Chain'
    | 'Case Studies'
    | 'Research & Reports';
  image: string;
  imageAlt: string;
  summary: string;
  readTime: string;
  date: string;
  sections: [string, string][];
  keyTakeaways: string[];
  relatedServices: string[];
  relatedArticles: string[];
  source?: { publisher: string; url: string; date: string };
  sources?: { publisher: string; title: string; url: string; date?: string }[];
  imageCredit?: { title: string; creator: string; url: string; licenseUrl: string };
  aiGenerated?: boolean;
}

const rawInsights: InsightArticleData[] = [
  // 1. Industry Trends
  {
    slug: 'future-of-ai-in-manufacturing',
    title: 'The Future of AI in Manufacturing: From Pilots to Shop-Floor Reality',
    category: 'Industry Trends',
    image: 'insight-manufacturing',
    imageAlt: 'Industrial manufacturing machinery and digital automation interface',
    summary:
      'Explore how industrial manufacturers are moving beyond experimental AI proofs-of-concept to deploy scalable computer vision, predictive maintenance, and real-time yield optimization.',
    readTime: '6 min read',
    date: '2026-11-23',
    sections: [
      [
        'The Shift from Experimental Pilots to Industrial Scale',
        'For years, artificial intelligence in manufacturing remained confined to isolated proof-of-concept projects that rarely transitioned into daily plant operations. Today, progressive discrete and process manufacturers are shifting focus toward scalable, enterprise-wide deployments that solve concrete mechanical and operational constraints.',
      ],
      [
        'Machine Vision in Real-Time Quality Inspection',
        'Traditional manual visual inspection is prone to operator fatigue and inconsistent quality scoring. Modern edge-compute computer vision systems inspect assemblies at line speeds, flagging micro-defects, surface irregularities, and incorrect component placement before items advance to final packaging.',
      ],
      [
        'Predictive Maintenance Grounded in Telemetry',
        'Rather than relying on calendar-based preventive maintenance schedules, AI models ingest real-time vibration, temperature, and electrical current telemetry. By identifying subtle anomaly signatures days before mechanical failure, maintenance teams prevent catastrophic unplanned downtime.',
      ],
      [
        'Operational Integration & Workforce Enablement',
        'The ultimate determinant of AI success on the factory floor is human adoption. AI-generated insights must integrate into supervisor shift-handover routines and operator andon dashboards. Technology must empower line operators rather than creating opaque algorithmic friction.',
      ],
    ],
    keyTakeaways: [
      'Focus AI initiatives on high-cost mechanical failure points and scrap bottlenecks rather than novelty use cases.',
      'Deploy inference models at the industrial edge to ensure millisecond response times independent of cloud latency.',
      'Train shop-floor operators and supervisors to interpret algorithmic alerts as standard operating inputs.',
    ],
    relatedServices: ['manufacturing-consulting', 'technology-automation', 'data-analytics-ai'],
    relatedArticles: ['manufacturing-process-visibility', 'processes-suitable-for-automation'],
  },
  {
    slug: 'fmcg-distribution-planning',
    title: 'Rethinking the Route from Supply Chain to Shelf in FMCG',
    category: 'Industry Trends',
    image: 'insight-fmcg',
    imageAlt: 'Chilled consumer products arranged neatly on supermarket retail shelves',
    summary:
      'Connect channel coverage, stock availability, and distributor data to eliminate retail stockouts and preserve operating margins.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Define the Service You Need to Deliver',
        'Modern FMCG distribution requires balancing traditional general trade mom-and-pop stores with modern trade supermarkets and direct-to-consumer digital channels. A monolithic distribution strategy inevitably leaves regional demand underserved or incurs unsustainable logistics overhead.',
      ],
      [
        'Understand Coverage and Availability Together',
        'An outlet listed as formally "covered" in a CRM often experiences stockouts on key promotional SKUs. FMCG leaders must track on-shelf availability in tandem with primary-to-secondary distributor sell-through rates to uncover distribution bottlenecks.',
      ],
      [
        'Automate Distributor Handshake Points',
        'Manual order sheets and delayed stock reports generate phantom inventory buffers. Implementing unified cloud distributor management systems (DMS) enables real-time depletion visibility and automated replenishment order generation.',
      ],
      [
        'Execute Phased Commercial Interventions',
        'Transform route-to-market policies in defined geographical test zones. Measure the impact on on-time delivery, distributor working capital, and retail compliance before rolling out new terms across nationwide dealer networks.',
      ],
    ],
    keyTakeaways: [
      'Track on-shelf availability rather than warehouse dispatch metrics to assess true fulfillment health.',
      'Harmonize commercial promotional calendars with factory production lead times to prevent stockouts.',
      'Incentivize distributors based on sell-through velocity and inventory accuracy rather than wholesale loading.',
    ],
    relatedServices: ['fmcg-consulting', 'supply-chain-operations', 'business-strategy'],
    relatedArticles: ['handoffs-behind-supply-chain-delays', 'building-resilient-supply-chain'],
  },
  {
    slug: 'digital-opportunities-in-education',
    title: 'A Thoughtful Approach to Digital Change in Education',
    category: 'Industry Trends',
    image: 'insight-education',
    imageAlt: 'Educators and university students collaborating in a technology-enabled seminar room',
    summary:
      'Unify student administrative journeys, modern learning management systems, and academic advising into an integrated institutional experience.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Listen to Diverse Institutional Stakeholders',
        'Students, faculty members, academic registrars, and institutional finance officers experience university systems from conflicting perspectives. Meaningful digital transformation begins with cross-departmental listening sessions that isolate genuine workflow friction.',
      ],
      [
        'Map the End-to-End Student Journey',
        'Examine every transition from initial prospective student application, financial aid award, and course registration to graduation clearance. Eliminating redundant data re-entry directly correlates with reduced student attrition.',
      ],
      [
        'Prioritize Accessibility and System Adoption',
        'Technological features provide zero institutional value if instructors and students find navigation convoluted. Prioritize mobile responsiveness, intuitive self-service portals, and structured change management training over complex software feature sets.',
      ],
      [
        'Establish Sustainable Governance',
        'Form central academic IT review committees to evaluate software renewals, prevent rogue department-level software purchasing, and ensure strict compliance with student data privacy regulations.',
      ],
    ],
    keyTakeaways: [
      'Consolidate disjointed student administrative touchpoints into a unified mobile-friendly student portal.',
      'Test software usability with faculty and make training part of the rollout.',
      'Implement predictive student engagement analytics to intervene before academic drop-out risks occur.',
    ],
    relatedServices: ['education-consulting', 'it-consulting', 'technology-automation'],
    relatedArticles: ['practical-digital-transformation-roadmap', 'processes-suitable-for-automation'],
  },

  // 2. Technology & AI
  {
    slug: 'practical-digital-transformation-roadmap',
    title: 'Building a Practical Digital Transformation Roadmap',
    category: 'Technology & AI',
    image: 'insight-it',
    imageAlt: 'Technology architecture team reviewing enterprise roadmap diagrams on interactive screens',
    summary:
      'Start with business priorities, evaluate technical debt, and translate high-level digital ambitions into a sequenced, measurable delivery plan.',
    readTime: '6 min read',
    date: '2026-11-23',
    sections: [
      [
        'Anchor in Operational Realities Rather than Tech Hype',
        'A digital roadmap succeeds when it originates from specific operational pain points: Where do customer onboarding delays occur? Which manual reconciliations tie up finance teams? Define measurable business objectives before selecting vendors.',
      ],
      [
        'Document Current-State Architecture and Technical Debt',
        'Catalog legacy software monoliths, point-to-point batch integrations, and critical single-points-of-failure. Transparent current-state discovery preserves high-functioning systems while targeting brittle dependencies.',
      ],
      [
        'Establish Objective Prioritization Criteria',
        'Score potential digital initiatives across business impact, technical feasibility, architectural risk, and organizational change complexity. Quick wins that unblock recurring operational delays should precede multi-year core platform replacements.',
      ],
      [
        'Sequence Delivery into Measured Value Milestones',
        'Structure roadmap initiatives into 90-day delivery horizons with explicit exit criteria. Regular milestone demonstrations maintain executive alignment and allow timely course corrections based on empirical user feedback.',
      ],
    ],
    keyTakeaways: [
      'Tie every technology initiative to an executive operational metric or customer satisfaction benchmark.',
      'De-risk multi-year transformations by delivering incremental production capabilities in quarterly increments.',
      'Incorporate workforce upskilling and process redesign as mandatory components of software rollouts.',
    ],
    relatedServices: ['it-consulting', 'technology-automation', 'business-strategy'],
    relatedArticles: ['data-readiness-before-an-ai-pilot', 'case-study-enterprise-it-modernization'],
  },
  {
    slug: 'data-readiness-before-an-ai-pilot',
    title: 'Before an AI Pilot, Check the Data and the Decision',
    category: 'Technology & AI',
    image: 'insight-analytics',
    imageAlt: 'Data analysts reviewing business intelligence charts and predictive data pipelines',
    summary:
      'A successful enterprise AI initiative requires dependable data governance, well-defined decision boundaries, and clear human oversight.',
    readTime: '5 min read',
    date: '2026-11-24',
    sections: [
      [
        'Define the Decision to be Augmented',
        'AI models do not create strategic clarity on their own. Explicitly articulate the decision being addressed: Is it dynamic pricing, demand prediction, or inventory safety-stock recalculation? Clarify who consumes the output and what threshold requires human review.',
      ],
      [
        'Audit Data Lineage and Cleansing Standards',
        'Predictive models rely entirely on the integrity of underlying training data. Audit data freshness, missing attributes, duplicate records, and systemic historical biases across enterprise databases before initiating model training.',
      ],
      [
        'Establish Measurable Accuracy Baselines',
        'Benchmark AI prototype performance against current human heuristic methods under identical real-world operating conditions. Evaluate the operational and financial cost of false positives versus false negatives.',
      ],
      [
        'Institute Human-in-the-Loop Governance',
        'Design fail-safe fallback workflows for edge cases that fall outside high-confidence algorithmic thresholds. Ensure accountable business owners maintain ultimate discretion over critical customer and financial commitments.',
      ],
    ],
    keyTakeaways: [
      'Treat enterprise data cleansing and pipeline reliability as prerequisites for AI experimentation.',
      'Quantify the operational risk of prediction errors before automating downstream business actions.',
      'Ensure AI models augment human decision-makers rather than operating as opaque black boxes.',
    ],
    relatedServices: ['data-analytics-ai', 'it-consulting', 'technology-automation'],
    relatedArticles: ['practical-digital-transformation-roadmap', 'future-of-ai-in-manufacturing'],
  },
  {
    slug: 'processes-suitable-for-automation',
    title: 'Which Business Processes Are Truly Ready for Automation?',
    category: 'Technology & AI',
    image: 'insight-automation',
    imageAlt: 'Automated industrial robotics and robotic process automation system dashboard',
    summary:
      'Assess volume, rule stability, exception frequency, and integration feasibility before automating critical business workflows.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Simplify Before Automating',
        'Automating an inefficient, convoluted process merely accelerates error generation. First map process steps, strip redundant approvals, and standardize inputs before introducing automated workflow engines or RPA bots.',
      ],
      [
        'Evaluate Rule Stability and Exception Rates',
        'Ideal automation candidates feature high transactional volume, structured digital inputs, and well-defined business logic. Workflows with constant rule modifications or frequent subjective judgments are best suited for human execution.',
      ],
      [
        'Calculate Total Cost of Ownership (TCO)',
        'Look beyond initial bot development expenses to factor in ongoing maintenance, API change refactoring, licensing, and supervisor review overhead. Ensure projected labor reallocation justifies the technology investment.',
      ],
      [
        'Build Robust Exception Handling Routines',
        'Every automated process will encounter unexpected input permutations. Establish automated alerting, audit logging, and rapid fallback routing to prevent transactional backlogs from accumulating unnoticed.',
      ],
    ],
    keyTakeaways: [
      'Streamline and standardize workflows before writing software automation scripts.',
      'Focus automation investments on rules-based, high-frequency, structured-data transactions.',
      'Maintain clear documentation and designated owners for ongoing automation maintenance.',
    ],
    relatedServices: ['technology-automation', 'it-consulting', 'supply-chain-operations'],
    relatedArticles: ['future-of-ai-in-manufacturing', 'manufacturing-process-visibility'],
  },

  // 3. Business Strategy
  {
    slug: 'turning-strategy-into-decision-rules',
    title: 'A Business Strategy Should Make the Next Decision Easier',
    category: 'Business Strategy',
    image: 'insight-strategy',
    imageAlt: 'Executive management team analyzing strategic positioning graphs in boardroom',
    summary:
      'Bridge the divide between high-level executive ambitions and daily departmental prioritization through clear operational decision rules.',
    readTime: '5 min read',
    date: '2026-11-24',
    sections: [
      [
        'The Failure of Vague Strategic Aspirations',
        'Broad statements such as "achieve market leadership" or "deliver customer delight" fail to provide actionable direction when functional leaders face difficult budget, product, or resource allocation tradeoffs.',
      ],
      [
        'Articulate Explicit Tradeoffs and What to Decline',
        'True strategy is defined by what an organization deliberately decides NOT to do. Clearly define target customer tiers, acceptable operating margins, and non-core initiatives that should be deprioritized to preserve organizational focus.',
      ],
      [
        'Translate Strategic Pillars into Operating Decision Rules',
        'Equip department heads with concrete operating principles: When customer fulfillment speed conflicts with freight cost, which priority takes precedence? Clear guidelines eliminate executive bottlenecks and empower faster decisions.',
      ],
      [
        'Establish Dynamic Review Cadences',
        'Conduct monthly operational reviews evaluating strategic execution against real-world market feedback. Reallocate capital and talent deliberately when underlying assumptions prove inaccurate.',
      ],
    ],
    keyTakeaways: [
      'Express strategy as concrete decision rules rather than aspirational marketing slogans.',
      'Explicitly designate which projects and market segments the organization will deliberately decline.',
      'Align employee incentive structures with chosen strategic priorities rather than isolated vanity metrics.',
    ],
    relatedServices: ['business-strategy', 'it-consulting', 'supply-chain-operations'],
    relatedArticles: ['strategic-planning-sustainable-growth', 'report-enterprise-tech-adoption-benchmarks'],
  },
  {
    slug: 'strategic-planning-sustainable-growth',
    title: 'Strategic Planning for Sustainable Business Growth',
    category: 'Business Strategy',
    image: 'strategy-planning',
    imageAlt: 'Business planners organizing multi-year corporate growth roadmap on whiteboards',
    summary:
      'Design strategic planning frameworks that balance short-term profitability with long-term technological capability investments.',
    readTime: '5 min read',
    date: '2026-11-24',
    sections: [
      [
        'Balancing Core Performance with Horizon Growth',
        'Sustainable enterprise growth requires dual-track management: defending and optimizing existing profitable business units while methodically testing adjacent market opportunities and transformative operating models.',
      ],
      [
        'Capital Allocation Discipline in Changing Markets',
        'Avoid spreading capital evenly across competing internal departments. Funnel investment into differentiated capabilities that establish durable competitive moats and defend against industry commoditization.',
      ],
      [
        'Building Organizational Agility and Scenario Planning',
        'Rather than betting on a single static five-year financial forecast, model multiple macroeconomic scenarios: high inflation, supply disruptions, and rapid tech adoption. Develop pre-approved operational playbooks for each condition.',
      ],
      [
        'Cascading Accountability Throughout the Organization',
        'Deconstruct corporate growth goals into measurable quarterly Objectives and Key Results (OKRs) for every division. Transparent accountability ensures enterprise-wide coordination and rapid problem escalation.',
      ],
    ],
    keyTakeaways: [
      'Structure strategic growth planning around distinct time horizons with dedicated resource pools.',
      'Stress-test business models against dynamic scenario modeling rather than static budget forecasts.',
      'Ensure every cross-functional initiative has an unambiguous single executive owner accountable for delivery.',
    ],
    relatedServices: ['business-strategy', 'fmcg-consulting', 'it-consulting'],
    relatedArticles: ['turning-strategy-into-decision-rules', 'report-enterprise-tech-adoption-benchmarks'],
  },

  // 4. Operations & Supply Chain
  {
    slug: 'manufacturing-process-visibility',
    title: 'Better Operational Decisions Begin with Process Visibility',
    category: 'Operations & Supply Chain',
    image: 'gallery-operations',
    imageAlt: 'Operations manager inspecting production flow and cycle time indicators in factory',
    summary:
      'Trace real shop-floor handoffs, standardize operational definitions, and establish feedback loops that eliminate manufacturing waste.',
    readTime: '5 min read',
    date: '2026-11-23',
    sections: [
      [
        'Map the Real Flow of Work on the Floor',
        'Documented standard operating procedures rarely match physical reality on the production line. Conduct gemba walks to observe where work-in-progress (WIP) accumulates, where parts wait for inspection, and where operators perform undocumented workarounds.',
      ],
      [
        'Standardize Definitions Across Shifts and Facilities',
        'Metrics like "machine downtime" or "minor stoppage" are frequently logged differently across morning and evening crews. Standardize operational taxonomy and automated data logging to ensure executive reporting reflects factual performance.',
      ],
      [
        'Eliminate Micro-Stops and Sub-Optimal Cycle Times',
        'Persistent three-minute stops along automated lines often inflict greater cumulative throughput loss than rare catastrophic failures. Implement automated telemetry to identify and rectify chronic root causes.',
      ],
      [
        'Empower Front-Line Problem Solving',
        'Equip shift supervisors with daily 15-minute stand-up huddle boards displaying Pareto charts of yesterday’s top defects. Foster a culture of immediate root-cause containment and operator-driven continuous improvement.',
      ],
    ],
    keyTakeaways: [
      'Observe physical plant floor realities directly rather than relying solely on high-level executive reports.',
      'Harmonize operational definitions across shifts to eliminate misleading metric discrepancies.',
      'Focus lean engineering interventions on eliminating chronic micro-stoppages across key equipment.',
    ],
    relatedServices: ['manufacturing-consulting', 'technology-automation', 'supply-chain-operations'],
    relatedArticles: ['future-of-ai-in-manufacturing', 'handoffs-behind-supply-chain-delays'],
  },
  {
    slug: 'handoffs-behind-supply-chain-delays',
    title: 'Find the Handoffs Behind Supply Chain Delays',
    category: 'Operations & Supply Chain',
    image: 'insight-supply',
    imageAlt: 'Freight transport trailers docked at modern logistics warehouse fulfillment bay',
    summary:
      'Follow representative customer orders across procurement, manufacturing, warehousing, and shipping to isolate systemic transit friction.',
    readTime: '5 min read',
    date: '2026-11-24',
    sections: [
      [
        'Follow One Order End-to-End',
        'Supply chain delays are rarely caused by a single slow truck. They stem from accumulated handoff friction: slow purchase order approvals, delayed warehouse dock appointments, and mismatched shipping manifests. Trace individual orders to locate invisible waiting times.',
      ],
      [
        'Expose Departmental Metric Contradictions',
        'Procurement teams rewarded for low purchase unit costs often purchase large volumes that overload warehouse staging capacity. Align cross-functional KPIs to incentivize overall order cycle speed and total landed cost efficiency.',
      ],
      [
        'Digitize Inbound Receiving and Yard Scheduling',
        'Manual phone calls and paper bills of lading generate gatehouse congestion. Implement automated dock appointment scheduling and mobile electronic proof of delivery (ePOD) to compress trailer dwell times.',
      ],
      [
        'Collaborate Proactively with Carrier Networks',
        'Share reliable 3-week rolling volume forecasts with core transportation carriers. Shippers who provide predictable volume commitments secure priority equipment allocation during tight freight market cycles.',
      ],
    ],
    keyTakeaways: [
      'Audit the administrative handoff points between functional silos where orders sit idle.',
      'Resolve conflicting cross-departmental metrics that encourage localized optimization over system speed.',
      'Implement digital dock scheduling and real-time shipment visibility to minimize costly demurrage.',
    ],
    relatedServices: ['supply-chain-operations', 'fmcg-consulting', 'technology-automation'],
    relatedArticles: ['building-resilient-supply-chain', 'case-study-warehouse-throughput-optimization'],
  },
  {
    slug: 'building-resilient-supply-chain',
    title: 'Building a Resilient Supply Chain in Volatile Markets',
    category: 'Operations & Supply Chain',
    image: 'supply-flow',
    imageAlt: 'Automated warehouse distribution conveyors sorting parcels for shipping',
    summary:
      'Mitigate single-source supplier risks, optimize inventory buffers, and architect multi-echelon distribution networks.',
    readTime: '6 min read',
    date: '2026-11-24',
    sections: [
      [
        'Beyond Just-in-Time: The Resilient Imperative',
        'The hyper-lean, zero-buffer supply chains of the past decade left enterprises highly vulnerable to geopolitical shocks, weather disruptions, and raw material shortages. Resilient organizations balance lean cost efficiency with strategic operational redundancy.',
      ],
      [
        'Dual-Sourcing Strategies and Tier-2 Visibility',
        'Relying on a single low-cost offshore supplier introduces unacceptable existential risk. Qualify regional nearshore backup suppliers and audit tier-2 component providers to uncover hidden upstream supply choke-points.',
      ],
      [
        'Dynamic Multi-Echelon Inventory Optimization (MEIO)',
        'Rather than maintaining flat safety stocks across all depots, deploy algorithms that position buffer stock at optimal network nodes. Hold generic raw materials upstream and execute late-stage product customization closer to the consumer.',
      ],
      [
        'Digital Supply Chain Control Towers',
        'Connect supplier ERP signals, carrier telematics, and warehouse inventory into a unified monitoring hub. When disruptions arise, automated scenario modeling evaluates rerouting alternatives before bottlenecks escalate.',
      ],
    ],
    keyTakeaways: [
      'Qualify nearshore dual-sourcing partners for critical single-point-of-failure components.',
      'Position inventory buffers strategically upstream in generic forms to maximize fulfillment flexibility.',
      'Deploy digital control towers to identify transit deviations and initiate proactive rerouting.',
    ],
    relatedServices: ['supply-chain-operations', 'manufacturing-consulting', 'data-analytics-ai'],
    relatedArticles: ['handoffs-behind-supply-chain-delays', 'case-study-warehouse-throughput-optimization'],
  },

  // 5. Case Studies
  {
    slug: 'business-case-study-global-collaboration',
    title: 'Business Case Study: Understanding the Business Before Seeking a Global Partner',
    category: 'Case Studies',
    image: 'approach-banner',
    imageAlt: 'Business strategy team organizing commercial priorities and collaboration worksheets',
    summary:
      'How to study your product or service, customers, operating capacity, finances, and growth goals to prepare a concise, partner-ready business case before international outreach.',
    readTime: '5 min read',
    date: '2026-11-25',
    sections: [
      [
        'Understand the Business Before Seeking a Partner',
        'Entering an international partnership without a clearly structured business case creates avoidable friction during early partner conversations. Before reaching out to overseas buyers, suppliers, distributors, or strategic allies, local enterprises benefit from studying their offering, customers, operating capacity, unit economics, and growth objectives objectively.',
      ],
      [
        'Reviewing the Business Model and Current Market',
        'A partner-ready business case articulates what the company produces or delivers, which customer segments already depend on it, and where international collaboration adds mutual value. Clarity around current demand, service levels, and differentiation gives prospective partners an understandable basis to evaluate fit.',
      ],
      [
        'Testing the Opportunity Against Capacity and Costs',
        'Cross-border collaboration increases demands on production throughput, working capital, compliance readiness, and management attention. Testing proposed volumes and commercial assumptions against real operating capacity, lead times, and cost structures prevents over-commitment and clarifies what operational readiness work is needed first.',
      ],
      [
        'Defining the Global Partner Profile and Working Output',
        'The working output of a business case study is a concise, evidence-grounded brief summarizing what your business offers, the specific type of global collaborator required, and an honest list of open questions regarding standards, logistics, or commercial responsibilities to address during partnership facilitation.',
      ],
    ],
    keyTakeaways: [
      'Review your business model, product positioning, and current market demand before initiating partner outreach.',
      'Test prospective international opportunities rigorously against existing production capacity and unit costs.',
      'Define the exact global partner profile needed and document open readiness questions early.',
    ],
    relatedServices: ['business-strategy', 'manufacturing-consulting', 'supply-chain-operations'],
    relatedArticles: [
      'turning-strategy-into-decision-rules',
      'strategic-planning-sustainable-growth',
    ],
  },
  {
    slug: 'case-study-warehouse-throughput-optimization',
    title: "Illustrative Case Study: Improving Warehouse Picking",
    category: 'Case Studies',
    image: 'supply-inventory',
    imageAlt: 'Modern high-bay warehouse with automated forklifts and systematic inventory racking',
    summary: "An illustrative warehouse scenario for testing changes to slotting and picking while tracking speed and order accuracy.",
    readTime: '2 min read',
    date: '2026-11-24',
    sections: [
      ["Illustrative scenario", "A distributor facing longer pick times suspects that workers spend too much time walking between popular items and packing stations. The first step is to measure travel, waiting and handling separately on representative shifts."],
      ["Pilot in one zone", "Move frequently picked items closer to packing where storage and safety rules allow. Compare similar orders before and after the change. If verification remains a bottleneck, separately trial barcode or voice-directed checks."],
      ["Evaluate the trade-offs", "Compare travel per order, lines picked per labor hour and order accuracy. Include replenishment effort so that any time saved in picking is assessed alongside the work created elsewhere."],
    ],
    keyTakeaways: [
      "Record the starting performance before changing the layout.",
      "Compare both picking speed and accuracy before expanding a pilot.",
    ],
    relatedServices: ['supply-chain-operations', 'technology-automation', 'manufacturing-consulting'],
    relatedArticles: ['handoffs-behind-supply-chain-delays', 'building-resilient-supply-chain'],
  },
  {
    slug: 'case-study-enterprise-it-modernization',
    title: "Illustrative Case Study: Modernizing Cloud Operations",
    category: 'Case Studies',
    image: 'digital-workplace',
    imageAlt: 'Enterprise software engineers collaborating on cloud infrastructure migration dashboard',
    summary: "An illustrative technology scenario for testing cloud cost controls and safer software releases.",
    readTime: '2 min read',
    date: '2026-11-24',
    sections: [
      ["Illustrative scenario", "A team wants to understand growing cloud costs and delays in deploying software. Start by assigning costs to workloads and mapping the steps between a finished change and a production release."],
      ["Scope a manageable pilot", "Choose one application with a named owner. Review resource use, add automated checks for critical workflows and practice a rollback before introducing a change to production."],
      ["Measure the pilot", "Track cloud cost per transaction, deployment frequency and incident recovery time. Review reliability and support effort alongside cost before applying the changes to more applications."],
    ],
    keyTakeaways: [
      "Measure cost per unit of work alongside total spend.",
      "Agree on release and rollback criteria before expanding the pilot.",
    ],
    relatedServices: ['it-consulting', 'technology-automation', 'data-analytics-ai'],
    relatedArticles: ['practical-digital-transformation-roadmap', 'data-readiness-before-an-ai-pilot'],
  },

  // 6. Research & Reports
  {
    slug: 'report-enterprise-tech-adoption-benchmarks',
    title: "Guide: Measuring Enterprise Technology Adoption",
    category: 'Research & Reports',
    image: 'performance-reporting',
    imageAlt: 'Business intelligence analyst presenting benchmark research metrics on wall display',
    summary: "A practical guide to tracking cloud costs, software delivery and AI readiness using your own baseline.",
    readTime: '2 min read',
    date: '2026-11-24',
    sections: [
      ["Allocate cloud costs", "The FinOps Foundation describes allocating technology costs to the teams, products or workloads responsible for them. Start with a consistent naming or tagging approach and agree how to handle shared services."],
      ["Track the cost of a useful unit", "Choose a measure that reflects the work the service performs, such as cost per transaction or per active customer. Document which costs are included and compare usage and spend together when the unit cost changes."],
      ["Review technology pilots before scaling", "Define how each pilot will be evaluated before it starts. For an AI pilot, record the quality threshold, the cases requiring human review and who will own the system if it moves into production."],
    ],
    keyTakeaways: [
      "Make cost ownership visible before trying to reduce spend.",
      "Set pilot success criteria using your own performance baseline.",
    ],
    sources: [
      {"publisher": "FinOps Foundation", "title": "Allocation", "url": "https://www.finops.org/framework/capabilities/allocation/"},
      {"publisher": "FinOps Foundation", "title": "Unit Economics", "url": "https://www.finops.org/framework/capabilities/unit-economics/"},
    ],
    relatedServices: ['it-consulting', 'data-analytics-ai', 'business-strategy'],
    relatedArticles: ['practical-digital-transformation-roadmap', 'data-readiness-before-an-ai-pilot'],
  },
  {
    slug: 'report-supply-chain-agility-index',
    title: "Guide: Measuring Supply Chain Agility",
    category: 'Research & Reports',
    image: 'business-analytics',
    imageAlt: 'Supply chain analysts evaluating global trade logistics analytics on digital dashboards',
    summary: "A practical guide to tracking fulfillment, inventory and freight performance, with World Bank logistics data for international context.",
    readTime: '2 min read',
    date: '2026-11-24',
    sections: [
      ["Use trade data for international context", "The World Bank Logistics Performance Indicators use tracking data to compare the speed and connectivity of international supply chains. Use them to frame questions about a market, then check the actual routes, service terms and costs available to your business."],
      ["Establish your operating baseline", "Measure order fulfillment, stock availability and time waiting at the dock. Define when each clock starts and stops, then compare similar orders or shipment lanes to keep differences in demand and distance visible."],
      ["Test changes against the baseline", "Pilot a warehouse or carrier change on a limited group of orders. Compare service reliability, total cost and any work shifted to another team before deciding whether to expand it."],
    ],
    keyTakeaways: [
      "Use country indicators as context for lane-specific decisions.",
      "Measure service and cost together when evaluating a change.",
    ],
    sources: [
      {"publisher": "World Bank", "title": "About the Logistics Performance Indicators", "url": "https://lpi.worldbank.org/en/about"},
    ],
    relatedServices: ['supply-chain-operations', 'fmcg-consulting', 'manufacturing-consulting'],
    relatedArticles: ['handoffs-behind-supply-chain-delays', 'building-resilient-supply-chain'],
  },
];

type StoredInsight = Omit<InsightArticleData, 'category' | 'sections'> & {
  category: string;
  sections: string[][];
};

const categories: ReadonlySet<string> = new Set<InsightArticleData['category']>([
  'Industry Trends',
  'Technology & AI',
  'Business Strategy',
  'Operations & Supply Chain',
  'Case Studies',
  'Research & Reports',
]);

function isInsightCategory(value: string): value is InsightArticleData['category'] {
  return categories.has(value);
}

function restoreInsight({ category, sections, ...article }: StoredInsight): InsightArticleData {
  if (!isInsightCategory(category)) throw new Error(`Invalid category for ${article.slug}`);
  return {
    ...article,
    category,
    sections: sections.map((section) => {
      if (section.length !== 2) throw new Error(`Invalid section for ${article.slug}`);
      return [section[0], section[1]];
    }),
  };
}

export const insights: InsightArticleData[] = [
  ...dailyInsights.map(restoreInsight),
  ...rawInsights,
].sort(
  (a, b) => Date.parse(`${b.date}T00:00:00Z`) - Date.parse(`${a.date}T00:00:00Z`),
);
