import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; // ✅ Correct import

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ReportPage = () => {
  const [month, setMonth] = useState('January');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#8dd1e1'];

  const fetchReportData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/report/${month}`
      );
      setReportData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching report data:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async () => {
    const data = await fetchReportData();
    if (!data) return;

    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Monthly Report', 20, 20);
    doc.setFontSize(12);
    doc.text(`Month: ${month}`, 20, 30);
    doc.text(`Total Orders: ${data.totalOrders}`, 20, 40);
    doc.text(`Total Rentals: ${data.totalRentals}`, 20, 50);
    doc.text(`Total Revenue: $${data.totalRevenue}`, 20, 60);

    doc.text(
      `Highest Sold Material: ${data.highestSoldMaterial._id} (${data.highestSoldMaterial.totalSold} units)`,
      20,
      70
    );
    doc.text(
      `Highest Rented Vehicle: ${data.highestRentedVehicle._id} (${data.highestRentedVehicle.totalRented} rentals)`,
      20,
      80
    );

    // Status Distribution Table
    doc.text('Order Status Distribution:', 20, 90);
    autoTable(doc, {
      head: [['Status', 'Count']],
      body: data.statusDistribution.map((item) => [item.status, item.value]),
      startY: 95,
    });

    let finalY = doc.lastAutoTable.finalY || 105;

    // Orders Table
    doc.text('Recent Orders:', 20, finalY + 10);
    autoTable(doc, {
      head: [['Order ID', 'Material', 'Status', 'Amount']],
      body: data.recentOrders.map((order) => [
        order._id,
        order.item.name,
        order.status,
        `$${order.totalAmount}`,
      ]),
      startY: finalY + 15,
    });

    finalY = doc.lastAutoTable.finalY;

    // Rentals Table
    doc.text('Recent Rentals:', 20, finalY + 10);
    autoTable(doc, {
      head: [['Rental ID', 'Vehicle', 'Status', 'Amount']],
      body: data.recentRentals.map((rental) => [
        rental._id,
        rental.vehicle.name,
        rental.status,
        `$${rental.totalAmount}`,
      ]),
      startY: finalY + 15,
    });

    doc.save(`monthly-report-${month}.pdf`);
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Report</h1>

      <div className="mb-6">
        <label htmlFor="month-select" className="block text-lg font-medium mb-2">
          Select Month:
        </label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['January', 'February', 'March', 'April', 'May','June','July','August','September','October','November','December'].map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center">
        <button
          onClick={generatePDF}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </div>

      {reportData && !loading && (
        <>
          <div className="grid grid-cols-3 gap-6 my-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Orders</h3>
              <p className="text-lg">{reportData.totalOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Rentals</h3>
              <p className="text-lg">{reportData.totalRentals}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Revenue</h3>
              <p className="text-lg">${reportData.totalRevenue}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium mb-2">Highest Sold Material</h3>
            <p>
              {reportData.highestSoldMaterial._id} (
              {reportData.highestSoldMaterial.totalSold} units)
            </p>

            <h3 className="text-xl font-medium mt-4 mb-2">
              Highest Rented Vehicle
            </h3>
            <p>
              {reportData.highestRentedVehicle._id} (
              {reportData.highestRentedVehicle.totalRented} rentals)
            </p>
          </div>

          {reportData.statusDistribution?.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-medium mb-4">Order Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={reportData.statusDistribution}
                    dataKey="value"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {reportData.statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium mb-2">Recent Orders</h3>
            <ul>
              {reportData.recentOrders.map((order, index) => (
                <li key={index} className="mb-2">
                  Order ID: {order._id} | Name: {order.item.name} | Status:{' '}
                  {order.status} | Amount: ${order.totalAmount}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Recent Rentals</h3>
            <ul>
              {reportData.recentRentals.map((rental, index) => (
                <li key={index} className="mb-2">
                  Rental ID: {rental._id} | Name: {rental.vehicle.name} | Status:{' '}
                  {rental.status} | Amount: ${rental.totalPrice}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPage;
