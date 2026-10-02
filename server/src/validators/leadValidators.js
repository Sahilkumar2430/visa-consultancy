import { body } from 'express-validator';

export const createLeadRules = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 120 }),
  body('email').trim().isEmail().withMessage('Valid email required').normalizeEmail(),
  body('phone').trim().notEmpty().withMessage('Phone is required').isLength({ min: 6, max: 25 }),
  body('preferredContactMethod')
    .optional()
    .isIn(['Phone', 'WhatsApp', 'Email']).withMessage('Invalid contact method'),
  body('message').optional().isLength({ max: 2000 }),
];