import { useEffect, useState } from 'react';
import axios from './api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/projects');
        setProjects(res.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Completed Projects</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white rounded shadow p-4">
            <img
              src={`http://localhost:5000${proj.imageUrl}`}
              alt={proj.title}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{proj.title}</h3>
            <p className="text-gray-700">{proj.description}</p>
            <p className="text-sm text-gray-500">📍 {proj.location}</p>
            <p className="text-sm text-gray-500">
              🗓 {new Date(proj.completedOn).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
