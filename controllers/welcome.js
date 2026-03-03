'use strict';

import techStore from '../models/tech-store.js';

const welcome = {
  index(req, res) {
    const app = techStore.getApp();
    res.render('welcome', { title: app.title, app, active: 'welcome' });
  },
};

export default welcome;