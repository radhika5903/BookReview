// // balck box ai

// const express = require('express');
// const multer = require('multer');
// const Book = require('../models/Book');
// const Feedback = require('../models/Feedback'); // Import Feedback model
// const authMiddleware = require('../middleware/authMiddleware');
// const path = require('path');
// const User = require('../models/User'); // Ensure the path is correct

// const router = express.Router();

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/'); // Directory for uploads
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
//     }
// });
// const upload = multer({ storage: storage });

// // Publish a book
// router.post('/publish', authMiddleware, upload.single('coverImage'), async (req, res) => {
//     const { title, author, story } = req.body;
//     const coverImage = req.file ? req.file.path : null; // Get the uploaded file path

//     // Validate incoming data
//     if (!title || !author || !story || !coverImage) {
//         return res.status(400).json({ message: "All fields are required." });
//     }

//     try {
//         const newBook = new Book({
//             title,
//             author,
//             story,
//             coverImage,
//             user: req.user.id // Save the ID of the user who published the book
//         });

//         await newBook.save(); // Save the book to the database
//         res.status(201).json({ message: "Book published successfully", book: newBook });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Get all books
// router.get('/', async (req, res) => {
//     try {
//         const books = await Book.find(); // Fetch all books from the database
//         res.json(books);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Get a single book by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const book = await Book.findById(req.params.id); // Find a book by its ID
//         if (!book) return res.status(404).json({ message: "Book not found" });
//         res.json(book);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// // Get feedback for a specific book
// router.get('/:id/feedback', async (req, res) => {
//     try {
//         const feedbacks = await Feedback.find({ book: req.params.id }).populate('User', 'username'); // Populate username
//         res.json(feedbacks);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });


// // Submit feedback for a book
// router.post('/:id/feedback', authMiddleware, async (req, res) => {
//     const { rating, feedback } = req.body;
//     const bookId = req.params.id;

//     // Validate incoming data
//     if (!rating || !feedback) {
//         return res.status(400).json({ message: "Rating and feedback are required." });
//     }

//     try {
//         const newFeedback = new Feedback({
//             book: bookId,
//             user: req.user.id, // User ID from the token
//             rating,
//             feedback,
//         });

//         await newFeedback.save(); // Save feedback to the database

//         // Optionally, you can push the feedback ID to the book's feedback array
//         await Book.findByIdAndUpdate(bookId, { $push: { feedbacks: newFeedback._id } });

//         res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

// module.exports = router;





const express = require('express');
const multer = require('multer');
const Book = require('../models/Book');
const Feedback = require('../models/Feedback'); // Import Feedback model
const authMiddleware = require('../middleware/authMiddleware');
const path = require('path');
const User = require('../models/User');

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    },
});
const upload = multer({ storage: storage });

// Publish a book
router.post('/publish', authMiddleware, upload.single('coverImage'), async (req, res) => {
    const { title, author, story } = req.body;
    const coverImage = req.file ? req.file.path : null; // Get the uploaded file path

    // Validate incoming data
    if (!title || !author || !story || !coverImage) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newBook = new Book({
            title,
            author,
            story,
            coverImage,
            user: req.user.id, // Save the ID of the user who published the book
        });

        await newBook.save(); // Save the book to the database
        res.status(201).json({ message: 'Book published successfully', book: newBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find(); // Fetch all books from the database
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Find a book by its ID
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get feedback for a specific book
router.get('/:id/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ book: req.params.id }) // Fetch feedback for the book
        res.json(feedbacks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Submit feedback for a book
router.post('/:id/feedback', authMiddleware, async (req, res) => {
    const { rating, feedback } = req.body;

    // Validate incoming data
    if (!rating || !feedback) {
        return res.status(400).json({ message: 'Rating and feedback are required.' });
    }

    try {
        const newFeedback = new Feedback({
            book: req.params.id,
            user: req.user.id, // Save the ID of the user who submitted the feedback
            rating,
            feedback,
        });

        await newFeedback.save(); // Save the feedback to the database
        res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
