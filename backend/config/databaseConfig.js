const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log('Error connecting to MongoDB database : ', error);
  }
};

module.exports = connectToDatabase;
