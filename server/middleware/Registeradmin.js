// registerAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
import dbconnect from '../db/mongodbconnect.js';

const registerAdmin = async () => {
  await dbconnect();
  const hashedPassword = await bcrypt.hash('builder123', 10); // your admin password
  await Admin.create({ username: 'admin', password: hashedPassword });
  console.log('Admin created');
  mongoose.disconnect();
};

registerAdmin();
