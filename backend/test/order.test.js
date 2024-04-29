const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, beforeEach } = require('mocha');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Order API Tests', () => {
  let testOrder;
  let authToken;

  before(async () => {
    const loginResponse = await chai.request(app)
      .post('/api/auth/admin')
      .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    authToken = loginResponse.body.token;
  });

  beforeEach(() => {
    testOrder = {
      userId: '662fcaf7138812332371f2ab',
      products: [
        {
          productId: '662f6d23bdfe9aafb0664c3c',
          quantity: 2,
        },
        {
          productId: '662fa1474849003e11d0c4db',
          quantity: 1,
        },
      ],
      totalPrice: 299.99,
      billingDetails: {
        fullName: 'Test User',
        email: 'test.user@example.com',
        address: 'Test Street',
        city: 'Test City',
        postalCode: '10001',
        country: 'Test',
      },
    };
  });

  describe('Create Order', () => {
    it('should create a new order', async () => {
      const response = await chai.request(app)
        .post('/api/order')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testOrder);
      expect(response).to.have.status(201);
      expect(response.body.message).to.equal('Order Created');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.totalPrice).to.equal(299.99);
    });

    it('should return 404 if order data is incomplete', async () => {
      delete testOrder.userId;
      const response = await chai.request(app)
        .post('/api/order')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testOrder);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Incomplete Order Data');
    });

    it('should return 404 if user data is incomplete', async () => {
      testOrder.userId = '662f140ed4080f94a4bb1ef1';
      const response = await chai.request(app)
        .post('/api/order')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testOrder);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('User Doest exists');
    });
  });
});
