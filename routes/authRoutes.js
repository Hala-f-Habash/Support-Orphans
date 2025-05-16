//This file defines the /register route, uses validation middleware, and calls the controller.



const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validateInput');
const {registerUserValidation} = require("../validations/registerValidation");
const {loginUserValidation} = require("../validations/loginValidation")


router.post(
  '/register',registerUserValidation
 ,
  validate,
  authController.register
);

// Route for login
router.post(
  '/login',loginUserValidation
 ,
  validate,
  authController.login
);

module.exports = router;
