const {
  registerUser,
  loginUser,
  adminLogin,
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
    const adminData = req.body;
    const loginUserResponse = await loginUser(adminData);
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

const adminLoginController = async (req, res, next) => {
  try {
    const userData = req.body;
    const adminLoginResponse = await adminLogin(userData);
    res.status(adminLoginResponse.status).json({
      success: true,
      message: adminLoginResponse.message,
      data: adminLoginResponse.data,
      token: adminLoginResponse.token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUserController,
  loginUserController,
  adminLoginController,
};
