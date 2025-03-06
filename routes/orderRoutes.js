const express = require('express');
const { createOrder, getUserOrders, bestSellingProducts } = require('../controllers/orderControllers');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/createOrder', authMiddleware, createOrder);

router.get('/getUserOrdersmonthly', authMiddleware, getUserOrders);

router.get('/bestSellingProducts', authMiddleware, bestSellingProducts);


module.exports = router;

