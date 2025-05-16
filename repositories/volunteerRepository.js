const db = require('../config/db');

exports.createVolunteerProfile = async ({ volunteer_id, service_type, availability }) => {
  const [result] = await db.query(
    'INSERT INTO Volunteers (volunteer_id, service_type, availability) VALUES (?, ?, ?)',
    [volunteer_id, service_type, availability]
  );
  return result.insertId;
};
exports.deleteVolunteer = async (volunteerId) => {
  const [result] = await db.query(
    'DELETE FROM volunteers WHERE volunteer_id = ?',
    [volunteerId]
  );
  return result.affectedRows;
};
