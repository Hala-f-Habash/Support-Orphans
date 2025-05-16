const { body } = require('express-validator');

// Validation for volunteer registration
exports.registerVolunteerValidation = [
  body('service_type')
    .isIn(['teaching', 'medical', 'counseling', 'administration', 'maintenance', 'other'])
    .withMessage('Service type must be one of the predefined categories'),

  body('availability')
    .isIn(['weekdays', 'weekends', 'evenings', 'mornings', 'flexible', 'on-call', 'other'])
    .withMessage('Availability must be a valid option'),
];
