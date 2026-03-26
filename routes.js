'use strict';

import express from 'express';
import welcome from './controllers/welcome.js';
import dashboard from './controllers/dashboard.js';
import halloffame from './controllers/halloffame.js';
import about from './controllers/about.js';
import category from './controllers/category.js';

const router = express.Router();

router.get('/', welcome.index);
router.get('/dashboard', dashboard.index);
router.get('/halloffame', halloffame.index);
router.get('/about', about.index);
router.get('/category/:id', category.index);

router.post('/dashboard/addcategory', dashboard.addCategory);
router.post('/category/:id/additem', category.addItem);
router.post('/category/:id/updateitem/:itemid', category.updateItem);
router.get('/category/:id/deleteitem/:itemid', category.deleteItem);

router.get('/dashboard/deletecategory/:id', dashboard.deleteCategory);

export default router;