import Project from '../models/Project.js';


export const addProject = async (req, res) => {
  try {
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


// Example of a backend controller to handle updating a project
export const updateProject = async (req, res) => {
  try {
    console.log(req.body);
    const updatedData = { ...req.body };
    
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`; // Handle new image upload
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true } // Return the updated project after the update
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error('Failed to update project:', error);
    res.status(500).json({ error: 'Failed to update project' });
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
