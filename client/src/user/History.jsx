import React, { useEffect, useState } from 'react';

const MyHistory = () => {
  const [orders, setOrders] = useState([]);
  const [rentals, setRentals] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user || !user.email) return;

      const orderRes = await fetch(`https://rvr-builders.onrender.com/api/orders/history?email=${user.email}`);
      const rentalRes = await fetch(`https://rvr-builders.onrender.com/api/rentals/history?email=${user.email}`);

      setOrders(await orderRes.json());
      setRentals(await rentalRes.json());
    };

    fetchHistory();
  }, []);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div className="p-6">
      {/* Material Orders Section */}
      <h2 className="text-3xl font-bold mb-6 text-yellow-500 text-center">My Material Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <div className="text-xl font-semibold text-black">{order.item.name}</div>
              <div className="text-black mt-2">Quantity: {order.item.quantity}</div>
              <div className="text-black">Price: ₹{order.item.price}</div>
              <div className="text-lg text-black font-semibold mt-4">Total: ₹{order.totalAmount}</div>
              <div className="mt-2">
                <span className="font-medium text-black">Status: </span>
                <span className="text-black">{order.status}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">Ordered on: {formatDate(order.createdAt)}</div>
            </div>
          ))}
        </div>
      )}

      {/* Vehicle Rentals Section */}
      <h2 className="text-3xl font-bold mt-12 mb-6 text-yellow-500 text-center">My Vehicle Rentals</h2>
      {rentals.length === 0 ? (
        <p className="text-gray-500 text-center">No rentals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rentals.map(rental => (
            <div
              key={rental._id}
              className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out"
            >
              <div className="text-xl font-semibold text-black">{rental.vehicle.name}</div>
              <div className="text-black mt-2">
                Duration: {formatDate(rental.startDate)} to {formatDate(rental.endDate)}
              </div>
              <div className="text-lg text-black font-semibold mt-4">Total Rent: ₹{rental.totalPrice}</div>
              <div className="mt-2">
                <span className="font-medium text-black">Status: </span>
                <span className="text-black">{rental.status}</span>
              </div>
              <div className="text-sm text-gray-600 mt-2">Booked on: {formatDate(rental.createdAt)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyHistory;
