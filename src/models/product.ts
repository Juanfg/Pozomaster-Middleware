import { Sequelize, DataTypes } from 'sequelize';

export interface ProductAttributes {
    name?: string;
    price?: number;
    categoryId?: number;
}

export interface ProductInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    name: string;
    price: number;
    categoryId: number;
}

export default function defineProduct(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        categoryId: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function (models: any) {
                Product.belongsTo(models.Category, {
                    foreignKey: 'categoryId',
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                });
            }
        }
    });

    return Product;
};
