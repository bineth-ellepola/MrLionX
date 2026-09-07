export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-card">
          <h3>Who we are</h3>
          <p style={{ color: 'var(--text-dim)', marginTop: '0.75rem' }}>
            A small software project development team focused on frontend
            work — React on the web, React Native on mobile.
          </p>
          <div className="about-stats">
            <div>
              <strong>MERN</strong>
              <span>Core stack</span>
            </div>
            <div>
              <strong>React Native</strong>
              <span>Mobile builds</span>
            </div>
            <div>
              <strong>Fixed quotes</strong>
              <span>No hidden costs</span>
            </div>
            <div>
              <strong>Direct contact</strong>
              <span>No account managers</span>
            </div>
          </div>
        </div>

        <div className="about-copy">
          <div className="eyebrow">About MrLionX</div>
          <h2>Built by people who ship, not just design</h2>
          <p>
            MrLionX came together around one idea: teams shouldn't have to
            choose between a frontend that looks right and one that actually
            works well on every screen. We build both, and we build them at a
            price that makes sense for early-stage products and small
            businesses.
          </p>
          <p>
            Every engagement is handled directly by the people writing the
            code — no handoffs between sales and delivery, no scope creep you
            didn't agree to.
          </p>
        </div>
      </div>
    </section>
  )
}
