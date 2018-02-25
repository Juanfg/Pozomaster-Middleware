import { Request, Response, NextFunction } from 'express';
import { UnitInstance } from './../models/unit'
import Models from './../models'

export default class UnitCtrl {

    constructor() {}

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .findAll()
            .then((result: [UnitInstance]) => res.json(result))
            .catch((err: any) => { console.error('Error getting all units ', err)});
    }

    public createUnit(req: Request, res: Response, next: NextFunction) {
        Models.Unit
            .create(req.body)
            .then((result: UnitInstance) => res.json(result))
            .catch((err: any) => { console.error('Error adding a new unit ', err)});
    }
}
