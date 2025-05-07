import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      alert('Login successful!');
      window.location.href = '/services'; // or any protected route
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        {['email', 'password'].map(field => (
          <input
            key={field}
            name={field}
            type={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="block w-full border p-2 mb-2"
          />
        ))}
        <button type="submit" className="bg-green-600 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
