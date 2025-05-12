const db = require('../config/db');

exports.createDonationTracking = async (trackingData) => {
  const [result] = await db.query(
    `INSERT INTO donation_tracking 
    (donation_id, status, update_message) 
    VALUES (?, ?, ?)`,
    [trackingData.donation_id, trackingData.status, trackingData.update_message]
  );
  return result.insertId;
};

exports.getDonationTracking = async (donationId) => {
  const [rows] = await db.query(
    'SELECT * FROM donation_tracking WHERE donation_id = ? ORDER BY created_at DESC',
    [donationId]
  );
  return rows;
};
