import { useState } from 'react'
import { API_URL } from '../lib/api.js'

const BUDGETS = ['Under $300', '$300 - $800', '$800 - $2,000', "Let's discuss"]
const CONTACT_EMAIL = 'binethellepola@gmail.com'
const CONTACT_PHONE = '0742676588'
// Falls back to FormSubmit when no backend is configured.
function sendMessage(form) {
  if (!API_URL) {
    return fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
  }

  return fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(Object.fromEntries(new FormData(form))),
  })
}

export default function Contact() {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    setStatus('Sending...')

    try {
      const response = await sendMessage(form)

      if (response.status === 429) {
        setStatus('Too many messages - please try again later.')
        return
      }
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
          {/* Honeypot: hidden from people, filled in by spam bots */}
          <input
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ display: 'none' }}
          />
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
