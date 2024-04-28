const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Bearer token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, message: 'Invalid token' });
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send({ message: 'Bearer token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    if (decoded.role !== 'admin') {
      return res.status(403).send({ status: 403, message: 'Permission denied. Admin access required.' });
    }
    req.adminEmail = decoded.email;
    next();
  } catch (error) {
    return res.status(401).send({ status: 401, message: 'Invalid token' });
  }
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
};
