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
    });
    
    Product.associate = function(models) {
        Product.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category'
        });

        Product.hasMany(models.OrderProduct, {
            foreignKey: 'productId',
            as: 'orderProducts'
        });

        Product.hasMany(models.IngredientProduct, {
            foreignKey: 'productId',
            as: 'ingredientProducts'
        });
    }

    return Product;
};
