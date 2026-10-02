import { body } from 'express-validator';

export const countryRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('flag').optional().isLength({ max: 8 }),
  body('heroImage').optional().isString(),
  body('description').optional().isLength({ max: 500 }),
  body('visaTypes').optional().isArray(),
  body('isFeatured').optional().isBoolean(),
  body('isActive').optional().isBoolean(),
];