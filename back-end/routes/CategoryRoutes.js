const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController')

router.post('/categories', CategoryController.createCategory);

router.get('/categories', CategoryController.getCategories)

module.exports = router;