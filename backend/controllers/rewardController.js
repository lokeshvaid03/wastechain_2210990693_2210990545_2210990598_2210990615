const Reward = require('../models/Reward');
const UserRedemption = require('../models/UserRedemption');
const User = require('../models/User');
const crypto = require('crypto');

// Seed default rewards if none exist
exports.seedRewards = async () => {
  const count = await Reward.countDocuments();
  if (count > 0) return;
  await Reward.insertMany([
    { title: '₹10 Discount Coupon', description: 'Get ₹10 off at partner eco-stores', pointsCost: 100, category: 'discount', value: '₹10 off', totalStock: 500 },
    { title: '₹25 Discount Coupon', description: 'Get ₹25 off at partner eco-stores', pointsCost: 250, category: 'discount', value: '₹25 off', totalStock: 200 },
    { title: 'Plant a Tree', description: 'We plant a tree in your name via our NGO partner', pointsCost: 150, category: 'impact', value: '1 Tree Planted', totalStock: null },
    { title: 'Priority Pickup', description: 'Your next waste submission gets priority pickup', pointsCost: 50, category: 'pickup', value: 'Priority Pickup x1', totalStock: null },
    { title: 'Plant 5 Trees', description: 'We plant 5 trees in your name', pointsCost: 500, category: 'impact', value: '5 Trees Planted', totalStock: null },
  ]);
};

exports.getRewards = async (req, res) => {
  try {
    const rewards = await Reward.find({ isActive: true });
    const myRedemptions = await UserRedemption.find({ user: req.user._id }).populate('reward', 'title');
    res.json({ rewards, myRedemptions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.redeemReward = async (req, res) => {
  try {
    const reward = await Reward.findById(req.params.id);
    if (!reward || !reward.isActive) return res.status(404).json({ message: 'Reward not found' });

    if (reward.totalStock !== null && reward.redeemedCount >= reward.totalStock)
      return res.status(400).json({ message: 'Reward out of stock' });

    const user = await User.findById(req.user._id);
    if (user.points < reward.pointsCost)
      return res.status(400).json({ message: `Not enough points. Need ${reward.pointsCost}, you have ${user.points}` });

    const couponCode = `WC-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

    user.points -= reward.pointsCost;
    await user.save();

    reward.redeemedCount += 1;
    await reward.save();

    const redemption = await UserRedemption.create({
      user: user._id,
      reward: reward._id,
      pointsSpent: reward.pointsCost,
      couponCode,
    });

    res.json({ message: 'Reward redeemed!', couponCode, pointsRemaining: user.points, redemption });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
