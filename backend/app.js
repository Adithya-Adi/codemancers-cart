const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectToDatabase = require('./config/database');
const errorHandler = require('./middlewares/errorHandler');

// routes
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors());

// Routes
app.get('/', (_req, res) => {
  res.status(200).send('Codemancers-Cart Backend');
});

app.use('/api/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

app.use('*', (_req, res) =>
  res.status(404).send({
    status: false,
    message: 'Invalid route',
  }));

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connectToDatabase();
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
});
