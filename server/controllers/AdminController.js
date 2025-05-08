import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Order from "../models/Order.js";
import RentalDetail from "../models/Rent.js";
import Material from "../models/Material.js";
import Vehicle from "../models/Vehicles.js"
import mongoose from 'mongoose';

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const JWT_SECRET = 'your_secret_key_here'; // move to .env in production
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};


export const getDashboardData = async (req, res) => {
  try {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const [
      totalOrders,
      totalRentals,
      orderRevenueAgg,
      rentalRevenueAgg,
      ordersByMonth,
      rentalsByMonth,
      statusCounts,
      recentOrders,
      recentRentals
    ] = await Promise.all([
      Order.countDocuments(),
      RentalDetail.countDocuments(),

      // Order and rental revenue
      Order.aggregate([
        { $match: { totalAmount: { $exists: true } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } }
      ]),
      RentalDetail.aggregate([
        { $match: { totalPrice: { $exists: true } } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } }
      ]),

      // Monthly revenue
      Order.aggregate([
        { $match: { createdAt: { $ne: null } } },
        { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalAmount" } } },
        { $sort: { _id: 1 } }
      ]),
      RentalDetail.aggregate([
        { $match: { createdAt: { $ne: null } } },
        { $group: { _id: { $month: "$createdAt" }, total: { $sum: "$totalPrice" } } },
        { $sort: { _id: 1 } }
      ]),

      // Order status distribution
      Order.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
      ]),

      // Recent orders
      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('item', 'name')
        .select('totalAmount status createdAt item'),

      // Recent rentals
      RentalDetail.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('vehicle', 'name')
        .select('totalPrice status createdAt vehicle')
    ]);

    const totalRevenue = (orderRevenueAgg[0]?.total || 0) + (rentalRevenueAgg[0]?.total || 0);

    const monthlyRevenue = months.map((month, index) => {
      const orders = ordersByMonth.find(item => item._id === index + 1)?.total || 0;
      const rentals = rentalsByMonth.find(item => item._id === index + 1)?.total || 0;
      return { month, orders, rentals };
    });

    const statusDistribution = statusCounts.map(item => ({
      status: item._id,
      value: item.count
    }));

    const recentOrdersData = recentOrders.map(order => ({
      _id: order._id,
      name: order.item?.name || 'N/A',
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
      type: 'Order'
    }));

    const recentRentalsData = recentRentals.map(rental => ({
      _id: rental._id,
      name: rental.vehicle?.name || 'N/A',
      totalAmount: rental.totalPrice,
      status: rental.status,
      createdAt: rental.createdAt,
      type: 'Rental'
    }));

    const result = {
      summary: {
        totalOrders,
        totalRentals,
        totalRevenue
      },
      monthlyRevenue,
      statusDistribution,
      recentTransactions: [...recentOrdersData, ...recentRentalsData]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5) // top 5 recent across both
    };
    res.json(result);

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
};


export const GenerateReportData = async (req,res)=>{
  const { month } = req.params; 
  console.log(month); // e.g., "January", "February"
  const startDate = new Date(`${month} 1, 2025 00:00:00`);  // Start of the month
  const endDate = new Date(`${month} 31, 2025 23:59:59`);  // End of the month

  try {
    // Calculate Total Orders and Total Rentals in the selected month
    const orders = await Order.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    const rentals = await RentalDetail.find({
      createdAt: { $gte: startDate, $lte: endDate }
    });

    const totalOrders = orders.length;
    const totalRentals = rentals.length;

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0)
      + rentals.reduce((sum, rental) => sum + rental.totalPrice, 0);

    // Highest Sold Material
    const materialsSold = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $group: {
          _id: '$item.name',
          totalSold: { $sum: '$item.quantity' }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);
    
    

    const vehiclesRented = await RentalDetail.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      {
        $lookup: {
          from: 'vehicles', // this must match the MongoDB collection name
          localField: 'vehicle',
          foreignField: '_id',
          as: 'vehicleInfo'
        }
      },
      { $unwind: '$vehicleInfo' },
      {
        $group: {
          _id: '$vehicleInfo.name',
          totalRented: { $sum: 1 } // one per rental
        }
      },
      { $sort: { totalRented: -1 } },
      { $limit: 1 }
    ]);
    
    

    // Order Status Distribution (Shipped, Delivered)
    const statusAggregation = await Order.aggregate([
      { $match: { createdAt: { $gte: startDate, $lte: endDate } } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    

    // Pie chart data for order status distribution
    const statusData = statusAggregation.map(status => ({
      status: status._id,
      value: status.count
    }));
    

    // Recent Orders and Rentals for the month
    const recentOrders = await Order.find({ createdAt: { $gte: startDate, $lte: endDate } })
      .populate('item')
      .sort({ createdAt: -1 });
    const recentRentals = await RentalDetail.find({ createdAt: { $gte: startDate, $lte: endDate } })
      .populate('vehicle')
      .sort({ createdAt: -1 });
    const result= {
      totalOrders,
      totalRentals,
      totalRevenue,
      highestSoldMaterial: materialsSold[0] || {},
      highestRentedVehicle: vehiclesRented[0] || {},
      statusDistribution: statusData,
      recentOrders,
      recentRentals
    };
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching the report data.' });
  }
};