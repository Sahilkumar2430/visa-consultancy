import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: String,
    visaType: String,
    rating: { type: Number, min: 1, max: 5, default: 5 },
    content: { type: String, required: true },
    avatar: String,
    isSample: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Testimonial', testimonialSchema);