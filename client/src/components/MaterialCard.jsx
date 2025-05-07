import React from 'react';

const MaterialCard = ({ material, onOrder }) => (
  <div className="border p-4 rounded shadow-md">
    <img
      src={`http://localhost:5000${material.imageUrl}`}
      alt={material.name}
      className="w-full h-48 object-cover rounded"
    />
    <h3 className="text-xl font-bold">{material.name}</h3>
    <h5 className="text-l font-semibold">{material.description}</h5>
    <p>Price: ₹{material.price}/{material.unit}</p>
    <button
      onClick={() => onOrder(material, 'material')}
      className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
    >
      Order Now
    </button>
  </div>
);

export default MaterialCard;
