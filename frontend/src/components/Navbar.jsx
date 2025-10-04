import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent text-white p-6 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          LifeMon
        </Link>

        {/* Tombol Login */}
        <Link to="/login">
          <button className="bg-white text-primary font-semibold py-2 px-6 rounded-lg hover:bg-gray-200 transition-colors">
            Login
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;