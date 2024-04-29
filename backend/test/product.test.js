const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe, it, before, beforeEach } = require('mocha');
const app = require('../app');
const Product = require('../models/Product');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Product API Tests', () => {
  let testProduct;
  let authToken;
  let productId;

  before(async () => {
    const loginResponse = await chai.request(app)
      .post('/api/auth/admin')
      .send({ email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD });
    authToken = loginResponse.body.token;
    await Product.deleteMany({ title: 'Test Product' });
  });

  beforeEach(() => {
    testProduct = {
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAjAAAAIwBFCEVQAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAI6SURBVEiJrdVLiM9RFAfwz4wZfxnGqwyaDTuP2UgRErOh2RBRUhpZUFOKkhA7qbFRyKNYkI3ksRHJYyEaeeVVGqQURWowyhhkce5//OZv5j//GXNW59x7z/nec88530v/ZDyO98ehvJ8AOYwabIARONvD+hQcGgyAygRSKDkM78t5SAkAP/EZL/Aj6a3oQBteFXMuKwEAxqER81CFNziPyyX6F5WluId1qBVFnoWDuISx/xN8Ea6hOtkT0JTZX4zrok79lnLcFb0Po3Ebz7Alc24HNgwEYA6OZOw12J2Ab2bWRxfY3aSiCMA0PMjYLdiGdizPrLdhWG9Bis3Bb93b+F0K3IEzRfxKBngknikvDViPU/7WRdK/lApYKLcwOek5cfO3WJY5sw+rBwowE3cwMdljsCKzvxYXFBnYvqjiPZ7jpJiBNpHBXOxFjXi2zt4C5JEbsB8fBRWcwBXUCf55jNmCKqrxWlDFkz4u2AXQKFrtiJjec7ghnmco6kUhL6ZLdKRbP8WnTLwZWIkPOIbO/BzkklNePywmNC97xFzUY1LKogLNgpNeihkpS9lvTS/RnAX4mtHbe8j2uaDm6aIWcEBw1X3swrd0uZYE3DXJwwoyyOuFUit4p0o8XYX4G5pER63CJsFhsgA5Ucy8/gvz8R0Pky1lUEhsdaLgV7EgE+cfgEpBXDlsx2mMFLPQKj6XK6J1pbObsRAbBcv+I/kuWpEOEf/sTt0ZciqWCP6vSWvfxXwcFbzVo/wBcch1ZwAYOl8AAAAASUVORK5CYII=',
      title: 'Test Product',
      description: 'This is a stylish and comfortable cotton t-shirt for men.',
      price: 1999,
      category: 'Mens Shirts',
    };
  });

  describe('Create Product', () => {
    it('should create a new product', async () => {
      const response = await chai.request(app)
        .post('/api/product')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testProduct);
      productId = response.body.data._id;
      expect(response).to.have.status(201);
      expect(response.body.message).to.equal('Product Created');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.title).to.equal('Test Product');
    });

    it('should return 404 if product data is incomplete', async () => {
      delete testProduct.price;
      const response = await chai.request(app)
        .post('/api/product')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testProduct);

      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Incomplete Product Data');
    });
  });

  describe('Update Product', () => {
    it('should update the product', async () => {
      testProduct.price = 999;
      const response = await chai.request(app)
        .patch(`/api/product/${productId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(testProduct);
      expect(response).to.have.status(200);
      expect(response.body.message).to.equal('Product Updated');
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.price).to.equal(999);
    });

    it('should return 401 if there is no bearer token', async () => {
      const response = await chai.request(app)
        .patch(`/api/product/${productId}`)
        .send(testProduct);
      expect(response).to.have.status(401);
      expect(response.body.message).to.equal('Bearer token missing');
    });

    it('should return 404 if product not found', async () => {
      const response = await chai.request(app)
        .patch('/api/product/662f202432ed7b15b9aa4fef')
        .set('Authorization', `Bearer ${authToken}`)
        .send(testProduct);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Product not found');
    });
  });

  describe('Get All Product', () => {
    it('should return all products', async () => {
      const response = await chai.request(app)
        .get('/api/product')
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.an('array');
    });
  });

  describe('Get Product By Id', () => {
    it('should return the matching product', async () => {
      const response = await chai.request(app)
        .get(`/api/product/${productId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.title).to.equal('Test Product');
    });

    it('should return 404 if product not found', async () => {
      const response = await chai.request(app)
        .get('/api/product/662f202432ed7b15b9aa4fef')
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Product not found');
    });
  });

  describe('Delete Product', () => {
    it('should delete the matching product', async () => {
      const response = await chai.request(app)
        .delete(`/api/product/${productId}`)
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.an('object');
      expect(response.body.data.title).to.equal('Test Product');
      expect(response.body.message).to.equal('Product Deleted');
    });

    it('should return 404 if product not found', async () => {
      const response = await chai.request(app)
        .delete('/api/product/662f202432ed7b15b9aa4fef')
        .set('Authorization', `Bearer ${authToken}`);
      expect(response).to.have.status(404);
      expect(response.body.message).to.equal('Product not found');
    });
  });
});
