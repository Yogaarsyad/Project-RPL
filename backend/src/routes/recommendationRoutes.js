const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const { protect } = require('../middleware/authMiddleware');

// Endpoint ini dilindungi, hanya user yang sudah login yang bisa mendapat rekomendasi
router.get('/', protect, recommendationController.getRecommendations);

module.exports = router;