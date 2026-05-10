const mongoose = require('mongoose');

const userRedemptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reward: { type: mongoose.Schema.Types.ObjectId, ref: 'Reward', required: true },
  pointsSpent: { type: Number, required: true },
  redeemedAt: { type: Date, default: Date.now },
  couponCode: { type: String },
});

module.exports = mongoose.model('UserRedemption', userRedemptionSchema);
