import { useState } from 'react'
import { apiRequest } from '../lib/api.js'
import logo from '../assets/logo.jpg'

export default function Login({ onLogin }) {
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)
    setBusy(true)
    setError('')
    try {
      const { token } = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: { username: form.get('username'), password: form.get('password') },
      })
      onLogin(token)
    } catch (err) {
      setError(err.status === 401 ? 'Wrong username or password.' : err.message || 'Could not reach the server.')
      setBusy(false)
    }
  }

  return (
    <div className="adm-login-wrap">
      <form className="contact-form adm-login" onSubmit={submit}>
        <div className="brand">
          <img src={logo} alt="" />
          <span className="brand-name">
            MRLION<span>X</span>
          </span>
        </div>
        <h1>Admin login</h1>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" autoComplete="username" autoCapitalize="none" required />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required />
        </div>
        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? 'Signing in... (the server may take a minute to wake up)' : 'Sign in'}
        </button>
        {error && <p className="adm-error" role="alert">{error}</p>}
        <a className="adm-muted adm-back" href="/">← Back to website</a>
      </form>
    </div>
  )
}
