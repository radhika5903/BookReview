const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // or bcryptjs if you had issues
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new user
    user = new User({ username, email, password: hashedPassword });
    await user.save();

    // JWT Token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // JWT Token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Exporting the router
module.exports = router;
