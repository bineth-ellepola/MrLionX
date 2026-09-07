import logo from '../assets/logo.jpg'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <div className="hero-copy">
          <div className="eyebrow">Frontend development team</div>
          <h1>
            Interfaces built with the <span className="gradient-text">precision of a lion on the hunt.</span>
          </h1>
          <p>
            MrLionX designs and builds fast, responsive frontends — from
            marketing sites to full product interfaces — at prices that make
            sense for growing teams.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get a free quote
            </a>
            <a href="#work" className="btn btn-ghost">
              View our work
            </a>
          </div>
          <div className="hero-meta">
            <div>
              <strong>4+</strong>
              <span>Shipped projects</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Responsive builds</span>
            </div>
            <div>
              <strong>&lt; 48h</strong>
              <span>Typical quote turnaround</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-ring" aria-hidden="true" />
          <div className="hero-mark">
            <div className="hero-mark-inner">
              <img src={logo} alt="MrLionX brand mark" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
