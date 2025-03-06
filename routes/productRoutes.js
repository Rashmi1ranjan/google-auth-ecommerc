const express = require('express');
const {createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/creatProduct', authMiddleware, createProduct);

router.get('/getProducts', authMiddleware, getProducts);

router.put('/updateProduct/:id', authMiddleware, updateProduct);

router.delete('/deleteProduct/:id', authMiddleware, deleteProduct);


module.exports = router;

