const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Add to cart router
router.post('/', async (req, res) => {
  const { userId: userId, productId, quantity } = req.body;

  try {
    // Find cart by numeric userId
    let cart = await Cart.findOne({ userId: userId });

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      // If item exists, update quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // If item doesn't exist, add new item
      cart.items.push({ product: productId, quantity });
    }

    // Save the cart
    await cart.save();

    console.log(cart, 'cart');

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// View cart router
router.get('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);

  console.log('Attempting to fetch cart for userId:', userId);
  console.log('Request params:', req.params);

  try {
    // Log all carts to see what exists
    const allCarts = await Cart.find({});
    console.log('All existing carts:', allCarts.map(cart => ({
      userId: cart.userId,
      itemCount: cart.items.length
    })));

    const cart = await Cart.findOne({ userId: userId }).populate('items.product');
    
    console.log('Found cart:', cart);

    if (!cart) {
      console.log(`No cart found for userId: ${userId}`);
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    res.status(200).json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;