const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making OrderItem Schema
const OrderItemSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number, required: true },
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('OrderItem', OrderItemSchema);
