import * as ORM from 'sequelize';
import { Database } from '../db/db';

const sequelize = Database.PSQL.Instance.sequelize;
export const UnitModel = sequelize.define("unit", {
    name: {
        type: ORM.STRING,
        field: 'name'
    },
    createdAt: {
        type: ORM.DATE,
        field: 'created_at'
    },
    updatedAt: {
        type: ORM.DATE,
        field: 'updated_at',
    }
});