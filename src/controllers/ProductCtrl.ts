import { Request, Response, NextFunction } from 'express';
import { ProductInstance } from './../models/product';
import Models from './../models';

class ProductCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Product
            .findAll()
            .then((result: [ProductInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the products: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Product
            .findById(req.params.productId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Product not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the product: ${err}` }));
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
                            res.status(201).json(result);
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the product: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the products: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Product
            .findById(req.params.productId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Product not found" });
                }
                result.update({
                    name: req.body.name || result.name,
                    price: req.body.price || result.price,
                    categoryId: req.body.categoryId || result.categoryId
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the product ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the product: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Product
            .findById(req.params.productId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Product not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the product ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the product: ${err}` }));
    }
}

export default new ProductCtrl();