import { body } from 'express-validator';

export const statisticRules = [
  body('key').trim().notEmpty().withMessage('Key is required'),
  body('label').trim().notEmpty().withMessage('Label is required'),
  body('value').isNumeric().withMessage('Value must be numeric'),
  body('suffix').optional().isString(),
  body('icon').optional().isString(),
  body('order').optional().isInt({ min: 0 }),
];