import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make HTTP requests

const OrdersPage = () => {
  // State to store the orders data
  const [orders, setOrders] = useState([]);

  // Fetch orders from backend when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');  // Fetch orders from your API
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
      await axios.put(`/api/orders/${orderId}`, { status: newStatus }); // Update order status in backend
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order)); // Update status in the UI
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <h2>Order Management</h2>
      
      {/* Table displaying orders */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Material</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through each order and display its details */}
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.item.name}</td>
              <td>{order.item.quantity}</td>
              <td>${order.totalAmount}</td>
              <td>{order.status}</td>
              <td>
                {/* Dropdown to change the order status */}
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)} // Change status on selection
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
  );
};

export default OrdersPage;
