const express = require('express');
const router = express.Router();
const { getRewards, redeemReward } = require('../controllers/rewardController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getRewards);
router.post('/:id/redeem', protect, redeemReward);

module.exports = router;
