const jwt = require('jsonwebtoken');

class ApiError extends Error {
  constructor (statusCode, message = 'Internal Server Error') {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }
}

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

module.exports = {
  ApiError,
  generateToken,
};
