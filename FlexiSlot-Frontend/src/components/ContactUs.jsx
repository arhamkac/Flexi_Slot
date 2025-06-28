import React, { useState } from 'react';
import axios from 'axios';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    
    if (!name || !email || !message) {
      alert('Please fill out all fields before sending.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/contact', formData);
      
      if (response.data.success) {
        alert('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert(response.data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else if (err.response && err.response.status === 400) {
        alert('Please check your input and try again.');
      } else if (err.response && err.response.status === 500) {
        alert('Server error. Please try again later.');
      } else {
        alert('Failed to send message. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="w-4/5 mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-[#00f2fe] mb-2">
          Contact Us
        </h1>
        <p className="text-center text-lg text-[#b0bec5] mb-8">
          For queries feel free to contact us
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-[#00f2fe]">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-2 rounded focus:outline-none focus:border-[#00f2fe]"
                required
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-[#00f2fe]">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-2 rounded focus:outline-none focus:border-[#00f2fe]"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block mb-2 text-[#00f2fe]">Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full bg-[#1a1a1a] border border-[#333] text-white px-4 py-2 rounded focus:outline-none focus:border-[#00f2fe]"
              required
              disabled={isSubmitting}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full font-semibold transition ${
              isSubmitting 
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                : 'bg-[#00f2fe] text-[#0a0a0a] hover:bg-[#00ff11]'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}
