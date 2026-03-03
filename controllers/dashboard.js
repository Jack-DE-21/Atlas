'use strict';

import techStore from '../models/tech-store.js';

const dashboard = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();
    res.render('dashboard', { title: 'Dashboard', app, categories });
  },
};

export default dashboard;