import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    icon: { type: String, default: 'Sparkles' }, // lucide-react icon name
    shortDescription: { type: String, required: true },
    longDescription: String,
    who: [String],
    process: [String],
    documents: [String],
    benefits: [String],
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Service', serviceSchema);