const { body } = require('express-validator');
exports.addRequestValidation= [
    body('orphanage_name')
  .notEmpty()
  .withMessage('Orphanage name is required'),
    body('service_type')
      .isIn(['teaching', 'medical', 'counseling', 'administration', 'maintenance', 'other'])
      .withMessage('Invalid service type'),
    body('description')
      .isLength({ min: 10 })
      .withMessage('Description must be at least 20 characters long'),
    body('needed_date')
      .isISO8601()
      .withMessage('Needed date must be a valid date format (YYYY-MM-DD)'),
    body('number_of_orphanages')
      .isInt({ min: 1 })
      .withMessage('Number of orphanages must be a positive integer')
  ];