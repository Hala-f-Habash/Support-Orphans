
//Handles the registration logic, such as checking if the email is already in use and hashing the password.


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepo = require('../repositories/userRepository');

exports.register = async ({ name, email, password, role }) => {
  const existing = await userRepo.getUserByEmail(email);
  if (existing) throw new Error('Email is already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role
  };

  const userId = await userRepo.createUser(newUser);
  return { id: userId, name: newUser.name, email: newUser.email, role: newUser.role };
};


exports.login = async ({ email, password }) => {
    //  1: Retrieve user by email
    const user = await userRepo.getUserByEmail(email);
    if (!user) throw new Error('User not found');
  
    // 2: Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid password');
  
// Generate JWT token
const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    //  3: Return the user data (can also include JWT generation here)
    return { token, user: { id: user.user_id, name: user.name, email: user.email, role: user.role } };  };