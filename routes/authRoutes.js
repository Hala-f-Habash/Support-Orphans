//This file defines the /register route, uses validation middleware, and calls the controller.



const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validateInput');

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Min 6 characters password'),
    body('role').isIn(['admin', 'donor', 'volunteer', 'orphanageManager', 'sponsor']).withMessage('Invalid role')
  ],
  validate,
  authController.register
);

// Route for login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  validate,
  authController.login
);

module.exports = router;
