'use strict';

import { v4 as uuidv4 } from 'uuid';
import techStore from '../models/tech-store.js';

const dashboard = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();
    res.render('dashboard', { title: 'Dashboard', app, categories });
  },

  async addCategory(req, res) {
    const timestamp = new Date();

    const newCategory = {
      id: uuidv4(),
      title: req.body.title,
      rating: parseInt(req.body.rating),
      date: timestamp,
      items: [],
    };

    await techStore.addCategory(newCategory);
    res.redirect('/dashboard');
  },

  async deleteCategory(req, res) {
    const categoryId = req.params.id;
    await techStore.removeCategory(categoryId);
    res.redirect('/dashboard');
  },
};

export default dashboard;