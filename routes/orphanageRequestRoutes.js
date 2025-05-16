const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');
const requestController = require('../controllers/orphanageRequestController');

router.post(
  '/',
  authenticate,
  [
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
  ],
  validate,
  requestController.createRequest
);

router.put('/:id/verify', authenticate, requestController.updateVerifiedStatus);

module.exports = router;
