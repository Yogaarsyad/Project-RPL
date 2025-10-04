// src/controllers/foodLogController.js
const foodLogModel = require('../models/foodLogModel');

exports.addFoodLog = async (req, res) => {
  const { namaMakanan, kalori } = req.body;
  const userId = req.user.id; // Diambil dari token setelah melewati middleware
  try {
    const newLog = await foodLogModel.createFoodLog(userId, namaMakanan, kalori);
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