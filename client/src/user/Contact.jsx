import { useState } from 'react';
import axios from '../api/axios';
// import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from 'react-icons/md'; // Optional icons

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/contact/send-mail', formData);
      alert("Thank you! Your message has been sent.");
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      alert("Something went wrong. Please try again.");
      console.error("Error sending email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-100 p-6 sm:p-10 font-sans">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 bg-white p-8 sm:p-12 rounded-3xl shadow-xl border border-yellow-300">

        {/* Contact Form */}
        <div>
          <h2 className="text-4xl font-bold text-yellow-500 mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-4 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg text-lg font-semibold transition-all duration-300 disabled:opacity-50 shadow-md"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Company Info */}
        <div className="flex flex-col justify-center space-y-6 bg-yellow-50 p-6 rounded-2xl shadow-inner border border-yellow-200">
          <h2 className="text-4xl font-bold text-yellow-600">Contact Information</h2>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {/* <MdEmail className="text-yellow-600" /> */}
              Email:
            </p>
            <p className="text-gray-600">rvrbuilders@example.com</p>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {/* <MdPhone className="text-yellow-600" /> */}
              Phone:
            </p>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {/* <MdLocationOn className="text-yellow-600" /> */}
              Address:
            </p>
            <p className="text-gray-600">
              RVR BUILDERS,<br />
              123 Main Road,<br />
              Erode, Tamil Nadu - 638316<br />
              India
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              {/* <MdAccessTime className="text-yellow-600" /> */}
              Working Hours:
            </p>
            <p className="text-gray-600">Mon - Sat: 9 AM – 6 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
