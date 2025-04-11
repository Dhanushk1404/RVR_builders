import { useEffect, useState } from 'react';
import axios from './api/axios';

const Services = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await axios.get('/materials');
        setMaterials(res.data);
      } catch (err) {
        console.error('Error fetching materials:', err);
      }
    };

    fetchMaterials();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Construction Materials</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {materials.map((mat) => (
          <div key={mat._id} className="bg-white rounded shadow p-4">
            <img
              src={`http://localhost:5000${mat.imageUrl}`}
              alt={mat.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{mat.name}</h3>
            <p className="text-gray-700">{mat.description}</p>
            <p className="text-sm text-gray-600">₹ {mat.price} / unit</p>
            <p className="text-sm text-gray-600">Stock: {mat.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
