const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validateInput');
const campaignController = require('../controllers/campaignController');

const { authenticate } = require('../middleware/authMiddleware');
const {createCampaignValidation} = require("../validations/createCampaignValidation");
const {createCampaignDonateValidation} = require("../validations/createDonationCampValidation");


const router = express.Router();

router.post(
  '/',
  authenticate,createCampaignValidation
 ,

  validate,
  campaignController.createCampaign
);

router.get('/', campaignController.getActiveCampaigns);

router.post(
  '/:id/donate',
  authenticate,createCampaignDonateValidation
 ,
  validate,
  campaignController.donateToCampaign
);
module.exports = router;
