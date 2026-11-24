import {
  Factory,
  ShoppingBag,
  Cpu,
  GraduationCap,
  Store,
  Truck,
  Building2,
  Target,
  type LucideIcon,
} from 'lucide-react';

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryOpportunity {
  title: string;
  description: string;
}

export interface IndustrySector {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  image: string;
  alt: string;
  heroImage: string;
  heroAlt: string;
  description: string;
  headline: string;
  overview: string[];
  challenges: IndustryChallenge[];
  businessOpportunities: IndustryOpportunity[];
  digitalTransformation: {
    title: string;
    description: string;
    initiatives: string[];
  }[];
  operationalImprovement: {
    area: string;
    focus: string;
    impact: string;
  }[];
  consultingSupport: {
    pillar: string;
    description: string;
  }[];
  relevantServices: string[]; // slugs in services.ts
  relevantInsights: string[]; // slugs in insights.ts
  outcomes: {
    metric: string;
    label: string;
    detail: string;
  }[];
  valueProposition: string;
}

export const industries: IndustrySector[] = [
  {
    slug: 'manufacturing-industrial',
    name: 'Manufacturing & Industrial',
    shortName: 'Manufacturing',
    icon: Factory,
    image: 'industrial-engineering',
    alt: 'Industrial engineer inspecting manufacturing line machinery',
    heroImage: 'manufacturing-cover',
    heroAlt: 'Automated robotic arms on an advanced industrial assembly line',
    description:
      'Modernize plant operations, elevate throughput, and implement resilient Industry 4.0 production systems.',
    headline: 'Precision engineering meets operational agility.',
    overview: [
      'Discrete, process, and industrial manufacturers face unprecedented operational pressures: fluctuating raw material costs, skilled labor shortages, and stringent sustainability standards. Maintaining competitive margins requires operational visibility from the plant floor to executive leadership.',
      'LinkqGlobal Consulting partners with industrial leaders to turn legacy operations into connected, high-throughput manufacturing environments. We align operational workflows, digital equipment telemetry, and workforce capabilities to eliminate bottlenecks and stabilize production yields.',
      'Our engagements focus on pragmatic engineering and process discipline rather than unproven tech pilots. We build clear implementation roadmaps that protect current production while deploying the capabilities needed for sustainable operational excellence.',
    ],
    challenges: [
      {
        title: 'Unplanned Equipment Downtime',
        description:
          'Critical machine failures lead to scheduling disruptions, unfulfilled delivery commitments, and elevated emergency maintenance expenses.',
      },
      {
        title: 'Fragmented Shop-Floor Data',
        description:
          'Disconnected SCADA, PLC, and ERP systems obscure real-time production visibility, delaying root-cause analysis for quality anomalies.',
      },
      {
        title: 'Skilled Labor Constraints',
        description:
          'Retiring technical expertise and high turnover create knowledge retention gaps on complex machinery and assembly lines.',
      },
      {
        title: 'Yield Variability & Scrap Waste',
        description:
          'Sub-optimal operating parameters and delayed quality inspections result in excessive scrap rates and rising material waste.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Smart Factory & IIoT Enablement',
        description:
          'Connect physical equipment telemetry directly into unified operational dashboards for real-time overall equipment effectiveness (OEE) tracking.',
      },
      {
        title: 'Predictive & Condition-Based Maintenance',
        description:
          'Transition from reactive firefighting to sensor-driven maintenance scheduling that prevents catastrophic machine failure.',
      },
      {
        title: 'Agile Build-to-Order Manufacturing',
        description:
          'Optimize changeover workflows and cell layouts to cost-effectively produce smaller batch sizes tailored to customer demand.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Industrial IoT & Telemetry Integration',
        description:
          'Integrate edge sensors and industrial gateway devices with operational software architectures.',
        initiatives: [
          'Edge compute integration on high-criticality assets',
          'Standardized telemetry protocols (OPC-UA / MQTT)',
          'Automated data capture removing manual operator log sheets',
        ],
      },
      {
        title: 'MES & ERP Workflow Harmonization',
        description:
          'Close the visibility gap between corporate production scheduling and real-time plant floor execution.',
        initiatives: [
          'Manufacturing Execution System (MES) requirements and vendor selection',
          'Bi-directional ERP work-order synchronization',
          'Real-time material consumption reconciliation',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'OEE & Throughput Optimization',
        focus: 'Eliminate micro-stops and reduce cycle-time variation across core machining cells.',
        impact: '15-22% increase in realized equipment throughput.',
      },
      {
        area: 'Lean Quality & Scrap Reduction',
        focus: 'Standardized in-process inspection gates and root-cause containment workflows.',
        impact: 'Up to 30% reduction in quality scrap and rework costs.',
      },
      {
        area: 'SMED Setup Time Compression',
        focus: 'Rapid tool changeover protocols and pre-staged tooling standardization.',
        impact: '35% reduction in production changeover downtime.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Comprehensive Plant Diagnostics',
        description:
          'On-site time studies, value-stream mapping, and equipment audit across mechanical and digital operating constraints.',
      },
      {
        pillar: 'Production Scheduling & Line Balancing',
        description:
          'Mathematical modeling of line capacities, takt times, and intermediate buffer sizing to prevent starvation.',
      },
      {
        pillar: 'Shop-Floor Digital Enablement',
        description:
          'User-centered digital tablet interfaces for operators, visual andon systems, and supervisor daily shift huddle tools.',
      },
    ],
    relevantServices: [
      'manufacturing-consulting',
      'technology-automation',
      'supply-chain-operations',
      'data-analytics-ai',
    ],
    relevantInsights: [
      'manufacturing-process-visibility',
      'processes-suitable-for-automation',
    ],
    outcomes: [
      {
        metric: '18-25%',
        label: 'Downtime Reduction',
        detail: 'Achieved through proactive condition monitoring and rapid response protocols.',
      },
      {
        metric: '14%',
        label: 'OEE Lift',
        detail: 'Average gain across production lines following process bottleneck elimination.',
      },
      {
        metric: '28%',
        label: 'Scrap & Defect Lowering',
        detail: 'Driven by standardized operating procedures and in-line telemetry checks.',
      },
    ],
    valueProposition:
      'We help industrial manufacturers unlock hidden capacity, stabilize daily output, and build resilient smart factory foundations.',
  },
  {
    slug: 'fmcg-consumer-goods',
    name: 'FMCG & Consumer Goods',
    shortName: 'Consumer Goods',
    icon: ShoppingBag,
    image: 'fmcg-cover',
    alt: 'High-speed packaging and sorting line for fast-moving consumer packaged goods',
    heroImage: 'home-fmcg',
    heroAlt: 'Chilled consumer grocery shelves with organized retail stock',
    description:
      'Synchronize commercial demand, optimize distribution networks, and protect product margins across modern channels.',
    headline: 'Responsive supply chains for shifting consumer demand.',
    overview: [
      'Fast-Moving Consumer Goods (FMCG) and consumer packaged goods enterprises operate in an environment characterized by rapid category shifts, omnichannel retail expectations, and aggressive cost pressures. Success hinges on precise forecast accuracy, disciplined distributor management, and rapid stock replenishment.',
      'LinkqGlobal Consulting collaborates with food, beverage, personal care, and household brands to architect responsive commercial operations. We bridge commercial brand strategies with physical supply chain realities, ensuring optimal product availability on the shelf without carrying excess inventory.',
      'Our team assesses your route-to-market architecture, trade spend allocation, and end-to-end logistics to build a lean, high-velocity distribution engine capable of scaling with market expansion.',
    ],
    challenges: [
      {
        title: 'Promotional Volatility & Stockouts',
        description:
          'Sharp demand spikes from trade promotions frequently exhaust distributor inventories, resulting in lost sales and retailer chargebacks.',
      },
      {
        title: 'Complex Multi-Tier Distribution',
        description:
          'Lack of primary-to-secondary sales visibility leaves brand owners unaware of distributor stock hoarding or regional depletion rates.',
      },
      {
        title: 'Trade Spend Inefficiency',
        description:
          'Billions allocated to retailer trade promotions fail to deliver incremental volume or long-term brand equity.',
      },
      {
        title: 'Rising Logistics & Cold Chain Costs',
        description:
          'Escalating carrier rates, temperature-compliance requirements, and frequent detention fees erode operating profit margins.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Integrated Business Planning (IBP)',
        description:
          'Unify commercial sales projections, production capacity schedules, and financial targets into a singular monthly executive rhythm.',
      },
      {
        title: 'Direct-to-Retailer Replenishment',
        description:
          'Bypass redundant intermediate handling through cross-dock logistics and automated electronic data interchange (EDI) ordering.',
      },
      {
        title: 'Dynamic Trade Spend ROI Modeling',
        description:
          'Deploy analytics that measure promotional uplift by SKU and retailer, reallocating budget toward high-margin activities.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Distributor Management Systems (DMS)',
        description:
          'Implement unified cloud platforms connecting tier-1 distributors, wholesalers, and field sales teams.',
        initiatives: [
          'Secondary sales data extraction and inventory synchronization',
          'Automated reorder triggers based on actual depot velocity',
          'Mobile order capture application for field merchandising representatives',
        ],
      },
      {
        title: 'AI-Enhanced Demand Sensing',
        description:
          'Supplement historical sales averages with point-of-sale (POS) data, weather patterns, and macroeconomic indices.',
        initiatives: [
          'Granular regional SKU demand modeling',
          'Short-term promotional cannibalization forecasting',
          'Automated safety-stock recalculations across distribution centers',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'On-Time In-Full (OTIF) Delivery',
        focus: 'Standardize dock appointment scheduling and pre-assembled pallet configurations.',
        impact: 'Achieve 97%+ customer fulfillment compliance with major retail chains.',
      },
      {
        area: 'SKU Complexity Rationalization',
        focus: 'Evaluate gross margin return on inventory (GMROI) across bottom 20% slow-moving items.',
        impact: '15-20% reduction in working capital locked in non-productive inventory.',
      },
      {
        area: 'Secondary Freight Optimization',
        focus: 'Dynamic route consolidation and backhaul utilization for regional fleet partners.',
        impact: '10-14% decrease in per-case freight and logistics costs.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Route-to-Market Architecture',
        description:
          'Geographical distributor territory design, exclusive vs. non-exclusive dealer agreements, and service-level tiering.',
      },
      {
        pillar: 'S&OP / IBP Maturity Transformation',
        description:
          'Establish cross-functional monthly governance reconciling sales quotas with plant production plans.',
      },
      {
        pillar: 'Commercial Policy & Margin Structure',
        description:
          'Revamp discount matrices, credit terms, and performance-based rebates to protect net revenue realization.',
      },
    ],
    relevantServices: [
      'fmcg-consulting',
      'supply-chain-operations',
      'data-analytics-ai',
      'business-strategy',
    ],
    relevantInsights: [
      'fmcg-distribution-planning',
      'handoffs-behind-supply-chain-delays',
    ],
    outcomes: [
      {
        metric: '98.2%',
        label: 'On-Shelf Availability',
        detail: 'Sustained retail availability during high-volume promotional campaign windows.',
      },
      {
        metric: '22%',
        label: 'Working Capital Released',
        detail: 'Freed from safety-stock reductions via enhanced demand sensing precision.',
      },
      {
        metric: '12%',
        label: 'Logistics Cost Savings',
        detail: 'Realized through load consolidation and optimized regional depot networks.',
      },
    ],
    valueProposition:
      'We enable FMCG organizations to navigate retail complexity, synchronize supply with demand, and maximize category profitability.',
  },
  {
    slug: 'information-technology',
    name: 'Information Technology',
    shortName: 'Technology',
    icon: Cpu,
    image: 'software-engineering',
    alt: 'Technology architects reviewing enterprise cloud infrastructure plans',
    heroImage: 'it-advisory-cover',
    heroAlt: 'Data center server architecture with structured network cabling',
    description:
      'Modernize enterprise platforms, govern data and AI decisions, and improve engineering delivery.',
    headline: 'Modern architectures. Strategic technology leadership.',
    overview: [
      'Information Technology is no longer merely a support function; it is the fundamental engine driving enterprise growth, customer experience, and operational resilience. However, many IT organizations struggle with legacy technical debt, escalating cloud costs, security vulnerabilities, and fragmented toolchains.',
      'LinkqGlobal Consulting provides vendor-independent IT advisory services to CIOs, CTOs, and digital leaders. We assess current infrastructure postures, design pragmatic cloud modernization roadmaps, and implement engineering governance frameworks that align technology expenditures with business outcomes.',
      'Our approach balances architectural modernization with pragmatic operational realities. We help teams establish trustworthy data foundations, assess analytics and AI opportunities, and put human review around consequential decisions.',
    ],
    challenges: [
      {
        title: 'Monolithic Architectural Technical Debt',
        description:
          'Decades of accumulated customizations make core legacy applications fragile, costly to upgrade, and slow to adapt to market needs.',
      },
      {
        title: 'Uncontrolled Cloud Cost Growth (FinOps)',
        description:
          'Rapid cloud adoption without disciplined provisioning controls leads to bloated cloud consumption invoices and resource waste.',
      },
      {
        title: 'Engineering Productivity Bottlenecks',
        description:
          'Manual deployment gates, inconsistent testing environments, and siloed teams cause deployment cycles to stretch from days into months.',
      },
      {
        title: 'Expanding Cybersecurity & Compliance Risk',
        description:
          'Hybrid work environments and third-party vendor integrations expand corporate attack surfaces and regulatory audit scrutiny.',
      },
      {
        title: 'Unreliable Data for AI',
        description:
          'Inconsistent definitions, unclear ownership, and isolated pilots make it difficult to trust analytics or evaluate AI results.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Cloud Modernization & FinOps Governance',
        description:
          'Migrate to modular, cloud-native services while instituting automated tagging, auto-scaling, and cost-attribution frameworks.',
      },
      {
        title: 'Developer Platform Engineering',
        description:
          'Provide standardized self-service internal developer platforms (IDP) that accelerate software release frequency and code quality.',
      },
      {
        title: 'Enterprise AI & API Ecosystems',
        description:
          'Connect governed data and APIs to useful reporting and carefully scoped AI pilots, with quality checks and human oversight.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Hybrid Cloud Architecture & Modernization',
        description:
          'Transition legacy monoliths toward containerized, domain-driven microservices architectures.',
        initiatives: [
          'Application portfolio assessment and 6R disposition mapping (Rehost, Replatform, Refactor, etc.)',
          'Kubernetes container orchestration and service mesh deployment',
          'Automated CI/CD security scanning (DevSecOps) integration',
        ],
      },
      {
        title: 'Zero-Trust Security & Identity Architecture',
        description:
          'Implement enterprise identity boundaries, least-privilege access, and automated vulnerability management.',
        initiatives: [
          'Single sign-on (SSO) and adaptive multi-factor authentication (MFA)',
          'Role-based access control (RBAC) governance across enterprise databases',
          'Continuous infrastructure-as-code (IaC) configuration compliance audits',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'Deployment Lead Time Compression',
        focus: 'Automate build, integration, and security testing pipelines across product teams.',
        impact: 'Reduce release cycle times from bi-monthly windows to multiple releases per week.',
      },
      {
        area: 'Cloud Infrastructure Optimization',
        focus: 'Right-size compute instances, eliminate orphan storage, and leverage reserved instance planning.',
        impact: '20-35% recurring reduction in total cloud operating expenditure.',
      },
      {
        area: 'IT Incident Management & MTTR',
        focus: 'Implement unified observability (APM) and automated incident triage playbooks.',
        impact: '40% reduction in Mean Time to Resolution (MTTR) for high-priority incidents.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Strategic IT & Digital Roadmap',
        description:
          '3-year capability blueprint identifying platform dependencies, target architecture milestones, and budget allocations.',
      },
      {
        pillar: 'Cloud Architecture & FinOps Advisory',
        description:
          'Independent evaluation of cloud service provider commitments, workload portability, and consumption monitoring.',
      },
      {
        pillar: 'IT Operating Model & Governance Design',
        description:
          'Structure agile product-oriented delivery pods, portfolio prioritization councils, and technology evaluation standards.',
      },
    ],
    relevantServices: [
      'it-consulting',
      'technology-automation',
      'data-analytics-ai',
      'business-strategy',
    ],
    relevantInsights: [
      'practical-digital-transformation-roadmap',
      'data-readiness-before-an-ai-pilot',
    ],
    outcomes: [
      {
        metric: '32%',
        label: 'Cloud Cost Reduction',
        detail: 'Achieved through systematic FinOps audit, instance right-sizing, and lifecycle automation.',
      },
      {
        metric: '4x',
        label: 'Release Frequency',
        detail: 'Accelerated through standardized automated test pipelines and trunk-based deployment practices.',
      },
      {
        metric: '99.99%',
        label: 'System Resilience',
        detail: 'Maintained during peak transaction spikes following high-availability architecture refactoring.',
      },
    ],
    valueProposition:
      'We guide IT leaders to architect scalable, secure enterprise platforms that drive digital business acceleration and cost efficiency.',
  },
  {
    slug: 'education',
    name: 'Education',
    shortName: 'Education',
    icon: GraduationCap,
    image: 'university-campus',
    alt: 'Modern university academic facility and campus quad',
    heroImage: 'education-cover',
    heroAlt: 'Students and professors collaborating in a technology-equipped university lecture hall',
    description:
      'Elevate academic operations, streamline student administrative journeys, and modernize institutional digital infrastructure.',
    headline: 'Student-centered transformation. Institutional sustainability.',
    overview: [
      'Higher education institutions, vocational academies, and modern school networks are experiencing fundamental structural transformations. Shifts in student enrollment demographics, escalating campus operational costs, and expectations for flexible hybrid learning require institutions to rethink operational and administrative models.',
      'LinkqGlobal Consulting supports university chancellors, deans, and academic administrative leaders in modernizing institutional operations. We simplify complex student lifecycle processes—from prospective enquiry and admissions to degree audit and alumni engagement.',
      'We bring deep advisory expertise in evaluating Student Information Systems (SIS), Learning Management Systems (LMS), and campus shared-service models, creating institutions that deliver high academic value with financial sustainability.',
    ],
    challenges: [
      {
        title: 'Fragmented Student Systems & Data Silos',
        description:
          'Admissions, financial aid, housing, registrar, and alumni offices operate separate databases, forcing students to re-enter data repeatedly.',
      },
      {
        title: 'Admissions Processing Backlogs',
        description:
          'Manual document evaluation and credit transfer assessments create delays, leading prospective students to accept rival offers.',
      },
      {
        title: 'Student Retention & Early Risk Visibility',
        description:
          'Institutions lack unified analytics to detect early warning indicators of academic difficulty, disengagement, or drop-out risk.',
      },
      {
        title: 'Campus Facility & Resource Utilization',
        description:
          'Inflexible classroom timetabling and departmental room ownership result in low physical space utilization despite high facility maintenance costs.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Unified Student Digital Experience Portal',
        description:
          'Deliver an intuitive, mobile-first one-stop hub for class registration, tuition payment, degree progress tracking, and academic advising.',
      },
      {
        title: 'Predictive Student Success Analytics',
        description:
          'Leverage student engagement telemetry to alert academic advisors before students fall into academic probation or withdrawal.',
      },
      {
        title: 'Optimized Campus Scheduling & Shared Services',
        description:
          'Centralize non-academic administrative functions (finance, HR, procurement) to eliminate duplication and fund core research missions.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Core Student Information System (SIS) Modernization',
        description:
          'Guide institutions through the complex evaluation and phased migration to modern cloud SIS platforms.',
        initiatives: [
          'Institutional requirements gathering and RFP vendor scoring',
          'Data cleansing, student transcript normalization, and migration validation',
          'Academic calendar and curriculum catalog rule configuration',
        ],
      },
      {
        title: 'Hybrid Learning & Smart Campus Infrastructure',
        description:
          'Equip classrooms with dependable audiovisual capture, synchronous remote participation, and accessible learning resources.',
        initiatives: [
          'LMS integration with campus identity management and plagiarism detection systems',
          'Automated closed-captioning and WCAG 2.1 accessibility compliance',
          'Self-service student document verification workflows',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'Admissions Decision Turnaround',
        focus: 'Digitize transcript intake and automate preliminary prerequisite verification.',
        impact: 'Reduce application-to-offer turnaround times from 3 weeks to under 4 business days.',
      },
      {
        area: 'Classroom & Laboratory Scheduling',
        focus: 'Deploy algorithmic room allocation based on enrolled cohort sizes and pedagogical needs.',
        impact: '24% increase in academic room utilization, deferring costly capital construction.',
      },
      {
        area: 'Financial Aid & Bursar Processing',
        focus: 'Streamline scholarship disbursement, billing reconciliation, and payment installment plans.',
        impact: '50% reduction in peak-period student service queue times.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Student Journey Mapping & Service Design',
        description:
          'Identify points of administrative friction across the entire undergraduate and postgraduate enrollment lifecycle.',
      },
      {
        pillar: 'Academic Operating Model & Governance',
        description:
          'Realign faculty administrative duties, departmental service centers, and interdisciplinary collaboration procedures.',
      },
      {
        pillar: 'EdTech Stack Rationalization',
        description:
          'Audit campus software subscriptions, eliminate redundant licenses, and secure favorable enterprise vendor contracts.',
      },
    ],
    relevantServices: [
      'education-consulting',
      'it-consulting',
      'technology-automation',
      'data-analytics-ai',
    ],
    relevantInsights: [
      'digital-opportunities-in-education',
      'processes-suitable-for-automation',
    ],
    outcomes: [
      {
        metric: '65%',
        label: 'Faster Admissions',
        detail: 'Accelerated application review times, capturing higher initial student acceptance rates.',
      },
      {
        metric: '18%',
        label: 'Retention Improvement',
        detail: 'Achieved through automated early-warning intervention triggers for struggling students.',
      },
      {
        metric: '22%',
        label: 'Administrative Cost Savings',
        detail: 'Realized through shared administrative services and automated transcript verification.',
      },
    ],
    valueProposition:
      'We empower educational institutions to enrich student outcomes, simplify administrative complexity, and build enduring institutional resilience.',
  },
  {
    slug: 'retail-commerce',
    name: 'Retail & Commerce',
    shortName: 'Retail',
    icon: Store,
    image: 'retail-distribution',
    alt: 'Modern organized retail merchandise display and checkout operations',
    heroImage: 'collaboration',
    heroAlt: 'Retail strategists analyzing customer footfall and commercial conversion data',
    description:
      'Unify physical store networks with digital e-commerce, optimize omnichannel fulfillment, and enhance retail gross margins.',
    headline: 'Unified commerce architectures for modern shoppers.',
    overview: [
      'Retailers operate at the crossroads of intense consumer expectations and compressed margins. Customers demand seamless shopping journeys across e-commerce apps, social commerce, and brick-and-mortar storefronts, with flexible options like buy-online-pickup-in-store (BOPIS) and hassle-free returns.',
      'LinkqGlobal Consulting partners with department stores, specialty retailers, grocery chains, and direct-to-consumer innovators. We eliminate the operational boundaries between physical stores and digital channels, enabling accurate real-time inventory visibility and efficient local order fulfillment.',
      'Our team evaluates merchandise planning, store labor efficiency, store-to-door logistics, and point-of-sale modernization, helping retailers transform their physical footprint into dynamic fulfillment hubs that maximize customer lifetime value.',
    ],
    challenges: [
      {
        title: 'Inventory Disconnect Across Channels',
        description:
          'Inaccurate store-level stock data causes online orders for out-of-stock items, leading to cancellations and customer dissatisfaction.',
      },
      {
        title: 'High Omnichannel Fulfillment Costs',
        description:
          'Fulfilling individual online customer orders from centralized regional distribution centers incurs unsustainable parcel shipping charges.',
      },
      {
        title: 'Store Associate Labor Allocation',
        description:
          'Store teams struggle to balance customer-facing assistance with backroom inventory receiving and online order picking.',
      },
      {
        title: 'Costly Product Return Rates',
        description:
          'High online return rates, particularly in apparel, tie up seasonal merchandise and require expensive reverse logistics handling.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Unified Omnichannel Order Management (OMS)',
        description:
          'Intelligently route online orders to the nearest store location with available inventory for in-store pickup or local ship-from-store.',
      },
      {
        title: 'Micro-Fulfillment & Store-as-a-Hub',
        description:
          'Repurpose low-traffic backroom store square footage into automated micro-fulfillment zones that compress delivery times to hours.',
      },
      {
        title: 'Personalized Loyalty & Clienteling Tools',
        description:
          'Equip store associates with tablets showing customer purchase histories, preferences, and personalized product recommendations.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Next-Generation POS & Cloud OMS Integration',
        description:
          'Replace legacy, siloed registers with unified cloud POS solutions that access live enterprise catalog and stock data.',
        initiatives: [
          'Real-time enterprise inventory visibility down to the individual store shelf',
          'Mobile POS for floor associates to eliminate checkout line friction',
          'Standardized loyalty integration across physical and digital checkouts',
        ],
      },
      {
        title: 'Intelligent Returns & Reverse Logistics Platform',
        description:
          'Streamline return intake, rapid inspection grading, and immediate inventory restocking to recover merchandise value.',
        initiatives: [
          'In-store instant return processing for online orders',
          'Automated return-to-vendor (RTV) and secondary outlet liquidation routing',
          'Defect rate analytics identifying misleading product descriptions',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'Store Order Picking Efficiency',
        focus: 'Deploy wave-picking algorithms and optimal store aisle travel paths on associate mobile devices.',
        impact: '45% increase in items picked per labor hour for click-and-collect orders.',
      },
      {
        area: 'Inventory Accuracy & Cycle Counting',
        focus: 'Implement RFID scanning protocols and weekly perpetual inventory reconciliation.',
        impact: 'Attain 99.1% on-hand inventory record accuracy across store networks.',
      },
      {
        area: 'Markdown Optimization',
        focus: 'Algorithmically calculate localized markdown cadences based on regional sales velocity.',
        impact: '8-12% higher gross margin recovery on seasonal end-of-line stock.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Omnichannel Operational Blueprint',
        description:
          'Design unified customer order flows, store associate responsibilities, and shipping SLA guidelines.',
      },
      {
        pillar: 'Retail Network & Store Footprint Strategy',
        description:
          'Evaluate store profit contributions, lease renewals, and footprint optimization for flagship vs. convenience formats.',
      },
      {
        pillar: 'Merchandise Financial Planning (MFP)',
        description:
          'Align seasonal buying budgets, open-to-buy governance, and supplier lead-time buffers with sales projections.',
      },
    ],
    relevantServices: [
      'supply-chain-operations',
      'data-analytics-ai',
      'business-strategy',
      'technology-automation',
    ],
    relevantInsights: [
      'handoffs-behind-supply-chain-delays',
      'data-readiness-before-an-ai-pilot',
    ],
    outcomes: [
      {
        metric: '99.1%',
        label: 'Inventory Accuracy',
        detail: 'Achieved across full store networks, eliminating phantom inventory cancellations.',
      },
      {
        metric: '35%',
        label: 'Lower Fulfillment Cost',
        detail: 'Achieved by shipping online customer orders directly from nearby local retail stores.',
      },
      {
        metric: '16%',
        label: 'Gross Margin Growth',
        detail: 'Realized through targeted, dynamic promotional pricing and reduced broad markdowns.',
      },
    ],
    valueProposition:
      'We enable retailers to connect physical stores with digital convenience, optimize order fulfillment, and drive sustainable retail growth.',
  },
  {
    slug: 'logistics-distribution',
    name: 'Logistics & Distribution',
    shortName: 'Logistics',
    icon: Truck,
    image: 'global-logistics',
    alt: 'Global logistics container cargo terminal and distribution transportation fleet',
    heroImage: 'supply-cover',
    heroAlt: 'Freight truck fleet docked at a modern distribution center warehouse loading bay',
    description:
      'Optimize multi-tier warehouse networks, streamline last-mile delivery economics, and enhance freight visibility.',
    headline: 'High-velocity distribution networks built for scale.',
    overview: [
      'The logistics and distribution industry is the backbone of global trade and domestic commerce. Third-party logistics (3PL) providers, freight forwarders, and distribution operators face razor-thin margins, volatile diesel fuel prices, strict delivery service-level agreements (SLAs), and severe driver availability constraints.',
      'LinkqGlobal Consulting partners with logistics operators, freight carriers, and distribution centers to transform physical handling efficiency and network design. We analyze transportation lanes, facility layouts, cross-docking operations, and carrier contracts to identify operational waste.',
      'By combining transportation economics with technology advisory across Warehouse Management Systems (WMS) and Transportation Management Systems (TMS), we help clients establish agile distribution networks that reliably fulfill commitments.',
    ],
    challenges: [
      {
        title: 'Escalating Last-Mile Delivery Costs',
        description:
          'Urban traffic congestion, delivery re-attempts, and customer delivery time-window commitments make last-mile logistics the most expensive operational segment.',
      },
      {
        title: 'Warehouse Yard Congestion & Detention',
        description:
          'Unscheduled carrier arrivals and sluggish dock turnaround times trigger costly carrier detention fees and yard gridlock.',
      },
      {
        title: 'Multimodal Visibility Blind Spots',
        description:
          'Handoffs between ocean carriers, rail, long-haul trucking, and regional parcel fleets lack synchronized tracking updates.',
      },
      {
        title: 'Sub-Optimal Warehouse Slotting',
        description:
          'Fast-moving SKUs stored deep within warehouse aisles increase forklift travel distances, slowing overall throughput.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Dynamic Route Optimization & Fleet Telematics',
        description:
          'Deploy real-time route sequencing that accounts for traffic conditions, vehicle weight capacities, and customer delivery priorities.',
      },
      {
        title: 'Automated Yard & Dock Appointment Scheduling',
        description:
          'Eliminate arrival bottlenecks with self-service driver check-in kiosks and algorithmically scheduled dock door assignments.',
      },
      {
        title: 'Cross-Docking & Flow-Through Distribution',
        description:
          'Transfer inbound goods directly to outbound vehicles with minimal dwell time, reducing handling labor and storage footprints.',
      },
    ],
    digitalTransformation: [
      {
        title: 'TMS & WMS Modernization & Integration',
        description:
          'Connect transportation planning systems with facility warehouse execution engines for seamless shipment orchestration.',
        initiatives: [
          'Real-time automated freight tender to primary carrier contract pools',
          'Electronic Proof of Delivery (ePOD) and digital bill of lading (eBOL) capture',
          'Automated freight audit and invoice payment reconciliation',
        ],
      },
      {
        title: 'IoT Cold-Chain & Asset Telemetry',
        description:
          'Equip trailers and reefer containers with continuous temperature, humidity, and location tracking sensors.',
        initiatives: [
          'Immediate deviation alerts for temperature-controlled pharmaceutical and perishable shipments',
          'Predictive trailer tire and mechanical maintenance alerts',
          'Automated geofencing triggering customer arrival notices',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'Dock Turnaround Time (Dwell Time)',
        focus: 'Standardize trailer loading protocols and implement pre-staged pallet manifests.',
        impact: 'Reduce average truck turnaround times at loading bays by 38 minutes per vehicle.',
      },
      {
        area: 'Warehouse Slotting & Pick Path Velocity',
        focus: 'Dynamically re-slot SKUs based on seasonal pick velocity and volumetric dimensions.',
        impact: '26% reduction in total forklift travel mileage inside fulfillment centers.',
      },
      {
        area: 'Freight Capacity Utilization',
        focus: '3D algorithmic pallet load building and trailer cube-out optimization.',
        impact: 'Increase average trailer cubic volume utilization from 78% to 92%.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Logistics Network Optimization',
        description:
          'Mathematical center-of-gravity modeling to determine ideal distribution center locations and replenishment lanes.',
      },
      {
        pillar: '3PL & Carrier Procurement Strategy',
        description:
          'Comprehensive freight spend benchmarking, RFP management, and tiered performance contract negotiation.',
      },
      {
        pillar: 'Warehouse Layout & Automation Feasibility',
        description:
          'Evaluate automated storage and retrieval systems (ASRS), conveyors, and voice-directed picking systems.',
      },
    ],
    relevantServices: [
      'supply-chain-operations',
      'technology-automation',
      'data-analytics-ai',
      'manufacturing-consulting',
    ],
    relevantInsights: [
      'handoffs-behind-supply-chain-delays',
      'fmcg-distribution-planning',
    ],
    outcomes: [
      {
        metric: '16.4%',
        label: 'Transportation Cost Cut',
        detail: 'Achieved through freight route optimization, cube-out improvements, and lane consolidation.',
      },
      {
        metric: '98.6%',
        label: 'On-Time Delivery Rate',
        detail: 'Delivered consistently across regional retail and distributor delivery schedules.',
      },
      {
        metric: '42 min',
        label: 'Dock Turnaround Reduction',
        detail: 'Saved per trailer via automated yard management and pre-staged loading gates.',
      },
    ],
    valueProposition:
      'We partner with distribution leaders to compress transport costs, accelerate warehouse turnaround, and build agile logistics networks.',
  },
  {
    slug: 'business-strategy',
    name: 'Business Strategy',
    shortName: 'Business Strategy',
    icon: Target,
    image: 'industry-strategy-card',
    alt: 'Business team discussing a strategy together',
    heroImage: 'industry-strategy-cover',
    heroAlt: 'Colleagues reviewing business priorities in a meeting',
    description: 'Set a clear direction, make informed tradeoffs, and turn strategic choices into work teams can deliver.',
    headline: 'A clear direction for the decisions ahead.',
    overview: [
      'A useful strategy defines where to focus, what to stop, and how to decide when conditions change. It connects the ambitions of leadership with the capacity and information available to the people doing the work.',
      'We work with teams to understand customers, economics, capabilities, and constraints. Together we test the choices that matter, agree on priorities, and build a plan with accountable owners.',
      'The result is a decision framework that leaders can revisit as evidence changes, rather than a document that sits apart from daily operations.',
    ],
    challenges: [
      { title: 'Competing priorities', description: 'Too many initiatives can divide resources and leave the most important work underfunded.' },
      { title: 'Unclear decision criteria', description: 'Teams struggle to compare options when assumptions, risks, and measures of success are not shared.' },
      { title: 'Strategy without delivery', description: 'Ambitions lose momentum when ownership, dependencies, and review points are not defined.' },
      { title: 'Changing market signals', description: 'Customer needs, costs, and competitors can shift faster than annual planning cycles.' },
    ],
    businessOpportunities: [
      { title: 'Sharper market choices', description: 'Assess customer needs and the economics of each opportunity before committing resources.' },
      { title: 'Focused investment', description: 'Rank initiatives against strategic fit, expected value, delivery effort, and risk.' },
      { title: 'Responsive planning', description: 'Set review triggers so leaders can adjust their plan when evidence changes.' },
    ],
    digitalTransformation: [
      {
        title: 'Decision-ready information',
        description: 'Bring financial, customer, and operating evidence into a shared planning view.',
        initiatives: ['Agree on definitions and data owners', 'Compare scenarios using explicit assumptions', 'Review actual outcomes against the original case'],
      },
      {
        title: 'Technology investment choices',
        description: 'Assess which tools and platforms directly support the agreed business priorities.',
        initiatives: ['Map current capabilities and gaps', 'Sequence technology work by business dependency', 'Set adoption and value measures before implementation'],
      },
    ],
    operationalImprovement: [
      { area: 'Priority setting', focus: 'Compare initiatives using a consistent set of decision criteria.', impact: 'A smaller, more actionable portfolio of priorities.' },
      { area: 'Delivery ownership', focus: 'Assign sponsors, decision makers, milestones, and dependencies.', impact: 'Clear accountability from decision through implementation.' },
      { area: 'Strategy review', focus: 'Check results and external signals at agreed intervals.', impact: 'Timely adjustments based on evidence.' },
    ],
    consultingSupport: [
      { pillar: 'Situation assessment', description: 'Build a shared view of the market, customers, performance, and internal capabilities.' },
      { pillar: 'Strategic choices', description: 'Test scenarios and make the tradeoffs behind the direction explicit.' },
      { pillar: 'Execution roadmap', description: 'Translate selected priorities into sequenced work with owners and review points.' },
    ],
    relevantServices: ['business-strategy', 'data-analytics-ai', 'supply-chain-operations', 'it-consulting'],
    relevantInsights: ['turning-strategy-into-decision-rules', 'data-readiness-before-an-ai-pilot'],
    outcomes: [
      { metric: 'Focus', label: 'Clear priorities', detail: 'A shared view of what matters most and why.' },
      { metric: 'Choice', label: 'Better decisions', detail: 'Explicit assumptions, alternatives, and decision criteria.' },
      { metric: 'Action', label: 'Owned delivery', detail: 'An implementation plan with responsibilities and review points.' },
    ],
    valueProposition: 'We connect strategic choices with evidence, ownership, and a practical route to delivery.',
  },
  {
    slug: 'investment-real-estate',
    name: 'Investment & Real Estate',
    shortName: 'Investment & Real Estate',
    icon: Building2,
    image: 'investment-card',
    alt: 'Property advisers reviewing architectural plans and investment documents',
    heroImage: 'investment-cover',
    heroAlt: 'Modern commercial property in a city business district',
    description:
      'Bring clearer evidence to property decisions, portfolio planning, and the operations behind asset performance.',
    headline: 'Better evidence for every property decision.',
    overview: [
      'Investment and real estate decisions depend on more than an attractive location or a headline return. Occupier demand, financing costs, development timelines, building condition, and operating expenses all shape whether an asset fits a portfolio.',
      'We help investors, developers, and property operators organize the information behind those decisions. Our work connects market and asset assessment with practical plans for acquisition, development, leasing, and ongoing operations.',
      'The aim is a transparent decision process: clear assumptions, identified risks, accountable owners, and review points that can be revisited as conditions change.',
    ],
    challenges: [
      {
        title: 'Fragmented asset information',
        description: 'Financial, technical, leasing, and operating records often sit in separate systems, making a reliable asset view difficult.',
      },
      {
        title: 'Uncertain demand and costs',
        description: 'Shifts in occupier needs, borrowing costs, and construction prices can change the case for an investment.',
      },
      {
        title: 'Development handoffs',
        description: 'Gaps between design, procurement, delivery, and property management create delays and unplanned expenditure.',
      },
      {
        title: 'Portfolio priorities',
        description: 'Competing refurbishment, acquisition, and disposal options need a consistent basis for comparison.',
      },
    ],
    businessOpportunities: [
      {
        title: 'Scenario-led investment review',
        description: 'Compare asset options using explicit assumptions for demand, capital expenditure, timing, and downside exposure.',
      },
      {
        title: 'Asset performance planning',
        description: 'Connect leasing, maintenance, energy use, and tenant experience to a prioritized improvement plan.',
      },
      {
        title: 'Portfolio visibility',
        description: 'Establish common measures and reporting so leaders can see where attention and capital are needed.',
      },
    ],
    digitalTransformation: [
      {
        title: 'Connected property information',
        description: 'Define a dependable view of each asset across commercial, technical, and operating data.',
        initiatives: [
          'Map source systems and agree on asset-level definitions',
          'Bring lease, maintenance, and cost information into decision-ready reports',
          'Assign ownership for data quality and updates',
        ],
      },
      {
        title: 'Practical analytics',
        description: 'Use reporting and scenario models to support decisions without treating projections as guarantees.',
        initiatives: [
          'Track occupancy, operating costs, and planned capital work',
          'Test changes in demand, costs, and project timing',
          'Review assumptions against actual performance',
        ],
      },
    ],
    operationalImprovement: [
      {
        area: 'Acquisition review',
        focus: 'Structure commercial, technical, and operating questions before committing to deeper due diligence.',
        impact: 'A clearer record of assumptions, open questions, and decision owners.',
      },
      {
        area: 'Development coordination',
        focus: 'Map dependencies from design and approvals through procurement and handover.',
        impact: 'Earlier visibility of handoffs and decisions that may affect delivery.',
      },
      {
        area: 'Property operations',
        focus: 'Review service requests, maintenance planning, supplier performance, and tenant feedback.',
        impact: 'A prioritized operating plan tied to asset and occupier needs.',
      },
    ],
    consultingSupport: [
      {
        pillar: 'Investment decision framework',
        description: 'Define evaluation criteria, compare scenarios, and document the tradeoffs behind a portfolio decision.',
      },
      {
        pillar: 'Asset and operating review',
        description: 'Connect property-level information with leasing, maintenance, and cost performance.',
      },
      {
        pillar: 'Implementation roadmap',
        description: 'Sequence the agreed improvements with owners, dependencies, and measurable review points.',
      },
    ],
    relevantServices: [
      'business-strategy',
      'data-analytics-ai',
      'supply-chain-operations',
      'it-consulting',
    ],
    relevantInsights: [
      'turning-strategy-into-decision-rules',
      'data-readiness-before-an-ai-pilot',
    ],
    outcomes: [
      {
        metric: 'Clarity',
        label: 'Investment choices',
        detail: 'A documented basis for comparing opportunities, constraints, and risks.',
      },
      {
        metric: 'Visibility',
        label: 'Asset performance',
        detail: 'Shared information about commercial and operating priorities.',
      },
      {
        metric: 'Ownership',
        label: 'Delivery plan',
        detail: 'Named responsibilities and review points for the improvements selected.',
      },
    ],
    valueProposition:
      'We help property and investment teams make informed choices and turn asset priorities into practical action.',
  },
];

export function getIndustry(slug: string): IndustrySector | undefined {
  return industries.find((i) => i.slug === slug);
}
