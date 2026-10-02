import { Router } from 'express';
import {
  listCountries,
  getCountryBySlug,
  createCountry,
  updateCountry,
  deleteCountry,
  proxyRestCountries,
} from '../controllers/countryController.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = Router();

/* Public */
router.get('/', listCountries);
router.get('/external', proxyRestCountries);
router.get('/:slug', getCountryBySlug);

/* Admin — protected */
router.post('/', protect, createCountry);
router.put('/:id', protect, updateCountry);
router.delete('/:id', protect, requireRole('admin'), deleteCountry);

export default router;