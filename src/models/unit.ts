import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize';

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
    }, {
        classMethods: {
            associate: function(models: any) {

            }
        }
    });

    return Unit;
};
