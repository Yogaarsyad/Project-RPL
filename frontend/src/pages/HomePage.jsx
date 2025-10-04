import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HeroBackground from '../assets/hero-background.jpg'; // Pastikan Anda punya gambar ini

function HomePage() {
  return (
    <div className="relative min-h-screen font-sans">
      <Navbar />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroBackground})` }}
      ></div>
      <div className="absolute inset-0 w-full h-full bg-blue-900 opacity-60"></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
          Capai Gaya Hidup Sehatmu
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8">
          LifeMon membantu Anda memantau nutrisi, olahraga, dan istirahat untuk kualitas hidup yang lebih baik.
        </p>
        <Link to="/register">
          <button className="bg-primary text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-primary-hover transition-colors">
            Mulai Sekarang
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;