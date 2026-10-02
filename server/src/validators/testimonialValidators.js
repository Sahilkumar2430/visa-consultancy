import { body } from 'express-validator';

export const testimonialRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('rating').optional().isInt({ min: 1, max: 5 }),
  body('country').optional().isString(),
  body('visaType').optional().isString(),
  body('avatar').optional().isString(),
  body('isSample').optional().isBoolean(),
  body('isApproved').optional().isBoolean(),
  body('order').optional().isInt({ min: 0 }),
];