const express = require('express');
const router = express.Router();
const financeController = require('../controllers/financeController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/revenue', authenticate, financeController.getPlatformRevenue);

module.exports = router;
