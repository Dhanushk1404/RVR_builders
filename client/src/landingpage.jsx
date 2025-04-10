import React from "react";

const LandingPage = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Top Bar */}
      <div className="bg-gray-100 py-2 text-center text-sm text-gray-700">
        Call Us: <span className="font-semibold">+91 9092069444 | +91 8051494049</span>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-white shadow-md fixed w-full top-0 z-50">
        <div className="flex items-center">
          <img src="/logo.png" alt="RVR Builders Logo" className="h-12 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">RVR BUILDERS</h1>
        </div>
        <ul className="flex space-x-6 text-lg font-medium">
          <li><a href="#home" className="hover:text-yellow-500 transition">Home</a></li>
          <li><a href="#about" className="hover:text-yellow-500 transition">About Us</a></li>
          <li><a href="#services" className="hover:text-yellow-500 transition">Services</a></li>
          <li><a href="#projects" className="hover:text-yellow-500 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-yellow-500 transition">Contact</a></li>
        </ul>
        <a href="#quote" className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition font-bold">
          Get a Quote
        </a>
      </nav>

      {/* Hero Section */}
      <div
        id="home"
        className="relative h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://thumbs.dreamstime.com/b/architect-plan-working-table-crane-building-construction-background-file-35192700.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-2xl text-yellow-400 font-semibold tracking-wide uppercase">
          Building Excellence, Delivering Quality
        </h2>
        <h1 className="text-5xl font-bold mt-4 leading-tight drop-shadow-lg">
          Innovative & Sustainable <br /> Construction Solutions
        </h1>
        <p className="text-lg mt-4 max-w-3xl mx-auto text-gray-300 leading-relaxed">
          We bring your ideas to life with top-notch craftsmanship, modern designs, and a commitment to timely project completion.
        </p>
        <div className="mt-8 flex space-x-6 justify-center">
          <a
            href="#services"
            className="bg-yellow-500 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition font-semibold text-lg"
          >
            Our Services
          </a>
          <a
            href="#contact"
            className="border-2 border-white text-white px-8 py-3 rounded-lg shadow-lg hover:bg-white hover:text-black transition font-semibold text-lg"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
