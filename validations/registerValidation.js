const { body } = require('express-validator');
exports.registerUserValidation= [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 characters password'),
    body('role').isIn(['admin', 'donor', 'volunteer', 'orphanageManager', 'sponsor']).withMessage('Invalid role')
  ];