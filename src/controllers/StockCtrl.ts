import { Request, Response, NextFunction } from 'express';
import { StockInstance } from './../models/stock';
import Models from './../models';

class StockCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Stock
            .findAll()
            .then((result: [StockInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the stocks: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newStock: StockInstance = req.body;
        let stockAlreadyExist: boolean = false;
        Models.Stock
            .create(newStock)
            .then((result: StockInstance) => {
                res.status(201).json({
                    "message": "Created",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the stock: ${err}` }));
    }
}

export default new StockCtrl();