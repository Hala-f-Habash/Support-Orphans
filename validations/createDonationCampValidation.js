const { body } = require('express-validator');

exports.createCampaignDonateValidation= [
    body('amount')
      .isFloat({ min: 1 })
      .withMessage('Amount must be a positive number')
  ];