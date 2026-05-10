const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile, changePassword, getLeaderboard, validateRegister, validateLogin } = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.put('/change-password', protect, changePassword);
router.get('/leaderboard', protect, getLeaderboard);

module.exports = router;
