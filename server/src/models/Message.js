import mongoose from 'mongoose'

export const BUDGETS = ['Under $300', '$300 - $800', '$800 - $2,000', "Let's discuss"]

const messageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 200,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address'],
    },
    budget: { type: String, enum: [...BUDGETS, ''], default: '' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    status: { type: String, enum: ['new', 'read', 'replied', 'archived'], default: 'new' },
  },
  { timestamps: true }
)

export default mongoose.model('Message', messageSchema)
