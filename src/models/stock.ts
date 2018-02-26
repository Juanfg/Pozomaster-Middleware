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
    }, {
        classMethods: {
            associate: function (models: any) {
                Stock.belongsTo(models.Ingredients, {
                    foreignKey: 'ingredientId',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    return Stock;
};
