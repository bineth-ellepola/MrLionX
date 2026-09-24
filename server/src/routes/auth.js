import crypto from 'node:crypto'
import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import { config } from '../config.js'
import requireAdmin, { adminConfigured, TOKEN_AUDIENCE } from '../middleware/requireAdmin.js'
import { cloudinaryConfigured } from '../utils/cloudinary.js'

const router = Router()

// 10 login attempts per IP per 15 minutes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many login attempts - please try again later.' },
})

// Constant-time string compare (hashing first makes lengths equal).
const safeEqual = (a, b) => {
  const ha = crypto.createHash('sha256').update(String(a)).digest()
  const hb = crypto.createHash('sha256').update(String(b)).digest()
  return crypto.timingSafeEqual(ha, hb)
}

// POST /api/auth/login  { username, password } -> { token, username }
router.post('/login', loginLimiter, (req, res) => {
  if (!adminConfigured()) {
    return res.status(503).json({ error: 'Admin access is not configured' })
  }

  const username = String(req.body?.username || '').trim().toLowerCase()
  const password = String(req.body?.password || '')
  const usernameOk = safeEqual(username, config.admin.username)
  const passwordOk = safeEqual(password, config.admin.password)
  if (!usernameOk || !passwordOk) {
    return res.status(401).json({ error: 'Invalid username or password' })
  }

  const token = jwt.sign({ role: 'admin', username }, config.admin.jwtSecret, {
    expiresIn: config.admin.tokenTtl,
    audience: TOKEN_AUDIENCE,
  })
  res.json({ token, username })
})

// GET /api/auth/me - lets the dashboard check whether a stored token is still valid.
router.get('/me', requireAdmin, (req, res) => {
  res.json({ username: req.admin.username, uploads: cloudinaryConfigured() })
})

export default router
