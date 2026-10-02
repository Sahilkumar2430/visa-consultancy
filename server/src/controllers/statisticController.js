import Statistic from '../models/Statistic.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listStatistics = asyncHandler(async (_req, res) => {
  const items = await Statistic.find().sort({ order: 1 });
  res.json({ success: true, data: items });
});

export const createStatistic = asyncHandler(async (req, res) => {
  const item = await Statistic.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateStatistic = asyncHandler(async (req, res) => {
  const item = await Statistic.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, 'Statistic not found');
  res.json({ success: true, data: item });
});

export const deleteStatistic = asyncHandler(async (req, res) => {
  const item = await Statistic.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Statistic not found');
  res.json({ success: true, message: 'Deleted' });
});