import React from 'react';
import { FaBullseye, FaEye } from 'react-icons/fa';

const AboutUs = () => {
  const projects = [
    {
      id: 1,
      title: 'Bridge',
      description: 'A high-end residential project with modern architecture and smart home features.',
      image: 'https://srivaru.co/assets/img/gallery/bridge-3.jpg',
    },
    {
      id: 2,
      title: 'Road',
      description: 'Multi-floor commercial space for retail and corporate offices in a prime location.',
      image: 'https://destinationcompress.s3.ap-south-1.amazonaws.com/f4fb3959-2908-4d6e-89bb-6e98eeaba65e.jpg',
    },
    {
      id: 3,
      title: 'House',
      description: 'Sustainable housing units with solar panels, rainwater harvesting, and green spaces.',
      image: 'https://www.housefind.in/wp-content/uploads/2020/12/house-for-sale-kottayam.jpg',
    },
    {
      id: 4,
      title: 'Department Store',
      description: 'Revamping old interiors with modern designs, lighting, and furnishings.',
      image: 'https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2021-03/shoppers-stop.jpg',
    },
    {
      id: 5,
      title: 'Industrial Warehouse',
      description: 'Large-scale warehouse facility built with durable materials and automated features.',
      image: 'https://cpimg.tistatic.com/04813317/b/4/Industrial-Warehouse.jpg',
    },
    {
      id: 6,
      title: 'School',
      description: 'Complete school building project with classrooms, labs, and playgrounds.',
      image: 'https://www.newindiaschool.org/images/school3.jpg',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-12 bg-gray-100">
      {/* Heading */}
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">About Us</h1>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
        {/* Mission */}
        <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <FaBullseye className="text-yellow-500 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-gray-700 text-base">
            To build high-quality infrastructure that exceeds client expectations while promoting sustainability and innovation in every project.
          </p>
        </div>

        {/* Vision */}
        <div className="bg-white shadow-md p-6 rounded-xl hover:shadow-lg transition">
          <div className="flex items-center mb-4">
            <FaEye className="text-yellow-500 text-3xl mr-3" />
            <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
          </div>
          <p className="text-gray-700 text-base">
            To be recognized as the most trusted and respected construction company by delivering excellence in every structure we create.
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 text-sm">{project.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
