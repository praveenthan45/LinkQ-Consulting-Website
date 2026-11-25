import {
  Globe2,
  MapPinned,
  MessagesSquare,
  ShieldCheck,
  Handshake,
  Route,
  Compass,
  SearchCheck,
  FileCheck2,
  CheckCircle2,
  Factory,
  Package,
  Truck,
  Building2,
  Cpu,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';

export interface CollaborationStep {
  id: string;
  navLabel: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  whatWeDo: readonly string[];
  keyActivities: readonly string[];
  clientValue: string;
  accuracyNote?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  ctaLabel: string;
  ctaTo: string;
  relatedLink: {
    label: string;
    to: string;
  };
}

export interface CollaborationBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface SupportedProfile {
  icon: LucideIcon;
  title: string;
  description: string;
  focusLabel: string;
  to: string;
}

export const collaborationHero = {
  eyebrow: 'GLOBAL COLLABORATION',
  headline: 'Connecting Local Businesses to Global Opportunities',
  description:
    'We bridge business opportunities across markets by helping companies identify the right partners, understand international opportunities, build strategic relationships, and coordinate collaboration from initial discussions to execution.',
  image: 'collab-hero',
  imageAlt:
    'International business executives collaborating across strategy documents in a sunlit glass conference room',
  primaryCta: {
    label: 'Start a Collaboration',
    to: '/contact?service=Collaboration%20Consulting&subject=Start%20a%20Global%20Collaboration',
  },
};

export const collaborationIntro = {
  eyebrow: 'HOW OUR JOURNEY WORKS',
  heading: 'A Structured Path to Global Collaboration',
  paragraphs: [
    'International collaboration requires more than finding a business contact. It involves understanding objectives, identifying relevant partners, evaluating opportunities, aligning expectations, coordinating discussions, and supporting the steps required to move forward.',
    'Our collaboration journey provides a structured approach to help businesses navigate these stages with clarity and confidence.',
  ],
  caseStudyLink: {
    label: 'Read our Business Case Study guide',
    to: '/insights/business-case-study-global-collaboration',
  },
};

export const collaborationSteps: CollaborationStep[] = [
  {
    id: 'partner-discovery',
    navLabel: 'Global Partner Discovery & Matchmaking',
    icon: Globe2,
    eyebrow: 'PARTNER DISCOVERY & MATCHMAKING',
    title: 'Global Partner Discovery & Matchmaking',
    description:
      'We help businesses explore international collaboration opportunities by identifying potential partners, buyers, suppliers, manufacturers, distributors, and organizations aligned with their business objectives.',
    whatWeDo: [
      'Understand the client’s business objectives and partnership requirements.',
      'Identify relevant international partner profiles.',
      'Explore potential buyers, suppliers, distributors, manufacturers, and strategic partners.',
      'Evaluate preliminary compatibility based on business requirements.',
      'Facilitate initial introductions with relevant prospective partners.',
    ],
    keyActivities: [
      'Partner profile & criteria scoping',
      'Cross-market organization research',
      'Commercial & capability compatibility screening',
      'Structured bilateral introductions',
    ],
    clientValue:
      'Help businesses discover relevant international connections and reduce the difficulty of finding suitable business partners in unfamiliar markets.',
    image: 'collab-step-1',
    imageAlt:
      'Two international business leaders engaged in an initial partner introduction inside a bright executive atrium',
    imageCaption: 'Partner discovery & structured introductions',
    ctaLabel: 'Discuss partner search criteria',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Partner%20Discovery%20%26%20Matchmaking',
    relatedLink: {
      label: 'Explore Business Strategy Consulting',
      to: '/services/business-strategy',
    },
  },
  {
    id: 'market-entry',
    navLabel: 'Market Entry & Expansion',
    icon: MapPinned,
    eyebrow: 'MARKET ENTRY & EXPANSION',
    title: 'Market Entry & Expansion',
    description:
      'We help businesses explore international markets, understand market opportunities, and prepare for expansion by evaluating business conditions, market requirements, and potential pathways for entry.',
    whatWeDo: [
      'Understand the client’s expansion goals.',
      'Identify relevant target markets and business regions.',
      'Assess market opportunities and competitive positioning.',
      'Explore market entry strategies and partnership models.',
      'Identify potential local distributors, partners, and business channels.',
      'Support market-entry planning and expansion roadmaps.',
    ],
    keyActivities: [
      'Target region & corridor evaluation',
      'Competitive & regulatory context scan',
      'Entry model & channel structure options',
      'Phased international expansion roadmap',
    ],
    clientValue:
      'Help businesses make more informed decisions about international expansion and understand the practical opportunities and requirements before committing resources.',
    image: 'collab-step-2',
    imageAlt:
      'Consulting strategist and business leader reviewing regional market trade corridors and expansion data in a sunlit office',
    imageCaption: 'Target market evaluation & entry planning',
    ctaLabel: 'Plan your target market review',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Market%20Entry%20%26%20Expansion%20Planning',
    relatedLink: {
      label: 'Explore FMCG & Distribution Strategy',
      to: '/services/fmcg-consulting',
    },
  },
  {
    id: 'facilitation-negotiation',
    navLabel: 'Partnership Facilitation & Negotiation',
    icon: MessagesSquare,
    eyebrow: 'FACILITATION & NEGOTIATION',
    title: 'Partnership Facilitation & Negotiation',
    description:
      'We facilitate communication and business discussions between potential partners to help establish clear expectations, understand mutual interests, and explore commercially aligned collaboration opportunities.',
    whatWeDo: [
      'Coordinate communication between prospective partners.',
      'Facilitate initial business discussions.',
      'Help clarify partnership objectives and expectations.',
      'Support commercial discussions and negotiation preparation.',
      'Coordinate information exchange between involved parties.',
      'Help identify areas of mutual benefit and potential agreement.',
    ],
    keyActivities: [
      'Structured discussion agendas & follow-ups',
      'Mutual commercial priority mapping',
      'Coordinated bilateral information exchange',
      'Negotiation readiness & scope framing',
    ],
    clientValue:
      'Create a more organized and productive collaboration process by helping both parties communicate clearly and understand the proposed partnership.',
    image: 'collab-step-3',
    imageAlt:
      'Two international business delegations conversing across a conference table with printed commercial proposals',
    imageCaption: 'Facilitated commercial discussions',
    ctaLabel: 'Request facilitation support',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Partnership%20Facilitation%20%26%20Negotiation',
    relatedLink: {
      label: 'Read Business Case Study framework',
      to: '/insights/business-case-study-global-collaboration',
    },
  },
  {
    id: 'verification-certification',
    navLabel: 'Verification & Certification Support',
    icon: ShieldCheck,
    eyebrow: 'VERIFICATION & CERTIFICATION SUPPORT',
    title: 'Verification & Certification Support',
    description:
      'We help businesses navigate partner verification, documentation requirements, quality expectations, and relevant certification pathways when preparing for international business collaboration.',
    whatWeDo: [
      'Coordinate preliminary business partner verification.',
      'Support document collection and organization.',
      'Identify relevant quality and certification requirements.',
      'Coordinate with appropriate certification bodies and qualified professionals.',
      'Help businesses understand compliance-related preparation requirements.',
      'Support documentation readiness for business collaboration.',
    ],
    keyActivities: [
      'Preliminary counterparty background checks',
      'Quality & product file organization',
      'Applicable standards & pathway mapping',
      'Coordination with accredited bodies & specialists',
    ],
    clientValue:
      'Help businesses approach international partnerships with greater preparation, transparency, and awareness of verification and certification requirements.',
    accuracyNote:
      'Note on scope: LinkqGlobal provides preparation, coordination, and readiness guidance. We do not directly issue official certifications, perform accredited audits, guarantee compliance, or grant legal approvals—those remain with relevant accredited bodies and qualified professionals.',
    image: 'collab-step-4',
    imageAlt:
      'Quality and documentation specialists inspecting technical records, specification binders, and component samples on an oak table',
    imageCaption: 'Verification readiness & documentation support',
    ctaLabel: 'Check verification readiness',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Verification%20%26%20Certification%20Support',
    relatedLink: {
      label: 'Explore Manufacturing Consulting',
      to: '/services/manufacturing-consulting',
    },
  },
  {
    id: 'partner-alignment',
    navLabel: 'Global Partner Alignment',
    icon: Handshake,
    eyebrow: 'GLOBAL PARTNER ALIGNMENT',
    title: 'Global Partner Alignment',
    description:
      'We help businesses and their international partners align objectives, responsibilities, expectations, communication practices, and operational requirements before moving forward with collaboration.',
    whatWeDo: [
      'Align business objectives between partners.',
      'Clarify roles, responsibilities, and expectations.',
      'Support collaboration planning.',
      'Coordinate communication between stakeholders.',
      'Identify operational and commercial requirements.',
      'Help develop a structured partnership roadmap.',
    ],
    keyActivities: [
      'Joint role & responsibility clarification',
      'Stakeholder communication protocols',
      'Operational & quality handoff mapping',
      'Shared partnership launch roadmap',
    ],
    clientValue:
      'Build a stronger foundation for collaboration by reducing misunderstandings, clarifying responsibilities, and creating a shared direction for both parties.',
    image: 'collab-step-5',
    imageAlt:
      'Cross-border partner teams working side-by-side over project timelines and operational planning milestones in a sunlit studio',
    imageCaption: 'Shared operating model & role alignment',
    ctaLabel: 'Plan partner alignment session',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Global%20Partner%20Alignment',
    relatedLink: {
      label: 'Explore IT Systems & Integration Advisory',
      to: '/services/it-consulting',
    },
  },
  {
    id: 'tie-up-delivery',
    navLabel: 'Tie-up & Delivery Support',
    icon: Route,
    eyebrow: 'TIE-UP & DELIVERY SUPPORT',
    title: 'Tie-up & Delivery Support',
    description:
      'We support the coordination of business tie-ups and collaboration activities as partnerships move from discussions and agreements toward practical execution, delivery coordination, and ongoing communication.',
    whatWeDo: [
      'Support coordination during partnership establishment.',
      'Help organize agreed next steps.',
      'Coordinate supplier, buyer, or partner communication.',
      'Support project and delivery planning.',
      'Assist with logistics and operational coordination where applicable.',
      'Monitor progress of agreed collaboration activities.',
      'Help identify coordination issues and follow-up requirements.',
    ],
    keyActivities: [
      'Tie-up transition & action tracking',
      'Buyer-supplier coordination cadence',
      'Delivery schedule & handoff planning',
      'Ongoing follow-up & issue resolution support',
    ],
    clientValue:
      'Provide continuity between the initial business connection and the practical coordination required to move a collaboration forward.',
    accuracyNote:
      'Note on scope: LinkqGlobal provides coordination, planning, and communication support. Physical shipping, freight execution, customs clearance, and carrier operations are carried out by your appointed trading partners and licensed logistics providers.',
    image: 'collab-step-6',
    imageAlt:
      'Operations coordinators reviewing international delivery schedules in a modern logistics office overlooking a container terminal',
    imageCaption: 'Tie-up establishment & execution coordination',
    ctaLabel: 'Coordinate execution support',
    ctaTo: '/contact?service=Collaboration%20Consulting&subject=Tie-up%20%26%20Delivery%20Support',
    relatedLink: {
      label: 'Explore Supply Chain & Operations',
      to: '/services/supply-chain-operations',
    },
  },
];

export const collaborationBenefits: CollaborationBenefit[] = [
  {
    icon: Globe2,
    title: 'Relevant International Opportunities',
    description:
      'Gain structured access to prospective buyers, suppliers, manufacturers, and distributors suited to your operational profile and target regions.',
  },
  {
    icon: SearchCheck,
    title: 'Better Partner Understanding',
    description:
      'Evaluate prospective partners through organized capability reviews and preliminary verification before committing significant management time.',
  },
  {
    icon: Compass,
    title: 'Structured Partnership Discussions',
    description:
      'Move beyond ad-hoc introductions with clear meeting agendas, defined commercial priorities, and focused expectation setting.',
  },
  {
    icon: MessagesSquare,
    title: 'Improved Cross-Border Communication',
    description:
      'Bridge differences in business practice and cadence so both local enterprises and international partners stay aligned at every stage.',
  },
  {
    icon: FileCheck2,
    title: 'Clarity on Requirements & Readiness',
    description:
      'Identify documentation, technical evidence, and quality preparation needs early—reducing preventable delays during partner evaluations.',
  },
  {
    icon: CheckCircle2,
    title: 'Coordinated Continuity to Execution',
    description:
      'Maintain momentum from initial conversations and alignment workshops through partnership setup and early delivery coordination.',
  },
];

export const supportedOrganizations: SupportedProfile[] = [
  {
    icon: Factory,
    title: 'Local Manufacturers Seeking International Buyers',
    description:
      'Prepare production evidence, quality records, and capacity profiles to engage overseas industrial buyers and OEM partners with confidence.',
    focusLabel: 'Manufacturing & Industrial',
    to: '/industries/manufacturing-industrial',
  },
  {
    icon: Package,
    title: 'Businesses Exploring Overseas Distribution',
    description:
      'Evaluate regional demand conditions, channel economics, and distributor fit before launching products into international retail networks.',
    focusLabel: 'FMCG & Consumer Goods',
    to: '/industries/fmcg-consumer-goods',
  },
  {
    icon: Truck,
    title: 'Companies Looking for Foreign Suppliers',
    description:
      'Identify compatible international component and material suppliers while planning verification steps, lead-time coordination, and continuity.',
    focusLabel: 'Supply Chain & Operations',
    to: '/services/supply-chain-operations',
  },
  {
    icon: Building2,
    title: 'Businesses Exploring Strategic Alliances',
    description:
      'Frame mutually beneficial commercial models, co-development scopes, or regional joint-venture structures grounded in realistic economics.',
    focusLabel: 'Business Strategy',
    to: '/industries/business-strategy',
  },
  {
    icon: Cpu,
    title: 'Organizations Seeking Tech or Production Partners',
    description:
      'Connect local enterprises with international automation providers, software integrators, or specialized manufacturing capabilities.',
    focusLabel: 'Technology & Automation',
    to: '/services/technology-automation',
  },
  {
    icon: TrendingUp,
    title: 'Businesses Planning International Expansion',
    description:
      'Test market assumptions, understand local compliance pathways, and sequence resource commitments through a disciplined entry roadmap.',
    focusLabel: 'Market Expansion Advisory',
    to: '/industries/retail-commerce',
  },
];

export const collaborationCta = {
  heading: 'Let’s Explore Your Global Business Opportunity',
  description:
    'Whether you’re looking for international partners, exploring new markets, seeking business tie-ups, or planning cross-border collaboration, let’s understand your requirements and explore the next steps together.',
  primaryButton: {
    label: 'Submit a Collaboration Inquiry',
    to: '/contact?service=Collaboration%20Consulting&subject=Global%20Collaboration%20Inquiry',
  },
};
