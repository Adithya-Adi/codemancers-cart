const {
  registerUser,
  loginUser,
} = require('../services/authService');

const registerUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    const registerUserResponse = await registerUser(userData);
    res.status(registerUserResponse.status).json({
      success: true,
      message: registerUserResponse.message,
      data: registerUserResponse.data,
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const userData = req.body;
    const loginUserResponse = await loginUser(userData);
    res.status(loginUserResponse.status).json({
      success: true,
      message: loginUserResponse.message,
      data: loginUserResponse.data,
      token: loginUserResponse.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
};
