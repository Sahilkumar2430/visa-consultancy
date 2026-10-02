import { body } from 'express-validator';

export const faqRules = [
  body('question').trim().notEmpty().withMessage('Question is required'),
  body('answer').trim().notEmpty().withMessage('Answer is required'),
  body('category').optional().isString(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];