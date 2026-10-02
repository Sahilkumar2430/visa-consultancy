import FAQ from '../models/FAQ.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listFAQs = asyncHandler(async (_req, res) => {
  const items = await FAQ.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items });
});

export const createFAQ = asyncHandler(async (req, res) => {
  const item = await FAQ.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const item = await FAQ.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, 'FAQ not found');
  res.json({ success: true, data: item });
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  const item = await FAQ.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'FAQ not found');
  res.json({ success: true, message: 'Deleted' });
});