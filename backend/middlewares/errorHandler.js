const { ApiError } = require('../utils/helpers');

const errorHandler = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    console.error('Error: Status Code:', error.statusCode, ' Message:', error.message);
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }
  console.error('Error: Status Code:', 500, ' Message : Internal Server Error');

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
};

module.exports = errorHandler;
