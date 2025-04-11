import express from 'express';
import cors from 'cors';
import dbconnect from './db/mongodbconnect.js';
import projectRoutes from './routes/projectRoutes.js';
import materialRoutes from './Routes/MaterialRoutes.js';
import adminRoutes from './Routes/AdminRoutes.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

dbconnect();


// Mount the project routes
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/materials', materialRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
