import { Sequelize, DataTypes } from 'sequelize';

export interface UnitAttributes {
    name ? : string;
}

export interface UnitInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
}

export default function defineUnit(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Unit = sequelize.define('Unit', {
        name: DataTypes.STRING
    });

    Unit.associate = function(models) {
        Unit.hasMany(models.Ingredient, {
            foreignKey: 'unitId',
            as: 'ingredients'
        });
    }

    return Unit;
};
