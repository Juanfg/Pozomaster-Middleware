import { Request, Response, NextFunction } from 'express';
import { IngredientInstance } from './../models/ingredient';
import Models from './../models';

class IngredientCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Ingredient
            .findAll()
            .then((result: [IngredientInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the ingredients: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newIngredient: IngredientInstance = req.body;
        let ingredientAlreadyExist: boolean = false;
        Models.Ingredient
            .findAll()
            .then((result: [IngredientInstance]) => {
                result.forEach(ingredient => {
                    if (ingredient.name === newIngredient.name) {
                        res.status(422).json({ "message": "That ingredient already exists" });
                        ingredientAlreadyExist = true;
                    }
                });

                if (!ingredientAlreadyExist) {
                    Models.Ingredient
                        .create(req.body)
                        .then((result: IngredientInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the ingredient: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the ingredients: ${err}` }));
    }
}

export default new IngredientCtrl();