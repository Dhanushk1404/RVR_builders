import Project from '../models/Project.js';


export const addProject = async (req, res) => {
  try {
    console.log(req.body);
    const { title, description, location, completedOn } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newProject = new Project({
      title,
      description,
      location,
      completedOn,
      imageUrl,
    });

    const saved = await newProject.save();
    res.status(201).json(saved);
    console.log("added");
  } catch (error) {
    res.status(500).json({ error: 'Failed to add project', details: error.message });
  }
};


// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
};

// Delete a project by ID (optional)
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project', details: error.message });
  }
};
