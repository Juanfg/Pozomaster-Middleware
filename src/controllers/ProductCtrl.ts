import { Request, Response, NextFunction } from 'express';
import { ProductInstance } from './../models/product';
import Models from './../models';

class ProductCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Product
            .findAll()
            .then((result: [ProductInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the products: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newProduct: ProductInstance = req.body;
        let productAlreadyExist: boolean = false;
        Models.Product
            .findAll()
            .then((result: [ProductInstance]) => {
                result.forEach(product => {
                    if (product.name === newProduct.name) {
                        res.status(422).json({ "message": "That product already exists" });
                        productAlreadyExist = true;
                    }
                });

                if (!productAlreadyExist) {
                    Models.Product
                        .create(newProduct)
                        .then((result: ProductInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the product: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the products: ${err}` }));
    }
}

export default new ProductCtrl();