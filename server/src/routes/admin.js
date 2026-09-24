import { Router } from 'express'
import mongoose from 'mongoose'
import Message from '../models/Message.js'
import Project, { PROJECT_FIELDS } from '../models/Project.js'
import Plan, { PLAN_FIELDS } from '../models/Plan.js'
import requireAdmin from '../middleware/requireAdmin.js'
import crudRouter from './crud.js'
import uploadRouter from './upload.js'
import { seedDefaults } from '../seed/defaults.js'

const router = Router()
router.use(requireAdmin)

router.use('/projects', crudRouter(Project, PROJECT_FIELDS))
router.use('/plans', crudRouter(Plan, PLAN_FIELDS))
router.use('/upload', uploadRouter)

// POST /api/admin/seed - fills empty Projects/Plans collections with the original site content.
router.post('/seed', async (req, res, next) => {
  try {
    res.json(await seedDefaults())
  } catch (err) {
    next(err)
  }
})

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: 'Invalid id' })

// GET /api/admin/messages?status=new&page=1&limit=20
router.get('/messages', async (req, res, next) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20))
    const filter = typeof req.query.status === 'string' ? { status: req.query.status } : {}

    const [items, total] = await Promise.all([
      Message.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Message.countDocuments(filter),
    ])
    res.json({ items, total, page, pages: Math.ceil(total / limit) })
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/messages/:id
router.get('/messages/:id', validId, async (req, res, next) => {
  try {
    const doc = await Message.findById(req.params.id).lean()
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

// PATCH /api/admin/messages/:id  { "status": "read" }
router.patch('/messages/:id', validId, async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndUpdate(
      req.params.id,
      { status: req.body?.status },
      { new: true, runValidators: true }
    ).lean()
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.json(doc)
  } catch (err) {
    next(err)
  }
})

// DELETE /api/admin/messages/:id
router.delete('/messages/:id', validId, async (req, res, next) => {
  try {
    const doc = await Message.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

export default router
