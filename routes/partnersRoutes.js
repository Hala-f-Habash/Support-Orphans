const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const partnerController = require('../controllers/partnerController');

router.get('/metrics', authenticate, partnerController.getPartnerMetrics);

module.exports = router;
