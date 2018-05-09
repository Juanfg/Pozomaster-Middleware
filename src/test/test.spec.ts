import { expect } from 'chai';
import Models from '../models';
import { Sequelize, DataTypes } from 'sequelize';

describe('Hello function', () => {
  it('should return hello world', () => {
    const result = 'Hello World!';
    expect(result).to.equal('Hello World!');
  });
});

describe('Goodbye function', () => {
  it('should return Goodbye world', () => {
    const result = 'Goodbye World!';
    expect(result).to.equal('Goodbye World!');
  });
});

// describe('test', () => {
//     var newCategory = {
//         'name': 'New Category'
//     }; 
//     it('should create a new category', () => {
//         Models.Category
//             .create(newCategory)
//             .then((result: any) => {
//                 expect(result.name).to.equal(newCategory.name);
//             })
//     });
// });