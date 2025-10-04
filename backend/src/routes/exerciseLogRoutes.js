// backend/src/routes/exerciseLogRoutes.js

const express = require('express');
const router = express.Router();
const exerciseLogController = require('../controllers/exerciseLogController');
const { protect } = require('../middleware/authMiddleware');

// Endpoint untuk menambah (POST) dan mengambil (GET) data log olahraga
// Keduanya dilindungi, harus login untuk mengakses
router.route('/')
    .post(protect, exerciseLogController.addLog)
    .get(protect, exerciseLogController.getLogs);

module.exports = router;