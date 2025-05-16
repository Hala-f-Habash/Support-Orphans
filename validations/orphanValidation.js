const { body } = require('express-validator');

exports.sponsorOrphanValidation = [
  body('type')
    .isIn(['monthly', 'one-time'])
    .withMessage('Type must be either monthly or one-time'),
  body('amount')
    .isFloat({ min: 1 })
    .withMessage('Amount must be at least 1')
];

exports.postUpdateValidation = [
  body('type')
    .isIn(['medical', 'education', 'general'])
    .withMessage('Type must be medical, education, or general'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
];
