// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { getFoodLogs, addFoodLog } from '../services/api';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [logs, setLogs] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await getFoodLogs();
        setLogs(data);
      } catch (error) {
        console.error('Gagal mengambil data log');
        // Jika token habis, logout
        if(error.response.status === 401) handleLogout();
      }
    };
    fetchLogs();
  }, []);

  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      const { data: newLog } = await addFoodLog({ namaMakanan: foodName, kalori: calories });
      setLogs([newLog, ...logs]); // Tambah log baru ke atas list
      setFoodName('');
      setCalories('');
    } catch (error) {
      alert('Gagal menambah log');
    }
  };


  
  
  const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
  }

  return (
    <div>
      <h1>Selamat Datang, {user?.nama}!</h1>
      <button onClick={handleLogout}>Logout</button>
      
      <hr/>
      
      <h3>Catat Makanan Baru</h3>
      <form onSubmit={handleAddLog}>
        <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Nama Makanan" required />
        <input type="number" value={calories} onChange={(e) => setCalories(e.target.value)} placeholder="Jumlah Kalori" required />
        <button type="submit">Tambah</button>
      </form>

      <hr/>

      <h3>Riwayat Makanan</h3>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            {new Date(log.tanggal).toLocaleDateString()}: {log.nama_makanan} - {log.kalori} kkal
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DashboardPage;