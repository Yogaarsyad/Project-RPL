import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Menambahkan token ke header setiap request jika ada
API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

// Fungsi untuk User
export const register = (formData) => API.post('/users/register', formData);
export const login = (formData) => API.post('/users/login', formData);

// ▼▼▼ TAMBAHKAN FUNGSI UNTUK PROFIL DI SINI ▼▼▼
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (profileData) => API.put('/users/profile', profileData);

// Fungsi untuk Food Log
export const addFoodLog = (logData) => API.post('/food-logs', logData);
export const getFoodLogs = () => API.get('/food-logs');