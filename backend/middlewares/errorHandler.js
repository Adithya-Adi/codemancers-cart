// Middleware function for handling errors
const errorHandler = (error, _req, res) => {
  console.error(
    'Error: Status Code:', error.status, ' Message:', error.message);
  const statusCode = error.status || 500;
  const message = error.message || 'Internal server error';
  return res.status(statusCode).send({
    status: statusCode,
    message,
  });
};

module.exports = errorHandler;
