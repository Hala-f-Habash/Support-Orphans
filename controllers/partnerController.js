const partnerService = require('../services/partnerService');

exports.getPartnerMetrics = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admins only can view the Metrics' });
    }

    const data = await partnerService.getPartnerStats();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch partner metrics' });
  }
};
