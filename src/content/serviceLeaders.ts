export interface ServiceLeader {
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export const defaultLeaders: ServiceLeader[] = [
  {
    name: 'David Parker',
    role: 'Global Consulting Practices & Financial Advisory Chair',
    image: '/images/leaders/leader-1.webp',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Michael Abbott',
    role: 'Global Technology Strategy & Digital Systems Lead',
    image: '/images/leaders/leader-5.webp',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Elena Rostova',
    role: 'Enterprise Operations & Supply Transformation Principal',
    image: '/images/leaders/leader-2.webp',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'John Ratzan',
    role: 'Industrial Engineering & Manufacturing Practice Lead',
    image: '/images/leaders/leader-7.webp',
    linkedin: 'https://linkedin.com',
  },
  {
    name: 'Frédéric Brunier',
    role: 'Commercial Strategy & Organizational Performance Director',
    image: '/images/leaders/leader-3.webp',
    linkedin: 'https://linkedin.com',
  },
];

export const serviceLeaders: Record<string, ServiceLeader[]> = {
  'it-consulting': [
    {
      name: 'David Parker',
      role: 'Global Technology Strategy & Infrastructure Practices Chair',
      image: '/images/leaders/leader-1.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Elena Rostova',
      role: 'Cloud Advisory & Enterprise Architecture Practice Lead',
      image: '/images/leaders/leader-2.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Marcus Vance',
      role: 'Digital Workplace & Modernization Strategy Principal',
      image: '/images/leaders/leader-3.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Priya Sharma',
      role: 'IT Governance, Security & Scalability Advisory Director',
      image: '/images/leaders/leader-4.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Michael Abbott',
      role: 'Enterprise Platforms & Digital Systems Practice Lead',
      image: '/images/leaders/leader-5.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'manufacturing-consulting': [
    {
      name: 'Robert Sterling',
      role: 'Global Manufacturing Operations & Production Systems Chair',
      image: '/images/leaders/leader-5.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Industrial Engineering & Plant Modernization Lead',
      image: '/images/leaders/leader-6.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Dieter Mueller',
      role: 'Lean Operations & Process Visibility Practice Director',
      image: '/images/leaders/leader-7.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Kenji Takahashi',
      role: 'Quality Systems & Operational Continuity Principal',
      image: '/images/leaders/leader-9.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Rachel Thornton',
      role: 'Smart Factory & Industrial Resilience Strategy Lead',
      image: '/images/leaders/leader-8.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'fmcg-consulting': [
    {
      name: 'Claire Beauchamp',
      role: 'Global Consumer Goods & Commercial Strategy Chair',
      image: '/images/leaders/leader-2.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Liam O’Connor',
      role: 'FMCG Route-to-Market & Retail Distribution Lead',
      image: '/images/leaders/leader-3.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Maya Patel',
      role: 'Consumer Products Demand & Portfolio Optimization Director',
      image: '/images/leaders/leader-4.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Henrik Lindqvist',
      role: 'Supply Chain Integration & Channel Performance Principal',
      image: '/images/leaders/leader-7.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Beatrice Dubois',
      role: 'Packaged Goods Operations & Fulfillment Strategy Lead',
      image: '/images/leaders/leader-10.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'education-consulting': [
    {
      name: 'Dr. Alistair Finch',
      role: 'Global Higher Education Strategy & Institutional Planning Chair',
      image: '/images/leaders/leader-9.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Eleanor Vance',
      role: 'Digital Learning Infrastructure & Systems Adoption Lead',
      image: '/images/leaders/leader-6.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Dr. Samuel Adebayo',
      role: 'Academic Operations & Resource Allocation Principal',
      image: '/images/leaders/leader-1.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Meera Nair',
      role: 'Student Services Modernization & Analytics Director',
      image: '/images/leaders/leader-8.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Patrick O’Reilly',
      role: 'Institutional Governance & Educational Change Lead',
      image: '/images/leaders/leader-5.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'technology-automation': [
    {
      name: 'Vikram Malhotra',
      role: 'Global Intelligent Automation & Workflow Transformation Chair',
      image: '/images/leaders/leader-3.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Natalie Vance',
      role: 'Systems Integration & Automated Workflow Practice Lead',
      image: '/images/leaders/leader-4.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Julian Becker',
      role: 'Event-Driven Architecture & Decision Rules Director',
      image: '/images/leaders/leader-7.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Sophia Lorenzen',
      role: 'Process Automation & Industrial IoT Advisory Principal',
      image: '/images/leaders/leader-10.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Thomas Wright',
      role: 'Automation Governance & Enterprise Operations Lead',
      image: '/images/leaders/leader-9.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'business-strategy': [
    {
      name: 'Alexander Hayes',
      role: 'Global Corporate Strategy & Capital Advisory Chair',
      image: '/images/leaders/leader-1.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Diane Thorne',
      role: 'Operating Model Transformation & Strategic Priorities Lead',
      image: '/images/leaders/leader-2.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'George Sterling',
      role: 'Commercial Execution & Enterprise Realignment Principal',
      image: '/images/leaders/leader-5.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Victoria Song',
      role: 'Strategic Planning & Organizational Performance Director',
      image: '/images/leaders/leader-6.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Ronald MacIntyre',
      role: 'Cross-Functional Growth Strategy & Market Entry Lead',
      image: '/images/leaders/leader-7.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'data-analytics-ai': [
    {
      name: 'Dr. Hiroshi Tanaka',
      role: 'Global Data Strategy & Enterprise AI Practice Chair',
      image: '/images/leaders/leader-9.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Maya Lin',
      role: 'Applied Machine Learning & Predictive Insights Lead',
      image: '/images/leaders/leader-8.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'David Ross',
      role: 'Data Governance, Warehousing & Reporting Architecture Director',
      image: '/images/leaders/leader-3.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Ananya Sen',
      role: 'Decision Systems & Cognitive Analytics Advisory Principal',
      image: '/images/leaders/leader-10.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Christopher Vance',
      role: 'Enterprise Information Flow & Advanced Modeling Lead',
      image: '/images/leaders/leader-1.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
  'supply-chain-operations': [
    {
      name: 'Jonathan Briggs',
      role: 'Global Supply Chain Resiliency & Logistics Chair',
      image: '/images/leaders/leader-7.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Marianne Frost',
      role: 'Multi-Echelon Inventory & Fulfillment Strategy Lead',
      image: '/images/leaders/leader-2.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Sanjay Verma',
      role: 'Demand Forecasting & Supplier Coordination Principal',
      image: '/images/leaders/leader-5.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Lucas Van Der Berg',
      role: 'S&OP Planning & Logistics Network Optimization Director',
      image: '/images/leaders/leader-3.webp',
      linkedin: 'https://linkedin.com',
    },
    {
      name: 'Fiona Campbell',
      role: 'Procurement Strategy & Operational Continuity Lead',
      image: '/images/leaders/leader-4.webp',
      linkedin: 'https://linkedin.com',
    },
  ],
};
