import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './landingpage';
import AboutUs from './AboutUs';
import AdminLogin from './pages/AdminLogin'
import MaterialsAdmin from './pages/MaterialsAdmin';
import ProjectsAdmin from './pages/ProjectAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import Project from './Projects';
import Services from './Services';
import Contact from './Contact';

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
          {/* Admin */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/materials" element={<ProtectedRoute><MaterialsAdmin /></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><ProjectsAdmin /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
