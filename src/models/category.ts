import { Sequelize, DataTypes } from 'sequelize';

export interface CategoryAttributes {
    name ? : string;
}

export interface CategoryInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
}

export default function defineCategory(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Category = sequelize.define('Category', {
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models: any) {

            }
        }
    });

    return Category;
};
