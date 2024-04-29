const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinaryConfig');

class ApiError extends Error {
  constructor (statusCode, message = 'Internal Server Error') {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }
}

const generateToken = (userId, role = 'user') => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET);
};

const uploadImageToCloudinary = async (image) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(image);
  return cloudinaryResponse.secure_url;
};

module.exports = {
  ApiError,
  generateToken,
  uploadImageToCloudinary,
};
