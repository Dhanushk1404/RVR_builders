import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,       // ✅ Added address field
  password: String
});

export default mongoose.model('User', userSchema);
