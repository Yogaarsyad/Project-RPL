const userModel = require('../models/userModel');
// Anda perlu membuat model-model ini bisa mengambil data berdasarkan rentang tanggal
const foodLogModel = require('../models/foodLogModel'); 
const exerciseLogModel = require('../models/exerciseLogModel');

// Fungsi untuk menghitung Basal Metabolic Rate (BMR) - Kebutuhan kalori dasar
const calculateBMR = (user) => {
    if (!user.tinggi_cm || !user.berat_kg || !user.usia || !user.jenis_kelamin) {
        return 2000; // Return nilai default jika profil tidak lengkap
    }
    // Rumus Harris-Benedict
    if (user.jenis_kelamin.toLowerCase() === 'pria') {
        return 88.362 + (13.397 * user.berat_kg) + (4.799 * user.tinggi_cm) - (5.677 * user.usia);
    } else { // 'wanita'
        return 447.593 + (9.247 * user.berat_kg) + (3.098 * user.tinggi_cm) - (4.330 * user.usia);
    }
};

exports.getRecommendations = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // 1. Ambil semua data yang diperlukan
        const user = await userModel.findUserById(userId); // Perlu fungsi yang mengambil semua data user
        
        // Diasumsikan model-model ini punya fungsi getForTodayByUserId
        const todayFoodLogs = await foodLogModel.getForTodayByUserId(userId); 
        const todayExerciseLogs = await exerciseLogModel.getForTodayByUserId(userId);

        // 2. Lakukan kalkulasi
        const totalKaloriMasuk = todayFoodLogs.reduce((sum, log) => sum + log.kalori, 0);
        const totalKaloriKeluar = todayExerciseLogs.reduce((sum, log) => sum + log.kalori_terbakar, 0);
        const bmr = calculateBMR(user);
        const kaloriBersih = totalKaloriMasuk - totalKaloriKeluar;

        // 3. Terapkan Aturan Logika untuk menghasilkan rekomendasi
        let recommendations = [];

        // Aturan #1: Keseimbangan Kalori
        if (kaloriBersih > bmr + 300) {
            recommendations.push({
                type: 'warning',
                message: `Asupan kalori Anda hari ini (${totalKaloriMasuk} kkal) terlihat lebih tinggi dari kebutuhan dasar Anda. Pertimbangkan aktivitas ringan untuk menyeimbangkannya.`
            });
        } else if (kaloriBersih < bmr - 300) {
            recommendations.push({
                type: 'info',
                message: `Energi Anda penting! Asupan kalori Anda (${totalKaloriMasuk} kkal) lebih rendah dari kebutuhan dasar. Pastikan Anda makan cukup.`
            });
        } else {
            recommendations.push({
                type: 'success',
                message: `Kerja bagus! Keseimbangan kalori Anda hari ini sudah cukup baik.`
            });
        }

        // Aturan #2: Aktivitas Fisik
        if (totalKaloriKeluar === 0) {
            recommendations.push({
                type: 'info',
                message: `Belum ada aktivitas olahraga tercatat. Coba jalan santai 30 menit untuk meningkatkan metabolisme.`
            });
        } else if (totalKaloriKeluar > 500) {
             recommendations.push({
                type: 'success',
                message: `Luar biasa! Anda telah membakar ${totalKaloriKeluar} kkal hari ini. Pastikan untuk beristirahat cukup.`
            });
        }

        res.json({
            summary: {
                kaloriMasuk: totalKaloriMasuk,
                kaloriKeluar: totalKaloriKeluar,
                kebutuhanDasar: Math.round(bmr),
                kaloriBersih: Math.round(kaloriBersih),
            },
            recommendations
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error saat membuat rekomendasi.', error: error.message });
    }
};