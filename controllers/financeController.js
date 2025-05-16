const financeService = require('../services/financeService');
exports.getPlatformRevenue = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied: Admins only' });
    }

    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);   

    const totalRevenue = await financeService.getTotalRevenue(month, year);

    res.json({
      success: true,
      message: `Total revenue${month && year ? ` for ${month}/${year}` : ''}`,
      revenue: totalRevenue
    });
  } catch (error) {
    console.error('[ERROR:]', error.message);
    res.status(500).json({ error: 'Failed to fetch the revenue' });
  }
};
