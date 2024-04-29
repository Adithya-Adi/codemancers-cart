const {
  getAllUsers,
} = require('../services/userService');

const getAllUsersController = async (_req, res, next) => {
  try {
    const getAllUsersResponse = await getAllUsers();
    res.status(getAllUsersResponse.status).json({
      success: true,
      message: getAllUsersResponse.message,
      data: getAllUsersResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersController,
};
