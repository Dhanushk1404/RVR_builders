import React, { useEffect, useState } from "react";
import MaterialCard from "../components/MaterialCard";
import VehicleCard from "../components/VehicleCard";
import Login from "../forms/Login";
import Register from "../forms/Register";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Services = () => {
  const [materials, setMaterials] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    const matRes = await fetch("/api/materials");
    const vehRes = await fetch("/api/vehicles");
    setMaterials(await matRes.json());
    setVehicles(await vehRes.json());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOrderClick = (item, type) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLogin(true);
    } else {
      setSelectedItem(item);
      setSelectedType(type);
    }
  };

  const closeModal = () => {
    setShowLogin(false);
    setIsRegistering(false);
    setSelectedItem(null);
    setSelectedType(null);
    setQuantity(1);
    setStartDate("");
    setEndDate("");
  };

  const toggleModal = () => {
    setIsRegistering(!isRegistering);
  };

  const handleSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      if (selectedType === "material") {
        await axios.post("https://rvr-builders.onrender.com/api/orders", {
          customer: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
          },
          item: {
            materialId: selectedItem._id,
            quantity: parseInt(quantity),
          },
        });
        toast.success("Order placed successfully!");
      } else if (selectedType === "vehicle") {
        await axios.post("https://rvr-builders.onrender.com/api/rentals", {
          customer: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            address: user.address,
          },
          vehicle: selectedItem._id,
          startDate,
          endDate,
        });
        toast.success("Vehicle rented successfully!");
      }
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="p-6">
      <h2 className=" text-yellow-500 text-2xl font-bold mb-4">Materials</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {materials.map((m) => (
          <MaterialCard key={m._id} material={m} onOrder={handleOrderClick} />
        ))}
      </div>

      <h2 className="text-yellow-500 text-2xl font-bold my-6">
        Vehicles for Rent
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} onOrder={handleOrderClick} />
        ))}
      </div>

      {(showLogin || selectedItem) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-10">
            <button
              onClick={closeModal}
              className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>

            {showLogin ? (
              isRegistering ? (
                <Register onClose={closeModal} toggleModal={toggleModal} />
              ) : (
                <Login onClose={closeModal} toggleModal={toggleModal} />
              )
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">Enter Details</h2>
                {selectedType === "material" ? (
                  <div>
                    <label className="block mb-2">Quantity:</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full border px-3 py-2 mb-4"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block mb-2">Start Date:</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border px-3 py-2 mb-4"
                    />
                    <label className="block mb-2">End Date:</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full border px-3 py-2 mb-4"
                    />
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
     <ToastContainer />
    </div>
  );
};

export default Services;
