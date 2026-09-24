import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
import { config } from './config.js'
import contactRoutes from './routes/contact.js'
import adminRoutes from './routes/admin.js'
import authRoutes from './routes/auth.js'
import contentRoutes from './routes/content.js'

const app = express()

// Render sits behind a proxy; needed so rate limiting sees the real client IP.
app.set('trust proxy', 1)

app.use(helmet())
app.use(
  cors({
    origin(origin, cb) {
      // Allow non-browser clients (curl, health checks) and whitelisted origins.
      if (!origin || config.corsOrigins.includes(origin)) return cb(null, true)
      cb(new Error(`Origin ${origin} not allowed by CORS`))
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
)
app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: false, limit: '20kb' }))

app.get('/', (req, res) => res.json({ name: 'MrLionX API', status: 'ok' }))

app.get('/api/health', (req, res) => {
  const dbUp = mongoose.connection.readyState === 1
  res.status(dbUp ? 200 : 503).json({ status: dbUp ? 'ok' : 'degraded', db: dbUp })
})

app.use('/api', contentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    const errors = Object.fromEntries(Object.entries(err.errors).map(([k, v]) => [k, v.message]))
    return res.status(400).json({ error: 'Validation failed', errors })
  }
  if (err.message?.includes('not allowed by CORS')) {
    return res.status(403).json({ error: err.message })
  }
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

export default app
