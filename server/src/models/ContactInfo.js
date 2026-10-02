import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    // Singletons — one document per key
    key: { type: String, required: true, unique: true, default: 'main' },
    phone: String,
    whatsapp: String,
    email: String,
    officeAddress: String,
    businessHours: String,
    socials: {
      instagram: String,
      facebook: String,
      linkedin: String,
      youtube: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model('ContactInfo', contactInfoSchema);