const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const matchController = require('../controllers/volunteerMatchController');

router.post('/:requestId', authenticate, matchController.matchVolunteersToRequest);

module.exports = router;
