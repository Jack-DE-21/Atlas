'use strict';

import logger from '../utils/logger.js';
import { v4 as uuidv4 } from 'uuid';
import techStore from '../models/tech-store.js';
import accounts from './accounts.js';

const dashboard = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();

    res.render('dashboard', {
      title: 'Dashboard',
      app,
      categories,
    });
  },

  createView(request, response) {
    logger.info('Dashboard page loading!');

    const loggedInUser = accounts.getCurrentUser(request);

    if (loggedInUser) {
      const searchTerm = request.query.searchTerm || '';

      const categories = searchTerm
        ? techStore.searchUserCategories(searchTerm, loggedInUser.id)
        : techStore.getUserCategories(loggedInUser.id);

      const sortField = request.query.sort;
      const order = request.query.order === 'desc' ? -1 : 1;

      let sorted = categories;

      if (sortField) {
        sorted = categories.slice().sort((a, b) => {
          if (sortField === 'title') {
            return a.title.localeCompare(b.title) * order;
          }

          if (sortField === 'rating') {
            return ((a.rating || 0) - (b.rating || 0)) * order;
          }

          return 0;
        });
      }

      const viewData = {
        title: 'Dashboard',
        app: techStore.getApp(),
        fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
        categories: sortField ? sorted : categories,
        search: searchTerm,
        titleSelected: request.query.sort === 'title',
        ratingSelected: request.query.sort === 'rating',
        ascSelected: request.query.order === 'asc',
        descSelected: request.query.order === 'desc',
      };

      logger.info(`about to render ${viewData.categories.length} categories`);
      response.render('dashboard', viewData);
    } else {
      response.redirect('/');
    }
  },

  async addCategory(req, res) {
    const loggedInUser = accounts.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect('/');
    }

    logger.debug(loggedInUser.id);
    const timestamp = new Date();

    const newCategory = {
      userid: loggedInUser.id,
      id: uuidv4(),
      title: req.body.title,
      rating: parseInt(req.body.rating) || 3,
      date: timestamp,
      items: [],
    };

    await techStore.addCategory(newCategory);
    res.redirect('/dashboard');
  },

  async deleteCategory(req, res) {
    const loggedInUser = accounts.getCurrentUser(req);

    if (!loggedInUser) {
      return res.redirect('/');
    }

    const categoryId = req.params.id;
    await techStore.removeCategory(categoryId);
    res.redirect('/dashboard');
  },
};

export default dashboard;