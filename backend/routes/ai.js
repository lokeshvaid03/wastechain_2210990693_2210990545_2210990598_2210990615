const express = require('express');
const router = express.Router();
const { analyzeWasteImage } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/analyze-image', protect, (req, res, next) => {
  upload.single('image')(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, analyzeWasteImage);

module.exports = router;
