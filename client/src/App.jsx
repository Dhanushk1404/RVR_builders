import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './landingpage';
import AboutUs from './AboutUs';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20"> {/* Add padding for fixed navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
