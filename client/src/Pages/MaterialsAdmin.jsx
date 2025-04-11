import { useState, useEffect } from 'react';
import axios from '../api/axios';

const MaterialsAdmin = () => {
  const [materials, setMaterials] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [image, setImage] = useState(null);

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
    await axios.post('/materials', form);
    fetchMaterials();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/materials/${id}`);
    fetchMaterials();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Add Material</h2>
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow-md flex flex-col gap-4 max-w-md"
      >
        <input
          className="border p-2 rounded"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Price"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Unit (e.g., per ton)"
          onChange={(e) => setUnit(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Material
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">All Materials</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {materials.map((mat) => (
          <div key={mat._id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`http://localhost:5000${mat.imageUrl}`}
              alt={mat.name}
              className="w-full h-40 object-cover rounded"
            />
            <p className="mt-2 font-semibold">{mat.imageUrl}</p>
            <p className="mt-2 font-semibold">{mat.name}</p>
            <p className="text-gray-700">₹{mat.price} / {mat.unit}</p>
            <button
              onClick={() => handleDelete(mat._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MaterialsAdmin;
