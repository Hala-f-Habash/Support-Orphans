const db = require('../config/db'); // Adjust path as needed

exports.getAvailableDriver = async () => {
  const [rows] = await db.query(
    'SELECT * FROM drivers WHERE is_available = TRUE LIMIT 1'
  );
  return rows[0];
};

exports.setDriverAvailability = async (driverId, isAvailable) => {
  await db.query(
    'UPDATE drivers SET is_available = ? WHERE driver_id = ?',
    [isAvailable, driverId]
  );
};

exports.getDriverById = async (driverId) => {
  const [rows] = await db.query(
    'SELECT * FROM drivers WHERE driver_id = ?',
    [driverId]
  );
  return rows[0];
};

exports.createDriver = async (name, phone) => {
  const [result] = await db.query(
    'INSERT INTO drivers (name, phone, is_available) VALUES (?, ?, TRUE)',
    [name, phone]
  );
  return result.insertId;
};
