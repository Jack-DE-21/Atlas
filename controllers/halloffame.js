'use strict';

import techStore from '../models/tech-store.js';

const halloffame = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();
    res.render('halloffame', { title: 'Hall of Fame', app, categories, active: 'halloffame' });
  },
};

export default halloffame;