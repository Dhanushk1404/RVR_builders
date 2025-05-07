import React, { useState } from 'react';
import API from '../api/axios.js';
import { useAuth } from '../context/authContext'; // adjust the path if needed


const Login = ({ onClose, toggleModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // context login function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form ={
          email ,
          password
      }
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      login(res.data.user); // ✅ This sets localStorage and updates context
      alert('Login successful');
      onClose(); // close modal after success
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };
  

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        New user?{' '}
        <button onClick={toggleModal} className="text-blue-500">
          Register here
        </button>
      </p>
    </div>
  );
};

export default Login;
