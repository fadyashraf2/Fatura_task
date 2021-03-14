const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

router.get('/', productsController.getProductsByCategory)
router.post('/toggleCategory', productsController.toggleCategory)

module.exports = router;
