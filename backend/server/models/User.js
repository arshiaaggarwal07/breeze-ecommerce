const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 1 },
  size: { type: String },
  image: { type: String }
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [cartItemSchema],
  orderHistory: [{
    orderId: String,
    date: { type: Date, default: Date.now },
    items: [cartItemSchema],
    total: Number,
    status: { type: String, default: 'pending' }
  }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);