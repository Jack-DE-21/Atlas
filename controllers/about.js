'use strict';

import techStore from '../models/tech-store.js';

const about = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();

    const stats = {
      categoryCount: categories.length,
      itemCount: categories.reduce((sum, c) => sum + (c.items?.length || 0), 0),
    };

    res.render('about', { title: 'About', app, stats });
  },
};

export default about;