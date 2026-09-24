import mongoose from 'mongoose'
import { urlValidator, cleanList } from '../utils/validators.js'

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 150 },
    tag: { type: String, trim: true, maxlength: 60, default: '' },
    description: { type: String, trim: true, maxlength: 2000, default: '' },
    stack: { type: [{ type: String, trim: true, maxlength: 60 }], set: cleanList, default: [] },
    demoUrl: { type: String, trim: true, maxlength: 500, default: '', validate: urlValidator },
    images: {
      type: [{ type: String, trim: true, maxlength: 1000, validate: urlValidator }],
      set: cleanList,
      default: [],
    },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

projectSchema.index({ order: 1, createdAt: 1 })

// Fields the admin API is allowed to write.
export const PROJECT_FIELDS = ['title', 'tag', 'description', 'stack', 'demoUrl', 'images', 'order', 'published']

export default mongoose.model('Project', projectSchema)
