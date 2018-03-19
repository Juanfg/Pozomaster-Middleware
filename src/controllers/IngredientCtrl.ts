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
                        .create(newIngredient)
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

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Ingredient
            .findById(req.params.ingredientId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Ingredient not found" });
                }
                result.update({
                    name: req.body.name || result.name,
                    unitId: req.body.unitId || result.unitId
                })
                .then(() => res.status(200).json({
                    "message": "Updated",
                    "data": result
                }))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the ingredient ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the ingredient: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Ingredient
            .findById(req.params.ingredientId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Ingredient not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the ingredient ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the ingredient: ${err}` }));
    }
}

export default new IngredientCtrl();