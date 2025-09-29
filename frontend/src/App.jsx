// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Perbarui bagian ini
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

// Anda bisa menambahkan import untuk file CSS utama di sini jika ada
// import './App.css'; 

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={token ? <DashboardPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={token ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;