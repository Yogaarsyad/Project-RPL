// backend/src/controllers/exerciseLogController.js

const exerciseLogModel = require('../models/exerciseLogModel');

// Fungsi untuk menambah log baru
exports.addLog = async (req, res) => {
    try {
        // req.user.id diambil dari token setelah melewati middleware 'protect'
        const newLog = await exerciseLogModel.create(req.user.id, req.body);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ message: 'Gagal menambahkan log olahraga', error: error.message });
    }
};

// Fungsi untuk mengambil semua log milik satu user
exports.getLogs = async (req, res) => {
    try {
        const logs = await exerciseLogModel.getByUserId(req.user.id);
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil log olahraga', error: error.message });
    }
};