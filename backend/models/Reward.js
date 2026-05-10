const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  pointsCost: { type: Number, required: true },
  category: { type: String, enum: ['discount', 'impact', 'pickup'], required: true },
  value: { type: String }, // e.g. "₹10 off", "1 Tree Planted"
  totalStock: { type: Number, default: null }, // null = unlimited
  redeemedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Reward', rewardSchema);
