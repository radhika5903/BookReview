
// books.js
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
            coverImage,
            user: req.user.id // Save the ID of the user who published the book
        });

        await newBook.save(); // Save the book to the database
        res.status(201).json({ message: "Book published successfully", book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;


