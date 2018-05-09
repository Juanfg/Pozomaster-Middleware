import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newProduct = {
  id: 0,
  name: "TestProduct",
  price: 50,
  categoryId: 0
};

let newCategory = {
  id: 0,
  name: "TestCategoryForProduct"
};

before((done) => {
  Models.Category
    .create(newCategory)
    .then((result: any) => {
      newCategory.id = result.id;
      newProduct.categoryId = result.id
      done();
    })
    .catch((err: Error) => { throw err; });
})

after(function(done) {  
  Models.Category
    .destroy({ where: {} })
    .then(() => {
      Models.Product
        .destroy({ where: {} })
          .then(() => {
            done();
          })
          .catch((err: Error) => { throw err; });
    })
    .catch((err: Error) => { throw err; });
});

describe('View all products test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/products')
      .expect(200, done());
  });
});

describe('Create a new product test', () => {
  it('should return a 200 and the match the name with the new product', function(done) {
    supertest(server)
      .post('/api/products')
      .send(newProduct)
      .then((response: any) => {
        expect(response.body.name).equal(newProduct.name);
        newProduct.id = response.body.id;
        done();
      });
  });
});

describe('View the new product test', () => {
  it('should return a 200 and match the name with the new product', function(done) {
    supertest(server)
      .get('/api/products/' + newProduct.id)
      .then((response: any) => {
        expect(response.body.name).equal(newProduct.name);
        done();
      });
  });
});

describe('Update the new product test', () => {
  it('should return a 200 and match the name with the updated product', function(done) {
    let updatedProduct = newProduct;
    updatedProduct.name = "updatedProduct";
    supertest(server)
      .put('/api/products/' + newProduct.id)
      .send(newProduct)
      .then((response: any) => {
        expect(response.body.name).equal(updatedProduct.name);
        done();
      });
  });
});

describe('Delete the new product test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/products/' + newProduct.id)
      .expect(200, done());
  });
});
