import { useCallback, useEffect, useState } from 'react'
import Field from './fields.jsx'

// Generic list + editor for a content collection (projects, plans).
// `config` = { resource, singular, fields, emptyItem, summary(item) -> { title, subtitle, image } }
export default function ContentManager({ api, config }) {
  const { resource, singular, fields, emptyItem, summary } = config
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draft, setDraft] = useState(null) // object being edited; has _id when editing existing
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setItems(await api(`/api/admin/${resource}`))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [api, resource])

  useEffect(() => {
    load()
  }, [load])

  const startNew = () => {
    const nextOrder = items.reduce((max, it) => Math.max(max, it.order || 0), 0) + 1
    setFormError('')
    setDraft({ ...structuredClone(emptyItem), order: nextOrder })
  }

  const startEdit = (item) => {
    setFormError('')
    setDraft(structuredClone(item))
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    const body = Object.fromEntries(fields.map((f) => [f.name, draft[f.name]]))
    try {
      if (draft._id) await api(`/api/admin/${resource}/${draft._id}`, { method: 'PUT', body })
      else await api(`/api/admin/${resource}`, { method: 'POST', body })
      setDraft(null)
      await load()
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (item) => {
    if (!window.confirm(`Delete "${summary(item).title}"? This can't be undone.`)) return
    try {
      await api(`/api/admin/${resource}/${item._id}`, { method: 'DELETE' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  // Swap with a neighbour, then renumber so orders are always 1..n.
  const move = async (index, dir) => {
    const next = [...items]
    ;[next[index], next[index + dir]] = [next[index + dir], next[index]]
    setItems(next)
    try {
      await Promise.all(
        next.map((item, i) =>
          item.order === i + 1
            ? null
            : api(`/api/admin/${resource}/${item._id}`, { method: 'PUT', body: { order: i + 1 } })
        )
      )
    } catch (err) {
      setError(err.message)
    }
    await load()
  }

  const upload = useCallback(
    async (file) => {
      const body = new FormData()
      body.append('image', file)
      const { url } = await api('/api/admin/upload', { method: 'POST', body })
      return url
    },
    [api]
  )

  const seed = async () => {
    try {
      await api('/api/admin/seed', { method: 'POST' })
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  if (draft) {
    return (
      <form className="adm-panel adm-form" onSubmit={save}>
        <div className="adm-panel-head">
          <h2>{draft._id ? `Edit ${singular}` : `New ${singular}`}</h2>
          <button type="button" className="btn btn-ghost adm-btn-sm" onClick={() => setDraft(null)}>
            Cancel
          </button>
        </div>
        <div className="adm-form-grid">
          {fields.map((field) => (
            <Field
              key={field.name}
              field={field}
              value={draft[field.name]}
              onChange={(v) => setDraft((d) => ({ ...d, [field.name]: v }))}
              upload={upload}
            />
          ))}
        </div>
        {formError && <p className="adm-error" role="alert">{formError}</p>}
        <div className="adm-form-actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setDraft(null)}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="adm-panel">
      <div className="adm-panel-head">
        <h2>{config.title}</h2>
        <button type="button" className="btn btn-primary adm-btn-sm" onClick={startNew}>
          + New {singular}
        </button>
      </div>

      {error && <p className="adm-error" role="alert">{error}</p>}
      {loading && items.length === 0 && <p className="adm-muted">Loading...</p>}

      {!loading && items.length === 0 && (
        <div className="adm-empty">
          <p>Nothing here yet. The website is showing no {resource} right now.</p>
          <button type="button" className="btn btn-ghost adm-btn-sm" onClick={seed}>
            Import the original site content
          </button>
        </div>
      )}

      <ul className="adm-items">
        {items.map((item, i) => {
          const s = summary(item)
          return (
            <li className="adm-item" key={item._id}>
              {s.image ? <img className="adm-thumb" src={s.image} alt="" /> : <div className="adm-thumb adm-thumb-empty" />}
              <div className="adm-item-body">
                <div className="adm-item-title">
                  {s.title}
                  {!item.published && <span className="adm-badge">Hidden</span>}
                  {item.featured && <span className="adm-badge adm-badge-accent">Featured</span>}
                </div>
                <div className="adm-muted">{s.subtitle}</div>
              </div>
              <div className="adm-item-actions">
                <button type="button" className="adm-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
                <button type="button" className="adm-icon-btn" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down">↓</button>
                <button type="button" className="btn btn-ghost adm-btn-sm" onClick={() => startEdit(item)}>Edit</button>
                <button type="button" className="btn btn-ghost adm-btn-sm adm-danger" onClick={() => remove(item)}>Delete</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
