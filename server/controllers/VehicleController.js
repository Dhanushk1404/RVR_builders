import Vehicle from '../models/Vehicles.js';

// Get all vehicles
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

// Get a vehicle by ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json(vehicle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

// Add a new vehicle
export const addVehicle = async (req, res) => {
  try {
    const { name, description, pricePerDay, availableStock } = req.body;
    const imagePath = req.file?.path; // Get image path from multer

    if (!imagePath) {
      return res.status(400).json({ error: "Image is required" });
    }

    const newVehicle = new Vehicle({
      name,
      description,
      pricePerDay,
      availableStock,
      image: imagePath
    });
    await newVehicle.save();
    res.status(201).json({ message: 'Vehicle added successfully', vehicle: newVehicle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add vehicle' });
  }
};

// Update a vehicle
export const updateVehicle = async (req, res) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle updated successfully', vehicle: updatedVehicle });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};

// Delete a vehicle
export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};
