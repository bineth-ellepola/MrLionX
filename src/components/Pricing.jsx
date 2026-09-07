const PLANS = [
  {
    name: 'Starter',
    note: 'A focused landing page',
    price: '$150',
    unit: 'starting from',
    features: [
      'Single-page responsive site',
      'Up to 5 sections',
      'Basic contact form',
      '1 round of revisions',
    ],
    cta: 'Get a quote',
    featured: false,
  },
  {
    name: 'Business',
    note: 'A full multi-page website',
    price: '$400',
    unit: 'starting from',
    features: [
      'Up to 6 pages',
      'Custom responsive design',
      'CMS-ready content sections',
      '2 rounds of revisions',
      'Basic SEO setup',
    ],
    cta: 'Get a quote',
    featured: true,
  },
  {
    name: 'Custom app',
    note: 'A product-grade frontend',
    price: 'Let\u2019s talk',
    unit: 'scoped per project',
    features: [
      'React/React Native frontend',
      'API & backend integration',
      'Role-based interfaces',
      'Ongoing support available',
    ],
    cta: 'Book a call',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="section section-alt" id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Pricing</div>
          <h2>Reasonable rates, clear scope</h2>
          <p>
            Every project starts with a scoping call — the numbers below are
            starting points, not the final invoice.
          </p>
        </div>

        <div className="pricing-grid">
          {PLANS.map((plan) => (
            <div className={`price-card${plan.featured ? ' featured' : ''}`} key={plan.name}>
              {plan.featured && <span className="price-featured-tag">Most requested</span>}
              <h3>{plan.name}</h3>
              <p className="price-note">{plan.note}</p>
              <div className="price-amount">
                {plan.price} <span>{plan.unit}</span>
              </div>
              <ul className="price-features">
                {plan.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a href="#contact" className={`btn btn-block ${plan.featured ? 'btn-primary' : 'btn-ghost'}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="pricing-footnote">
          Final pricing depends on scope, timeline, and integrations — we'll
          always confirm it in writing before work starts.
        </p>
      </div>
    </section>
  )
}
