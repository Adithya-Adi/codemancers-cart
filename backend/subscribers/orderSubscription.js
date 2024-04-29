const { sendMail } = require('../utils/helpers');
const { EventEmitter } = require('events');
const orderEventEmitter = new EventEmitter();

orderEventEmitter.on('orderCreated', async (orderData) => {
  const { email, fullName } = orderData.user;
  const { _id, totalPrice } = orderData.order;
  const message = `
    <html>
      <body>
        <p>Dear ${fullName},</p>
        <p>Thank you for your order!</p>
        <p><strong>Order ID:</strong> ${_id}</p>
        <p><strong>Total Price:</strong> ${totalPrice}</p>
        <p>For any questions or concerns, please contact us.</p>
        <p>Thank you,<br/>Codemancer-Cart</p>
      </body>
    </html>
  `;
  const sendMailResponse = await sendMail(fullName, email, 'Order Confirmation', message);
  if (sendMailResponse) {
    console.log('Email sent. Status code:', sendMailResponse?.response?.statusCode);
  }
});

module.exports = orderEventEmitter;
