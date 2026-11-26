interface SampleExpert {
  name: string;
  role: string;
  portrait: number;
  experience: string;
}

const industryExperts: Record<string, SampleExpert[]> = {
  'manufacturing-industrial': [
    { name: 'Mira Sethi', role: 'Manufacturing Operations Advisor', portrait: 6, experience: '5 years improving production planning and plant throughput.' },
    { name: 'Daniel Rao', role: 'Industrial Automation Consultant', portrait: 7, experience: '4 years integrating automation into assembly lines.' },
  ],
  'fmcg-consumer-goods': [
    { name: 'Priya Mehta', role: 'Consumer Goods Commercial Advisor', portrait: 4, experience: '5 years developing category and channel strategies.' },
    { name: 'Arjun Thomas', role: 'FMCG Supply Planning Consultant', portrait: 9, experience: '3 years coordinating forecasts and replenishment.' },
  ],
  'information-technology': [
    { name: 'Neha Iyer', role: 'Enterprise Technology Advisor', portrait: 2, experience: '5 years planning enterprise cloud migrations.' },
    { name: 'Kiran Shah', role: 'Data & AI Readiness Consultant', portrait: 3, experience: '4 years building analytics teams and evaluating AI pilots.' },
  ],
  education: [
    { name: 'Leena Menon', role: 'Academic Operations Advisor', portrait: 8, experience: '5 years redesigning admissions and campus operations.' },
    { name: 'David Suresh', role: 'Education Technology Consultant', portrait: 1, experience: '3 years implementing digital learning platforms.' },
  ],
  'retail-commerce': [
    { name: 'Rhea Varma', role: 'Retail Growth Advisor', portrait: 10, experience: '4 years planning store expansion and assortment.' },
    { name: 'Nikhil Bose', role: 'Commerce Operations Consultant', portrait: 5, experience: '2 years improving checkout and order fulfilment.' },
  ],
  'logistics-distribution': [
    { name: 'Aisha Patel', role: 'Logistics Network Advisor', portrait: 11, experience: '5 years designing freight and distribution networks.' },
    { name: 'Dev Nair', role: 'Distribution Operations Consultant', portrait: 12, experience: '4 years improving warehouse layouts and delivery schedules.' },
  ],
  'business-strategy': [
    { name: 'Anika Sen', role: 'Business Strategy Advisor', portrait: 13, experience: '5 years advising founders on growth priorities.' },
    { name: 'Rohan Das', role: 'Market Entry Consultant', portrait: 14, experience: '3 years assessing overseas markets and entry partners.' },
  ],
  'investment-real-estate': [
    { name: 'Kavya Roy', role: 'Real Estate Strategy Advisor', portrait: 15, experience: '5 years evaluating commercial property portfolios.' },
    { name: 'Vikram Joseph', role: 'Investment Readiness Consultant', portrait: 16, experience: '4 years preparing investment models and diligence materials.' },
  ],
};

const collaborationExperts: SampleExpert[] = [
  { name: 'Tara Anand', role: 'Business Case Advisor', portrait: 17, experience: '4 years building business cases for cross-border ventures.' },
  { name: 'Naveen Iyer', role: 'Verification Readiness Consultant', portrait: 18, experience: '4 years preparing suppliers for partner due diligence.' },
  { name: 'Elena D’Souza', role: 'Global Partnerships Advisor', portrait: 19, experience: '5 years matching businesses with international distributors.' },
];

const featuredIndustryExperts: SampleExpert[] = [
  { name: 'Shreya Kulkarni', role: 'Industrial Growth Advisor', portrait: 20, experience: '5 years helping manufacturers plan capacity and enter new markets.' },
  { name: 'Aditya Raman', role: 'Digital Strategy Consultant', portrait: 21, experience: '4 years guiding software investments and technology adoption.' },
  { name: 'Simran Bedi', role: 'Commercial Property Advisor', portrait: 22, experience: '5 years assessing locations and commercial property opportunities.' },
];

export function OurExperts({ area }: { area: string }) {
  const experts = area === 'collaboration'
    ? collaborationExperts
    : industryExperts[area] ?? featuredIndustryExperts;

  return (
    <section className="leaders-section" id="our-experts" aria-labelledby="our-experts-heading">
      <div className="container leaders-grid-layout">
        <div className="leaders-heading">
          <div>
            <h2 id="our-experts-heading">Our experts</h2>
            <p>Illustrative profiles. Names and experience are fictional.</p>
          </div>
        </div>
        <div className="leaders-cards">
          {experts.map((expert) => (
            <article className="leader-card" key={expert.name}>
              <div className="leader-image-wrap">
                <img className="leader-image" src={`/images/leaders/leader-${expert.portrait}.webp`} width="110" height="125" loading="lazy" alt="" />
              </div>
              <div className="leader-info">
                <h3>{expert.name}</h3>
                <p>{expert.role}</p>
                <p className="expert-experience">{expert.experience}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
