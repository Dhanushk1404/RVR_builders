import express from 'express';
import {
  getAllRentals,
  getRentalById,
  addRental,
  updateRental,
  deleteRental,
  getRentalsByVehicleId,
  getRentalsByCustomer
} from '../controllers/RentController.js';

const router = express.Router();

router.get('/', getAllRentals);
router.get('/history', getRentalsByCustomer);
router.get('/vehicle/:vehicleId', getRentalsByVehicleId);
router.get('/:id', getRentalById);
router.post('/', addRental);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);

// New routes

export default router;
