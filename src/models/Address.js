const mongoose = require('mongoose');
const User = require('./User');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making Address Schema
const addressSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    postalCode: { type: String, required: true, unique: true },
    line1: { type: String, required: true },
    line2: { type: String, required: false },
  },
  { timestamps: true }
);

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('Address', addressSchema);
