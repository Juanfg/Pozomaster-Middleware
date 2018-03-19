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
                        .create(newCategory)
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

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Category
            .findById(req.params.categoryId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Category not found" });
                }
                result.update({
                    name: req.body.name || result.name
                })
                .then(() => res.status(200).json({
                    "message": "Updated",
                    "data": result
                }))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the category ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the category: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Category
            .findById(req.params.categoryId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Category not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the category ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the category: ${err}` }));
    }
}

export default new CategoryCtrl();