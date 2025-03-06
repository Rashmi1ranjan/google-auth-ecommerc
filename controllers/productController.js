const Product = require("../models/product");

const createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, category } = req.body;
        const product = new Product({ name, description, price, stock, category });
        await product.save();
        res.status(201).json({ message: "Product created successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProducts = async (req, res) => {
    try {
        const { search, sortBy, page = 1, limit = 10 } = req.query;
        const query = search ? { $text: { $search: search } } : {};
        const products = await Product.find(query)
            .sort(sortBy || 'createdAt')
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        await Product.findByIdAndUpdate(req.params.id, { name, description, price, category });
        res.json({ message: "Product updated successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };



