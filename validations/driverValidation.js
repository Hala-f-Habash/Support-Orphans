const { body } = require('express-validator');

exports.validateDriver = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').optional().isMobilePhone().withMessage('Phone must be valid')
];
