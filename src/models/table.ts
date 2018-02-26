import { Sequelize, DataTypes } from 'sequelize';

export interface TableAttributes {
    description ? : string;
    seats ? : number;
}

export interface TableInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    description: string;
    seats: number;
}

export default function defineTable(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Table = sequelize.define('Table', {
        description: DataTypes.STRING,
        seats: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models: any) {

            }
        }
    });

    return Table;
};
