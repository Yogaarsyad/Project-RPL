import React, { useState, useEffect } from 'react';
import { getFoodLogs, addFoodLog } from '../services/api';
import { useNavigate } from 'react-router-dom';
import FoodLogForm from '../components/FoodLogForm';

function DashboardPage() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  // Fungsi untuk mengambil data log dari API
  const fetchLogs = async () => {
    try {
      const { data } = await getFoodLogs();
      setLogs(data);
    } catch (error) {
      console.error('Gagal mengambil data log', error);
      // Jika token tidak valid (error 401), paksa logout
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchLogs();
  }, []);

  // Fungsi untuk menangani penambahan log baru
  const handleAddFoodLog = async (logData) => {
    try {
      await addFoodLog(logData);
      // Ambil ulang data log agar daftar langsung diperbarui
      fetchLogs(); 
    } catch (error) {
      console.error('Gagal menambah log makanan', error);
      alert('Gagal menambah log makanan');
    }
  };

  return (
    // Komponen ini sekarang hanya berisi kontennya saja, tanpa layout
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Kolom 1: Form input */}
      <div className="lg:col-span-1 space-y-6">
        <FoodLogForm onAddLog={handleAddFoodLog} />
        {/* Anda bisa menambahkan form lain seperti ExerciseLogForm di sini */}
      </div>

      {/* Kolom 2: Daftar Riwayat Makanan */}
      <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Riwayat Makanan</h3>
        <div className="h-96 overflow-y-auto">
          <ul className="space-y-3">
            {logs.length > 0 ? (
              logs.map(log => (
                <li key={log.id} className="flex justify-between items-center p-3 border-b hover:bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-700">{log.nama_makanan}</p>
                    <p className="text-xs text-gray-500">{new Date(log.tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className="font-semibold text-gray-800">{log.kalori} kkal</span>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">Belum ada data makanan.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;