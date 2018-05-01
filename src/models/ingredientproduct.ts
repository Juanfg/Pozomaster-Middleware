import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface IngredientProductAttributes {
    ingredientId ? : number;
    productId ? : number;
    quantity ? : number;

}

export interface IngredientProductInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    ingredientId: number;
    productId: number;
    quantity: number;

}

export default function defineIngredientProduct(sequelize: Sequelize, DataTypes: DataTypes): any {
    var IngredientProduct = sequelize.define('IngredientProduct', {
        ingredientId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    });

    IngredientProduct.associate = function(models) {
        IngredientProduct.belongsTo(models.Ingredient, {
            foreignKey: 'ingredientId',
            as: 'ingredient'
        });

        IngredientProduct.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });
    };

    return IngredientProduct;
};
