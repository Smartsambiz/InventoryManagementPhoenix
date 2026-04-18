const express = require("express");
const route = express.Router();
const productController = require('../controllers/fakeStoreController');

route.get('/getProducts', productController.createProduct);
route.get('/getProduct/:id', productController.getProduct);
route.post('/createProduct', productController.getProducts);

module.exports = route