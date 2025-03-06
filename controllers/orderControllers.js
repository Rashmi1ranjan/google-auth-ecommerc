const  Product= require("../models/product");
const  Order = require("../models/order");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');


const createOrder = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        console.log('Product ID:', productId);

        // Validate productId
        // if (!mongoose.Types.ObjectId.isValid(productId)) {
        //     return res.status(400).json({ message: 'Invalid product ID' });
        // }
        


const product = await Product.find({ _id: new ObjectId(productId) });
console.log(product);
        
        if (!product.length || product.stock < quantity) {
            return res.status(400).json({ message: 'Product not available' });
          }
          const totalPrice = product[0].price * quantity;
          console.log(totalPrice);
          const order = new Order({
            user: req.user.id,
            product: productId,
            quantity,
            totalPrice,
            orderDate: new Date(),
          });
        
          await order.save();
          res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



const getUserOrders = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        let query = { user: req.user.id };
        if (startDate && endDate) {
            query.orderDate = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        const orders = await Order.find(query).sort({ orderDate: -1 });
        const totalAmount = orders.reduce((acc, order) => acc + order.totalPrice, 0);
        res.json({
            orders,
            monthlyTotal: totalAmount
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const bestSellingProducts = async (req, res) => {
    try {
        const sevenDaysAgo = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        const orders = await Order.find({ orderDate: { $gte: sevenDaysAgo } })
            .populate('product', 'name stock')
            .sort({ quantity: -1 });
            
        const bestSellingProducts = orders.reduce((acc, order) => {
            if (!acc[order.product._id]) {
                acc[order.product._id] = {
                    product: order.product,
                    quantity: order.quantity
                };
            } else {
                acc[order.product._id].quantity += order.quantity;
            }
            return acc;
        }, {});
        
        const result = Object.values(bestSellingProducts).map(product => ({
            ...product,
            totalRevenue: product.product.price * product.quantity
        }));
        
        res.json(result);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

module.exports = { createOrder, getUserOrders, bestSellingProducts };

