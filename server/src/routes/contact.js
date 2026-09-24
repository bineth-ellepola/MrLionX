import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import Message from '../models/Message.js'
import { notifyNewMessage } from '../utils/mailer.js'

const router = Router()

// 5 submissions per IP per 15 minutes
const submitLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many messages - please try again later.' },
})

// POST /api/contact
router.post('/', submitLimiter, async (req, res, next) => {
  try {
    const { name, email, budget, message, _honey } = req.body || {}

    // Honeypot field: bots fill it, humans never see it. Pretend success.
    if (_honey) return res.status(201).json({ ok: true })

    const doc = await Message.create({ name, email, budget: budget || '', message })
    notifyNewMessage(doc)

    res.status(201).json({ ok: true, id: doc._id })
  } catch (err) {
    next(err)
  }
})

export default router
