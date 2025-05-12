const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { createDonationValidation } = require('../validations/donationValidation');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes
router.get('/', authenticate,donationController.getAllDonations);
router.get('/:id',authenticate, donationController.getDonationDetails);

// Authenticated routes
router.post(
  '/',
  authenticate,
  createDonationValidation,
  validate,
  donationController.createDonation
);

router.get(
  '/user/my-donations',
  authenticate,
  donationController.getUserDonations
);


router.patch('/:id/status', authenticate, donationController.updateDonationStatus);


module.exports = router;