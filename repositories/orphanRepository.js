const db = require('../config/db');

exports.fetchAllOrphans = async () => {
  const [rows] = await db.query('SELECT * FROM Orphans');
  return rows;
};

exports.fetchOrphanById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Orphans WHERE orphan_id = ?', [id]);
  return rows[0];
};

exports.fetchOrphanUpdates = async (id) => {
  const [rows] = await db.query('SELECT * FROM OrphanUpdates WHERE orphan_id = ? ORDER BY created_at DESC', [id]);
  return rows;
};

exports.fetchOrphanSponsors = async (id) => {
  const [rows] = await db.query('SELECT * FROM Sponsorships WHERE orphan_id = ?', [id]);
  return rows;
};

exports.createOrphan = async (data) => {
  const [result] = await db.query(
    'INSERT INTO Orphans (name, age, education, health, orphanage_id, profile_img) VALUES (?, ?, ?, ?, ?, ?)',
    [data.name, data.age, data.education, data.health, data.orphanage_id, data.profile_img]
  );
  return result.insertId;
};

exports.addSponsorship = async (userId, orphanId, type, amount) => {
  const [result] = await db.query(
    'INSERT INTO Sponsorships (user_id, orphan_id, type, amount, start_date) VALUES (?, ?, ?, ?, NOW())',
    [userId, orphanId, type, amount]
  );
  return result.insertId;
};

exports.addUpdate = async (orphanId, { type, description, media_url = null }) => {
  const [result] = await db.query(
    'INSERT INTO OrphanUpdates (orphan_id, type, description, media_url) VALUES (?, ?, ?, ?)',
    [orphanId, type, description, media_url]
  );
  return result.insertId;
};
