const db = require('../config/db');

exports.getTotalRevenue = async (month, year) => {
  let query = `
    SELECT SUM(fee) AS total_fee_collected 
    FROM payment_transactions 
    WHERE status = 'completed'
  `;
  const params = [];

  if (month && year) {
    query += ` AND MONTH(created_at) = ? AND YEAR(created_at) = ?`;
    params.push(month, year);
  } else if (year) {
    query += ` AND YEAR(created_at) = ?`;
    params.push(year);
  }

  const [rows] = await db.query(query, params);
  return rows[0].total_fee_collected ?? 0;
};
