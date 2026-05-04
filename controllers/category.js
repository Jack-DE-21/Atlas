'use strict';

import logger from '../utils/logger.js';
import techStore from '../models/tech-store.js';
import accounts from './accounts.js';

const category = {
  createView(request, response) {
    const categoryId = request.params.id;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(`Category id = ${categoryId}`);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const viewData = {
      title: 'Category',
      singleCategory: techStore.getCategoryById(categoryId),
      fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
    };

    response.render('category', viewData);
  },

  addItem(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const categoryId = request.params.id;

    const newItem = {
      name: request.body.name,
      role: request.body.role,
    };

    techStore.addItemToCategory(categoryId, newItem);
    response.redirect(`/category/${categoryId}`);
  },

  updateItem(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const categoryId = request.params.id;
    const itemIndex = Number(request.params.itemid);

    const updatedItem = {
      name: request.body.name,
      role: request.body.role,
    };

    techStore.editItemByIndex(categoryId, itemIndex, updatedItem);
    response.redirect(`/category/${categoryId}`);
  },

  deleteItem(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const categoryId = request.params.id;
    const itemIndex = Number(request.params.itemid);

    techStore.removeItemByIndex(categoryId, itemIndex);
    response.redirect(`/category/${categoryId}`);
  },
};

export default category;