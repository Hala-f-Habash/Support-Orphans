const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const campaignController = require('../controllers/campaignController');

const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post(
  '/',
  authenticate,
  [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('location').optional().isString().withMessage('Location must be a string') 
],

  validate,
  campaignController.createCampaign
);

router.get('/', campaignController.getActiveCampaigns);

router.post(
  '/:id/donate',
  authenticate,
  [
    body('amount')
      .isFloat({ min: 1 })
      .withMessage('Amount must be a positive number')
  ],
  validate,
  campaignController.donateToCampaign
);
module.exports = router;
