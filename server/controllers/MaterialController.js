import Material from '../models/Material.js';

// Add a new material
export const addMaterial = async (req, res) => {
  try {
    const { name, description, price, unit,Stock} = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newMaterial = new Material({
      name,
      description,
      price,
      unit,
      Stock,
      imageUrl,
    });

    const saved = await newMaterial.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add material', details: error.message });
  }
};

// Get all materials
export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: -1 });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch materials', details: error.message });
  }
};

// Get one material
export const getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id);
    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get material', details: error.message });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete material', details: error.message });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) {
      updates.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Material.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update material', details: error.message });
  }
};
