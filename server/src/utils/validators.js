// Accepts absolute http(s) URLs or site-relative paths like "/images/wedding/hero.png".
// Rejects javascript:, data: and other schemes that could be abused in <img>/<a> tags.
export function isSafeUrl(value) {
  if (!value) return true
  if (value.startsWith('/') && !value.startsWith('//')) return true
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

export const urlValidator = {
  validator: isSafeUrl,
  message: (props) => `"${props.value}" must be an http(s) URL or a path starting with /`,
}

// Trimmed, non-empty strings only.
export const cleanList = (list) =>
  Array.isArray(list) ? list.map((s) => String(s).trim()).filter(Boolean) : list
