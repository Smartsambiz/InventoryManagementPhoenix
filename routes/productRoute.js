const express = require('express');
const router1 = express.Router();
const productController = require('../controllers/productController.js');
const uploadProductImage = require('../controllers/uploadProductImage.js');

//bring in middleware
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const upload  = require("../middleware/cloudinary");




// ❗ No authentication here (as requested)
router1.post('/products', upload.single("image"), productController.createProduct);
router1.get('/products', productController.getProducts);
router1.get('/products/:id', productController.getProduct);
router1.put('/products/:id', authorizeRoles("admin", "storekeeper"), productController.updateProduct);
router1.put('/products/:id/image', upload.single("image"), uploadProductImage)
router1.delete('/products/:id', authorizeRoles("admin"), productController.deleteProduct);

module.exports = router1;