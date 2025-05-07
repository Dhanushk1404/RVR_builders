import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // adjust path
import { FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md fixed w-full top-0 z-50">
      <div className="flex items-center">
        <img src="/logo.png" alt="RVR Builders Logo" className="h-12 mr-3" />
        <h1 className="text-2xl font-bold text-gray-800">RVR BUILDERS</h1>
      </div>

      <ul className="flex space-x-6 text-lg font-medium">
        <li><Link to="/" className="hover:text-yellow-500 transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-yellow-500 transition">About Us</Link></li>
        <li><Link to="/services" className="hover:text-yellow-500 transition">Services</Link></li>
        <li><Link to="/projects" className="hover:text-yellow-500 transition">Projects</Link></li>
        <li><Link to="/contact" className="hover:text-yellow-500 transition">Contact</Link></li>
        {user && (
          <>
            <li><Link to="/history" className="hover:text-yellow-500 transition">View History</Link></li>
            <li
              onClick={handleLogout}
              className="flex items-center gap-2 text-yellow-600 font-semibold cursor-pointer hover:text-yellow-700 transition duration-300 ease-in-out"
            >
                  <FiLogOut className="text-xl" />
               Logout
            </li>
          </>
        ) }
      </ul>

      <Link to="/contact" className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition font-bold">
        Get a Quote
      </Link>
    </nav>
  );
};

export default Navbar;
