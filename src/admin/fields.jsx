import { useRef, useState } from 'react'

// Picks an image file, passes it to upload(file) -> url, then reports the URL.
function UploadButton({ upload, onUploaded, label = 'Upload image' }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setBusy(true)
    setError('')
    try {
      onUploaded(await upload(file))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <span className="adm-upload">
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
      <button type="button" className="btn btn-ghost adm-btn-sm" disabled={busy} onClick={() => inputRef.current?.click()}>
        {busy ? 'Uploading...' : label}
      </button>
      {error && <span className="adm-upload-error" role="alert">{error}</span>}
    </span>
  )
}

function ImagePreview({ src }) {
  const [failedSrc, setFailedSrc] = useState(null)
  if (!src) return <div className="adm-thumb adm-thumb-empty">No image</div>
  if (failedSrc === src) return <div className="adm-thumb adm-thumb-empty">Can't load image</div>
  return <img className="adm-thumb" src={src} alt="" onError={() => setFailedSrc(src)} />
}

// Editable list of strings with add / remove / reorder. `images` shows thumbnails.
function StringList({ id, value = [], onChange, placeholder, images, upload }) {
  const update = (i, v) => onChange(value.map((item, j) => (j === i ? v : item)))
  const remove = (i) => onChange(value.filter((_, j) => j !== i))
  const move = (i, dir) => {
    const next = [...value]
    ;[next[i], next[i + dir]] = [next[i + dir], next[i]]
    onChange(next)
  }

  return (
    <div className="adm-list" id={id}>
      {value.map((item, i) => (
        <div className={`adm-list-row${images ? ' adm-list-row-image' : ''}`} key={i}>
          {images && <ImagePreview src={item} />}
          <input
            type="text"
            inputMode={images ? 'url' : undefined}
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
            aria-label={`Item ${i + 1}`}
          />
          <div className="adm-list-actions">
            <button type="button" className="adm-icon-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">↑</button>
            <button type="button" className="adm-icon-btn" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move down">↓</button>
            <button type="button" className="adm-icon-btn adm-danger" onClick={() => remove(i)} aria-label="Remove">✕</button>
          </div>
        </div>
      ))}
      <div className="adm-list-add">
        <button type="button" className="btn btn-ghost adm-btn-sm" onClick={() => onChange([...value, ''])}>
          + Add {images ? 'image URL' : 'item'}
        </button>
        {images && upload && (
          <UploadButton upload={upload} onUploaded={(url) => onChange([...value.filter(Boolean), url])} />
        )}
      </div>
    </div>
  )
}

// Renders one form field from a config entry: { name, label, type, placeholder, help, required }.
export default function Field({ field, value, onChange, upload }) {
  const id = `f-${field.name}`
  const { type, label, placeholder, help, required } = field

  if (type === 'checkbox') {
    return (
      <label className="adm-check" htmlFor={id}>
        <input id={id} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        {label}
      </label>
    )
  }

  let input
  if (type === 'textarea') {
    input = <textarea id={id} value={value ?? ''} placeholder={placeholder} required={required} onChange={(e) => onChange(e.target.value)} />
  } else if (type === 'list' || type === 'imageList') {
    input = <StringList id={id} value={value} onChange={onChange} placeholder={placeholder} images={type === 'imageList'} upload={upload} />
  } else if (type === 'image') {
    input = (
      <div className="adm-list-row adm-list-row-image">
        <ImagePreview src={value} />
        <input id={id} type="text" inputMode="url" value={value ?? ''} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
        {upload && <UploadButton upload={upload} onUploaded={onChange} label="Upload" />}
      </div>
    )
  } else if (type === 'number') {
    input = <input id={id} type="number" value={value ?? 0} onChange={(e) => onChange(Number(e.target.value))} />
  } else {
    input = <input id={id} type="text" value={value ?? ''} placeholder={placeholder} required={required} onChange={(e) => onChange(e.target.value)} />
  }

  return (
    <div className={`field${field.wide ? ' adm-wide' : ''}`}>
      <label htmlFor={id}>
        {label}
        {required && ' *'}
      </label>
      {input}
      {help && <small className="adm-help">{help}</small>}
    </div>
  )
}
