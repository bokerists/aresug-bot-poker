'use strict';
const request = require('supertest');
const sinon = require('sinon');
const chai = require('chai');
const expect = require('chai').expect;
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const app = require('../index');

let sandbox;
beforeEach(() => sandbox = sinon.sandbox.create());
afterEach(() => sandbox.restore());

describe('- Bot -', () => {
  it('should respond to /', done => {
    request(app)
      .get('/')
      .expect(200)
      .end(done);
  });
});
