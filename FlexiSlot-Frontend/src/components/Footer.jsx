 
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#111] text-[#aaa] py-10 w-full">
      <div className="max-w-[1200px] mx-auto px-5 flex flex-wrap justify-between gap-8">
        {/* About Us */}
        <div className="flex-1 min-w-[200px]">
          <Link to="/aboutus" className="no-underline">
            <h3 className="mb-4 text-white text-xl font-semibold">About Us</h3>
          </Link>
          <p>
            FlexiSlot is a cutting-edge online booking platform designed to
            streamline appointment scheduling. Our purpose is to provide a
            seamless experience for customers and service providers alike,
            saving time and reducing no-shows.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-white text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/guidelines" className="hover:text-white transition">
                Guidelines
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-[200px]">
          <h3 className="mb-4 text-white text-xl font-semibold">Contact Us</h3>
          <ul className="space-y-1 mb-4 text-[#ccc]">
            <li>IIIT Lucknow</li>
            <li>Chak Ganjaria, C. G. City</li>
            <li>Lucknow, 226002</li>
            <li>iiitl.ac.in</li>
          </ul>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#444] mt-10 pt-6 text-center text-[#555]">
        &copy; 2024 FlexiSlot. All Rights Reserved.
      </div>
    </footer>
  );
}
