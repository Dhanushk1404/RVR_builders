import RentalDetail from '../models/Rent.js';
import Vehicle from '../models/Vehicles.js';

// Get all rental details
export const getAllRentals = async (req, res) => {
  try {
    const rentals = await RentalDetail.find().populate('vehicle');
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rental details' });
  }
};

// Get rental details by ID
export const getRentalById = async (req, res) => {
  try {
    const rental = await RentalDetail.findById(req.params.id).populate('vehicle');
    if (!rental) {
      return res.status(404).json({ error: 'Rental detail not found' });
    }
    res.json(rental);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rental details' });
  }
};

// Add a new rental detail
export const addRental = async (req, res) => {
    try {
      const { vehicle, customer, startDate, endDate } = req.body;
      // Validate required fields
      if (!vehicle || !startDate || !endDate) {
        return res.status(400).json({ error: "Missing required fields" });
      }
  
      // Check if vehicle exists
      const vehicleDoc = await Vehicle.findById(vehicle);
      if (!vehicleDoc) {
        return res.status(404).json({ error: "Vehicle not found" });
      }
  
      // Check for rental date conflicts
      const conflict = await RentalDetail.findOne({
        vehicle,
        status: "Booked",
        $or: [
          {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate }
          }
        ]
      });
  
      if (conflict) {
        return res.status(400).json({ error: "Vehicle is already booked on selected dates" });
      }
  
      // Calculate rental duration and total price
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) || 1;
      const totalPrice = diffDays * vehicleDoc.pricePerDay;
  
      const newRental = new RentalDetail({
        vehicle,
        customer,
        startDate,
        endDate,
        rentalDuration: diffDays,
        totalPrice,
        status: "Booked"
      });
  
      await newRental.save();
  
      // Decrease available stock
      await Vehicle.findByIdAndUpdate(vehicle, {
        $inc: { availableStock: -1 }
      });
  
      res.status(201).json({ message: "Rental booked successfully", rental: newRental });
    } catch (err) {
      res.status(500).json({ error: "Failed to add rental" });
    }
  };
  

// Update rental details (e.g., mark as completed)
export const updateRental = async (req, res) => {
  try {
    const updatedRental = await RentalDetail.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRental) {
      return res.status(404).json({ error: 'Rental detail not found' });
    }
    res.json({ message: 'Rental updated successfully', rental: updatedRental });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rental' });
  }
};

// Delete rental details
export const deleteRental = async (req, res) => {
  try {
    const rental = await RentalDetail.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status(404).json({ error: 'Rental detail not found' });
    }

    // Increment available stock of the vehicle if rental is deleted
    await Vehicle.findByIdAndUpdate(rental.vehicle, {
      $inc: { availableStock: 1 }
    });

    res.json({ message: 'Rental deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete rental' });
  }
};


// GET /api/rentals/customer?email=abc@example.com OR /?phone=1234567890
export const getRentalsByCustomer = async (req, res) => {
    try {
      const { email, phone } = req.query;
      const filter = {};
  
      if (email) filter["customer.email"] = email;
      if (phone) filter["customer.phone"] = phone;
  
      const rentals = await RentalDetail.find(filter).populate("vehicle");
      console.log(rentals);
      res.json(rentals);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch rental history for customer" });
    }
  };

  
  // GET /api/rentals/vehicle/:vehicleId
export const getRentalsByVehicleId = async (req, res) => {
    try {
      const rentals = await RentalDetail.find({ vehicleId: req.params.vehicle }).populate("vehicle");
      res.json(rentals);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch rental history for vehicle" });
    }
  };
  