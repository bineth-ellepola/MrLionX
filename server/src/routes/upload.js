import { Router } from 'express'
import multer from 'multer'
import { cloudinaryConfigured, uploadImage } from '../utils/cloudinary.js'

const MAX_MB = 5
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_MB * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) =>
    ALLOWED.includes(file.mimetype)
      ? cb(null, true)
      : cb(Object.assign(new Error('Only JPG, PNG, WebP, GIF, SVG or AVIF images are allowed'), { status: 400 })),
})

const router = Router()

// POST /api/admin/upload  (multipart field "image") -> { url, publicId, width, height }
router.post('/', (req, res, next) => {
  if (!cloudinaryConfigured()) {
    return res.status(503).json({ error: 'Image uploads are not configured (set CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET)' })
  }

  upload.single('image')(req, res, async (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE' ? `Image must be under ${MAX_MB} MB` : err.message
      return res.status(400).json({ error: message })
    }
    if (!req.file) return res.status(400).json({ error: 'No image file received' })

    try {
      const result = await uploadImage(req.file.buffer)
      res.status(201).json({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      })
    } catch (uploadErr) {
      next(uploadErr)
    }
  })
})

export default router
