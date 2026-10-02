import { Router } from 'express';
import {
  listFAQs, createFAQ, updateFAQ, deleteFAQ,
} from '../controllers/faqController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { faqRules } from '../validators/faqValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listFAQs);
router.post('/', protect, faqRules, validate, createFAQ);
router.put('/:id', protect, faqRules, validate, updateFAQ);
router.delete('/:id', protect, requireRole('admin'), deleteFAQ);

export default router;