import useContent from '../lib/useContent.js'
import { DEFAULT_PLANS } from '../data/defaults.js'

export default function Pricing() {
  const plans = useContent('/api/plans', DEFAULT_PLANS)

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
          {plans.map((plan) => (
            <div className={`price-card${plan.featured ? ' featured' : ''}`} key={plan._id || plan.name}>
              {plan.featured && <span className="price-featured-tag">Most requested</span>}
              {plan.image && <img className="price-image" src={plan.image} alt="" loading="lazy" />}
              <h3>{plan.name}</h3>
              <p className="price-note">{plan.note}</p>
              <div className="price-amount">
                {plan.price} <span>{plan.unit}</span>
              </div>
              <ul className="price-features">
                {(plan.features || []).map((feature) => (
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
          No hidden fees — just share your details and we'll get started.
        </p>
      </div>
    </section>
  )
}
