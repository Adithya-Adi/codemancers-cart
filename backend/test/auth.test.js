const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, beforeEach } = require('mocha');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Authentication API Tests', () => {
  let testUser;

  before(async () => {
    await User.findOneAndDelete({ email: 'test@example.com' });
  });

  beforeEach(() => {
    testUser = {
      fullName: 'Test User',
      email: 'test@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
    };
  });

  describe('Register User', () => {
    it('should register a new user', async () => {
      const response = await chai.request(app)
        .post('/api/auth/register')
        .send(testUser);
      expect(response).to.have.status(201);
      expect(response.body.message).to.equal('User Created');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.email).to.equal('test@example.com');
    });

    it('should return 404 if user data is incomplete', async () => {
      delete testUser.fullName;
      const response = await chai.request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Incomplete User Data');
    });

    it('should return 409 if user already exists', async () => {
      await chai.request(app)
        .post('/api/auth/register')
        .send(testUser);

      const response = await chai.request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(response).to.have.status(409);
      expect(response.body.message).to.equal('User already exists');
    });
  });

  describe('Login User', () => {
    it('should login a user', async () => {
      const response = await chai.request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(response).to.have.status(200);
      expect(response.body.message).to.equal('Login Successful');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.email).to.equal('test@example.com');
    });

    it('should return 404 if user does not exists', async () => {
      testUser.email = 'test1@test.com';
      const response = await chai.request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('User Not Found');
    });

    it('should return 401 if password is incorrect', async () => {
      testUser.password = 'password401';
      const response = await chai.request(app)
        .post('/api/auth/login')
        .send(testUser);
      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Incorrect Password');
    });

    it('should return 404 if user data is incomplete', async () => {
      delete testUser.email;
      const response = await chai.request(app)
        .post('/api/auth/login')
        .send(testUser);

      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Incomplete User Data');
    });
  });
});
