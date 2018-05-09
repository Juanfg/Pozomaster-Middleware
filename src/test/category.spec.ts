import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newCategory = {
  id: 0,
  name: 'TestCategory'
};

after(function(done) {
  Models.Category
    .destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err: Error) => { throw err; });
});

describe('View all categories test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/categories')
      .expect(200, done());
  });
});

describe('Create a new category test', () => {
  it('should return a 200 and the match the name with the new category', function(done) {
    supertest(server)
      .post('/api/categories')
      .send(newCategory)
      .then((response: any) => {
        expect(response.body.name).equal(newCategory.name);
        newCategory.id = response.body.id;
        done();
      });
  });
});

describe('View the new category test', () => {
  it('should return a 200 and match the name with the new product', function(done) {
    supertest(server)
      .get('/api/categories/' + newCategory.id)
      .then((response: any) => {
        expect(response.body.name).equal(newCategory.name);
        done();
      });
  });
});

describe('Update the new category test', () => {
  it('should return a 200 and match the name with the updated product', function(done) {
    let updatedProduct = newCategory;
    updatedProduct.name = "updatedCategory";
    supertest(server)
      .put('/api/categories/' + newCategory.id)
      .send(newCategory)
      .then((response: any) => {
        expect(response.body.name).equal(updatedProduct.name);
        done();
      });
  });
});

describe('Delete the new category test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/categories/' + newCategory.id)
      .expect(200, done());
  });
});
