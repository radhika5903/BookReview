// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   coverImage: { type: String },
//   story: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References the User model
// });

// const Book = mongoose.model('Book', bookSchema);
// module.exports = Book;







// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   coverImage: { type: String },
//   story: { type: String, required: true },
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References the User model
//   ratings: [
//     {
//       username: { type: String, required: true }, // User who rated
//       stars: { type: Number, required: true, min: 1, max: 5 }, // Star rating
//       feedback: { type: String }, // Optional feedback
//     }
//   ]
// });

// const Book = mongoose.model('Book', bookSchema);
// module.exports = Book;








// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     coverImage: { type: String },
//     story: { type: String, required: true },
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // References the User model
//     ratings: [
//         {
//             username: { type: String, required: true }, // User who rated
//             stars: { type: Number, required: true, min: 1, max: 5 }, // Star rating
//             feedback: { type: String } // Optional feedback
//         }
//     ]
// });

// const Book = mongoose.model('Book', bookSchema);
// module.exports = Book;





const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String },
  story: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' }, // References the User model
  feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] // Optional: Reference to Feedback
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;