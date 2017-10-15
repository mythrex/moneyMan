const express = require('express');
const router = express.Router();
const controller = require('../controllers/categories.js');

//for getting a categories
router.get('/u/category',controller.getCategories);

//for creating categories
router.post('/u/category',controller.createCategory);

//for updating Category by id
router.put('/u/category/:id',controller.updateCategory);

//for deleting category
router.delete('/u/category/:id',controller.deleteCategory);

module.exports = router;