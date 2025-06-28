import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // 👈 import

export default function SignUp() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 get login method from context

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      // 1. Register user
      await axios.post('/api/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
        username: formData.email.split('@')[0],
        email: formData.email,
        password: formData.password,
      });

      // 2. Auto-login with same credentials
      const res = await axios.post('/api/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // 3. Store token & user in AuthContext
      const { token, user } = res.data;
      login(token, user);

      // 4. Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || "Registration or login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="bg-[#141414] p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#00f2fe]">Create an Account</h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <Input id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} />
          <Input id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} />
          <Input id="email" type="email" label="Email" value={formData.email} onChange={handleChange} />
          <Input id="password" type="password" label="Password" value={formData.password} onChange={handleChange} />
          <Input id="confirm" type="password" label="Confirm Password" value={formData.confirm} onChange={handleChange} />
          <button type="submit" className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#00ff11] transition">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm text-[#888]">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00f2fe] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

function Input({ id, label, value, onChange, type = "text" }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-[#00f2fe] mb-1">{label}</label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        required
        placeholder={`Enter your ${label.toLowerCase()}`}
        className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
      />
    </div>
  );
}
