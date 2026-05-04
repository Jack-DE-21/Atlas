'use strict';

import JsonStore from './json-store.js';

const techStore = {
  store: new JsonStore('./models/tech-store.json', { app: {}, categories: [] }),
  collection: 'categories',

  getApp() {
    return this.store.findAll('app');
  },

  getCategories() {
    return this.store.findAll(this.collection);
  },

  getAllCategories() {
    return this.store.findAll(this.collection);
  },

  getCategoryById(id) {
    return this.store.findOneBy(this.collection, (c) => c.id === id);
  },

  getUserCategory(id, userid) {
    return this.store.findOneBy(
      this.collection,
      (category) => category.id === id && category.userid === userid
    );
  },

  getUserCategories(userid) {
    return this.store.findBy(this.collection, (category) => category.userid === userid);
  },

  searchCategory(search) {
    return this.getCategories().filter((category) =>
      category.title.toLowerCase().includes(search.toLowerCase())
    );
  },

  searchUserCategories(search, userid) {
    return this.store.findBy(
      this.collection,
      (category) =>
        category.userid === userid &&
        category.title.toLowerCase().includes(search.toLowerCase())
    );
  },

  async addCategory(category) {
    await this.store.addCollection(this.collection, category);
  },

  async addItemToCategory(categoryId, item) {
    await this.store.addItem(this.collection, categoryId, 'items', item);
  },

  async editItem(categoryId, itemId, updatedItem) {
    await this.store.editItem(this.collection, categoryId, itemId, 'items', updatedItem);
  },

  async removeItemFromCategory(categoryId, itemId) {
    await this.store.removeItem(this.collection, categoryId, 'items', itemId);
  },

  async removeCategory(categoryId) {
    const category = this.getCategoryById(categoryId);
    await this.store.removeCollection(this.collection, category);
  },

  editItemByIndex(categoryId, itemIndex, updatedItem) {
    const category = this.getCategoryById(categoryId);

    if (category && category.items && category.items[itemIndex]) {
      category.items[itemIndex] = updatedItem;
      this.store.db.write();
    }
  },

  removeItemByIndex(categoryId, itemIndex) {
    const category = this.getCategoryById(categoryId);

    if (category && category.items && category.items[itemIndex]) {
      category.items.splice(itemIndex, 1);
      this.store.db.write();
    }
  },
};

export default techStore;