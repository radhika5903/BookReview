// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');

// // Initialize express app
// const app = express();
// app.use(cors());
// app.use(express.json());

// // MongoDB URI and Port
// const MONGO_URI = "mongodb://localhost:27017/yourdbname"; // Replace with your MongoDB database name
// const PORT = 5000;

// // Connect to MongoDB
// mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// // Define routes
// app.use('/api/auth', authRoutes);

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb://localhost:27017/yourdbname"; // Replace 'yourdbname' with your MongoDB database name
const PORT = 5000;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
