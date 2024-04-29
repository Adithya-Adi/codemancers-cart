const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before } = require('mocha');
const app = require('../app');

chai.use(chaiHttp);
const expect = chai.expect;

describe('User API Tests', () => {
  let authToken;

  before(async () => {
    const loginResponse = await chai.request(app)
      .post('/api/auth/admin')
      .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    authToken = loginResponse.body.token;
  });

  describe('Get All User', () => {
    it('should return all users data', async () => {
      const response = await chai.request(app)
        .get('/api/user')
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.an('array');
      expect(response.body.message).to.equal('Users Retrived');
    });
  });
});
