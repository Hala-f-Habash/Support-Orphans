const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const volunteerController = require('../controllers/volunteerController');
const { validate } = require('../middleware/validateInput');
const { registerVolunteerValidation } = require('../validations/volunteerValidation');



router.post('/register',authenticate,registerVolunteerValidation ,
  validate, volunteerController.registerVolunteer);

router.delete('/delete', authenticate, volunteerController.deleteVolunteer);



module.exports = router;
