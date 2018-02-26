import { Request, Response, NextFunction } from 'express';
import { UnitInstance } from './../models/unit';
import Models from './../models';

class UnitCtrl {

    constructor() {}

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findAll()
            .then((result: [UnitInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the units: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newUnit: UnitInstance = req.body;
        let unitAlreadyExist: boolean = false;
        Models.Unit
            .findAll()
            .then((result: [UnitInstance]) => {
                result.forEach(category => {
                    if (category.name === newUnit.name) {
                        res.status(422).json({ "message": "That unit already exists" });
                        unitAlreadyExist = true;
                    }
                });

                if (!unitAlreadyExist) {
                    Models.Unit
                        .create(newUnit)
                        .then((result: UnitInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the unit: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the units: ${err}` }));
    }
}

export default new UnitCtrl();