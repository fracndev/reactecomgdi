const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true, 
  },
  quantity: { 
    type: Number, 
    required: true, 
    default: 1, 
  },
});

const cartSchema = new mongoose.Schema({
  userId: { 
    type: Number, // Changed back to Number as requested
    required: true 
  },
  items: [cartItemSchema],
});

module.exports = mongoose.model('Cart', cartSchema);