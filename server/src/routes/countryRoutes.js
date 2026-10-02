import { Router } from 'express';
import {
  listCountries, getCountryBySlug, createCountry, updateCountry, deleteCountry,
} from '../controllers/countryController.js';
import { protect, requireRole } from '../middleware/auth.js';
import { countryRules } from '../validators/countryValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', listCountries);
router.get('/:slug', getCountryBySlug);
router.post('/', protect, countryRules, validate, createCountry);
router.put('/:id', protect, countryRules, validate, updateCountry);
router.delete('/:id', protect, requireRole('admin'), deleteCountry);

export default router;