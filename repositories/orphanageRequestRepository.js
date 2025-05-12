const db = require('../config/db');

exports.getOrphanageByName = async (name) => {
  const [rows] = await db.query('SELECT orphanage_id FROM Orphanages WHERE name = ?', [name]);
  return rows[0]; 
};

exports.insertRequest = async ({ orphanage_id, service_type, description, needed_date, number_of_orphanages }) => {
  const [result] = await db.query(
    `INSERT INTO Requests (orphanage_id, service_type, description, needed_date, number_of_orphanages)
     VALUES (?, ?, ?, ?, ?)`,
    [orphanage_id, service_type, description, needed_date, number_of_orphanages]
  );
  return result.insertId;
};
