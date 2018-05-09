import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config({ path: ".env"});
import { Database } from './database/db';
import Routes from './routes'
import * as models  from './models';

class App {
    public app: any;

    constructor() {
        this.app = express();
        this.middleware();
        this.database();
        this.router();
    }

    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(cors());
    }

    private database(): void {
        Database.PSQL.Instance;
    }

    private router(): void {
        new Routes(this.app);
    }
}

export default new App().app;