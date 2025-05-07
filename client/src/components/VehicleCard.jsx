import React from 'react';

const VehicleCard = ({ vehicle, onOrder }) => (
  <div className="border p-4 rounded shadow-md">
    <img
      src={`http://localhost:5000/${vehicle.image}`}
      alt={vehicle.name}
      className="w-full h-48 object-cover rounded"
    />
    <h3 className="text-xl font-bold">{vehicle.name}</h3>
    <h5 className="text-l font-semibold">{vehicle.description}</h5>
    <p>Rent: ₹{vehicle.pricePerDay} per day</p>
    <button
      onClick={() => onOrder(vehicle, 'vehicle')}
      className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
    >
      Rent Now
    </button>
  </div>
);

export default VehicleCard;
