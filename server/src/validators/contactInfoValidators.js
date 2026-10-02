import { body } from 'express-validator';

export const contactInfoRules = [
  body('phone').optional().isString(),
  body('whatsapp').optional().isString(),
  body('email').optional().isEmail().withMessage('Valid email required'),
  body('officeAddress').optional().isString(),
  body('businessHours').optional().isString(),
  body('socials').optional().isObject(),
];