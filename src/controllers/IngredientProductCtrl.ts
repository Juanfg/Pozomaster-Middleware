import { Request, Response, NextFunction } from 'express';
import { IngredientProductInstance } from './../models/ingredientproduct';
import Models from './../models';

class IngredientProductCtrl {

    constructor() {}

    public getIngredientsFromProduct(req: Request, res: Response, next: NextFunction) {
        Models.IngredientProduct
            .findAll({ where: [{ 'productId': req.params.productId }], include: [{ all: true }] })
            .then((result: [any]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the ingredients: ${err}` }));
    }

    public addIngredientToProduct(req: Request, res: Response, next: NextFunction) {
        Models.IngredientProduct
            .find({ where: { $and: { 'ingredientId': req.body.ingredientId, 'productId': req.params.productId } } , include: [{ all: true }] })
            .then((ingredientProduct: any) => {
                if (!ingredientProduct) {
                    let newIngredientProduct = {
                        'productId': req.params.productId,
                        'ingredientId': req.body.ingredientId,
                        'quantity': req.body.quantity
                    };
                    Models.IngredientProduct
                        .create(newIngredientProduct)
                        .then((result: any) => {
                            result.ingredient = {};
                            Models.Ingredient
                                .findById(result.ingredientId)
                                .then((ingredient: any) => {
                                    result.dataValues.ingredient = ingredient;
                                    res.status(200).json(result);
                                })
                                .catch((err: Error) => res.status(500).json({ "message": `Error trying get the information of the product ${err}` })); 
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to add a new product to the order ${err}` })); 
                    return;
                }
                else {
                    res.status(400).json({ "message": `That ingredient is already in the product` })
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the ingredientProduct ${err}` }));
    }

    public updateIngredientInProduct(req: Request, res: Response, next: NextFunction) {
        Models.IngredientProduct
            .find({ where: { $and: { 'ingredientId': req.body.ingredientId, 'productId': req.params.productId } } , include: [{ all: true }] })
            .then((ingredientProduct: any) => {
                if (!ingredientProduct) {
                    return res.status(400).json({ "message": "Didn't find IngredientProduct" });
                }

                ingredientProduct.update({
                    'productId': req.params.productId || ingredientProduct.productId,
                    'ingredientId': req.body.ingredientId || ingredientProduct.ingredientId,
                    'quantity': req.body.quantity || ingredientProduct.quantity
                })
                .then(() => res.status(200).json(ingredientProduct))
                .catch((err: Error) => res.status(500).json({ "message": `Error trying to update the ingredientProduct ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the ingredientProduct ${err}` }));            
    }

    public deleteIngredientInProduct(req: Request, res: Response, next: NextFunction) {
        Models.IngredientProduct
            .find({ where: { $and: { 'ingredientId': req.params.ingredientId, 'productId': req.params.productId } } })
            .then((ingredientProduct: any) => {
                if (!ingredientProduct) {
                    res.status(400).json({ "message": "IngredientProduct didn't found" });
                }
                ingredientProduct.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(500).json({ "message": `Error trying to delete the ingredientProduct ${err}` }));
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to get the ingredientProduct ${err}` }));
    }
}

export default new IngredientProductCtrl();