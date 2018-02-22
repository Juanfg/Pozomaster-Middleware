import { Application } from 'express';
import UnitCtrl from './modules/Unit/UnitCtrl';

class Routes {

    private unitCtrl: UnitCtrl;

    constructor(app: Application) {
        this.unitCtrl = new UnitCtrl();
        this.getRoutes(app);
    }

    private getRoutes(app: Application): void {
        app.route('/api/units').get(this.unitCtrl.getAll);
        app.route('/api/units').post(this.unitCtrl.createUnit);
    }
}

export default Routes;