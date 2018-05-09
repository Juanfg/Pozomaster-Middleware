import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newOrder = {
  id: 0,
  tableId: 0
};

let table1 = {
  id: 0,
  description: "TestTableForOrder"
};

let table2 = {
  id: 0,
  description: "TestTable2ForOrder"
}

before((done) => {
  Models.Table
    .create(table1)
    .then((result: any) => {
      table1.id = result.id;
      newOrder.tableId = result.id

      Models.Table
        .create(table2)
        .then((result: any) => {
          table2.id = result.id;
          done();
        })
        .catch((err: Error) => { throw err; });
    })
    .catch((err: Error) => { throw err; });
})

after(function(done) {  
  Models.Table
    .destroy({ where: {} })
    .then(() => {
      Models.Order
        .destroy({ where: {} })
          .then(() => {
            done();
          })
          .catch((err: Error) => { throw err; });
    })
    .catch((err: Error) => { throw err; });
});

describe('View all orders test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/orders')
      .expect(200, done());
  });
});

describe('Create a new order test', () => {
  it('should return a 200 and the match the tableId with the new order', function(done) {
    supertest(server)
      .post('/api/orders')
      .send(newOrder)
      .then((response: any) => {
        expect(response.body.tableId).equal(newOrder.tableId);
        newOrder.id = response.body.id;
        done();
      });
  });
});

describe('View the new order test', () => {
  it('should return a 200 and match the tableId with the new order', function(done) {
    supertest(server)
      .get('/api/orders/' + newOrder.id)
      .then((response: any) => {
        expect(response.body.tableId).equal(newOrder.tableId);
        done();
      });
  });
});

describe('Update the new order test', () => {
  it('should return a 200 and match the tableId with the updated order', function(done) {
    let updatedOrder = newOrder;
    updatedOrder.tableId = table2.id;
    supertest(server)
      .put('/api/orders/' + newOrder.id)
      .send(newOrder)
      .then((response: any) => {
        expect(response.body.tableId).equal(updatedOrder.tableId);
        done();
      });
  });
});

describe('Delete the new order test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/orders/' + newOrder.id)
      .expect(200, done());
  });
});
