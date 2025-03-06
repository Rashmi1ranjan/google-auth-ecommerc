//require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
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
// app.get('/api/auth/google/callback', 
//     passport.authenticate('google', {
//         successRedirect: '/dashboard', // Redirect on success
//         failureRedirect: '/login'     // Redirect on failure
//     })
// );

// Middleware
app.use(express.json());
app.use(cors());


// Session (Required for Passport)
app.use(session({
    secret: process.env.JWT_SECRET || 'default_secret',  // Prevents errors if .env is missing
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/v1/user', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/orders', ordersRoutes);

connectDb();  
// Database Connection
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log(' MongoDB Connected '))
.catch(err => {
    console.error(' MongoDB Connection Error:', err);
    process.exit(1); // Exit process on DB connection failure
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));

module.exports = app;


