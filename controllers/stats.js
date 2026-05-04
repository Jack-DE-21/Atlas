'use strict';

import logger from '../utils/logger.js';
import techStore from '../models/tech-store.js';
import accounts from './accounts.js';

const stat = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      logger.info('Stats page loading!');

      const categories = techStore.getCategories().filter(
        (category) => category.userid === loggedInUser.id
      );

      const numCategories = categories.length;
      const numItems = categories.reduce((total, category) => total + category.items.length, 0);
      const average = numCategories > 0 ? (numItems / numCategories).toFixed(2) : 0;

      const totalRating = categories.reduce((total, category) => total + parseInt(category.rating), 0);
      const avgRating = numCategories > 0 ? totalRating / numCategories : 0;

      const maxRating = categories.length > 0
        ? Math.max(...categories.map((category) => parseInt(category.rating)))
        : 0;

      const maxRated = categories.filter((category) => parseInt(category.rating) === maxRating);
      const favTitles = maxRated.map((item) => item.title);

      const longestSize = categories.length > 0
        ? Math.max(...categories.map((category) => category.items.length))
        : 0;

      const longestCategories = categories.filter((category) => category.items.length === longestSize);
      const longestCategoryTitles = longestCategories.map((item) => item.title);

      const statistics = {
        displayNumCategories: numCategories,
        displayNumItems: numItems,
        displayAverage: average,
        displayAvgRating: avgRating,
        highest: maxRating,
        displayFav: favTitles,
        longest: longestSize,
        longestTitles: longestCategoryTitles,
      };

      const viewData = {
        title: 'Playlist App Statistics',
        stats: statistics,
        fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      };

      response.render('stats', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default stat;