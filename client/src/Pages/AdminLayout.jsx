import React from 'react';
import Navbar from './Navbar'; // Import your navbar component
import { Outlet } from 'react-router-dom'; // Allows rendering of child routes

const Layout = () => {
  return (
    <div>
      <Navbar /> {/* This ensures the navbar is rendered on every page */}
      <main className="pt-4"> {/* Add padding-top for the navbar */}
        <Outlet /> {/* This renders the current page/component */}
      </main>
    </div>
  );
};

export default Layout;
