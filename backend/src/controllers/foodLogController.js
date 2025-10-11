// src/controllers/foodLogController.js
const foodLogModel = require('../models/foodLogModel');

exports.addFoodLog = async (req, res) => {
  const { nama_makanan, kalori, tanggal } = req.body;
  const userId = req.user.id;
  try {
    const newLog = await foodLogModel.createFoodLog(userId, nama_makanan, kalori, tanggal);
    res.status(201).json(newLog);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getFoodLogs = async (req, res) => {
  const userId = req.user.id;
  try {
    const logs = await foodLogModel.getFoodLogsByUserId(userId);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};