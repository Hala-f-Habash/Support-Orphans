const db = require('../config/db'); 

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


exports.getAllDrivers = async () => {
  const [rows] = await db.query('SELECT * FROM drivers');
  return rows;
};

exports.getAvailableDrivers = async () => {
  const [rows] = await db.query('SELECT * FROM drivers WHERE is_available = TRUE');
  return rows;
};



exports.deleteDriver = async (driverId) => {
  await db.query('DELETE FROM drivers WHERE driver_id = ?', [driverId]);
};