const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

const { validate } = require('../middleware/validateInput');
const { authenticate } = require('../middleware/authMiddleware');
const { validateDriver } = require('../validations/driverValidation');

router.post('/', authenticate, validateDriver, validate, driverController.createDriver);

router.get('/', authenticate,driverController.getAllDrivers);

router.get('/available',authenticate, driverController.getAvailableDrivers);

router.put('/:id/availability', authenticate, driverController.updateAvailability);

router.delete('/:id', authenticate, driverController.deleteDriver);

router.get('/:id', authenticate, driverController.getDriverById);



module.exports = router;
