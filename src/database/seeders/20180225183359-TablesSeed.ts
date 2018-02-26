import { QueryInterface, Sequelize } from "sequelize";

'use strict';

module.exports = {
	up: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkInsert('Tables', [
			{ 'description': 'Table 1', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 2', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 3', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 4', 'seats': 12, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 5', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 6', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 7', 'seats': 8, 'createdAt': new Date(), 'updatedAt': new Date() },
			{ 'description': 'Table 8', 'seats': 4, 'createdAt': new Date(), 'updatedAt': new Date() }
		], {});
	},

	down: (queryInterface: QueryInterface, Sequelize: Sequelize) => {
		return queryInterface.bulkDelete('Tables', null, {});
	}
};
