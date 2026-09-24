import { Router } from 'express'
import Project from '../models/Project.js'
import Plan from '../models/Plan.js'

// Public, read-only content for the website. Only published items are returned.
const router = Router()
const sort = { order: 1, createdAt: 1 }
const hidden = '-published -createdAt -updatedAt -__v'

const listPublished = (Model) => async (req, res, next) => {
  try {
    const items = await Model.find({ published: true }).sort(sort).select(hidden).lean()
    // Short browser cache; content changes rarely and this keeps repeat visits snappy.
    res.set('Cache-Control', 'public, max-age=60').json(items)
  } catch (err) {
    next(err)
  }
}

router.get('/projects', listPublished(Project))
router.get('/plans', listPublished(Plan))

export default router
