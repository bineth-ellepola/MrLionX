const STEPS = [
  {
    title: 'Scope the work',
    description: 'A short call to understand what you need and what "done" looks like, followed by a written quote.',
  },
  {
    title: 'Plan the build',
    description: 'We break the work into milestones so you can see progress and adjust direction early, not at the end.',
  },
  {
    title: 'Build & review',
    description: 'You get staged previews as we go, not a single reveal at the finish line.',
  },
  {
    title: 'Launch & support',
    description: 'We deploy, hand over clean documentation, and stay reachable for fixes after launch.',
  },
]

export default function Process() {
  return (
    <section className="section section-alt" id="process">
      <div className="container">
        <div className="section-head">
          <div className="eyebrow">How we work</div>
          <h2>A straightforward process, start to finish</h2>
          <p>No surprise invoices and no disappearing after the deposit.</p>
        </div>

        <div className="process-list">
          {STEPS.map((step) => (
            <div className="process-step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
