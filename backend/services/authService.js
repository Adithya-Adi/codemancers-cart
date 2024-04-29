const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(409, 'User already exists');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    ...userData,
    password: hashedPassword,
    isAdmin: false,
  });
  await user.save();
  user.password = undefined;
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
  user.password = undefined;
  return {
    status: 200,
    message: 'Login Successful',
    data: user,
    token,
  };
};

const googleLogin = async (credential) => {
  const { name, email } = jwt.decode(credential);
  const user = await User.findOneAndUpdate(
    { email },
    {
      $setOnInsert: {
        email,
        fullName: name,
      },
    },
    {
      new: true,
      upsert: true,
    },
  );
  const token = generateToken(user._id);
  return {
    status: 200,
    message: 'Login Successful',
    data: user,
    token,
  };
};

const adminLogin = async (adminData) => {
  const { email, password } = adminData;
  if (!email || !password) {
    throw new ApiError(404, 'Incomplete User Data');
  }
  const user = await User.findOne({ email, isAdmin: true });
  if (!user) {
    throw new ApiError(401, 'Invalid Credentials');
  }
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new ApiError(401, 'Incorrect Password');
  }
  const token = generateToken(user._id, 'admin');
  user.password = undefined;
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
  adminLogin,
  googleLogin,
};
