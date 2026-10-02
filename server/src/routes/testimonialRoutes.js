import { Router } from 'express';
import {
  listTestimonials, createTestimonial, updateTestimonial, deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { testimonialRules } from '../validators/testimonialValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listTestimonials);
router.post('/', protect, testimonialRules, validate, createTestimonial);
router.put('/:id', protect, testimonialRules, validate, updateTestimonial);
router.delete('/:id', protect, requireRole('admin'), deleteTestimonial);

export default router;