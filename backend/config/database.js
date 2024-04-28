const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database is connected');
  } catch (error) {
    console.log('Error connecting to MongoDB database : ', error);
  }
};

module.exports = connectToDatabase;
