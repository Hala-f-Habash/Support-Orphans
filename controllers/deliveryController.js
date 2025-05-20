const deliveryService = require('../services/deliveryService');

const { getCoordinatesFromLocation } = require('../utils/axios');

exports.createDelivery = async (req, res) => {
  try {
    const { donation_id, location } = req.body;

    if (!location) {
      return res.status(400).json({ success: false, error: 'Location is required' });
    }

    const { lat, lng } = await getCoordinatesFromLocation(location);

    const { deliveryId, message, driver } = await deliveryService.assignDeliveryToDriver(
      donation_id,
      { lat, lng },
      location
    );

    res.status(201).json({
      success: true,
      message,
      deliveryId,
      assignedDriver: driver,
      mapUrl: `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};








exports.updateDeliveryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    await deliveryService.updateStatus(req.params.id, status);
    res.json({ success: true, message: 'Status updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.trackDelivery = async (req, res) => {
  try {
    const delivery = await deliveryService.getDeliveryDetails(req.params.id);
    res.json({ success: true, location: { lat: delivery.lat, lng: delivery.lng } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.logLocationUpdate = async (req, res) => {
  try {
    const { lat, lng } = req.body;
    await deliveryService.updateLocation(req.params.id, lat, lng);
    res.json({ success: true, message: 'Location updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getDeliveriesByStatus = async (req, res) => {
  try {
    const data = await deliveryService.getActiveDeliveries(req.params.status);
    res.json({ success: true, deliveries: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
