'use strict';

import logger from '../utils/logger.js';
import techStore from '../models/tech-store.js';
import accounts from './accounts.js';

const start = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const userCategories = techStore.getUserCategories(loggedInUser.id);

    let totalItems = 0;

    for (let category of userCategories) {
      if (category.items) {
        totalItems += category.items.length;
      }
    }

    const totalCategories = userCategories.length;

    let averageItems = 0;

    if (totalCategories > 0) {
      averageItems = totalItems / totalCategories;
    }

    const viewData = {
      title: 'Start',
      fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      totalCategories: totalCategories,
      totalItems: totalItems,
      averageItems: averageItems.toFixed(2),
    };

    logger.info('Start view rendering');
    response.render('start', viewData);
  },
};

export default start;