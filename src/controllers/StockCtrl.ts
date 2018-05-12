import { Request, Response, NextFunction } from 'express';
import { StockInstance } from './../models/stock';
import Models from './../models';

class StockCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Stock
            .findAll({ include: [{ all: true }] })
            .then((result: [StockInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the stocks: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Stock
            .findById(req.params.stockId, { include: [{ all: true }] })
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Stock not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the stock: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newStock: StockInstance = req.body;
        let stockAlreadyExist: boolean = false;
        Models.Stock
            .create(newStock)
            .then((result: any) => {
                Models.Ingredient
                    .findById(result.ingredientId)
                    .then((ingredient: any) => {
                        if (!ingredient) {
                            res.status(400).json({ "message": "Ingredient not found" });
                        }

                        ingredient.update({
                            quantity: ingredient.quantity + result.quantity
                        })
                        .then(() => {
                            result.ingredient = ingredient;
                            res.status(200).json(result);
                        })
                        .catch((err: Error) => {
                            res.status(500).json({ "message": `Error trying to update the ingredient in the stock ${err}` });
                        })
                    })
                    .catch((err: Error) => {
                        res.status(500).json({ "message": `Error trying to find the ingredient ${err}` });
                    })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the stock: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Stock
            .findById(req.params.stockId, { include: [{ all: true }] })
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Stock not found" });
                }

                let quantityToAdd = 0;
                if (req.body.quantity) {
                    quantityToAdd = req.body.quantity - result.quantity;
                }
                result.update({
                    quantity: req.body.quantity || result.quantity,
                    ingredientId: req.body.ingredientId || result.ingredientId
                })
                .then(() => {
                    Models.Ingredient
                        .findById(result.ingredientId)
                        .then((ingredient: any) => {
                            if (!ingredient) {
                                res.status(400).json({ "message": "Ingredient not found" });
                            }

                            ingredient.update({
                                quantity: ingredient.quantity + quantityToAdd
                            })
                            .then(() => {
                                result.ingredient = ingredient;
                                res.status(200).json(result);
                            })
                            .catch((err: Error) => {
                                res.status(500).json({ "message": `Error trying to update the ingredient in the stock ${err}` });
                            })
                        })
                        .catch((err: Error) => {
                            res.status(500).json({ "message": `Error trying to find the ingredient ${err}` });
                        })
                })
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the stock ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the stock: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Stock
            .findById(req.params.stockId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Stock not found" });
                }

                Models.Ingredient
                    .findById(result.ingredientId)
                    .then((ingredient: any) => {
                        if (!ingredient) {
                            res.status(400).json({ "message": "Ingredient not found" });
                        }

                        ingredient.update({
                            quantity: ingredient.quantity - result.quantity
                        })
                        .then(() => {
                            result.ingredient = ingredient;
                            result.destroy()
                                .then((result: any) => {
                                    res.status(200).json({
                                        "message": "Deleted"
                                    })
                                })
                                .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the stock ${err}` }));
                        })
                        .catch((err: Error) => {
                            res.status(500).json({ "message": `Error trying to update the ingredient in the stock ${err}` });
                        })
                    })
                    .catch((err: Error) => {
                        res.status(500).json({ "message": `Error trying to find the ingredient ${err}` });
                    })
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the stock: ${err}` }));
    }
}

export default new StockCtrl();