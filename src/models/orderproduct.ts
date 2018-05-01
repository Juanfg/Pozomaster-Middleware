import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface OrderProductAttributes {
    orderId ? : number;
    productId ? : number;
    quantity ? : number;

}

export interface OrderProductInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    orderId: number;
    productId: number;
    quantity: number;

}

export default function defineOrderProduct(sequelize: Sequelize, DataTypes: DataTypes): any {
    var OrderProduct = sequelize.define('OrderProduct', {
        orderId: DataTypes.INTEGER,
        productId: DataTypes.INTEGER,
        quantity: DataTypes.INTEGER
    });

    OrderProduct.associate = function(models) {
        OrderProduct.belongsTo(models.Product, {
            foreignKey: 'productId',
            as: 'product'
        });

        OrderProduct.belongsTo(models.Order, {
            foreignKey: 'orderId',
            as: 'order'
        });
    };

    return OrderProduct;
};
