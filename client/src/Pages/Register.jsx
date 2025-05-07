import React, { useState } from 'react';

const Register = () => {
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', address: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) alert('Registered successfully!');
    else alert('Error in registration');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {['name', 'email', 'password', 'phone', 'address'].map(field => (
          <input
            key={field}
            name={field}
            type={field === 'password' ? 'password' : 'text'}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            className="block w-full border p-2 mb-2"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white p-2 w-full">Register</button>
      </form>
    </div>
  );
};

export default Register;
