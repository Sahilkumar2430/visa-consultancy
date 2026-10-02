import mongoose from 'mongoose';

const LEAD_STATUSES = [
  'New',
  'Contacted',
  'In Discussion',
  'Documents Pending',
  'Application In Progress',
  'Completed',
  'Closed',
];

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true, trim: true },

    country: String,
    visaType: String,
    currentCountry: String,
    education: String,
    workExperience: String,
    preferredDestination: String,
    budget: String,
    preferredIntake: String,
    goal: String,
    message: String,
    preferredContactMethod: {
      type: String,
      enum: ['Phone', 'WhatsApp', 'Email'],
      default: 'Email',
    },
    source: { type: String, default: 'website' },

    status: { type: String, enum: LEAD_STATUSES, default: 'New', index: true },
    notes: [{ text: String, by: String, at: { type: Date, default: Date.now } }],
    assignedConsultant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  },
  { timestamps: true }
);

leadSchema.index({ name: 'text', email: 'text', phone: 'text' });

export const LeadStatuses = LEAD_STATUSES;
export default mongoose.model('Lead', leadSchema);