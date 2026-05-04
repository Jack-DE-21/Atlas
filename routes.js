import express from 'express';
import accounts from './controllers/accounts.js';
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import category from './controllers/category.js';
import halloffame from './controllers/halloffame.js';
import stat from './controllers/stats.js';
import about from './controllers/about.js';

const router = express.Router();

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.createView);
router.get('/dashboard', dashboard.createView);
router.post('/dashboard/addcategory', dashboard.addCategory);
router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);
router.get('/about', about.createView);

router.get('/category/:id', category.createView);
router.post("/category/:id/additem", category.addItem);
router.post('/category/:id/updateitem/:itemid', category.updateItem);
router.get('/category/:id/deleteitem/:itemid', category.deleteItem);

router.get('/halloffame', halloffame.createView);
router.get('/stat', stat.createView);

export default router;  