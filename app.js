

require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('./config/passport');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const productsRoutes = require('./routes/productRoutes');
const ordersRoutes = require('./routes/orderRoutes');

const connectDb = require('./config/db');
const app = express();

// Log the MongoDB URI to check if it's correctly loaded
console.log("MongoDB URI from .env:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
    console.error(" MONGODB_URI is not defined in .env file!");
    process.exit(1); // Stop execution if no MongoDB URI is provided
}

// Middleware
app.use(express.json());
app.use(cors());

// Session (Required for Passport)
app.use(session({
    secret: process.env.JWT_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);

// Database Connection
connectDb();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

module.exports = app;
