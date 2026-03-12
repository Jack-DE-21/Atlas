'use strict';

import { v4 as uuidv4 } from 'uuid';
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

  async addItem(req, res) {
    const categoryId = req.params.id;

    const newItem = {
      id: uuidv4(),
      name: req.body.name,
      role: req.body.role,
    };

    await techStore.addItemToCategory(categoryId, newItem);
    res.redirect(`/category/${categoryId}`);
  },

  async deleteItem(req, res) {
    const categoryId = req.params.id;
    const itemId = req.params.itemid;

    await techStore.removeItemFromCategory(categoryId, itemId);
    res.redirect(`/category/${categoryId}`);
  },
};

export default category;