import Lead from '../models/Lead.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { sendLeadReplyEmail, sendNewLeadNotificationToAdmin } from '../utils/emailService.js';

/* ---------- Public ---------- */

export const createLead = asyncHandler(async (req, res) => {
  const allowed = [
    'name', 'email', 'phone', 'country', 'visaType', 'currentCountry',
    'education', 'workExperience', 'preferredDestination', 'budget',
    'preferredIntake', 'goal', 'message', 'preferredContactMethod', 'source',
  ];
  const payload = {};
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) payload[k] = req.body[k];
  });

  const lead = await Lead.create(payload);

  // Fire-and-forget admin notification
  sendNewLeadNotificationToAdmin(lead).catch((err) =>
    console.error('Admin notification failed:', err.message)
  );

  res.status(201).json({ success: true, data: lead });
});

/* ---------- Admin ---------- */

export const listLeads = asyncHandler(async (req, res) => {
  const { status, q, page = 1, limit = 20, sort = '-createdAt' } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (q) {
    const re = new RegExp(q.trim(), 'i');
    filter.$or = [{ name: re }, { email: re }, { phone: re }];
  }

  const pageNum = Math.max(1, Number(page));
  const perPage = Math.min(100, Math.max(1, Number(limit)));

  const [items, total] = await Promise.all([
    Lead.find(filter)
      .sort(sort)
      .skip((pageNum - 1) * perPage)
      .limit(perPage)
      .populate('assignedConsultant', 'name email'),
    Lead.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: items,
    pagination: {
      total,
      page: pageNum,
      pages: Math.ceil(total / perPage),
      limit: perPage,
    },
  });
});

export const getLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findById(req.params.id).populate(
    'assignedConsultant',
    'name email'
  );
  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, data: lead });
});

export const updateLead = asyncHandler(async (req, res) => {
  const allowed = [
    'status', 'priority', 'assignedConsultant', 'message',
    'visaType', 'preferredDestination', 'education', 'workExperience',
  ];
  const patch = {};
  allowed.forEach((k) => {
    if (req.body[k] !== undefined) patch[k] = req.body[k];
  });

  const lead = await Lead.findByIdAndUpdate(req.params.id, patch, {
    new: true,
    runValidators: true,
  }).populate('assignedConsultant', 'name email');

  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, data: lead });
});

export const addNote = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) throw new ApiError(400, 'Note text required');

  const lead = await Lead.findById(req.params.id);
  if (!lead) throw new ApiError(404, 'Lead not found');

  lead.notes.push({ text, by: req.user.name });
  await lead.save();

  res.json({ success: true, data: lead });
});

/**
 * Send a reply email to the lead.
 */
export const replyToLead = asyncHandler(async (req, res) => {
  const { subject, message } = req.body;

  if (!message || !message.trim()) {
    throw new ApiError(400, 'Reply message is required');
  }

  const lead = await Lead.findById(req.params.id);
  if (!lead) throw new ApiError(404, 'Lead not found');

  let sendResult = null;
  let sendError = null;

  try {
    sendResult = await sendLeadReplyEmail({
      to: lead.email,
      name: lead.name,
      subject: subject || `Reply from GlobalPath Visa Consultancy`,
      message,
      adminName: req.user.name,
    });
  } catch (err) {
    sendError = err;
    console.error('Email send failed:', err.message);
  }

  // Log the reply in notes
  lead.notes.push({
    text: `[REPLY EMAIL SENT${sendError ? ' — FAILED' : ''}]\nSubject: ${
      subject || 'Reply from GlobalPath Visa Consultancy'
    }\n\n${message}`,
    by: req.user.name,
  });
  await lead.save();

  if (sendError) {
    throw new ApiError(502, `Reply saved, but email failed: ${sendError.message}`);
  }

  if (sendResult?.skipped) {
    return res.json({
      success: true,
      data: lead,
      warning: 'Email not sent — SMTP not configured on the server',
    });
  }

  res.json({ success: true, data: lead, messageId: sendResult?.messageId });
});

export const deleteLead = asyncHandler(async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) throw new ApiError(404, 'Lead not found');
  res.json({ success: true, message: 'Lead deleted' });
});

export const getLeadStats = asyncHandler(async (req, res) => {
  const [byStatus, byCountry, byVisaType, byMonth, total, newCount] =
    await Promise.all([
      Lead.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        { $match: { preferredDestination: { $nin: [null, ''] } } },
        { $group: { _id: '$preferredDestination', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 },
      ]),
      Lead.aggregate([
        { $match: { visaType: { $nin: [null, ''] } } },
        { $group: { _id: '$visaType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      Lead.aggregate([
        {
          $group: {
            _id: { y: { $year: '$createdAt' }, m: { $month: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.y': 1, '_id.m': 1 } },
        { $limit: 12 },
      ]),
      Lead.countDocuments(),
      Lead.countDocuments({ status: 'New' }),
    ]);

  res.json({
    success: true,
    data: { total, newCount, byStatus, byCountry, byVisaType, byMonth },
  });
});