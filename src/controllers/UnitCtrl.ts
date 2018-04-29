import { Request, Response, NextFunction } from 'express';
import { UnitInstance } from './../models/unit';
import Models from './../models';

class UnitCtrl {

    constructor() {}

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findAll()
            .then((result: [UnitInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the units: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findById(req.params.unitId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Unit not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the unit: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newUnit: UnitInstance = req.body;
        let unitAlreadyExist: boolean = false;
        Models.Unit
            .findAll()
            .then((result: [UnitInstance]) => {
                result.forEach(unit => {
                    if (unit.name === newUnit.name) {
                        res.status(422).json({ "message": "That unit already exists" });
                        unitAlreadyExist = true;
                    }
                });

                if (!unitAlreadyExist) {
                    Models.Unit
                        .create(newUnit)
                        .then((result: UnitInstance) => {
                            res.status(201).json(result);
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the unit: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the units: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findById(req.params.unitId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Unit not found" });
                }
                result.update({
                    name: req.body.name || result.name
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the unit ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the unit: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findById(req.params.unitId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Unit not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the unit ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the unit: ${err}` }));
    }
}

export default new UnitCtrl();