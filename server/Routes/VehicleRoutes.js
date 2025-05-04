import express from 'express';
import { getAllVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle } from '../controllers/VehicleController.js';
import upload from '../middleware/upload.js';


const router = express.Router();

// Get all vehicles
router.get('/', getAllVehicles);

// Get a single vehicle by ID
router.get('/:id', getVehicleById);

// Add a new vehicle
router.post('/',upload.single('image'), addVehicle);

// Update a vehicle
router.put('/:id',upload.single('image'), updateVehicle);

// Delete a vehicle
router.delete('/:id', deleteVehicle);

export default router;
