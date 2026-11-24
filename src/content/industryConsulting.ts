// How each consulting discipline applies to the work of a particular industry.
export const industryConsulting: Record<string, Record<string, string>> = {
  'manufacturing-industrial': {
    'manufacturing-consulting': 'Trace production losses, quality variation, and maintenance handoffs before changing the operating plan.',
    'technology-automation': 'Assess where connected equipment and repeatable automation can improve plant reliability without disrupting output.',
    'supply-chain-operations': 'Link materials planning, supplier lead times, and production capacity so schedules reflect what the plant can deliver.',
    'data-analytics-ai': 'Bring machine, quality, and planning data into a trustworthy view before testing predictive use cases.',
  },
  'fmcg-consumer-goods': {
    'fmcg-consulting': 'Connect category demand, distributor performance, and shelf availability to a practical commercial plan.',
    'supply-chain-operations': 'Review replenishment rules, inventory buffers, and delivery exceptions across the route to market.',
    'data-analytics-ai': 'Use consistent sales and stock definitions to identify demand signals and evaluate forecasting opportunities.',
    'business-strategy': 'Make clear choices about channels, product portfolios, and growth priorities against available capacity.',
  },
  'information-technology': {
    'it-consulting': 'Set platform priorities around business needs, system resilience, security, and the cost of change.',
    'technology-automation': 'Identify repeatable IT workflows where automation can reduce manual effort with clear oversight.',
    'data-analytics-ai': 'Establish data ownership, decision-focused reporting, and responsible AI pilots before scaling.',
    'business-strategy': 'Connect technology investment choices to the operating model and the outcomes leadership expects.',
  },
  education: {
    'education-consulting': 'Improve student and staff journeys across teaching, administration, and institutional services.',
    'it-consulting': 'Assess the systems that support learning and operations for accessibility, integration, and reliability.',
    'technology-automation': 'Simplify routine admissions and administration tasks while retaining human review where it matters.',
    'data-analytics-ai': 'Define dependable learner and operational measures before introducing analytics or AI tools.',
  },
  'retail-commerce': {
    'supply-chain-operations': 'Connect store stock, online orders, replenishment, and returns to improve fulfillment decisions.',
    'data-analytics-ai': 'Use consistent customer, product, and inventory data to support merchandising and service decisions.',
    'business-strategy': 'Prioritize channels, formats, and investment choices against customer demand and unit economics.',
    'technology-automation': 'Evaluate where order routing and store workflows can be automated without weakening the customer experience.',
  },
  'logistics-distribution': {
    'supply-chain-operations': 'Follow orders through planning, warehousing, transport, and delivery to uncover the costly handoffs.',
    'technology-automation': 'Assess scanning, routing, and warehouse automation against volume, exceptions, and workforce needs.',
    'data-analytics-ai': 'Build reliable measures for lead times, capacity, and service before testing predictive planning.',
    'manufacturing-consulting': 'Apply process discipline and capacity analysis to high-throughput handling and fulfillment operations.',
  },
  'investment-real-estate': {
    'business-strategy': 'Compare acquisition, development, and disposal choices using explicit assumptions and portfolio priorities.',
    'data-analytics-ai': 'Combine leasing, asset, and operating information into decision-ready reports and bounded scenarios.',
    'supply-chain-operations': 'Map procurement and delivery dependencies across development projects and property operations.',
    'it-consulting': 'Review the systems that hold asset, tenant, and operational records for integration and governance.',
  },
  'business-strategy': {
    'business-strategy': 'Turn market evidence and organizational strengths into a small set of owned strategic choices.',
    'data-analytics-ai': 'Test assumptions with dependable information and measures that help leaders review progress.',
    'supply-chain-operations': 'Check whether operating capacity and supply commitments can support the proposed direction.',
    'it-consulting': 'Sequence technology decisions around the capabilities the strategy actually requires.',
  },
};
