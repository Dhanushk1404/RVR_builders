import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './user/Navbar';
import Home from './user/landingpage';
import AboutUs from './user/AboutUs';
import AdminLogin from './pages/AdminLogin'
import MaterialsAdmin from './pages/MaterialsAdmin';
import ProjectsAdmin from './pages/ProjectAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Project from './user/Projects';
import Services from './user/Services';
import Contact from './user/Contact';
import Register from './forms/Register';
import Login from './forms/Login';
import MyHistory from './user/History';
import VehiclesAdmin from './Pages/VehicleAdmin';
import OrdersPage from './Pages/OrdersAdmin';

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
          <Route path="/admin/vehicles" element={<ProtectedRoute><VehiclesAdmin /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
          <Route path="/admin/materials" element={<ProtectedRoute><MaterialsAdmin /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsAdmin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
