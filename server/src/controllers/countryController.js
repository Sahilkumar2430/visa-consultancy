import Country from '../models/Country.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listCountries = asyncHandler(async (req, res) => {
  const { featured, q } = req.query;
  const filter = { isActive: true };
  if (featured === 'true') filter.isFeatured = true;
  if (q) filter.name = new RegExp(q.trim(), 'i');

  const items = await Country.find(filter).sort({ name: 1 });
  res.json({ success: true, data: items });
});

export const getCountryBySlug = asyncHandler(async (req, res) => {
  const country = await Country.findOne({ slug: req.params.slug, isActive: true });
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

export const createCountry = asyncHandler(async (req, res) => {
  const country = await Country.create(req.body);
  res.status(201).json({ success: true, data: country });
});

export const updateCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, data: country });
});

export const deleteCountry = asyncHandler(async (req, res) => {
  const country = await Country.findByIdAndDelete(req.params.id);
  if (!country) throw new ApiError(404, 'Country not found');
  res.json({ success: true, message: 'Deleted' });
});