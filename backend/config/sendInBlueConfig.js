const SibApiV3Sdk = require('@getbrevo/brevo');
const dotenv = require('dotenv');
dotenv.config();

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const apiKey = apiInstance.authentications.apiKey;
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

module.exports = {
  apiInstance,
  sendSmtpEmail,
};
