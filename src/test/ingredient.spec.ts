import { expect } from 'chai';
import * as supertest from 'supertest';
import Models from '../models'
import app from '../app';
const server = require('../server');

let newIngredient = {
  id: 0,
  name: "TestIngredient",
  unitId: 0
};

let newUnit = {
  id: 0,
  name: "TestUnitForIngredient"
};

before((done) => {
  Models.Unit
    .create(newUnit)
    .then((result: any) => {
      newUnit.id = result.id;
      newIngredient.unitId = result.id
      done();
    })
    .catch((err: Error) => { throw err; });
})

after(function(done) {  
  Models.Unit
    .destroy({ where: {} })
    .then(() => {
      Models.Ingredient
        .destroy({ where: {} })
          .then(() => {
            done();
          })
          .catch((err: Error) => { throw err; });
    })
    .catch((err: Error) => { throw err; });
});

describe('View all ingredients test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .get('/api/ingredients')
      .expect(200, done());
  });
});

describe('Create a new ingredient test', () => {
  it('should return a 200 and the match the name with the new ingredient', function(done) {
    supertest(server)
      .post('/api/ingredients')
      .send(newIngredient)
      .then((response: any) => {
        expect(response.body.name).equal(newIngredient.name);
        newIngredient.id = response.body.id;
        done();
      });
  });
});

describe('View the new ingredient test', () => {
  it('should return a 200 and match the name with the new ingredient', function(done) {
    supertest(server)
      .get('/api/ingredients/' + newIngredient.id)
      .then((response: any) => {
        expect(response.body.name).equal(newIngredient.name);
        done();
      });
  });
});

describe('Update the new ingredient test', () => {
  it('should return a 200 and match the name with the updated ingredient', function(done) {
    let updatedIngredient = newIngredient;
    updatedIngredient.name = "updatedIngredient";
    supertest(server)
      .put('/api/ingredients/' + newIngredient.id)
      .send(newIngredient)
      .then((response: any) => {
        expect(response.body.name).equal(updatedIngredient.name);
        done();
      });
  });
});

describe('Delete the new ingredient test', () => {
  it('should return a 200', function(done) {
    supertest(server)
      .delete('/api/ingredients/' + newIngredient.id)
      .expect(200, done());
  });
});
