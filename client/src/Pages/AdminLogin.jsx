import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Navbar from './Navbar';

const AdminDashboardPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/admin/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      setIsLoggedIn(true);
      setShowLoginModal(false);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Navbar logout={logout} setShowLoginModal={setShowLoginModal} />

      <div className="pt-40 px-6 flex flex-col items-center text-center">
        {!isLoggedIn ? (
          <>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="Admin Illustration"
              className="w-52 h-52 md:w-72 md:h-72 opacity-90 mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Welcome, Admin!</h2>
            <p className="text-gray-600 max-w-2xl px-4 sm:px-0">
              Please login to access project and material management tools.
            </p>
          </>
        ) : (
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Dashboard</h2>
        )}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 backdrop-blur-sm">
          <form
            onSubmit={login}
            className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-sm mx-4 relative"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Admin Login</h2>

            {error && (
              <p className="text-red-500 text-sm mb-4">{error}</p>
            )}

            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-gray-600 text-xl"
            >
              &times;
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
