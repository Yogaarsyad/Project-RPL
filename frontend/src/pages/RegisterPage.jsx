// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      alert('Error: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nama" placeholder="Nama" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;