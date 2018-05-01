import {
    Sequelize,
    DataTypes
} from 'sequelize';

export interface OrderAttributes {
    tableId ? : number;
    waiterId ? : number;
    date ? : Date;

}

export interface OrderInstance {
    id: number;
    createdAt: Date;
    updatedAt: Date;

    tableId: number;
    waiterId: number;
    date: Date;

}

export default function defineOrder(sequelize: Sequelize, DataTypes: DataTypes): any {
    var Order = sequelize.define('Order', {
        tableId: DataTypes.INTEGER,
        waiterId: DataTypes.INTEGER,
        date: DataTypes.DATE
    });

    Order.associate = function(models) {
        Order.belongsTo(models.User, {
            foreignKey: 'waiterId',
            as: 'user'
        });

        Order.belongsToMany(models.Product, {
            foreignKey: 'productId',
            through: 'OrderProducts',
            as: 'products'
        });
    };

    return Order;
};
