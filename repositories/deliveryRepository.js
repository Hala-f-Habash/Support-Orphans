const db = require('../config/db');



// exports.createDelivery = async (data) => {
//   const [result] = await db.query(
//     'INSERT INTO deliveries (donation_id, status, assigned_to, location, lat, lng, driver_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
//     [data.donation_id, 'pending', data.assigned_to, data.location, data.lat, data.lng, data.driver_id]
//   );
//   return result.insertId;
// };

exports.createDelivery = async (data) => {
  const [result] = await db.query(
    `INSERT INTO deliveries 
     (donation_id, status, assigned_to, location, lat, lng, driver_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.donation_id,
      'pending',                         
      data.assigned_to,
      data.location,                    
      data.lat,                         
      data.lng,                         
      data.driver_id                   
    ]
  );
  return result.insertId;
};

exports.updateDeliveryStatus = async (id, status) => {
  await db.query('UPDATE deliveries SET status = ? WHERE delivery_id = ?', [status, id]);
  await exports.logDeliveryMovement({ delivery_id: id, status });
};

exports.updateDeliveryLocation = async (id, lat, lng) => {
  await db.query('UPDATE deliveries SET lat = ?, lng = ? WHERE delivery_id = ?', [lat, lng, id]);
  await exports.logDeliveryMovement({ delivery_id: id, lat, lng });
};

exports.updateDeliveryTime = async (id, time) => {
  await db.query('UPDATE deliveries SET delivery_time = ? WHERE delivery_id = ?', [time, id]);
};

exports.getDeliveryById = async (id) => {
  const [rows] = await db.query('SELECT * FROM deliveries WHERE delivery_id = ?', [id]);
  return rows[0];
};

exports.getDeliveriesByStatus = async (status) => {
  const [rows] = await db.query('SELECT * FROM deliveries WHERE status = ?', [status]);
  return rows;
};

exports.getRealTimeLocations = async () => {
  const [rows] = await db.query('SELECT delivery_id, lat, lng FROM deliveries WHERE status = "in_transit"');
  return rows;
};

exports.logDeliveryMovement = async (logData) => {
  await db.query(
    'INSERT INTO delivery_log (delivery_id, lat, lng, status) VALUES (?, ?, ?, ?)',
    [logData.delivery_id, logData.lat || null, logData.lng || null, logData.status || null]
  );
};
