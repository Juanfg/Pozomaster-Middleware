import { Request, Response, NextFunction } from 'express';
import Unit from './Unit';
export default class UnitCtrl {
    constructor() {

    }

    getAll(req: Request, res: Response, next: NextFunction) {
        Unit.getAll()
            .then((result: any) => res.json(result))
            .catch((err: any) => { console.error('Error getting all units ', err)});
    }

    createUnit(req: Request, res: Response, next: NextFunction) {
        Unit.create(req.body)
            .then((result: any) => res.json(result))
            .catch((err: any) => { console.error('Error adding a new unit ', err)});
    }
}   