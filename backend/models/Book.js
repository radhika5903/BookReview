// const mongoose = require('mongoose');

// const ReviewSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   text: { type: String, required: true },
//   rating: { type: Number, required: true },
// });

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   coverImage: { type: String },
//   story: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // References the User model
//   feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }], // Optional: Reference to Feedback
//   reviews: [ReviewSchema]
// });

// const Book = mongoose.model('Book', bookSchema);
// module.exports = Book;




const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String },
  story: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // Ensure no trailing space
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] // Optional: Reference to Feedback
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;