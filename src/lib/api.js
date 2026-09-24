// Backend on Render, e.g. "https://mrlionx-api.onrender.com". Empty = no backend configured.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export async function apiRequest(path, { method = 'GET', body, token } = {}) {
  // FormData (file uploads) is sent as-is so the browser sets the multipart boundary.
  const isForm = body instanceof FormData
  const headers = {}
  if (body !== undefined && !isForm) headers['Content-Type'] = 'application/json'
  if (token) headers.Authorization = `Bearer ${token}`

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body === undefined || isForm ? body : JSON.stringify(body),
  })

  if (response.status === 204) return null
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    const details = data?.errors ? Object.values(data.errors).join(' ') : ''
    throw new ApiError(details || data?.error || `Request failed (${response.status})`, response.status, data?.errors)
  }
  return data
}
