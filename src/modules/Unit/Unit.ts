import * as Bluebird from 'bluebird';
import { Request, Response } from 'express';
import { IUnit } from './IUnit';
import { UnitModel } from '../../models/unit';

class Unit implements IUnit {
    readonly id: number;
    name: string;

    constructor() {}

    public getAll() {
        return UnitModel.findAll();
    }

    public create(unit: any) {
        return UnitModel.create(unit);
    }
}

export default new Unit();