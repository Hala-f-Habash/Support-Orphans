const db = require('../config/db');

exports.getRequestById = async (requestId) => {
  const [rows] = await db.query('SELECT * FROM Requests WHERE request_id = ?', [requestId]);
  return rows[0];
};

exports.findMatchingVolunteers = async (service_type, availabilities) => {
  const [rows] = await db.query(
    'SELECT * FROM Volunteers WHERE service_type = ? AND availability IN (?)',
    [service_type, availabilities]
  );
  return rows;
};

exports.insertMatch = async (requestId, volunteerId) => {
  await db.query('INSERT INTO Matches (request_id, volunteer_id) VALUES (?, ?)', [requestId, volunteerId]);
};

exports.getOrphanageInfo = async (orphanageId) => {
  const [rows] = await db.query('SELECT name, contact_email FROM Orphanages WHERE orphanage_id = ?', [orphanageId]);
  return rows[0];
};
