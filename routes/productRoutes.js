const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Create a product
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;