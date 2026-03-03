'use strict';

import JsonStore from './json-store.js';

const techStore = {
  store: new JsonStore('./models/tech-store.json', { app: {}, categories: [] }),

  getApp() {
    return this.store.findAll('app');
  },

  getCategories() {
    return this.store.findAll('categories');
  },

  getCategoryById(id) {
    const categories = this.getCategories();
    return categories.find((c) => c.id === id);
  },
};

export default techStore;