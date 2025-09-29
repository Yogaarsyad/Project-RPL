// src/routes/foodLogRoutes.js
const express = require('express');
const router = express.Router();
const foodLogController = require('../controllers/foodLogController');
const { protect } = require('../middleware/authMiddleware');

// Semua route di sini dilindungi, harus login dulu
router.post('/', protect, foodLogController.addFoodLog);
router.get('/', protect, foodLogController.getFoodLogs);

module.exports = router;