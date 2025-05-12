const volunteerService = require('../services/volunteerService');

exports.registerVolunteer = async (req, res) => {
  try {
    const user = req.user;

    if (user.role !== 'volunteer') {
      return res.status(403).json({ error: 'Only volunteers can register for services.' });
    }

    const volunteerData = {

      volunteer_id: req.user.userId, // Comes from JWT
      service_type: req.body.service_type,
      availability: req.body.availability
    };

    await volunteerService.registerVolunteer(volunteerData);
    res.status(201).json({ message: 'Volunteer profile created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Volunteer registration failed' });
  }
};
