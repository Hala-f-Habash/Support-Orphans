const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');
const volunteerController = require('../controllers/volunteerController');
const { validate } = require('../middleware/validateInput');


router.post('/register',authenticate, [
    body('service_type').isIn(['teaching', 'medical', 'counseling', 'administration', 'maintenance', 'other']),
    body('availability')
      .isIn(['weekdays', 'weekends', 'evenings', 'mornings', 'flexible', 'on-call', 'other'])
      .withMessage('Invalid availability value')
  ],
  validate, volunteerController.registerVolunteer);




module.exports = router;
