const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making Product Schema
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    orderItems: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
  },
  { timestamps: true }
);

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('Product', productSchema);
