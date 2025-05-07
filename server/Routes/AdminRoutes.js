import express from 'express';
import { adminLogin, GenerateReportData, getDashboardData } from '../controllers/AdminController.js';

const router = express.Router();

router.post('/login', adminLogin);
router.get('/dashboard',getDashboardData);
router.get('/report/:month',GenerateReportData);

export default router;
