import dns from 'node:dns'
import mongoose from 'mongoose'
import { config } from './config.js'
import app from './app.js'

// Optional: some local networks/VPNs run a DNS proxy that can't answer the SRV
// lookups mongodb+srv:// needs. DNS_SERVERS=8.8.8.8,1.1.1.1 works around it.
if (process.env.DNS_SERVERS) {
  dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()))
}

async function start() {
  try {
    await mongoose.connect(config.mongoUri, { dbName: config.mongoDbName })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }

  const server = app.listen(config.port, '0.0.0.0', () => {
    console.log(`API listening on port ${config.port} (${config.nodeEnv})`)
  })

  const shutdown = (signal) => {
    console.log(`${signal} received, shutting down`)
    server.close(() => mongoose.connection.close().then(() => process.exit(0)))
  }
  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}

start()
