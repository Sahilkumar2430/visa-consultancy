import { body } from 'express-validator';

export const serviceRules = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('icon').optional().isString(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];