const db = require('../config/db');
const trackDonations = require("./donationTrackingRepository")
exports.createDonation = async (donationData) => {
  const [result] = await db.query(
    `INSERT INTO donations 
    (user_id, orphanage_id, type, category, amount, details) 
    VALUES (?, ?, ?, ?, ?, ?)`,
    [
      donationData.user_id,
      donationData.orphanage_id,
      donationData.type,
      donationData.category,
      donationData.amount,
      donationData.details
    ]
  );
  return result.insertId;
};

exports.getAllDonations = async () => {
  const [rows] = await db.query('SELECT * FROM donations');
  return rows;
};

exports.getDonationById = async (id) => {
  const [rows] = await db.query('SELECT * FROM donations WHERE donation_id = ?', [id]);
  return rows[0];
};

exports.getDonationsByUser = async (userId) => {
  const [rows] = await db.query('SELECT * FROM donations WHERE user_id = ?', [userId]);
  return rows;
};

exports.getDonationsByOrphanage = async (orphanageId) => {
  const [rows] = await db.query('SELECT * FROM donations WHERE orphanage_id = ?', [orphanageId]);
  return rows;
};

exports.createDonationTracking = async ({ donation_id, status, update_message }) => {
  await db.query(
    `INSERT INTO donation_tracking (donation_id, status, update_message)
     VALUES (?, ?, ?)`,
    [donation_id, status, update_message]
  );
};


exports.updateDonationTrackingStatus = async ({ donation_id, status,update_message }) => {
  await db.query(
    `UPDATE donation_tracking 
     SET status = ?, update_message = ? 
     WHERE donation_id = ?`,
    [status, update_message, donation_id]
  );
};

