import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., per ton, per bag
  imageUrl: { type: String },
  Stock: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

const Material = mongoose.model('Material', materialSchema);
export default Material;
