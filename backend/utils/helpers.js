const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinaryConfig');
const { apiInstance, sendSmtpEmail } = require('../config/sendInBlueConfig');

// Api error
class ApiError extends Error {
  constructor (statusCode, message = 'Internal Server Error') {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }
}

// generate jwt token
const generateToken = (userId, role = 'user') => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET);
};

// upload image to cloudinary
const uploadImageToCloudinary = async (image) => {
  const cloudinaryResponse = await cloudinary.uploader.upload(image);
  return cloudinaryResponse.secure_url;
};

// send Mail helper
const sendMail = async (
  recipientName,
  recipientEmail,
  subject,
  message,
  senderName = 'Codemancer-cart',
  senderEmail = 'admin@gmail.com',
) => {
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = message;
  sendSmtpEmail.sender = { name: senderName, email: senderEmail };
  sendSmtpEmail.to = [{ email: recipientEmail, name: recipientName }];
  sendSmtpEmail.replyTo = { name: senderName, email: senderEmail };
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return data;
  } catch (error) {
    console.log('Failed to send mail');
  }
};

module.exports = {
  ApiError,
  generateToken,
  uploadImageToCloudinary,
  sendMail,
};
