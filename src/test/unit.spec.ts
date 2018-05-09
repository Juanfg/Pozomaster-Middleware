import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newUnit = {
  id: 0,
  name: 'TestUnit'
};

after(function(done) {
  Models.Unit
    .destroy({ where: {} })
    .then(() => {
      process.exit(0);
    })
    .catch((err: Error) => { throw err; });
});

describe('View all units test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/units')
      .expect(200, done());
  });
});

describe('Create a new unit test', () => {
  it('should return a 200 and the match the name with the new unit', function(done) {
    supertest(server)
      .post('/api/units')
      .send(newUnit)
      .then((response: any) => {
        expect(response.body.name).equal(newUnit.name);
        newUnit.id = response.body.id;
        done();
      });
  });
});

describe('View the new unit test', () => {
  it('should return a 200 and match the name with the new product', function(done) {
    supertest(server)
      .get('/api/units/' + newUnit.id)
      .then((response: any) => {
        expect(response.body.name).equal(newUnit.name);
        done();
      });
  });
});

describe('Update the new unit test', () => {
  it('should return a 200 and match the name with the updated product', function(done) {
    let updatedProduct = newUnit;
    updatedProduct.name = "updatedUnit";
    supertest(server)
      .put('/api/units/' + newUnit.id)
      .send(newUnit)
      .then((response: any) => {
        expect(response.body.name).equal(updatedProduct.name);
        done();
      });
  });
});

describe('Delete the new unit test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/units/' + newUnit.id)
      .expect(200, done());
  });
});
