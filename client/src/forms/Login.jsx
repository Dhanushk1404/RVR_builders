import React, { useState } from "react";
import API from "../api/axios.js";
import { useAuth } from "../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ onClose, toggleModal }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const form = { email, password };
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      loginUser(res.data.user);
      const loginresponse = res.status;
      console.log(loginresponse);
      if (loginresponse === 200) {
        toast.success("Logged in!");
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        toast.error("Login failed");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-yellow-600">Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        New user?{" "}
        <button
          onClick={toggleModal}
          className="text-yellow-500 hover:underline"
        >
          Register here
        </button>
      </p>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
