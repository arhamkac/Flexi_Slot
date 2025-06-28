import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import BookingPage from './components/BookingPage';
import ContactUs from './components/ContactUs';
import BookingStatus from './components/BookingStatus';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Guidelines from './components/Guidelines';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <Router>
      <div className="bg-[#0a0a0a] text-white font-sans w-full h-full overflow-x-hidden">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <BookingSection />
              </>
            }
          />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/bookingstatus" element={<BookingStatus />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />

          {/* Pass state to Profile route */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route path="/guidelines" element={<Guidelines />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
