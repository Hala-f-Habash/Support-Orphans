
//The controller handles the incoming requests, calls the service, and sends the response.
const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
    try {
      const user = await authService.login(req.body);
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
