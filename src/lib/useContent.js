import { useEffect, useState } from 'react'
import { API_URL, apiRequest } from './api.js'

const cacheKey = (path) => `mrlionx_content:${path}`

function readCache(path) {
  try {
    const raw = localStorage.getItem(cacheKey(path))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeCache(path, data) {
  try {
    localStorage.setItem(cacheKey(path), JSON.stringify(data))
  } catch {
    // Storage unavailable (private mode etc.) - caching is optional.
  }
}

// Loads site content from the API. Renders immediately from the last cached
// response (or the built-in fallback) so the section never sits empty while
// Render's free tier wakes up, then swaps in fresh data when it arrives.
export default function useContent(path, fallback) {
  const [items, setItems] = useState(() => (API_URL && readCache(path)) || fallback)

  useEffect(() => {
    if (!API_URL) return
    let cancelled = false
    apiRequest(path)
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return
        setItems(data)
        writeCache(path, data)
      })
      .catch(() => {
        // Keep showing cached/fallback content if the API is unreachable.
      })
    return () => {
      cancelled = true
    }
  }, [path])

  return items
}
