import { Sequelize, DataTypes } from 'sequelize';

export interface IngredientAttributes {
    name ? : string;
    unitId: number;
}

export interface IngredientInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    unitId: number;
}

export default function defineIngredient(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Ingredient = sequelize.define('Ingredient', {
        name: DataTypes.STRING,
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
