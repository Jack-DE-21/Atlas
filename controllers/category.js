'use strict';

import techStore from '../models/tech-store.js';

const category = {
  index(req, res) {
    const app = techStore.getApp();
    const cat = techStore.getCategoryById(req.params.id);

    if (!cat) {
      return res.status(404).render('category', {
        title: 'Not Found',
        app,
        category: { title: 'Category not found', items: [] },
      });
    }

    return res.render('category', {
      title: cat.title,
      app,
      category: cat,
    });
  },
};

export default category;