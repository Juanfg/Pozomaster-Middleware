import { Sequelize, DataTypes } from 'sequelize';

export interface RoleAttributes {
    name ? : string;
}

export interface RoleInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
}

export default function defineRole(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Role = sequelize.define('Role', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models: any) {
                Role.hasMany(models.User, {
                    foreignKey: 'roleId',
                    as: 'users'
                });
            }
        }
    });

    return Role;
};
