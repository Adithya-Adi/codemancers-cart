const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectToDatabase = require('./config/databaseConfig');
const errorHandler = require('./middlewares/errorHandler');

// routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
const allowedOrigins = ['http://localhost:5173', 'https://codemancers-cart.netlify.app'];

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// connect to db
connectToDatabase()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

// Routes
app.get('/', (_req, res) => {
  res.status(200).send('Codemancers-Cart Backend');
});

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

// Error handling middleware
app.use(errorHandler);

app.use('*', (_req, res) =>
  res.status(404).send({
    status: false,
    message: 'Invalid route',
  }));

module.exports = app;
