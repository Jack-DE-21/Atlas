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
    return this.store.findOneBy('categories', (c) => c.id === id);
  },

  async addCategory(category) {
    await this.store.addCollection('categories', category);
  },

  async addItemToCategory(categoryId, item) {
    await this.store.addItem('categories', categoryId, 'items', item);
  },

  async editItem(categoryId, itemId, updatedItem) {
    await this.store.editItem('categories', categoryId, itemId, 'items', updatedItem);
  },

  async removeItemFromCategory(categoryId, itemId) {
    await this.store.removeItem('categories', categoryId, 'items', itemId);
  },

  async removeCategory(categoryId) {
    const category = this.getCategoryById(categoryId);
    await this.store.removeCollection('categories', category);
  },
};

export default techStore;