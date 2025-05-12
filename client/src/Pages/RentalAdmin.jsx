import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const RentalsPage = () => {
  const [rentals, setRentals] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleName, setSelectedVehicleName] = useState('');
  const [vehicleRentals, setVehicleRentals] = useState([]);

  // Fetch all rentals and vehicles
  useEffect(() => {
    const fetchData = async () => {
      try {
        const rentalsRes = await axios.get('/rentals');
        const vehiclesRes = await axios.get('/vehicles');
        setRentals(rentalsRes.data);
        setVehicles(vehiclesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Delete a rental
  const handleDeleteRental = async (rentalId) => {
    try {
      await axios.delete(`/rentals/${rentalId}`);
      setRentals(rentals.filter(rental => rental._id !== rentalId));
    } catch (error) {
      console.error("Error deleting rental:", error);
    }
  };

  // Update rental status
  const handleStatusChange = async (rentalId, newStatus) => {
    try {
      await axios.put(`/rentals/${rentalId}`, { status: newStatus });
      setRentals(rentals.map(rental =>
        rental._id === rentalId ? { ...rental, status: newStatus } : rental
      ));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Fetch rentals for selected vehicle name
  const fetchHistory = async () => {
    const selectedVehicle = vehicles.find(v => v.name === selectedVehicleName);
    if (!selectedVehicle) return alert('Vehicle not found');
    try {
      const response = await axios.get(`/rentals/vehicle/${selectedVehicle._id}`);
      setVehicleRentals(response.data);
    } catch (error) {
      console.error("Error fetching vehicle rentals:", error);
    }
  };

  return (
    <div className="p-6 space-y-10">
      {/* Rental Management */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Rental Management</h2>
        <table className="w-full table-auto bg-white border shadow rounded-md">
          <thead className="bg-gray-100 text-left text-sm text-gray-700">
            <tr>
              <th className="px-4 py-2">Rental ID</th>
              <th className="px-4 py-2">Vehicle</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map(rental => (
              <tr key={rental._id} className="border-b text-sm">
                <td className="px-4 py-2">{rental._id}</td>
                <td className="px-4 py-2">{rental.vehicle?.name}</td>
                <td className="px-4 py-2">{rental.customer?.name}</td>
                <td className="px-4 py-2">
                  <select
                    value={rental.status}
                    onChange={(e) => handleStatusChange(rental._id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Ongoing">Ongoing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDeleteRental(rental._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rental History by Vehicle */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Rental History by Vehicle</h2>
        <div className="flex gap-3 mb-4">
          <select
            value={selectedVehicleName}
            onChange={(e) => setSelectedVehicleName(e.target.value)}
            className="border px-3 py-2 rounded w-64"
          >
            <option value="">Select Vehicle</option>
            {vehicles.map(vehicle => (
              <option key={vehicle._id} value={vehicle.name}>
                {vehicle.name}
              </option>
            ))}
          </select>
          <button
            onClick={fetchHistory}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Fetch History
          </button>
        </div>
        {vehicleRentals.length > 0 && (
          <table className="w-full table-auto bg-white border shadow rounded-md">
            <thead className="bg-gray-100 text-left text-sm text-gray-700">
              <tr>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Start Date</th>
                <th className="px-4 py-2">End Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {vehicleRentals.map(rental => (
                <tr key={rental._id} className="border-b text-sm">
                  <td className="px-4 py-2">{rental.customer?.name}</td>
                  <td className="px-4 py-2">{new Date(rental.startDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{new Date(rental.endDate).toLocaleDateString()}</td>
                  <td className="px-4 py-2">{rental.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RentalsPage;
