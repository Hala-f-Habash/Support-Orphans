const { body } = require('express-validator');

exports.createDeliveryValidation = [
  body('donation_id').isInt().withMessage('Valid donation_id is required'),
  body('location').isString().notEmpty().withMessage('Location is required'),
];
