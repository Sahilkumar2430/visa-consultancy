import Testimonial from '../models/Testimonial.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listTestimonials = asyncHandler(async (req, res) => {
  const { approvedOnly } = req.query;
  const filter = approvedOnly === 'true' ? { isApproved: true } : {};
  const items = await Testimonial.find(filter).sort({ order: 1, createdAt: -1 });
  res.json({ success: true, data: items });
});

export const createTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, 'Testimonial not found');
  res.json({ success: true, data: item });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  const item = await Testimonial.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Testimonial not found');
  res.json({ success: true, message: 'Deleted' });
});