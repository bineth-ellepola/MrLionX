import { useState } from 'react'

const BUDGETS = ['Under $300', '$300 - $800', '$800 - $2,000', "Let's discuss"]
const CONTACT_EMAIL = 'binethellepola@gmail.com'
const CONTACT_PHONE = '0742676588'

export default function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    setStatus('Sending...')

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })

      if (!response.ok) throw new Error('Request failed')

      setStatus("Thanks - we'll reply within 1-2 business days.")
      form.reset()
    } catch (err) {
      setStatus('Something went wrong - please email us directly instead.')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container contact-wrap">
        <div className="contact-info">
          <div className="eyebrow">Get in touch</div>
          <h2>Tell us about your project</h2>
          <p>
            Share a few details and we'll come back with a scope and a quote
            - no obligation.
          </p>

          <div className="contact-detail">
            <span>Email</span>
            <span>{CONTACT_EMAIL}</span>
          </div>
          <div className="contact-detail">
            <span>Phone</span>
            <span>{CONTACT_PHONE}</span>
          </div>
          <div className="contact-detail">
            <span>Response time</span>
            <span>Within 1-2 business days</span>
          </div>
          <div className="contact-detail">
            <span>Availability</span>
            <span>Taking new projects</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
          </div>

          <div className="field">
            <label htmlFor="budget">Estimated budget</label>
            <select id="budget" name="budget" defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              {BUDGETS.map((b) => (
                <option value={b} key={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="message">Project details</label>
            <textarea
              id="message"
              name="message"
              placeholder="What are you looking to build?"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Send message
          </button>
          <p className="form-status" role="status">{status}</p>
        </form>
      </div>
    </section>
  )
}
