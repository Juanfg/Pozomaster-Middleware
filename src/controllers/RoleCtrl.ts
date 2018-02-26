import { Request, Response, NextFunction } from 'express';
import { RoleInstance } from './../models/role';
import Models from './../models';

class RoleCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Role
            .findAll()
            .then((result: [RoleInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the roles: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newRole: RoleInstance = req.body;
        let roleAlreadyExist: boolean = false;
        Models.Role
            .findAll()
            .then((result: [RoleInstance]) => {
                result.forEach(role => {
                    if (role.name === newRole.name) {
                        res.status(422).json({ "message": "That role already exists" });
                        roleAlreadyExist = true;
                    }
                });

                if (!roleAlreadyExist) {
                    Models.Role
                        .create(req.body)
                        .then((result: RoleInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the role: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the roles: ${err}` }));
    }
}

export default new RoleCtrl();