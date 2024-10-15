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

//currently working code
/*const express = require('express');
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

module.exports = router;*/

/*currently working code
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // After signup, generate a JWT token and send it to the frontend
    const token = jwt.sign({ _id: newUser._id, email: newUser.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ token }); // Send the token after signup
  } catch (err) {
    res.status(500).json({ msg: 'Error signing up user', error: err.message });
  }
});

// Login Route (already in place)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Generate a token
  const token = jwt.sign({ _id: user._id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;*/

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
