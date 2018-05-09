import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newTable = {
  id: 0,
  description: 'TestTable'
};

after(function(done) {
  Models.Table
    .destroy({ where: {} })
    .then(() => {
      done();
    })
    .catch((err: Error) => { throw err; });
});

describe('View all tables test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/tables')
      .expect(200, done());
  });
});

describe('Create a new table test', () => {
  it('should return a 200 and the match the description with the new table', function(done) {
    supertest(server)
      .post('/api/tables')
      .send(newTable)
      .then((response: any) => {
        expect(response.body.description).equal(newTable.description);
        newTable.id = response.body.id;
        done();
      });
  });
});

describe('View the new table test', () => {
  it('should return a 200 and match the description with the new product', function(done) {
    supertest(server)
      .get('/api/tables/' + newTable.id)
      .then((response: any) => {
        expect(response.body.description).equal(newTable.description);
        done();
      });
  });
});

describe('Update the new table test', () => {
  it('should return a 200 and match the description with the updated product', function(done) {
    let updatedProduct = newTable;
    updatedProduct.description = "updatedTable";
    supertest(server)
      .put('/api/tables/' + newTable.id)
      .send(newTable)
      .then((response: any) => {
        expect(response.body.description).equal(updatedProduct.description);
        done();
      });
  });
});

describe('Delete the new table test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/tables/' + newTable.id)
      .expect(200, done());
  });
});
