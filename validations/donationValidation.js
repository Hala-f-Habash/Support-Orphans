const { body } = require('express-validator');

exports.createDonationValidation = [
  body('orphanage_id').isInt().withMessage('Invalid orphanage ID'),
  body('type')
    .isIn(['money', 'clothes', 'food', 'toys', 'books', 'medical', 'equipment', 'other'])
    .withMessage('Invalid donation type'),
  body('category')
    .isIn(['general', 'education', 'healthcare', 'housing', 'emergency', 'food', 'clothing', 'medical', 'other'])
    .withMessage('Invalid donation category'),
  body('amount')
    .if(body('type').equals('money'))
    .isFloat({ min: 0.01 })
    .withMessage('Amount must be a positive number for monetary donations'),
  body('details')
    .optional()
    .isString()
    .withMessage('Details must be a string')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Details cannot exceed 1000 characters')
];