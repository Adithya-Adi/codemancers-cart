const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectToDatabase = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.status(200).send('Codemancers-Cart Backend');
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
