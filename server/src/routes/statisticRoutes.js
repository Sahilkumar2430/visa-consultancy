import { Router } from 'express';
import {
  listStatistics, createStatistic, updateStatistic, deleteStatistic,
} from '../controllers/statisticController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { statisticRules } from '../validators/statisticValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listStatistics);
router.post('/', protect, statisticRules, validate, createStatistic);
router.put('/:id', protect, statisticRules, validate, updateStatistic);
router.delete('/:id', protect, requireRole('admin'), deleteStatistic);

export default router;