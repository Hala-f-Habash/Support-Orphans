// test logging out 

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authMiddleware');

router.get('/profile', authenticate, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}!`, user: req.user });
});

module.exports = router;
