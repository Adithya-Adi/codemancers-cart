const bcrypt = require('bcrypt');
const User = require('../models/User');
const {
  ApiError,
  generateToken,
} = require('../utils/helpers');

const registerUser = async (userData) => {
  const { fullName, email, phoneNumber, password } = userData;
  if (!fullName || !email || !phoneNumber || !password) {
    throw new ApiError(404, 'Incomplete User Data');
  }
  const userExists = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (userExists) {
    throw new ApiError(409, 'User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    ...userData,
    password: hashedPassword,
  });
  await user.save();
  return {
    status: 201,
    message: 'User Created',
    data: user,
  };
};

const loginUser = async (userData) => {
  const { email, password } = userData;
  if (!email || !password) {
    throw new ApiError(404, 'Incomplete User Data');
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, 'User Not Found');
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new ApiError(401, 'Incorrect Password');
  }
  const token = generateToken(user._id);
  return {
    status: 200,
    message: 'Login Successful',
    data: user,
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
