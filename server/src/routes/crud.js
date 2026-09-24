import { Router } from 'express'
import mongoose from 'mongoose'

const pick = (body = {}, fields) =>
  Object.fromEntries(fields.filter((f) => body[f] !== undefined).map((f) => [f, body[f]]))

const validId = (req, res, next) =>
  mongoose.isValidObjectId(req.params.id) ? next() : res.status(400).json({ error: 'Invalid id' })

// Admin CRUD for a content model. Only `fields` can be written by the client.
export default function crudRouter(Model, fields) {
  const router = Router()
  const sort = { order: 1, createdAt: 1 }

  router.get('/', async (req, res, next) => {
    try {
      res.json(await Model.find().sort(sort).lean())
    } catch (err) {
      next(err)
    }
  })

  router.post('/', async (req, res, next) => {
    try {
      const doc = await Model.create(pick(req.body, fields))
      res.status(201).json(doc)
    } catch (err) {
      next(err)
    }
  })

  // Uses load + save (not findByIdAndUpdate) so every schema validator and setter runs.
  router.put('/:id', validId, async (req, res, next) => {
    try {
      const doc = await Model.findById(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      doc.set(pick(req.body, fields))
      await doc.save()
      res.json(doc)
    } catch (err) {
      next(err)
    }
  })

  router.delete('/:id', validId, async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndDelete(req.params.id)
      if (!doc) return res.status(404).json({ error: 'Not found' })
      res.status(204).end()
    } catch (err) {
      next(err)
    }
  })

  return router
}
