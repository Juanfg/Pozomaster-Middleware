import { QueryInterface, Sequelize } from "sequelize";

'use strict';

module.exports = {
	up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Categories', [{ 
			'name': 'Dish',
			'createdAt': new Date(),
			'updatedAt': new Date()
		}, { 
			'name': 'Drink',
			'createdAt': new Date(),
			'updatedAt': new Date()
		}, {
			'name': 'Beer',
			'createdAt': new Date(),
			'updatedAt': new Date()
		}, {
			'name': 'Dessert',
			'createdAt': new Date(),
			'updatedAt': new Date()
		}], {});
	},

	down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Categories', null, {});
	}
};
