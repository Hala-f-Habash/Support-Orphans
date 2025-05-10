
//This file contains functions to interact with the database, such as fetching users by email and creating a new user.



const db = require('../config/db');
//to check existing email , for not throw exception from db because email is unique 
exports.getUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};



exports.createUser = async (user) => {
  const [result] = await db.query(
    'INSERT INTO Users (name, email, password, role) VALUES (?, ?, ?, ?)',
    [user.name, user.email, user.password, user.role]
  );
  return result.insertId;
};
