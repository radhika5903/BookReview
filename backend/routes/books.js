/*const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();
const JWT_SECRET = "yourSecretKey"; // Replace with your secret key

// Middleware to verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Publish a new book
router.post('/publish', authMiddleware, async (req, res) => {
  const { title, author, coverImage, story } = req.body;
  try {
    const newBook = new Book({
      title,
      author,
      coverImage,
      story,
      user: req.user, // Link the book to the logged-in user
    });
    await newBook.save();
    res.status(201).json({ msg: "Book published successfully!" });
  } catch (error) {
    res.status(400).json({ msg: "Error publishing book", error });
  }
});

// Get all books for the logged-in user
router.get('/mybooks', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json({ msg: "Error fetching books", error });
  }
});

module.exports = router;*/


/*const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Book = require('../models/Book');
const router = express.Router();

// Route to publish a book
router.post('/', verifyToken, async (req, res) => {
  try {
    const { title, author, story } = req.body;
    const user = req.user; // This comes from the token verification process

    const newBook = new Book({
      title,
      author,
      story,
      user: user._id // Associate the book with the user from token
    });

    await newBook.save();
    res.status(201).json({ message: 'Book published successfully' });
  } catch (err) {
*/


/*const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware'); // Import the authMiddleware

// Publish a book
router.post('/publish', authMiddleware, async (req, res) => {
  const { title, author, content, coverImage } = req.body;

  try {
    const book = new Book({
      title,
      author,
      content,
      coverImage,
      userId: req.user.userId, // User's ID from JWT token
    });

    await book.save();
    res.status(201).json({ msg: 'Book published successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Fetch books for a specific user
router.get('/mybooks', authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ userId: req.user.userId });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;*/


// backend/routes/books.js
/*const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware'); // Ensure the path is correct
const Book = require('../models/Book'); // Adjust the import based on your project structure
const multer = require('multer');
const path = require('path');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

// Publish a book
router.post('/publish', auth, upload.single('coverImage'), async (req, res) => {
  const { title, authorName, story } = req.body;
  const userId = req.user.id; // Assuming the user ID is saved in the token

  // Check for missing fields
  if (!title || !authorName || !story || !req.file) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const newBook = new Book({
      title,
      authorName,
      story,
      coverImage: req.file.path, // Store the path of the uploaded file
      user: userId, // Reference the user ID
    });

    await newBook.save();
    res.status(201).json({ msg: 'Book published successfully!', book: newBook });
  } catch (error) {
    console.error('Error publishing book:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;*/

const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});
const upload = multer({ storage: storage });

// Publish a book
router.post('/publish', authMiddleware, upload.single('coverImage'), async (req, res) => {
    const { title, author, story } = req.body;
    const coverImage = req.file ? req.file.path : null; // Get the uploaded file path

    // Validate incoming data
    if (!title || !author || !story || !coverImage) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const newBook = new Book({
            title,
            author,
            story,
            coverImage
        });

        await newBook.save(); // Save the book to the database
        res.status(201).json({ message: "Book published successfully", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;


