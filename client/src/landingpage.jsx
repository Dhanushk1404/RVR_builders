import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const LandingPage = () => {
  const images = [
    "https://thumbs.dreamstime.com/b/architect-plan-working-table-crane-building-construction-background-file-35192700.jpg",
    "https://nammafamilybuilder.com/wp-content/uploads/2021/03/best-builders-in-chennai-scaled-1-1024x473-1.jpg",
    "https://www.shutterstock.com/image-photo/future-building-construction-engineering-project-600nw-1538803976.jpg"
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="font-sans text-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div
        id="home"
        className="relative min-h-screen flex flex-col justify-center items-center text-white text-center bg-cover bg-center px-4 sm:px-8 md:px-12 transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${currentImage})`
        }}
      >
        <div className="w-full max-w-5xl mx-auto px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl text-yellow-400 font-semibold tracking-wide uppercase">
            Building Excellence, Delivering Quality
          </h2>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 leading-tight drop-shadow-lg">
            Innovative & Sustainable <br className="hidden sm:block" />
            Construction Solutions
          </h1>

          <p className="text-base sm:text-lg mt-4 max-w-2xl mx-auto text-gray-300 leading-relaxed">
            We bring your ideas to life with top-notch craftsmanship, modern
            designs, and a commitment to timely project completion.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition font-semibold text-base sm:text-lg"
            >
              Our Services
            </a>
            <a
              href="#contact"
              className="border-2 border-white text-white px-6 py-3 rounded-lg shadow-lg hover:bg-white hover:text-black transition font-semibold text-base sm:text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
