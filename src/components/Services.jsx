const SERVICES = [
  {
    title: 'Frontend builds',
    description:
      'React and Next.js interfaces built from your designs or ours, componentised for the changes you\'ll ask for next quarter, not just this one.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 4L3 12L8 20M16 4L21 12L16 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Responsive redesigns',
    description:
      'Turn an existing site or app into something that holds up on a phone, a tablet, and an ultrawide monitor without three separate codebases.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
        <rect x="17" y="7" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 17H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Performance & polish',
    description:
      'Auditing load times, fixing layout shift, and tightening animations so the product feels as fast as it actually is.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 3V6M12 18V21M4.2 4.2L6.3 6.3M17.7 17.7L19.8 19.8M3 12H6M18 12H21M4.2 19.8L6.3 17.7M17.7 6.3L19.8 4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section className="section" id="services">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">What we do</div>
          <h2>Frontend work, done properly</h2>
          <p>
            We specialise in the layer your users actually touch — clean,
            responsive interfaces that are simple to maintain after we hand
            them off.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service) => (
            <article className="service-card" key={service.title}>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
