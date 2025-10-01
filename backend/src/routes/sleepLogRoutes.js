const express = require('express');
const router = express.Router();
const sleepLogController = require('../controllers/sleepLogController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, sleepLogController.addSleepLog);
router.get('/', authMiddleware, sleepLogController.getSleepLogs);

module.exports = router;