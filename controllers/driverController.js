const driverService = require('../services/driverService');


exports.createDriver = async (req, res) => {
  try {

    const { name, phone } = req.body;
    const driverId = await driverService.createDriver(name, phone);
    res.status(201).json({ success: true, message: 'Driver created', driverId });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.json({ success: true, drivers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getAvailableDrivers = async (req, res) => {
  try {
    const drivers = await driverService.getAvailableDrivers();
    res.json({ success: true, drivers });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateAvailability = async (req, res) => {
  try {
    const driverId = req.params.id;
    const { is_available } = req.body;
    await driverService.updateAvailability(driverId, is_available);
    res.json({ success: true, message: 'Driver availability updated' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.deleteDriver = async (req, res) => {
  try {
    const driverId = req.params.id;
    await driverService.deleteDriver(driverId);
    res.json({ success: true, message: 'Driver deleted' });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.getDriverById = async (req, res) => {
  try {
    const driverId = req.params.id;
    const data = await driverService.getDriverById(driverId);
    res.json({ success: true, message: 'Driver found',driver: data });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};