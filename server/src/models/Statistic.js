import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    value: { type: Number, required: true },
    suffix: { type: String, default: '' },
    icon: { type: String, default: 'TrendingUp' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('Statistic', statisticSchema);