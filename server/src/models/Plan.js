import mongoose from 'mongoose'
import { urlValidator, cleanList } from '../utils/validators.js'

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    image: { type: String, trim: true, maxlength: 1000, default: '', validate: urlValidator },
    note: { type: String, trim: true, maxlength: 200, default: '' },
    // Free text so the admin controls formatting, e.g. "Rs.5000" or "From Rs.4500".
    price: { type: String, required: true, trim: true, maxlength: 40 },
    unit: { type: String, trim: true, maxlength: 60, default: '' },
    features: { type: [{ type: String, trim: true, maxlength: 200 }], set: cleanList, default: [] },
    cta: { type: String, trim: true, maxlength: 40, default: 'Get started' },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
)

planSchema.index({ order: 1, createdAt: 1 })

export const PLAN_FIELDS = ['name', 'image', 'note', 'price', 'unit', 'features', 'cta', 'featured', 'order', 'published']

export default mongoose.model('Plan', planSchema)
