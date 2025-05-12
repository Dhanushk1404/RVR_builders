import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './user/Navbar';
import Home from './user/landingpage';
import AboutUs from './user/AboutUs';
import AdminLogin from './Pages/AdminLogin'
import MaterialsAdmin from './Pages/MaterialsAdmin';
import ProjectsAdmin from './Pages/ProjectAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Project from './user/Projects';
import Services from './user/Services';
import Contact from './user/Contact';
import Register from './forms/Register';
import Login from './forms/Login';
import MyHistory from './user/History';
import VehiclesAdmin from './Pages/VehicleAdmin';
import OrdersPage from './Pages/OrdersAdmin';
import RentalsPage from './Pages/RentalAdmin';
import DashboardPage from './Pages/Dashboard';
import ReportPage from './Pages/generateReport';
import Layout from './Pages/AdminLayout';

function App() {
  return (
    <Router>
      {window.location.pathname.startsWith('/admin') ? null : <Navbar />}
      <div className="pt-20">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/projects" element={<Project/>} />
          <Route path="/services" element={<Services/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/history" element={<MyHistory/>} />
          <Route element={<Layout />}>
          <Route path="/admin/vehicles" element={<ProtectedRoute><VehiclesAdmin /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/admin/rents" element={<ProtectedRoute><RentalsPage /></ProtectedRoute>} />
          <Route path="/admin/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/admin/generate" element={<ProtectedRoute><ReportPage /></ProtectedRoute>} />
          <Route path="/admin/materials" element={<ProtectedRoute><MaterialsAdmin /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsAdmin /></ProtectedRoute>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
