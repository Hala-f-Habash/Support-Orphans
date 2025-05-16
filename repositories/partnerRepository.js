const db = require('../config/db');

exports.aggregatePartnerData = async () => {
  const [rows] = await db.query(`
       SELECT 
      o.orphanage_id,
      o.name AS orphanage_name,

      (SELECT COUNT(*) FROM orphans WHERE orphanage_id = o.orphanage_id) AS total_orphans,

      (SELECT COUNT(*) FROM donations WHERE orphanage_id = o.orphanage_id) AS total_donations,

      (SELECT SUM(amount) FROM donations WHERE orphanage_id = o.orphanage_id AND type = 'money') AS total_donated,

      (SELECT COUNT(*) FROM requests WHERE orphanage_id = o.orphanage_id) AS total_requests,

      (SELECT COUNT(*) 
       FROM matches m 
       JOIN requests r ON m.request_id = r.request_id 
       WHERE r.orphanage_id = o.orphanage_id) AS total_matches,

      (SELECT AVG(rating) FROM reviews WHERE orphanage_id = o.orphanage_id) AS average_rating

    FROM orphanages o
  `);

  return rows;
};
