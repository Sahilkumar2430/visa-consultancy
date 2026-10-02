import { Router } from 'express';
import authRoutes from './authRoutes.js';
import leadRoutes from './leadRoutes.js';
import countryRoutes from './countryRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import faqRoutes from './faqRoutes.js';
import testimonialRoutes from './testimonialRoutes.js';
import teamRoutes from './teamRoutes.js';
import statisticRoutes from './statisticRoutes.js';
import contactInfoRoutes from './contactInfoRoutes.js';

const router = Router();

router.get('/health', (_req, res) =>
  res.json({ success: true, status: 'ok', time: new Date().toISOString() })
);

router.use('/auth', authRoutes);
router.use('/leads', leadRoutes);
router.use('/countries', countryRoutes);
router.use('/services', serviceRoutes);
router.use('/faqs', faqRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/team', teamRoutes);
router.use('/statistics', statisticRoutes);
router.use('/contact-info', contactInfoRoutes);

export default router;