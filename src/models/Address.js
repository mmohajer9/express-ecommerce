const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making Address Schema
const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('Address', addressSchema);
