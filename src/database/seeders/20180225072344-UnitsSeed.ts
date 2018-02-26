import { QueryInterface, Sequelize } from "sequelize";

'use strict';

module.exports = {
	up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Units', [
			{ 'name': 'Kilograms', 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'name': 'Grams', 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'name': 'Milligrams', 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'name': 'Liters', 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'name': 'Milliliters', 'createdAt': new Date(), 'updatedAt': new Date() }
		], {});
	},

	down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Units', null, {});
	}
};
