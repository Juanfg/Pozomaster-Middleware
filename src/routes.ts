import { Application } from 'express';
import UnitCtrl from './controllers/UnitCtrl';
import CategoryCtrl from './controllers/CategoryCtrl';
import TableCtrl from './controllers/TableCtrl';

class Routes {
    
    constructor(app: Application) {
        this.getRoutes(app);
    }

    private getRoutes(app: Application): void {
        app.route('/api/units').get(UnitCtrl.getAll);
        app.route('/api/units').post(UnitCtrl.create);
        app.route('/api/categories').get(CategoryCtrl.getAll);
        app.route('/api/categories').post(CategoryCtrl.create);
        app.route('/api/tables').get(TableCtrl.getAll);
        app.route('/api/tables').post(TableCtrl.create);
    }
}

export default Routes;