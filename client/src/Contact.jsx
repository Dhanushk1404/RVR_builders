import { useState } from 'react';
import axios from './api/axios';

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-8 rounded shadow-md">

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Company Info */}
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
          <div>
            <p className="text-lg font-semibold">Email:</p>
            <p>rvrbuilders@example.com</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Phone:</p>
            <p>+91 98765 43210</p>
          </div>
          <div>
            <p className="text-lg font-semibold">Address:</p>
            <p>
              RVR BUILDERS,<br />
              123 Main Road,<br />
              Erode, Tamil Nadu - 638316<br />
              India
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold">Working Hours:</p>
            <p>Mon - Sat: 9 AM – 6 PM</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
