import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { FaBoxOpen, FaTrash, FaEdit } from 'react-icons/fa';

const MaterialsAdmin = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState(null);
  const [editingMaterialId, setEditingMaterialId] = useState(null);

  const fetchMaterials = async () => {
    const res = await axios.get('/materials');
    setMaterials(res.data);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('unit', unit);
    form.append('image', image);
    form.append('description', description);
    await axios.post('/materials', form);
    fetchMaterials();
    resetForm();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/materials/${id}`);
    fetchMaterials();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('unit', unit);
    form.append('description', description);
    if (image) {
      form.append('image', image);
    }
    await axios.put(`/materials/${editingMaterialId}`, form);
    fetchMaterials();
    resetForm();
    setEditingMaterialId(null);
  };

  const handleEdit = (material) => {
    setEditingMaterialId(material._id);
    setName(material.name);
    setPrice(material.price);
    setDescription(material.description);
    setUnit(material.unit);
    setImage(null);
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setUnit('');
    setDescription('');
    setImage(null);
  };

  return (
    <div>
      {/* Add or Update Material Form */}
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700 flex items-center justify-center gap-2">
          <FaBoxOpen className="text-blue-500" /> {editingMaterialId ? 'Update' : 'Add'} Material
        </h2>
        <form onSubmit={editingMaterialId ? handleUpdate : handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material Name</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., Cement"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              placeholder="give description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              type="number"
              placeholder="e.g., 450"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-400"
              placeholder="e.g., per ton"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material Image</label>
            <input
              className="border border-gray-300 p-3 rounded-lg w-full file:mr-3 file:py-2 file:px-4 file:border file:rounded-full file:bg-blue-100 file:text-blue-700"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingMaterialId ? 'Update' : 'Add'} Material
          </button>
        </form>
      </div>

      {/* Material Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Materials</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {materials.map((mat) => (
            <div
              key={mat._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center ring-1 ring-blue-100 hover:ring-blue-300"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={`http://localhost:5000${mat.imageUrl}`}
                  alt={mat.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-1 text-center">{mat.name}</h3>
              <p className="font-semibold text-gray-800 mb-1 text-center">{mat.description}</p>
              <p className="text-gray-700 font-semibold mb-3 text-center">
                ₹{mat.price} <span className="font-medium text-sm text-gray-500">/ {mat.unit}</span>
              </p>

              <div className="flex justify-center w-full">
                <button
                  onClick={() => handleEdit(mat)}
                  className="text-sm px-4 py-2 rounded-md bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition flex items-center gap-2"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(mat._id)}
                  className="text-sm px-4 py-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 transition flex items-center gap-2 ml-2"
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

export default MaterialsAdmin;
