import { Request, Response, NextFunction } from 'express';
import { TableInstance } from './../models/table';
import Models from './../models';

class TableCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .findAll()
            .then((result: [TableInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the tables: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .create(req.body)
            .then((result: TableInstance) => {
                res.status(201).json({
                    "message": "Created",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the table: ${err}` }));
    }
}

export default new TableCtrl();