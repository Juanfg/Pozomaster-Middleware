import { Sequelize, DataTypes } from 'sequelize';

export interface UserAttributes {
    name ? : string;
    email ? : string;
    password ? : string;
    token ? : string;
    roleId ? : number;
}

export interface UserInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    email: string;
    password: string;
    token: string;
    roleId: number;
}

export default function defineUser(sequelize: Sequelize, DataTypes: DataTypes): any {
    var User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        token: DataTypes.STRING,
        roleId: DataTypes.INTEGER
    });
    
    User.associate = function(models) {
        User.belongsTo(models.Role, {
            foreignKey: 'roleId',
            as: 'role'
        });

        User.hasMany(models.Order, {
            foreignKey: 'waiterId',
            as: 'orders'
        });

        User.belongsToMany(models.Table, {
            foreignKey: 'tableId',
            through: 'Orders',
            as: 'tables'
        });
    }

    return User;
};
