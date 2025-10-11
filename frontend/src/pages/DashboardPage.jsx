import React, { useState, useEffect } from 'react';
import { getFoodLogs, addFoodLog, getSleepLogs, addSleepLog} from '../services/api';
import { useNavigate } from 'react-router-dom';
import FoodLogForm from '../components/FoodLogForm';
import SleepLogForm from '../components/SleepLogForm';

function DashboardPage() {
  const [logs, setLogs] = useState([]);
  const [sleepLogs, setSleepLogs] = useState([]);
  const navigate = useNavigate();

  const fetchLogs = async () => {
    try {
      const { data } = await getFoodLogs();
      setLogs(data);
    } catch (error) {
      console.error('Gagal mengambil data log', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  // Fetch sleep logs
  const fetchSleepLogs = async () => {
  try {
    const { data } = await getSleepLogs();
    setSleepLogs(data);
  } catch (error) {
    console.error('Gagal mengambil data sleep log', error);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  }
};

  useEffect(() => {
    fetchLogs();
    fetchSleepLogs();
  }, []);

  const handleAddFoodLog = async (logData) => {
    try {
      await addFoodLog(logData);
      fetchLogs();
    } catch (error) {
      console.error('Gagal menambah log makanan', error);
      alert('Gagal menambah log makanan');
    }
  };

  // Add sleep log handler
  const handleAddSleepLog = async (logData) => {
  try {
    await addSleepLog(logData);
    fetchSleepLogs();
  } catch (error) {
    console.error('Gagal menambah sleep log', error);
    alert('Gagal menambah sleep log');
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-300 to-blue-500 py-10 px-2">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom 1: Form input */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-400 p-6">
            <FoodLogForm onAddLog={handleAddFoodLog} />
          </div>
          {/* SleepLogForm added below FoodLogForm */}
          <div className="bg-white rounded-2xl shadow-xl border-t-4 border-blue-400 p-6">
            <SleepLogForm onAddLog={handleAddSleepLog} />
          </div>
        </div>

        {/* Kolom 2: Daftar Riwayat Makanan */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-400">
          <h3 className="text-2xl font-bold mb-6 text-blue-700 text-center drop-shadow">Riwayat Makanan</h3>
          <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            <ul className="space-y-4">
              {logs.length > 0 ? (
                logs.map(log => (
                  <li
                    key={log.id}
                    className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border border-blue-200 shadow hover:scale-[1.02] transition-transform"
                  >
                    <div>
                      <p className="font-semibold text-blue-900">{log.nama_makanan}</p>
                      <p className="text-xs text-blue-600">
                        {new Date(log.tanggal).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className="font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full shadow">
                      {log.kalori} kkal
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-blue-600 text-center mt-4">Belum ada data makanan.</p>
              )}
            </ul>
          </div>
          {/* Sleep logs list */}
          <h3 className="text-2xl font-bold mt-10 mb-6 text-blue-700 text-center drop-shadow">Riwayat Tidur</h3>
          <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
            <ul className="space-y-4">
              {sleepLogs.length > 0 ? (
                sleepLogs.map(log => (
                  <li
                    key={log.id}
                    className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 border border-blue-200 shadow hover:scale-[1.02] transition-transform"
                  >
                    <div>
                      <p className="font-semibold text-blue-900">
                        {log.waktu_tidur && log.waktu_bangun
                          ? `${getSleepDuration(log.waktu_tidur, log.waktu_bangun)} jam tidur`
                          : 'Durasi tidak tersedia'}
                      </p>
                      <p className="text-xs text-blue-600">
                        {/* Use log.tanggal for the date */}
                        {log.tanggal
                          ? new Date(log.tanggal).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Tanggal tidak tersedia'}
                      </p>
                      {log.kualitas_tidur && <p className="text-xs text-blue-500">{log.kualitas_tidur}</p>}
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-blue-600 text-center mt-4">Belum ada data tidur.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to calculate sleep duration in hours
function getSleepDuration(start, end) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate) || isNaN(endDate)) return 'Durasi tidak valid';
  const diffMs = endDate - startDate;
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours.toFixed(2);
}

export default DashboardPage;