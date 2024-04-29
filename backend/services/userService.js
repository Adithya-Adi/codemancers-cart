const User = require('../models/User');

const getAllUsers = async () => {
  const users = await User.find({ isAdmin: false });
  return {
    status: 200,
    message: 'Users Retrived',
    data: users,
  };
};

module.exports = {
  getAllUsers,
};
