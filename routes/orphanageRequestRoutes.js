const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');
const requestController = require('../controllers/orphanageRequestController');
const {addRequestValidation} = require("../validations/addServiceRequestValidation")

router.post(
  '/',
  authenticate,addRequestValidation
 ,
  validate,
  requestController.createRequest
);

router.put('/:id/verify', authenticate, requestController.updateVerifiedStatus);

module.exports = router;
