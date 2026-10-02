import { Router } from 'express';
import {
  getContactInfo, updateContactInfo,
} from '../controllers/contactInfoController.js';
import { protect } from '../middleware/auth.js';
import { contactInfoRules } from '../validators/contactInfoValidators.js';
import { validate } from '../middleware/validate.js';

const router = Router();

router.get('/', getContactInfo);
router.put('/', protect, contactInfoRules, validate, updateContactInfo);

export default router;