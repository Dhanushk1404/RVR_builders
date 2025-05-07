// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts';
import jsPDF from 'jspdf';  // Import jsPDF for PDF generation
import html2pdf from 'html2pdf.js';  // For HTML to PDF conversion

const DashboardPage = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    totalRentals: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard');
        setMonthlyData(res.data.monthlyRevenue);
        setStatusData(res.data.statusDistribution);
        setRecentTransactions(res.data.recentTransactions);
        setSummary(res.data.summary);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const pieColors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

  // Helper function to generate the PDF report
  const generateMonthlyReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Monthly Report', 14, 20);
    doc.setFontSize(12);

    // Summary Section
    doc.text(`Total Orders: ${summary.totalOrders}`, 14, 30);
    doc.text(`Total Rentals: ${summary.totalRentals}`, 14, 40);
    doc.text(`Total Revenue: ₹${summary.totalRevenue}`, 14, 50);

    // Monthly Revenue Section
    doc.text('Monthly Revenue:', 14, 60);
    monthlyData.forEach((data, index) => {
      const yOffset = 70 + index * 10;
      doc.text(`${data.month}: Orders - ₹${data.orders}, Rentals - ₹${data.rentals}`, 14, yOffset);
    });

    // Status Distribution Section
    doc.text('Order Status Distribution:', 14, 100);
    statusData.forEach((status, index) => {
      const yOffset = 110 + index * 10;
      doc.text(`${status.status}: ${status.value}`, 14, yOffset);
    });

    // Recent Transactions Section
    doc.text('Recent Transactions:', 14, 150);
    recentTransactions.forEach((tx, index) => {
      const yOffset = 160 + index * 10;
      doc.text(`${tx.type} - ${tx.name}: ₹${tx.totalAmount} - ${tx.status}`, 14, yOffset);
    });

    // Save PDF
    doc.save('monthly_report.pdf');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Orders</h2>
          <p className="text-2xl font-bold text-indigo-600">{summary.totalOrders}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Rentals</h2>
          <p className="text-2xl font-bold text-green-600">{summary.totalRentals}</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Revenue</h2>
          <p className="text-2xl font-bold text-rose-600">₹ {summary.totalRevenue}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Revenue Bar Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" fill="#8884d8" name="Orders" />
              <Bar dataKey="rentals" fill="#82ca9d" name="Rentals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Order Status Pie Chart */}
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Order Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData ?? []}
                dataKey="value"
                nameKey="status"
                outerRadius={100}
                label
              >
                {(statusData ?? []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl shadow p-4 mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-100">
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx) => (
                <tr key={tx._id} className="border-b">
                  <td className="py-2 px-4">{tx.type}</td>
                  <td className="py-2 px-4">{tx.name}</td>
                  <td className="py-2 px-4">₹{tx.totalAmount}</td>
                  <td className={`py-2 px-4 ${tx.status === 'Returned' || tx.status === 'Shipped' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {tx.status}
                  </td>
                  <td className="py-2 px-4">{new Date(tx.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">No recent transactions</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
