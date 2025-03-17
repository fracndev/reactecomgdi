const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a product
router.post('/products', async (req, res) => {
  try {
    const { name, amount, image, description } = req.body;
    const product = new Product({ name, amount, image, description });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, amount, image, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      id,
      { name, amount, image, description },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;