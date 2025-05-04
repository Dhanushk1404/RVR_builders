import mongoose from 'mongoose';

const VehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerDay: { type: Number, required: true }, // Price for renting per day
    availableStock: { type: Number, default: 0 }, // Track number of available vehicles
    image: { type: String, required: true },  // Store image URL or path,  // If vehicles are available or not
  },
  { timestamps: true }
);

export default mongoose.model('Vehicle', VehicleSchema);
