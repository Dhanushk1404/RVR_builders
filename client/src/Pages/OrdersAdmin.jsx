import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const OrdersPage = () => {
  // State to store the orders data
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders');  // Fetch orders from your API
        setOrders(response.data); // Store fetched orders in the state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders(); // Call the fetch function
  }, []);  // Empty dependency array ensures this runs only once when the component loads

  // Function to handle order status change
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/orders/${orderId}/status`, { status: newStatus }); // Update order status in backend
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order)); // Update status in the UI
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      
      {/* Table displaying orders */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Order ID</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Material</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Quantity</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Total Amount</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop through each order and display its details */}
            {orders.map(order => (
              <tr key={order._id} className="border-b">
                <td className="py-4 px-6 text-sm text-gray-800">{order._id}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{order.item.name}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{order.item.quantity}</td>
                <td className="py-4 px-6 text-sm text-gray-800"><span className='pr-0.5'>₹</span>{order.totalAmount}</td>
                <td className="py-4 px-6 text-sm text-gray-800">{order.status}</td>
                <td className="py-4 px-6 text-sm text-gray-800">
                  {/* Dropdown to change the order status */}
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)} // Change status on selection
                    className="bg-gray-200 text-gray-700 p-2 rounded-md border border-gray-300"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
