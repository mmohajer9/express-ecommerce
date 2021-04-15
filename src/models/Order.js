const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making Order Schema
const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  address: { type: Schema.Types.ObjectId, ref: 'Address' },
  // discount: { type: Schema.Types.ObjectId, ref: 'Discount' },
  status: { type: String, required: true },
  amount: { type: Number, required: true },

  // similar to foreign keys -> ref : model_name
  orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('Order', OrderSchema);
