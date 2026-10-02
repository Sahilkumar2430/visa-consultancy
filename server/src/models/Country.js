import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    flag: { type: String, default: '🏳️' },
    heroImage: String,
    description: String,
    visaTypes: [String],

    studyInfo: String,
    workInfo: String,
    requirements: [String],
    process: [String],
    benefits: [String],

    // Extra metadata (optional; populated when synced from REST Countries)
    region: String,
    subregion: String,
    capital: String,
    population: Number,
    callingCode: String,

    isFeatured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Country', countrySchema);