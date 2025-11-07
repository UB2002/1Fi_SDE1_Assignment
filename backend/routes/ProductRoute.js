const express = require('express');
const Product = require('../schema/Product');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Server error fetching products' });
    }
});


router.get('/:slug', async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        console.error('Error fetching product by slug:', err);
        res.status(500).json({ message: 'Server error fetching product' });
    }
});

module.exports = router;
