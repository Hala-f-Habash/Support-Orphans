const deliveryRepo = require('../repositories/deliveryRepository');
const driverRepo = require('../repositories/driverRepository');

const { getCoordinatesFromLocation } = require('../utils/axios');

exports.assignDeliveryToDriver = async (donationId, locationStr) => {
  const { lat, lng } = await getCoordinatesFromLocation(locationStr);
  const freeDriver = await driverRepo.getAvailableDriver();

  const deliveryData = {
    donation_id: donationId,
    assigned_to: freeDriver ? freeDriver.name : null,
    location: locationStr,
    lat,
    lng,
    driver_id: freeDriver ? freeDriver.driver_id : null
  };

  const deliveryId = await deliveryRepo.createDelivery(deliveryData);

  if (freeDriver) {
    await driverRepo.setDriverAvailability(freeDriver.driver_id, false);
  }

  return {
    deliveryId,
    message: freeDriver
      ? `Delivery assigned to driver ${freeDriver.name}, process will start within a week`
      : 'Delivery created but no driver was available at the moment.',
    driver: freeDriver ? freeDriver.name : null,
    mapUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
  };
};



exports.updateStatus = async (deliveryId, newStatus) => {
  await deliveryRepo.updateDeliveryStatus(deliveryId, newStatus);
};

exports.updateLocation = async (deliveryId, lat, lng) => {
  await deliveryRepo.updateDeliveryLocation(deliveryId, lat, lng);
};

exports.updateDeliveryTime = async (deliveryId, newTime) => {
  await deliveryRepo.updateDeliveryTime(deliveryId, newTime);
};

exports.getDeliveryDetails = async (deliveryId) => {
  return await deliveryRepo.getDeliveryById(deliveryId);
};

exports.getActiveDeliveries = async (status) => {
  return await deliveryRepo.getDeliveriesByStatus(status);
};
