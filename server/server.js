import express from 'express';
import cors from 'cors';
import dbconnect from './db/mongodbconnect.js';
import projectRoutes from './routes/projectRoutes.js';
import materialRoutes from './Routes/MaterialRoutes.js';
import adminRoutes from './Routes/AdminRoutes.js';
import contactRoutes from './Routes/ContactRoutes.js';
import orderRouter from './Routes/OrderRoutes.js';
import vehicleRoutes from './Routes/VehicleRoutes.js';
import rentalDetailRoutes from './Routes/RentRoutes.js';
import userRoutes from './Routes/UserRoutes.js';
import './middleware/scheduler.js';  // Just importing will trigger the job


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

dbconnect();


// Mount the project routesimport contactRoutes from './routes/contact.js';
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/materials', materialRoutes);
app.use("/api/orders", orderRouter);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/rentals', rentalDetailRoutes);
app.use('/api/auth', userRoutes);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
