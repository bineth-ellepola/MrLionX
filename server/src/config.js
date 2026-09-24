import 'dotenv/config'

const required = ['MONGO_URI']
const missing = required.filter((key) => !process.env[key])
if (missing.length) {
  console.error(`Missing required env vars: ${missing.join(', ')}`)
  process.exit(1)
}

export const config = {
  port: Number(process.env.PORT) || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGO_URI,
  // Database inside the cluster; keeps this site's data separate from other apps on it.
  mongoDbName: process.env.MONGO_DB_NAME || 'mrlionx',
  // Comma-separated frontend origins allowed to call the API,
  // e.g. "https://mr-lion-x.vercel.app,http://localhost:5173"
  corsOrigins: (process.env.CLIENT_URL || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean),
  // Single admin account for the dashboard, configured via env vars.
  admin: {
    username: (process.env.ADMIN_USERNAME || '').trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || '',
    jwtSecret: process.env.JWT_SECRET || '',
    tokenTtl: process.env.JWT_EXPIRES_IN || '7d',
  },
  // Cloudinary, for image uploads from the dashboard.
  cloudinary: {
    cloudName: process.env.CLOUD_NAME || '',
    apiKey: process.env.CLOUD_API_KEY || '',
    apiSecret: process.env.CLOUD_API_SECRET || '',
    folder: process.env.CLOUD_FOLDER || 'mrlionx',
  },
  mail: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 465,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    notifyTo: process.env.NOTIFY_EMAIL || '',
  },
}
