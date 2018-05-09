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
        Models.OrderProduct
            .find({ where: { $and: { 'productId': req.body.productId, 'orderId': req.params.orderId } } , include: [{ all: true }] })
            .then((orderProduct: any) => {
                if (!orderProduct) {
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
                    return;
                }

                let newQuantity = parseInt(orderProduct.quantity);
                if (req.body.quantity) {
                    newQuantity += parseInt(req.body.quantity);
                }

                orderProduct.update({
                    'orderId': req.body.orderId || orderProduct.orderId,
                    'productId': req.body.productId || orderProduct.productId,
                    'quantity': newQuantity
                })
                .then(() => res.status(200).json(orderProduct))
                .catch((err: Error) => res.status(500).json({ "message": `Error trying to add more quantityt to the orderProduct ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the orderProduct ${err}` }));
    }

    public updateProductInOrder(req: Request, res: Response, next: NextFunction) {
        Models.OrderProduct
            .find({ where: { $and: { 'productId': req.body.productId, 'orderId': req.params.orderId } } , include: [{ all: true }] })
            .then((orderProduct: any) => {
                if (!orderProduct) {
                    return res.status(400).json({ "message": "Didn't find OrderProduct" });
                }

                orderProduct.update({
                    'orderId': req.body.orderId || orderProduct.orderId,
                    'productId': req.body.productId || orderProduct.productId,
                    'quantity': req.body.quantity || orderProduct.quantity
                })
                .then(() => res.status(200).json(orderProduct))
                .catch((err: Error) => res.status(500).json({ "message": `Error trying to update the orderProduct ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the orderProduct ${err}` }));            
    }

    public deleteProductInOrder(req: Request, res: Response, next: NextFunction) {
        Models.OrderProduct
            .find({ where: { $and: { 'productId': req.params.productId, 'orderId': req.params.orderId } } })
            .then((orderProduct: any) => {
                if (!orderProduct) {
                    res.status(400).json({ "message": "OrderProduct didn't found" });
                }
                orderProduct.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(500).json({ "message": `Error trying to delete the orderProduct ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to get the orderProduct ${err}` }));
    }
}

export default new OderProductCtrl();