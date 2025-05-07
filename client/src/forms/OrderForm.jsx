import React, { useState } from 'react';

const OrderForm = ({ selectedItem, itemType, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ...(itemType === 'vehicle' && { startDate: '', endDate: '' })
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting Order:', { ...formData, selectedItem, itemType });
    // TODO: send this to your backend
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-lg font-semibold mb-4">Place {itemType === 'vehicle' ? 'Rental' : 'Order'}</h2>
        <input name="name" placeholder="Your Name" className="input" onChange={handleChange} required />
        <input name="email" placeholder="Email" className="input" onChange={handleChange} required />
        <input name="phone" placeholder="Phone" className="input" onChange={handleChange} required />
        {itemType === 'vehicle' && (
          <>
            <input type="date" name="startDate" className="input" onChange={handleChange} required />
            <input type="date" name="endDate" className="input" onChange={handleChange} required />
          </>
        )}
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
