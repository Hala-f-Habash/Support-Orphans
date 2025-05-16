const express = require('express');
const router = express.Router();
const deliveryController = require('../controllers/deliveryController');
//validations and authentication logging 
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');
const {createDeliveryValidation} = require("../validations/deliveryValidation");

router.post('/', authenticate,createDeliveryValidation,validate, deliveryController.createDelivery);

router.put('/:id/status', authenticate, deliveryController.updateDeliveryStatus);

router.put('/:id/location', authenticate, deliveryController.logLocationUpdate);

router.get('/:id/track', authenticate, deliveryController.trackDelivery);

router.get('/:status', authenticate, deliveryController.getDeliveriesByStatus);


module.exports = router;
