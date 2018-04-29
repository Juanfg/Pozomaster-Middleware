import { Request, Response, NextFunction } from 'express';
import { RoleInstance } from './../models/role';
import Models from './../models';

class RoleCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.Role
            .findAll()
            .then((result: [RoleInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the roles: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.Role
            .findById(req.params.roleId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Role not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the role: ${err}` }));
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
                        .create(newRole)
                        .then((result: RoleInstance) => {
                            res.status(201).json(result);
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the role: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the roles: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.Role
            .findById(req.params.roleId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Role not found" });
                }
                result.update({
                    name: req.body.name || result.name
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the role ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the role: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.Role
            .findById(req.params.roleId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "Role not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the role ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the role: ${err}` }));
    }
}

export default new RoleCtrl();