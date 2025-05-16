const financeRepo = require('../repositories/financeRepository');

exports.getTotalRevenue = async (month, year) => {
  const total = await financeRepo.getTotalRevenue(month, year);
  const safeTotal = parseFloat(total) || 0;
  return parseFloat(safeTotal.toFixed(2));
};
