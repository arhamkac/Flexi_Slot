import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // ✅ Import the AuthContext

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Get login method from AuthContext
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      await login(res.data.token); // ✅ Use context method to store token and fetch user
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed: " + (err.response?.data?.message || "Check credentials"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="bg-[#141414] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#00f2fe]">Login</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-[#00f2fe] mb-1">Email</label>
            <input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter your email"
              required
              className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-[#00f2fe] mb-1">Password</label>
            <input
              id="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Enter your password"
              required
              className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
            />
          </div>
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-[#00f2fe] hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#00ff11] transition"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#888]">
          Don't have an account?{' '}
          <Link to="/signup" className="text-[#00f2fe] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
