"use strict";

import logger from "../utils/logger.js";
import techStore from "../models/tech-store.js";

const stats = {
  createView(request, response) {
    logger.info("Stats page loading!");

    const app = techStore.getApp();
    const categories = techStore.getCategories();

    const numCategories = categories.length;

    const numItems = categories.reduce(
      (total, category) => total + (category.items ? category.items.length : 0),
      0
    );

    const average =
      numCategories > 0 ? (numItems / numCategories).toFixed(2) : "0.00";

    const totalRating = categories.reduce(
      (total, category) => total + (Number(category.rating) || 0),
      0
    );

    const avgRating =
      numCategories > 0 ? (totalRating / numCategories).toFixed(2) : "0.00";

    const ratings = categories.map((category) => Number(category.rating) || 0);
    const maxRating = ratings.length > 0 ? Math.max(...ratings) : 0;

    const maxRated = categories.filter(
      (category) => (Number(category.rating) || 0) === maxRating
    );

    const favTitles = maxRated.map((category) => category.title);

    const itemCounts = categories.map((category) =>
      category.items ? category.items.length : 0
    );
    const mostItems = itemCounts.length > 0 ? Math.max(...itemCounts) : 0;

    const mostItemsCategories = categories.filter(
      (category) => (category.items ? category.items.length : 0) === mostItems
    );

    const mostItemsTitles = mostItemsCategories.map((category) => category.title);

    const statistics = {
      displayNumCategories: numCategories,
      displayNumItems: numItems,
      displayAverage: average,
      displayAvgRating: avgRating,
      highest: maxRating,
      displayFav: favTitles,
      displayMostItems: mostItems,
      displayMostItemsTitles: mostItemsTitles,
    };

    const viewData = {
      title: "Military Technology Atlas Statistics",
      app,
      stats: statistics,
    };

    response.render("stats", viewData);
  },
};

export default stats;