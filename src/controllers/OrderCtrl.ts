import { Request, Response, NextFunction } from 'express';
import { OrderInstance } from './../models/order';
import Models from './../models';

class OrderCtrl {

    constructor() {}

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Order
            .findAll({ include: [{ all: true }] })
            .then((result: [OrderInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the orders: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Order
            .findById(req.params.orderId, { include: [{ all: true }] })
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Order not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the order: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newOrder: OrderInstance = req.body;
        Models.Order
            .findAll()
            .then((result: [OrderInstance]) => {
                Models.Order
                    .create(newOrder)
                    .then((result: OrderInstance) => {
                        res.status(201).json(result);
                    })
                    .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the order: ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the orders: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Order
            .findById(req.params.orderId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Order not found" });
                }
                result.update({
                    tableId: req.body.tableId || result.tableId,
                    waiterId: req.body.waiterId || result.waiterId,
                    date: req.body.date || result.date
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the order ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the order: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Order
            .findById(req.params.orderId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Order not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the order ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the order: ${err}` }));
    }
}

export default new OrderCtrl();