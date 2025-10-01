const db = require('../config/db');

const SleepLog = {
  create: async (userId, tanggal, waktuTidur, waktuBangun, kualitasTidur) => {
    const result = await db.query(
      `INSERT INTO sleep_logs 
        (user_id, tanggal, waktu_tidur, waktu_bangun, kualitas_tidur) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, tanggal, waktuTidur, waktuBangun, kualitasTidur]
    );
    return result.rows[0];
  },

  getByUser: async (userId) => {
    const result = await db.query(
      'SELECT * FROM sleep_logs WHERE user_id = $1 ORDER BY tanggal DESC',
      [userId]
    );
    return result.rows;
  }
};

module.exports = SleepLog;