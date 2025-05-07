import React, { useEffect, useState } from 'react';

const MyHistory = () => {
  const [orders, setOrders] = useState([]);
  const [rentals, setRentals] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.email) return;

      const orderRes = await fetch(`/api/orders/history?email=${user.email}`);
      const rentalRes = await fetch(`/api/rentals/history?email=${user.email}`);

      setOrders(await orderRes.json());
      setRentals(await rentalRes.json());
    };

    fetchHistory();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Material Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-3">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded bg-white shadow">
              <div><strong>Material:</strong> {order.item.name}</div>
              <div><strong>Quantity:</strong> {order.item.quantity}</div>
              <div><strong>Price:</strong> ₹{order.item.price}</div>
              <div><strong>Total:</strong> ₹{order.totalAmount}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <div className="text-sm text-gray-500">Ordered on: {formatDate(order.createdAt)}</div>
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-2xl font-bold mt-8 mb-4">My Vehicle Rentals</h2>
      {rentals.length === 0 ? (
        <p>No rentals yet.</p>
      ) : (
        <ul className="space-y-3">
          {rentals.map(rental => (
            <li key={rental._id} className="border p-4 rounded bg-white shadow">
              <div><strong>Vehicle:</strong> {rental.vehicle.name}</div>
              <div><strong>Duration:</strong> {formatDate(rental.startDate)} to {formatDate(rental.endDate)}</div>
              <div><strong>Total Rent:</strong> ₹{rental.totalPrice}</div>
              <div><strong>Status:</strong> {rental.status}</div>
              <div className="text-sm text-gray-500">Booked on: {formatDate(rental.createdAt)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyHistory;
