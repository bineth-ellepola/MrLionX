import logo from '../assets/logo.jpg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <img src={logo} alt="MrLionX logo" />
              <span className="brand-name">
                MRLION<span>X</span>
              </span>
            </div>
            <p>Software project development team building fast, reliable frontends.</p>
          </div>

          <div className="footer-col">
            <h4>Site</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#work">Work</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#about">About</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:binethellepola@gmail.com">binethellepola@gmail.com</a></li>
              <li><a href="tel:0742676588">0742676588</a></li>
              <li><a href="#contact">Start a project</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} MrLionX. All rights reserved.</span>
          <div className="footer-socials">
            <a href="#top" aria-label="Back to top">Back to top ↑</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
