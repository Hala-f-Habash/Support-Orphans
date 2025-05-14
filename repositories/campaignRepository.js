const db = require('../config/db');

exports.insertCampaign = async ({ title, description, status, start_date, location }) => {
  const [result] = await db.query(
    `INSERT INTO emergency_campaigns (title, description, status, start_date, location) VALUES (?, ?, ?, ?, ?)`,
    [title, description, status, start_date, location]
  );
  return result.insertId;
};

exports.getDonorEmails = async () => {
  const [rows] = await db.query(
    `SELECT DISTINCT name, email FROM Users WHERE role IN ('donor', 'sponsor')`
  );
  return rows;
};

exports.getActiveCampaigns = async () => {
  const [rows] = await db.query(
    'SELECT campaign_id, title, description, start_date, location FROM emergency_campaigns WHERE status = 1 ORDER BY start_date DESC'
  );
  return rows;
};

exports.insertCampaignDonation = async ({ campaign_id, user_id, amount }) => {
  const [result] = await db.query(
    `INSERT INTO Campaign_Donations (campaign_id, user_id, amount) VALUES (?, ?, ?)`,
    [campaign_id, user_id, amount]
  );
  return result.insertId;
};
