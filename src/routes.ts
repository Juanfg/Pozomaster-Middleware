import { Application } from 'express';
import UnitCtrl from './controllers/UnitCtrl';
import CategoryCtrl from './controllers/CategoryCtrl';
import TableCtrl from './controllers/TableCtrl';
import IngredientCtrl from './controllers/IngredientCtrl';
import ProductCtrl from './controllers/ProductCtrl';
import RoleCtrl from './controllers/RoleCtrl';
import StockCtrl from './controllers/StockCtrl';
import UserCtrl from './controllers/UserCtrl';

class Routes {

    constructor(app: Application) {
        this.getRoutes(app);
    }

    private getRoutes(app: Application): void {
        app.route('/api/categories').get(CategoryCtrl.getAll);
        app.route('/api/categories').post(CategoryCtrl.create);
        app.route('/api/ingredients').get(IngredientCtrl.getAll);
        app.route('/api/ingredients').post(IngredientCtrl.create);
        app.route('/api/products').get(ProductCtrl.getAll);
        app.route('/api/products').post(ProductCtrl.create);
        app.route('/api/roles').get(RoleCtrl.getAll);
        app.route('/api/roles').post(RoleCtrl.create);
        app.route('/api/stocks').get(StockCtrl.getAll);
        app.route('/api/stocks').post(StockCtrl.create);
        app.route('/api/tables').get(TableCtrl.getAll);
        app.route('/api/tables').post(TableCtrl.create);
        app.route('/api/units').get(UnitCtrl.getAll);
        app.route('/api/units').post(UnitCtrl.create);
        app.route('/api/users').get(UserCtrl.getAll);
        app.route('/api/users').post(UserCtrl.create);
    }
}

export default Routes;