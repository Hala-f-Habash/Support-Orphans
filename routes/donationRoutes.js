const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const { createDonationValidation } = require('../validations/donationValidation');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes
router.get('/', authenticate,donationController.getAllDonations);
router.get('/:id',authenticate, donationController.getDonationDetails);
router.get('/orphanage/:id',authenticate, donationController.getOrphanageDonations);//test

router.get('/type_summary', authenticate, donationController.getAllDonationsByType);


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

router.delete('/:id',authenticate, donationController.deleteDonation);//test


module.exports = router;