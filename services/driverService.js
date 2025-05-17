const driverRepo = require('../repositories/driverRepository');




exports.createDriver = async (name, phone) => {
  return await driverRepo.createDriver(name, phone);
};

exports.getAllDrivers = async () => {
  return await driverRepo.getAllDrivers();
};

exports.getDriverById = async (driverId) => {
  return await driverRepo.getDriverById(driverId);
};

exports.getAvailableDrivers = async () => {
  return await driverRepo.getAvailableDrivers();
};

exports.updateAvailability = async (driverId, isAvailable) => {
  return await driverRepo.setDriverAvailability(driverId, isAvailable);
};

exports.deleteDriver = async (driverId) => {
  return await driverRepo.deleteDriver(driverId);
};
