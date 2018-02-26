import { Request, Response, NextFunction } from 'express';
import { UserInstance } from './../models/user';
import Models from './../models';

class UserCtrl {

    constructor() { }

    public getAll(req: Request, res: Response, next: NextFunction) {
        Models.User
            .findAll()
            .then((result: [UserInstance]) => {
                res.status(200).json({
                    "message": "OK",
                    "data": result
                })
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the users: ${err}` }));
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
                    Models.User
                        .create(req.body)
                        .then((result: UserInstance) => {
                            res.status(201).json({
                                "message": "Created",
                                "data": result
                            })
                        })
                        .catch((err: Error) => res.status(500).json({ "message": `Error trying to create the user: ${err}` }));
                }
            })
            .catch((err: Error) => res.status(500).json({ "message": `Error trying to access the users: ${err}` }));
    }
}

export default new UserCtrl();