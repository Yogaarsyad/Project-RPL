const express = require('express');
const router = express.Router();
const sleepLogController = require('../controllers/sleepLogController');
const { protect } = require('../middleware/authMiddleware');

// Panggil nama fungsi yang BENAR dari controller
router.post('/', protect, sleepLogController.addSleepLog);
router.get('/', protect, sleepLogController.getSleepLogs);

module.exports = router;