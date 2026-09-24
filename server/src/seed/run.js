// Usage: npm run seed  (uses MONGO_URI from .env)
import dns from 'node:dns'
import mongoose from 'mongoose'
import { config } from '../config.js'
import { seedDefaults } from './defaults.js'

if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()))
await mongoose.connect(config.mongoUri, { dbName: config.mongoDbName })
const result = await seedDefaults()
console.log(`Seeded ${result.projects} projects and ${result.plans} plans (empty collections only).`)
await mongoose.disconnect()
