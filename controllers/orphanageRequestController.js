const requestService = require('../services/orphanageRequestService');

exports.createRequest = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'orphanageManager') {
      return res.status(403).json({ error: 'Only orphanage managers can create requests.' });
    }

    const requestData = {
      orphanage_name: req.body.orphanage_name,
      service_type: req.body.service_type,
      description: req.body.description,
      needed_date: req.body.needed_date,
      number_of_orphanages: req.body.number_of_orphanages
    };

    const requestId = await requestService.createRequest(requestData);
    res.status(201).json({ message: 'Request created successfully', requestId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
