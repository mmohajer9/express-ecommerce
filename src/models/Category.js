const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making Category Schema
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { timestamps: true }
);

// Creating The Model and Collection -> Also Export
module.exports = mongoose.model('Category', categorySchema);
