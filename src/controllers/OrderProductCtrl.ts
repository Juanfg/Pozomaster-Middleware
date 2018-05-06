import { Request, Response, NextFunction } from 'express';
import { OrderProductInstance } from './../models/orderproduct';
import Models from './../models';

class OderProductCtrl {

    constructor() {}

    public getProductsFromOrder(req: Request, res: Response, next: NextFunction) {
        Models.OrderProduct
            .findAll({ where: [{ 'orderId': req.params.orderId }], include: [{ all: true }] })
            .then((result: [any]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the orders: ${err}` }));
    }

    public addProductToOrder(req: Request, res: Response, next: NextFunction) {
        let newOrderProduct = {
            'orderId': req.params.orderId,
            'productId': req.body.productId,
            'quantity': req.body.quantity
        };
        Models.OrderProduct
            .create(newOrderProduct)
            .then((orderProduct: any) => {
                orderProduct.product = {};
                Models.Product
                    .findById(orderProduct.productId)
                    .then((product: any) => {
                        orderProduct.dataValues.product = product;
                        res.status(200).json(orderProduct);
                    })
                    .catch((err: Error) => res.status(500).json({ "message": `Error trying get the information of the product ${err}` })); 
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to add a new product to the order ${err}` })); 
    }
}

export default new OderProductCtrl();