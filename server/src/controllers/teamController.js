import TeamMember from '../models/TeamMember.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listTeam = asyncHandler(async (_req, res) => {
  const items = await TeamMember.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: items });
});

export const createTeamMember = asyncHandler(async (req, res) => {
  const item = await TeamMember.create(req.body);
  res.status(201).json({ success: true, data: item });
});

export const updateTeamMember = asyncHandler(async (req, res) => {
  const item = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, 'Team member not found');
  res.json({ success: true, data: item });
});

export const deleteTeamMember = asyncHandler(async (req, res) => {
  const item = await TeamMember.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, 'Team member not found');
  res.json({ success: true, message: 'Deleted' });
});