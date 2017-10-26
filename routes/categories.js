const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.js');
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) { 
      return next();
  }
  res.redirect('/');
}

//for getting a categories
router.get('/u/category',isLoggedIn, controller.getCategories);

//for creating categories
router.post('/u/category',isLoggedIn, controller.createCategory);

//for updating Category by id
router.put('/u/category/:id',isLoggedIn, controller.updateCategory);

//for deleting category
router.delete('/u/category/:id',isLoggedIn, controller.deleteCategory);

module.exports = router;