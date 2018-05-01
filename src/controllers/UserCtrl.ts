import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { UserInstance } from './../models/user';
import Models from './../models';

class UserCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.User
            .findAll({ include: [{ all: true }] })
            .then((result: [UserInstance]) => {
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the users: ${err}` }));
    }

    public view(req: Request, res: Response, next: NextFunction) {
        Models.User
            .findById({ include: [{ all: true }] }, req.params.userId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "User not found" });
                }
                res.status(200).json(result);
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the user: ${err}` }));
    }

    public create(req: Request, res: Response, next: NextFunction) {
        let newUser: UserInstance = req.body;
        let userAlreadyExist: boolean = false;
        Models.User
            .findAll()
            .then((result: [UserInstance]) => {
                result.forEach(user => {
                    if (user.email === newUser.email) {
                        res.status(422).json({ "message": "That email is already taken" });
                        userAlreadyExist = true;
                    }
                });

                if (!userAlreadyExist) {
                    if (newUser.password) {
                        newUser.password = bcrypt.hashSync(newUser.password, 10);
                    }
                    Models.User
                        .create(newUser)
                        .then((result: UserInstance) => {
                            res.status(201).json(result);
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the user: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the users: ${err}` }));
    }

    public update(req: Request, res: Response, next: NextFunction) {
        Models.User
            .findById(req.params.userId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "User not found" });
                }
                let newPassword = 
                result.update({
                    name: req.body.name || result.name,
                    email: req.body.email || result.email,
                    password: req.body.password ? bcrypt.hashSync(req.body.password, 10) : result.password,
                    roleId: req.body.roleId || result.roleId
                })
                .then(() => res.status(200).json(result))
                .catch((err: Error) => res.status(400).json({ "message": `Error trying to update the user ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the user: ${err}` }));
    }

    public delete(req: Request, res: Response, next: NextFunction) {
        Models.User
            .findById(req.params.userId)
            .then((result: any) => {
                if (!result) {
                    return res.status(400).json({ "message": "User not found" });
                }
                result.destroy()
                    .then((result: any) => {
                        res.status(200).json({
                            "message": "Deleted"
                        })
                    })
                    .catch((err: Error) => res.status(400).json({ "message": `Error trying to delete the user ${err}` }));
            })
            .catch((err: Error) => res.status(400).json({ "message": `Error trying to get the user: ${err}` }));
    }
}

export default new UserCtrl();