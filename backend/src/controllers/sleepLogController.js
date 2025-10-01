const SleepLog = require('../models/sleepLogModel');

exports.addSleepLog = async (req, res) => {
  try {
    const { tanggal, waktuTidur, waktuBangun, kualitasTidur } = req.body;
    const userId = req.user.id;
    const log = await SleepLog.create(userId, tanggal, waktuTidur, waktuBangun, kualitasTidur);
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add sleep log' });
  }
};

exports.getSleepLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const logs = await SleepLog.getByUser(userId);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sleep logs' });
  }
};