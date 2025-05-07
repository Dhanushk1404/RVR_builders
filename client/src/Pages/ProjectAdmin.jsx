import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [completedOn, setCompletedOn] = useState('');
  const [image, setImage] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null); // New state for editing

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
      resetForm();
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };

  const handleEdit = (project) => {
    setEditingProjectId(project._id);
    setTitle(project.title);
    setDescription(project.description);
    setLocation(project.location);
    setCompletedOn(project.completedOn);
    setImage(null); // Optionally, set the current image if you want to show the existing image
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', title);
      form.append('description', description);
      form.append('location', location);
      form.append('completedOn', completedOn);
      
      // Only append image if it's present (i.e., the user uploaded a new one)
      if (image) {
        form.append('image', image);
      }
  
      console.log(form); // You can check the form data here for debugging
  
      // Send the PUT request to the backend to update the project
      await axios.put(`/projects/${editingProjectId}`, form);
      
      // After updating, refetch the projects
      fetchProjects();
      
      // Reset the form
      resetForm();
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };
  

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setLocation('');
    setCompletedOn('');
    setImage(null);
    setEditingProjectId(null); // Reset editing project
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
    <div>
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-10">Manage Projects</h1>

      {/* Add or Update Project Form */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          {editingProjectId ? 'Update Project' : 'Add New Project'}
        </h2>
        <form onSubmit={editingProjectId ? handleUpdate : handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Completed On</label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              value={completedOn}
              onChange={(e) => setCompletedOn(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
            <input
              type="file"
              className="w-full p-3 border border-gray-300 rounded-lg file:bg-blue-100 file:text-blue-700 file:px-4 file:py-2 file:rounded-full"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {editingProjectId ? 'Update Project' : 'Add Project'}
          </button>
        </form>
      </div>

      {/* Projects Grid */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">All Projects</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4 flex flex-col items-center ring-1 ring-blue-100 hover:ring-blue-300"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={`http://localhost:5000${proj.imageUrl}`}
                  alt={proj.title}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <h3 className="text-lg font-bold text-blue-700 text-center mb-1">📌 {proj.title}</h3>
              <p className="text-gray-700 font-medium text-center mb-1">📝 {proj.description}</p>
              <p className="text-gray-600 text-sm mb-1 text-center">🗺️ {proj.location}</p>
              <p className="text-gray-500 text-sm text-center mb-3">
                📅 {new Date(proj.completedOn).toLocaleDateString()}
              </p>

              <div className="flex justify-center w-full gap-4">
                <button
                  onClick={() => handleEdit(proj)}
                  className="bg-blue-100 text-blue-700 font-medium px-4 py-2 rounded-md hover:bg-blue-200 transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="bg-red-100 text-red-700 font-medium px-4 py-2 rounded-md hover:bg-red-200 transition"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsAdmin;
