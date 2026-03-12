'use strict';

import express from 'express';
import routes from "./routes.js";
import logger from "./utils/logger.js";
import { create } from 'express-handlebars';

const app = express();

// FOR RENDER
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const handlebars = create({
  extname: '.hbs',
  helpers: {
    eq(a, b) {
      return a === b;
    },
  },
});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);

app.listen(port, () =>
  logger.info(`Your app is listening on port ${port}`)
);