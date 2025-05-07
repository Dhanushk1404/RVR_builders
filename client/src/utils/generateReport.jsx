// src/components/ReportPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ReportPage = () => {
  const [month, setMonth] = useState('January');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch report data from backend when month changes
  const fetchReportData = async (month) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/report/${month}`);
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData(month);
  }, [month]);

  // Function to generate the PDF report
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Monthly Report', 20, 20);
    doc.text(`Month: ${month}`, 20, 30);

    if (reportData) {
      // Add Summary Section
      doc.setFontSize(12);
      doc.text(`Total Orders: ${reportData.totalOrders}`, 20, 40);
      doc.text(`Total Rentals: ${reportData.totalRentals}`, 20, 50);
      doc.text(`Total Revenue: $${reportData.totalRevenue}`, 20, 60);

      // Highest Sold Material and Vehicle
      doc.text(`Highest Sold Material: ${reportData.highestSoldMaterial._id} (${reportData.highestSoldMaterial.totalSold} units)`, 20, 70);
      doc.text(`Highest Rented Vehicle: ${reportData.highestRentedVehicle._id} (${reportData.highestRentedVehicle.totalRented} rentals)`, 20, 80);

      // Add Order Status Pie Chart Data
      doc.text('Order Status Distribution:', 20, 90);
      const statusData = [
        { label: 'Shipped', value: reportData.statusDistribution[0].value },
        { label: 'Delivered', value: reportData.statusDistribution[1].value }
      ];
      const startY = 100;
      statusData.forEach((item, index) => {
        doc.text(`${item.label}: ${item.value}`, 20, startY + index * 10);
      });

      // Add Orders and Rentals List
      doc.text('Recent Orders:', 20, startY + statusData.length * 10 + 10);
      reportData.recentOrders.forEach((order, index) => {
        doc.text(`Order ID: ${order._id}, Status: ${order.status}, Amount: $${order.totalAmount}`, 20, startY + statusData.length * 10 + 20 + index * 10);
      });

      doc.text('Recent Rentals:', 20, startY + statusData.length * 10 + 30 + reportData.recentOrders.length * 10);
      reportData.recentRentals.forEach((rental, index) => {
        doc.text(`Rental ID: ${rental._id}, Status: ${rental.status}, Amount: $${rental.totalAmount}`, 20, startY + statusData.length * 10 + 40 + reportData.recentOrders.length * 10 + index * 10);
      });

      // Save the PDF file
      doc.save(`monthly-report-${month}.pdf`);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-6">Admin Report</h1>

      {/* Month Selection */}
      <div className="mb-6">
        <label htmlFor="month-select" className="block text-lg font-medium mb-2">Select Month:</label>
        <select
          id="month-select"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {['January', 'February', 'March', 'April', 'May'].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-lg">Loading...</p>
      ) : (
        <>
          {/* Report Summary */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Orders</h3>
              <p className="text-lg">{reportData?.totalOrders}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Rentals</h3>
              <p className="text-lg">{reportData?.totalRentals}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2">Total Revenue</h3>
              <p className="text-lg">${reportData?.totalRevenue}</p>
            </div>
          </div>

          {/* Highest Sold Material and Vehicle */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium mb-2">Highest Sold Material</h3>
            <p>{reportData?.highestSoldMaterial._id} ({reportData?.highestSoldMaterial.totalSold} units)</p>

            <h3 className="text-xl font-medium mt-4 mb-2">Highest Rented Vehicle</h3>
            <p>{reportData?.highestRentedVehicle._id} ({reportData?.highestRentedVehicle.totalRented} rentals)</p>
          </div>

          {/* Recent Orders and Rentals */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-medium mb-2">Recent Orders</h3>
            <ul>
              {reportData?.recentOrders.map((order, index) => (
                <li key={index} className="mb-2">
                  Order ID: {order._id} | Status: {order.status} | Amount: ${order.totalAmount}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-medium mt-4 mb-2">Recent Rentals</h3>
            <ul>
              {reportData?.recentRentals.map((rental, index) => (
                <li key={index} className="mb-2">
                  Rental ID: {rental._id} | Status: {rental.status} | Amount: ${rental.totalAmount}
                </li>
              ))}
            </ul>
          </div>

          {/* Button to Generate PDF */}
          <div className="text-center">
            <button
              onClick={generatePDF}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
            >
              Generate PDF
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPage;
