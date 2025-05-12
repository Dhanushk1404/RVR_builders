import React from 'react';

const VehicleCard = ({ vehicle, onOrder }) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 w-full max-w-sm mx-auto">
    <img
      src={`https://rvr-builders.onrender.com/${vehicle.image}`}
      alt={vehicle.name}
      className="w-full h-40 object-cover" // Reduced image height
    />
    <div className="p-3"> {/* Reduced padding */}
      <h3 className="text-lg font-semibold text-gray-800 mb-1">{vehicle.name}</h3> {/* Reduced font size and margin */}
      <p className="text-sm text-gray-600 mb-2 line-clamp-3">{vehicle.description}</p> {/* Reduced margin */}
      <div className="flex items-center justify-between">
        <span className="text-base font-medium text-gray-700">
          Rent: ₹{vehicle.pricePerDay} per day
        </span>
        <button
          onClick={() => onOrder(vehicle, 'vehicle')}
          className="bg-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-yellow-700 text-white text-sm font-semibold px-4 py-2 rounded-md transition duration-300 shadow"
        >
          Rent Now
        </button>
      </div>
    </div>
  </div>
);

export default VehicleCard;
