import { Router } from 'express';
import { login, logout, me } from '../controllers/authController.js';
import { loginRules } from '../validators/authValidators.js';
import { validate } from '../middleware/validate.js';
import { protect } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.post('/login', authLimiter, loginRules, validate, login);
router.post('/logout', logout);
router.get('/me', protect, me);

export default router;