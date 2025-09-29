// src/models/foodLogModel.js
const db = require('../config/db');

const createFoodLog = async (userId, namaMakanan, kalori) => {
  const result = await db.query(
    'INSERT INTO food_logs (user_id, nama_makanan, kalori) VALUES ($1, $2, $3) RETURNING *',
    [userId, namaMakanan, kalori]
  );
  return result.rows[0];
};

const getFoodLogsByUserId = async (userId) => {
  const result = await db.query('SELECT * FROM food_logs WHERE user_id = $1 ORDER BY tanggal DESC', [userId]);
  return result.rows;
};

module.exports = { createFoodLog, getFoodLogsByUserId };