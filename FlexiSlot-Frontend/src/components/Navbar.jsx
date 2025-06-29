import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // ✅ Get from context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ✅ Will clear token and user
    navigate('/');
  };

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Book Slot', to: '/booking' },
    { label: 'My Bookings', to: '/bookingstatus' },
    { label: 'Contact', to: '/contact' },
  ];

  const authLinks = user
    ? [
        { label: 'Dashboard', to: '/dashboard' },
        { label: 'Profile', to: '/profile' },
        { label: 'Logout', action: handleLogout },
      ]
    : [
        { label: 'Sign Up', to: '/signup' },
        { label: 'Login', to: '/login' },
      ];

  return (
    <header className="bg-[#111] py-5 w-full">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 relative">
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-[40px] font-bold text-[#00f2fe]">Flexi</span>
          <span className="text-[40px] font-bold text-[#f97102]">Slot</span>
        </div>

        {/* Hamburger menu (Mobile) */}
        <div className="block lg:hidden absolute top-5 right-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round"
                strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Nav links (Desktop) */}
        <nav className="hidden lg:flex ml-10">
          <ul className="flex space-x-8">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link
                  to={link.to}
                  className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Auth links (Desktop) */}
        <div className="hidden lg:flex ml-6 space-x-6">
          {authLinks.map((item, idx) => (
            item.action ? (
              <button
                key={idx}
                onClick={item.action}
                className="text-[#ff4d4d] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={idx}
                to={item.to}
                className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#111] p-4`}>
        <ul className="space-y-4">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <Link
                to={link.to}
                className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
              >
                {link.label}
              </Link>
            </li>
          ))}
          {authLinks.map((item, idx) => (
            <li key={idx}>
              {item.action ? (
                <button
                  onClick={item.action}
                  className="text-[#ff4d4d] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  to={item.to}
                  className="text-[#00f2fe] text-lg transition-colors duration-300 hover:text-[#ff00ff]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
