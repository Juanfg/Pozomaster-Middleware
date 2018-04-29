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

        // Categories routes
        app.route('/api/categories').get(CategoryCtrl.getAll);
        app.route('/api/categories/:categoryId').get(CategoryCtrl.view);
        app.route('/api/categories').post(CategoryCtrl.create);
        app.route('/api/categories/:categoryId').put(CategoryCtrl.update);
        app.route('/api/categories/:categoryId').delete(CategoryCtrl.delete);

        // Ingredients routes
        app.route('/api/ingredients').get(IngredientCtrl.getAll);
        app.route('/api/ingredients/:ingredientId').get(IngredientCtrl.view);
        app.route('/api/ingredients').post(IngredientCtrl.create);
        app.route('/api/ingredients/:ingredientId').put(IngredientCtrl.update);
        app.route('/api/ingredients/:ingredientId').delete(IngredientCtrl.delete);

        // Products routes
        app.route('/api/products').get(ProductCtrl.getAll);
        app.route('/api/products/:productId').get(ProductCtrl.view);        
        app.route('/api/products').post(ProductCtrl.create);
        app.route('/api/products/:productId').put(ProductCtrl.update);
        app.route('/api/products/:productId').delete(ProductCtrl.delete);

        // Roles routes
        app.route('/api/roles').get(RoleCtrl.getAll);
        app.route('/api/roles/:roleId').get(RoleCtrl.view);
        app.route('/api/roles').post(RoleCtrl.create);
        app.route('/api/roles/:roleId').put(RoleCtrl.update);
        app.route('/api/roles/:roleId').delete(RoleCtrl.delete);

        // Stocks routes
        app.route('/api/stocks').get(StockCtrl.getAll);
        app.route('/api/stocks/:stockId').get(StockCtrl.view);
        app.route('/api/stocks').post(StockCtrl.create);
        app.route('/api/stocks/:stockId').put(StockCtrl.update);
        app.route('/api/stocks/:stockId').delete(StockCtrl.delete);

        // Tables routes
        app.route('/api/tables').get(TableCtrl.getAll);
        app.route('/api/tables/:tableId').get(TableCtrl.view);
        app.route('/api/tables').post(TableCtrl.create);
        app.route('/api/tables/:tableId').put(TableCtrl.update);
        app.route('/api/tables/:tableId').delete(TableCtrl.delete);

        // Units routes
        app.route('/api/units').get(UnitCtrl.getAll);
        app.route('/api/units/:unitId').get(UnitCtrl.view);
        app.route('/api/units').post(UnitCtrl.create);
        app.route('/api/units/:unitId').put(UnitCtrl.update);
        app.route('/api/units/:unitId').delete(UnitCtrl.delete);

        // Users routes
        app.route('/api/users').get(UserCtrl.getAll);
        app.route('/api/users/:userId').get(UserCtrl.view);
        app.route('/api/users').post(UserCtrl.create);
        app.route('/api/users/:userId').put(UserCtrl.update);
        app.route('/api/users/:userId').delete(UserCtrl.delete);
    }
}

export default Routes;