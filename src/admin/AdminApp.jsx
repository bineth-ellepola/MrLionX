import { useCallback, useEffect, useState } from 'react'
import { API_URL, apiRequest } from '../lib/api.js'
import Login from './Login.jsx'
import ContentManager from './ContentManager.jsx'
import MessagesManager from './MessagesManager.jsx'
import { PROJECTS_CONFIG, PLANS_CONFIG } from './resources.js'
import logo from '../assets/logo.jpg'
import './admin.css'

const TOKEN_KEY = 'mrlionx_admin_token'
const TABS = [
  { id: 'projects', label: 'Projects' },
  { id: 'plans', label: 'Pricing' },
  { id: 'messages', label: 'Messages' },
]

const readToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

const storeToken = (token) => {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Storage unavailable: the session just won't survive a reload.
  }
}

export default function AdminApp() {
  const [token, setToken] = useState(readToken)
  const [checking, setChecking] = useState(Boolean(readToken()))
  const [tab, setTab] = useState('projects')

  useEffect(() => {
    document.title = 'Admin · MrLionX'
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [])

  const logout = useCallback(() => {
    storeToken(null)
    setToken(null)
  }, [])

  const login = (newToken) => {
    storeToken(newToken)
    setToken(newToken)
  }

  // Authenticated request helper; an expired/invalid token sends you back to login.
  const api = useCallback(
    async (path, options = {}) => {
      try {
        return await apiRequest(path, { ...options, token })
      } catch (err) {
        if (err.status === 401) logout()
        throw err
      }
    },
    [token, logout]
  )

  // Validate a stored token once on load.
  useEffect(() => {
    if (!checking) return
    api('/api/auth/me')
      .catch(() => {})
      .finally(() => setChecking(false))
  }, [api, checking])

  if (!API_URL) {
    return (
      <div className="adm-login-wrap">
        <div className="contact-form adm-login">
          <h1>Backend not connected</h1>
          <p className="adm-muted">
            Set <code>VITE_API_URL</code> to your Render API URL (in Vercel's environment variables, or{' '}
            <code>.env.local</code> for local development) and redeploy.
          </p>
        </div>
      </div>
    )
  }

  if (checking) return <div className="adm-login-wrap adm-muted">Checking session...</div>
  if (!token) return <Login onLogin={login} />

  return (
    <div className="adm-shell">
      <header className="adm-topbar">
        <div className="brand">
          <img src={logo} alt="" />
          <span className="brand-name">
            MRLION<span>X</span>
          </span>
          <span className="adm-badge">Admin</span>
        </div>
        <div className="adm-topbar-actions">
          <a className="btn btn-ghost adm-btn-sm" href="/" target="_blank" rel="noopener noreferrer">
            View site ↗
          </a>
          <button type="button" className="btn btn-ghost adm-btn-sm" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <nav className="adm-tabs" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`adm-tab${tab === t.id ? ' is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </nav>

      <main className="adm-main">
        {tab === 'projects' && <ContentManager key="projects" api={api} config={PROJECTS_CONFIG} />}
        {tab === 'plans' && <ContentManager key="plans" api={api} config={PLANS_CONFIG} />}
        {tab === 'messages' && <MessagesManager api={api} />}
      </main>
    </div>
  )
}
