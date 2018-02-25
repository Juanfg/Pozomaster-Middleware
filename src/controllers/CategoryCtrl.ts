import { Request, Response, NextFunction } from 'express';
import { CategoryInstance } from './../models/category';
import Models from './../models';

class CategoryCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Category
            .findAll()
            .then((result: [CategoryInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the categories: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newCategory: CategoryInstance = req.body;
        let categoryAlreadyExist: boolean = false;
        Models.Category
            .findAll()
            .then((result: [CategoryInstance]) => {
                result.forEach(category => {
                    if (category.name === newCategory.name) {
                        res.status(422).json({ "message": "That category already exists" });
                        categoryAlreadyExist = true;
                    }
                });

                if (!categoryAlreadyExist) {
                    Models.Category
                        .create(req.body)
                        .then((result: CategoryInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the category: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the categories: ${err}` }));
    }
}

export default new CategoryCtrl();