import React from 'react';

const MaterialCard = ({ material, onOrder }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 w-full max-w-sm mx-auto">
    <img
      src={`http://localhost:5000${material.imageUrl}`}
      alt={material.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{material.name}</h3>
      <p className="text-sm text-gray-600 mb-3 line-clamp-3">{material.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-700">
          ₹{material.price}/{material.unit}
        </span>
        <button
          onClick={() => onOrder(material, 'material')}
          className="bg-yellow-400 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 text-white text-sm font-semibold px-4 py-2 rounded-md transition duration-300 shadow"
        >
          Order
        </button>
      </div>
    </div>
  </div>
);

export default MaterialCard;
