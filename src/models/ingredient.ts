import { Sequelize, DataTypes } from 'sequelize';

export interface IngredientAttributes {
    name ? : string;
    quantity ? : number;
    unitId: number;
}

export interface IngredientInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    quantity: number;
    unitId: number;
}

export default function defineIngredient(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Ingredient = sequelize.define('Ingredient', {
        name: DataTypes.STRING,
        quantity: DataTypes.DOUBLE,
        unitId: DataTypes.INTEGER
    });
    
    Ingredient.associate = function(models) {
        Ingredient.belongsTo(models.Unit, {
            foreignKey: 'unitId',
            as: 'unit'
        });

        Ingredient.hasMany(models.Stock, {
            foreignKey: 'ingredientId',
            as: 'stocks'
        });

        Ingredient.hasMany(models.IngredientProduct, {
            foreignKey: 'ingredientId',
            as: 'ingredientProducts'
        });
    }
    
    return Ingredient;
};
