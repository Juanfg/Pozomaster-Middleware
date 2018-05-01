import { Sequelize, DataTypes } from 'sequelize';

export interface StockAttributes {
    quantity ? : number;
    ingredientId ? : number;
}

export interface StockInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    quantity: number;
    ingredientId: number;
}

export default function defineStock(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Stock = sequelize.define('Stock', {
        quantity: DataTypes.INTEGER,
        ingredientId: DataTypes.INTEGER
    });
    
    Stock.associate = function(models) {
        Stock.belongsTo(models.Ingredient, {
            foreignKey: 'ingredientId',
            as: 'ingredient'
        });
    }

    return Stock;
};
