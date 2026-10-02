import { Router } from 'express';
import {
  listServices, getServiceBySlug, createService, updateService, deleteService,
} from '../controllers/serviceController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { serviceRules } from '../validators/serviceValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, serviceRules, validate, createService);
router.put('/:id', protect, serviceRules, validate, updateService);
router.delete('/:id', protect, requireRole('admin'), deleteService);

export default router;