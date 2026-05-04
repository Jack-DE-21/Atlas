'use strict';

import logger from '../utils/logger.js';
import accounts from './accounts.js';

const halloffame = {
  createView(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('Hall of Fame page loading!');

    if (loggedInUser) {
      const viewData = {
        title: 'Hall of Fame',
        fullname: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
      };
      response.render('halloffame', viewData);
    } else {
      response.redirect('/');
    }
  },
};

export default halloffame;