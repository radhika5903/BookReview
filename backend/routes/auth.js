// const express = require('express');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const router = express.Router();

// // Signup route
// router.post('/signup', async (req, res) => {
//   const { username, email, password } = req.body;
  
//   try {
//     // Check if the user already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ msg: 'User already exists' });
//     }

//     // Create a new user
//     const user = new User({ username, email, password });
//     await user.save();

//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (error) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// const router = express.Router();

// // Login route
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if the user exists by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'You don’t have an account' });
//     }

//     // Compare the provided password with the stored hashed password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: 'You don’t have an account' });
//     }

//     // If both email and password match, return success
//     res.status(200).json({ msg: 'Login successful!' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }
    res.json({ msg: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
