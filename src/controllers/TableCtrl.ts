import { Request, Response, NextFunction } from 'express';
import { TableInstance } from './../models/table';
import Models from './../models';

class TableCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .findAll({ include: [{ all: true }],
                order: [
                    [ 'id' ],
                    [ {model: Models.Order, as: 'orders'}, 'id', 'DESC' ]
                ]
            })
            .then((result: [TableInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the tables: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .findById(req.params.tableId, { include: [{ all: true }] })
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Table not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the table: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .create(req.body)
            .then((result: TableInstance) => {
                res.status(201).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the table: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .findById(req.params.tableId, { include: [{ all: true }] })
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Table not found" });
                }
                result.update({
                    description: req.body.description || result.description,
                    seats: req.body.seats || result.seats
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the table ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the table: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Table
            .findById(req.params.tableId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Table not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the table ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the table: ${err}` }));
    }
}

export default new TableCtrl();