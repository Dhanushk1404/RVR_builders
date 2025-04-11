import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [completedOn, setCompletedOn] = useState('');
  const [image, setImage] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      form.append('location', location);
      form.append('completedOn', completedOn);
      form.append('image', image);
      await axios.post('/projects', form);
      fetchProjects();
      // Clear form after submission
      setTitle('');
      setDescription('');
      setLocation('');
      setCompletedOn('');
      setImage(null);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/projects/${id}`);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Add Project</h2>
      <form
        onSubmit={handleAdd}
        className="bg-white p-4 rounded shadow-md flex flex-col gap-4 max-w-md"
      >
        <input
          className="border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="border p-2 rounded"
          placeholder="Description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="date"
          value={completedOn}
          onChange={(e) => setCompletedOn(e.target.value)}
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
          Add Project
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-10 mb-4">All Projects</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-white p-4 rounded shadow-md">
            <img
              src={`http://localhost:5000${proj.imageUrl}`} // ensure imageUrl starts with `/uploads/...`
              alt={proj.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-lg">{proj.title}</h3>
            <p className="text-gray-700">{proj.description}</p>
            <p className="text-gray-500 text-sm">📍 {proj.location}</p>
            <p className="text-gray-500 text-sm">🗓 Completed on: {new Date(proj.completedOn).toLocaleDateString()}</p>
            <button
              onClick={() => handleDelete(proj._id)}
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

export default ProjectsAdmin;
