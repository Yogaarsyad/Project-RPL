import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

function LaporanPage() {
  // const navigate = useNavigate(); // Jika perlu
  // const handleLogout = () => { /* ... logika logout ... */ };

  return (
    <DashboardLayout title="Laporan Kesehatan">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Grafik Kalori Mingguan</h3>
          <p className="text-gray-600">(Konten grafik akan ditampilkan di sini)</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition-shadow hover:shadow-xl">
          <h3 className="text-lg font-semibold mb-4">Ringkasan Olahraga</h3>
          <p className="text-gray-600">(Konten ringkasan akan ditampilkan di sini)</p>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default LaporanPage;