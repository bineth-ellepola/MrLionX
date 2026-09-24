import jwt from 'jsonwebtoken'
import { config } from '../config.js'

// Scopes tokens to this app, so a token from another app sharing JWT_SECRET is rejected.
export const TOKEN_AUDIENCE = 'mrlionx-admin'

export const adminConfigured = () =>
  Boolean(config.admin.username && config.admin.password && config.admin.jwtSecret)

// Protects admin routes. Expects "Authorization: Bearer <token>" from POST /api/auth/login.
export default function requireAdmin(req, res, next) {
  if (!adminConfigured()) {
    return res.status(503).json({ error: 'Admin access is not configured' })
  }

  const token = (req.get('authorization') || '').replace(/^Bearer\s+/i, '')
  try {
    const payload = jwt.verify(token, config.admin.jwtSecret, { audience: TOKEN_AUDIENCE })
    if (payload.role !== 'admin') throw new Error('Wrong role')
    req.admin = payload
    next()
  } catch {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
