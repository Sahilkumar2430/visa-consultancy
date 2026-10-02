import { Router } from 'express';
import {
  createLead,
  listLeads,
  getLead,
  updateLead,
  addNote,
  replyToLead,
  deleteLead,
  getLeadStats,
} from '../controllers/leadController.js';
import { createLeadRules } from '../validators/leadValidators.js';
import { validate } from '../middleware/validate.js';
import { protect, requireRole } from '../middleware/auth.js';
import { leadLimiter } from '../middleware/rateLimiter.js';

const router = Router();

/* Public */
router.post('/', leadLimiter, createLeadRules, validate, createLead);

/* Admin — protected */
router.get('/stats', protect, getLeadStats);
router.get('/', protect, listLeads);
router.get('/:id', protect, getLead);
router.put('/:id', protect, updateLead);
router.post('/:id/notes', protect, addNote);
router.post('/:id/reply', protect, replyToLead);   // ← YEH LINE zaroori hai
router.delete('/:id', protect, requireRole('admin'), deleteLead);

export default router;