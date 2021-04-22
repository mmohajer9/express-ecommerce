const mongoose = require('mongoose');

// Schema Creator Class
const Schema = mongoose.Schema;

// Making User Schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: { type: String, required: false },
  isAdmin: { type: Boolean, default: false },
  // similar to foreign keys -> ref : model_name
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  addresses: [{ type: Schema.Types.ObjectId, ref: 'Address' }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Creating The Model and Collection -> Also Export
// By default , collection name is the name of the model + 's' -> users in here
module.exports = mongoose.model('User', userSchema);
