const matchService = require('../services/volunteerMatchService');

exports.matchVolunteersToRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    const matched = await matchService.matchVolunteers(requestId);
    res.status(200).json({
      message: 'Matching completed',
      matches: matched
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
