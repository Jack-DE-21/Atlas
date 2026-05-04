'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';

const accounts = {
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('playlist', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Sign up for the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuidv4();
    userStore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user && user.password === request.body.password) {
      response.cookie('playlist', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/start');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.playlist;
    return userStore.getUserByEmail(userEmail);
  },
};

export default accounts;