import { Sequelize, DataTypes } from 'sequelize';

export interface IngredientAttributes {
    name ? : string;
    unit_id: number;
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
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models: any) {
                Ingredient.belongsTo(models.Unit, {
                    foreignKey: 'unitId',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                });

                Ingredient.hasMany(models.Stock, {
                    foreignKey: 'ingredientId',
                    as: 'stocks'
                });
            }
        }
    });

    return Ingredient;
};
