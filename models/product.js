const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0 },
    category: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Product",productSchema);
