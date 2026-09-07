const PLANS = [
  {
    name: 'Wedding Website',
    note: 'A beautiful site for your big day',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: [
      'Our story & photo gallery',
      'Event date, time & venue details',
      'RSVP form',
      '1 round of revisions',
    ],
    cta: 'Get started',
    featured: true,
  },
  {
    name: 'Birthday Website',
    note: 'A fun page to celebrate the day',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: [
      'Celebrant photos & gallery',
      'Party details & countdown',
      'RSVP form',
      '1 round of revisions',
    ],
    cta: 'Get started',
    featured: false,
  },
  {
    name: 'Party Website',
    note: 'A simple site for any celebration',
    price: 'Rs.5000',
    unit: 'all inclusive',
    features: [
      'Event details & schedule',
      'Photo gallery',
      'RSVP form',
      '1 round of revisions',
    ],
    cta: 'Get started',
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section className="section section-alt" id="pricing">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">Pricing</div>
          <h2>Wedding, birthday & party websites</h2>
          <p>
            One flat rate for every occasion — no hidden fees, no surprises.
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
          Every package is Rs.5000, regardless of occasion — just share your
          details and we'll get started.
        </p>
      </div>
    </section>
  )
}
