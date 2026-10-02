import ContactInfo from '../models/ContactInfo.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const getContactInfo = asyncHandler(async (_req, res) => {
  let info = await ContactInfo.findOne({ key: 'main' });
  if (!info) info = await ContactInfo.create({ key: 'main' });
  res.json({ success: true, data: info });
});

export const updateContactInfo = asyncHandler(async (req, res) => {
  const info = await ContactInfo.findOneAndUpdate(
    { key: 'main' },
    { ...req.body, key: 'main' },
    { new: true, upsert: true, runValidators: true }
  );
  if (!info) throw new ApiError(500, 'Could not update contact info');
  res.json({ success: true, data: info });
});