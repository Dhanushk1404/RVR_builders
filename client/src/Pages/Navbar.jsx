import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ logout, setShowLoginModal }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setIsLoggedIn(!!token);
  }, [location.pathname]);
  []
  async function logout(){
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/admin');
  }
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <h1 className="text-xl font-bold">Admin Panel</h1>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <>
            <button onClick={() => navigate('/admin/dashboard')}>Home</button>
            <button onClick={() => navigate('/admin/projects')}>Projects</button>
            <button onClick={() => navigate('/admin/vehicles')}>Vehicles</button>
            <button onClick={() => navigate('/admin/materials')}>Materials</button>
            <button onClick={() => navigate('/admin/orders')}>Orders</button>
            <button onClick={() => navigate('/admin/rents')}>Rents</button>
            <button onClick={() => navigate('/admin/generate')}>Generate</button>
            <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <button onClick={() => setShowLoginModal(true)} className="text-blue-600 font-medium">Login</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;