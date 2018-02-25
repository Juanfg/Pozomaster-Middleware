import { Application } from 'express';
import UnitCtrl from './controllers/UnitCtrl';
import CategoryCtrl from './controllers/CategoryCtrl';

class Routes {
    
    constructor(app: Application) {
        this.getRoutes(app);
    }

    private getRoutes(app: Application): void {
        app.route('/api/units').get(UnitCtrl.getAll);
        app.route('/api/units').post(UnitCtrl.create);
        app.route('/api/categories').get(CategoryCtrl.getAll);
        app.route('/api/categories').post(CategoryCtrl.create);
    }
}

export default Routes;