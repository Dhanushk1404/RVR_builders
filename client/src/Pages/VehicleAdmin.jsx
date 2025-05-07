import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaCar, FaTrash, FaEdit } from 'react-icons/fa';

const VehiclesAdmin = () => {
  const [vehicles, setVehicles] = useState([]);
  const [name, setName] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchVehicles = async () => {
    const res = await axios.get('/vehicles');
    setVehicles(res.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('pricePerDay', pricePerDay);
    form.append('image', image);
    form.append('description', description);
    await axios.post('/vehicles', form);
    fetchVehicles();
    resetForm();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/vehicles/${id}`);
    fetchVehicles();
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setName(vehicle.name);
    setDescription(vehicle.description);
    setPricePerDay(vehicle.pricePerDay);
    setImage(null);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('pricePerDay', pricePerDay);
    if (image) form.append('image', image);
    form.append('description', description);

    await axios.put(`/vehicles/${editingId}`, form);
    fetchVehicles();
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPricePerDay('');
    setAvailableStock('');
    setDescription('');
    setImage(null);
    setEditingId(null);
  };

  return (
    <div>
      {/* Add/Edit Vehicle Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
          <FaCar className="text-blue-500" /> {editingId ? 'Update Vehicle' : 'Add New Vehicle'}
        </h2>
        <form onSubmit={editingId ? handleUpdate : handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Name</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Sedan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., 4-door sedan, fuel efficient"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="e.g., 500"
              value={pricePerDay}
              onChange={(e) => setPricePerDay(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Image</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full file:mr-3 file:py-2 file:px-4 file:border file:rounded-full file:bg-blue-100 file:text-blue-700"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              required={!editingId}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Vehicle' : 'Add Vehicle'}
          </button>
        </form>
      </div>

      {/* Vehicle Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Vehicles</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center ring-1 ring-blue-100 hover:ring-blue-300"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={`http://localhost:5000/${vehicle.image}`}
                  alt={vehicle.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{vehicle.name}</h3>
              <p className="font-semibold text-gray-800 mb-1 text-center">{vehicle.description}</p>
              <p className="text-gray-700 font-semibold mb-3 text-center">
                ₹{vehicle.pricePerDay} <span className="font-medium text-sm text-gray-500">/ day</span>
              </p>
              <p className="text-gray-700 font-semibold mb-3 text-center">
                Available Stock: {vehicle.availableStock}
              </p>

              <div className="flex justify-center w-full gap-2">
                <button
                  onClick={() => handleEdit(vehicle)}
                  className="text-sm px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(vehicle._id)}
                  className="text-sm px-4 py-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition flex items-center gap-2"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehiclesAdmin;
