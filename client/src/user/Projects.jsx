import { useEffect, useState } from 'react';
import axios from '../api/axios';

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
    <div className="p-6 bg-gradient-to-br from-gray-50 to-yellow-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-10">
        Completed Projects
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <div
            key={proj._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
          >
            <div className="aspect-video overflow-hidden">
              <img
                src={`https://rvr-builders.onrender.com${proj.imageUrl}`}
                alt={proj.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="text-xl font-bold text-yellow-700">{proj.title}</h3>
              <p className="text-gray-700 text-sm">{proj.description}</p>
              <p className="text-gray-600 text-sm">📍 <span className="font-medium">{proj.location}</span></p>
              <p className="text-gray-600 text-sm">🗓 <span className="font-medium">{new Date(proj.completedOn).toLocaleDateString()}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
