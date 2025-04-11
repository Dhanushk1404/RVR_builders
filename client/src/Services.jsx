import { useEffect, useState } from 'react';
import axios from './api/axios';
import { useNavigate } from 'react-router-dom';


const Services = () => {
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();


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
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <h2 className="text-4xl font-bold mb-12 text-center text-yellow-500">
        🏗️ Construction Materials
      </h2>
  
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {materials.map((mat) => (
          <div
            key={mat._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-blue-100 transition duration-300 overflow-hidden flex flex-col"
          >
            <div className="h-48 w-full overflow-hidden">
              <img
                src={`http://localhost:5000${mat.imageUrl}`}
                alt={mat.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
  
            <div className="p-5 flex flex-col flex-grow justify-between">
              <h3 className="text-xl font-bold text-black-700 mb-1 ">{mat.name}</h3>
              <p className="text-gray-700 text-sm mb-3 flex-grow">{mat.description}</p>
  
              <div className="mt-2 space-y-1">
                <p className="text-blue-600 font-semibold text-lg">₹ {mat.price} <span className="text-sm font-medium text-gray-600">/ {mat.unit}</span></p>             
              </div>
              <button
  onClick={() => navigate('/contact')}
  className="mt-4 py-2 px-4 rounded-lg bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition w-full"
>
  For Enquiry
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
};

export default Services;
