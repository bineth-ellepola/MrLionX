import { useCallback, useEffect, useState } from 'react'

const STATUSES = ['new', 'read', 'replied', 'archived']
const formatDate = (iso) =>
  new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })

export default function MessagesManager({ api }) {
  const [filter, setFilter] = useState('')
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const query = filter ? `&status=${filter}` : ''
      setData(await api(`/api/admin/messages?limit=100${query}`))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [api, filter])

  useEffect(() => {
    load()
  }, [load])

  const setStatus = async (msg, status) => {
    try {
      await api(`/api/admin/messages/${msg._id}`, { method: 'PATCH', body: { status } })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (msg) => {
    if (!window.confirm(`Delete the message from ${msg.name}?`)) return
    try {
      await api(`/api/admin/messages/${msg._id}`, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="adm-panel">
      <div className="adm-panel-head">
        <h2>Messages {data.total > 0 && <span className="adm-muted">({data.total})</span>}</h2>
        <select className="adm-select" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
          <option value="">All</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
      </div>

      {error && <p className="adm-error" role="alert">{error}</p>}
      {loading && data.items.length === 0 && <p className="adm-muted">Loading...</p>}
      {!loading && data.items.length === 0 && <p className="adm-muted">No messages.</p>}

      <ul className="adm-messages">
        {data.items.map((msg) => (
          <li key={msg._id} className={`adm-message${msg.status === 'new' ? ' is-new' : ''}`}>
            <div className="adm-message-head">
              <div>
                <strong>{msg.name}</strong>{' '}
                <a href={`mailto:${msg.email}`}>{msg.email}</a>
              </div>
              <span className="adm-muted">{formatDate(msg.createdAt)}</span>
            </div>
            {msg.budget && <div className="adm-muted">Budget: {msg.budget}</div>}
            <p className="adm-message-body">{msg.message}</p>
            <div className="adm-message-actions">
              <select className="adm-select" value={msg.status} onChange={(e) => setStatus(msg, e.target.value)} aria-label="Status">
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
              <a className="btn btn-ghost adm-btn-sm" href={`mailto:${msg.email}?subject=${encodeURIComponent('Re: your MrLionX enquiry')}`}>
                Reply
              </a>
              <button type="button" className="btn btn-ghost adm-btn-sm adm-danger" onClick={() => remove(msg)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
