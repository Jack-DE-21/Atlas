'use strict';

import logger from '../utils/logger.js';
import accounts from './accounts.js';
import techStore from '../models/tech-store.js';

const about = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('About page loading!');

    if (!loggedInUser) {
      return response.redirect('/');
    }

    const categories = techStore.getUserCategories(loggedInUser.id);
    const totalCategories = categories.length;
    const totalItems = categories.reduce((total, category) => total + category.items.length, 0);

    const viewData = {
      title: 'About',
      fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      totalCategories,
      totalItems,
    };

    response.render('about', viewData);
  },
};

export default about;