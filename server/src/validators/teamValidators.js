import { body } from 'express-validator';

export const teamRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('bio').optional().isLength({ max: 500 }),
  body('avatar').optional().isString(),
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('linkedin').optional().isString(),
  body('isSample').optional().isBoolean(),
  body('order').optional().isInt({ min: 0 }),
  body('isActive').optional().isBoolean(),
];