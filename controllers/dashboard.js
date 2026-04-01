'use strict';

import { v4 as uuidv4 } from 'uuid';
import techStore from '../models/tech-store.js';

const dashboard = {
  index(req, res) {
    const app = techStore.getApp();
    const categories = techStore.getCategories();
    res.render('dashboard', { title: 'Dashboard', app, categories });
  },

  createView(request, response) {
  const searchTerm = request.query.searchTerm || "";

  const categories = searchTerm
    ? techStore.searchCategory(searchTerm)
    : techStore.getCategories();

  const sortField = request.query.sort;
  const order = request.query.order === "desc" ? -1 : 1;

  let sorted = categories;

  if (sortField) {
    sorted = categories.slice().sort((a, b) => {
      if (sortField === "title") {
        return a.title.localeCompare(b.title) * order;
      }

      if (sortField === "rating") {
        return (a.rating - b.rating) * order;
      }

      return 0;
    });
  }

  const viewData = {
    title: "Dashboard",
    app: techStore.getApp(),
    categories: sortField ? sorted : categories,
    search: searchTerm,
    titleSelected: request.query.sort === "title",
    ratingSelected: request.query.sort === "rating",
    ascSelected: request.query.order === "asc",
    descSelected: request.query.order === "desc",
  };

  response.render("dashboard", viewData);
},

  async addCategory(req, res) {
    const timestamp = new Date();

    const newCategory = {
      id: uuidv4(),
      title: req.body.title,
      rating: parseInt(req.body.rating),
      date: timestamp,
      items: [],
    };

    await techStore.addCategory(newCategory);
    res.redirect('/dashboard');
  },

  async deleteCategory(req, res) {
    const categoryId = req.params.id;
    await techStore.removeCategory(categoryId);
    res.redirect('/dashboard');
  }
};

export default dashboard;