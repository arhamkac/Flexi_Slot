import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      // Try to fetch from API first
      try {
        const response = await axios.get(`/api/bookings/user/${user.id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setBookings(response.data);
      } catch (apiError) {
        console.log('API call failed, using localStorage:', apiError);
        
        // Fallback to localStorage
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const userBookings = storedBookings.filter(booking => 
          booking.userId === user.id || booking.user?.id === user.id
        );
        setBookings(userBookings);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="text-white p-10">Loading Dashboard...</div>;

  const upcoming = bookings.filter(b => {
    const bookingDate = b.slot?.slotType?.date || b.date;
    return bookingDate && new Date(bookingDate) >= new Date();
  });
  const past = bookings.filter(b => {
    const bookingDate = b.slot?.slotType?.date || b.date;
    return bookingDate && new Date(bookingDate) < new Date();
  });

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      // Try to cancel via API first
      try {
        await axios.delete(`/api/bookings/cancel/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (apiError) {
        console.log('API cancel failed, using localStorage:', apiError);
        
        // Fallback: Remove from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = storedBookings.filter(booking => booking.id !== id);
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      }
      
      // Update local state
      setBookings(prev => prev.filter(booking => booking.id !== id));
      alert('Booking cancelled successfully.');
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Failed to cancel booking.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#00f2fe] text-xl mb-4">Loading dashboard...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00f2fe] mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-12 px-6">
      <h1 className="text-[36px] font-bold text-center text-[#00f2fe] mb-6">
        Welcome, {user.name || user.username}!
      </h1>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <MetricCard label="Total Bookings" value={bookings.length} color="#00f2fe" />
        <MetricCard label="Upcoming Bookings" value={upcoming.length} color="#00ff11" />
        <MetricCard label="Past Bookings" value={past.length} color="#8888ff" />
        <MetricCard label="Cancelled Bookings" value={0} color="#ff00ff" />
      </div>

      {/* Quick Actions */}
      <h2 className="text-[28px] text-[#f97102] mb-4 text-center">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center mb-12">
        {[
          { label: 'Manage Bookings', path: '/bookingstatus', icon: '📅' },
          { label: 'Add Slot', path: '/booking', icon: '➕' },
          { label: 'User Queries', path: '/contact', icon: '❓' },
          { label: 'About Us', path: '/aboutus', icon: 'ℹ️' },
        ].map(({ label, path, icon }, idx) => (
          <div
            key={idx}
            onClick={() => navigate(path)}
            className="cursor-pointer bg-[#1a1a1a] p-6 rounded-2xl text-center transition transform hover:scale-105
                      shadow-[0_0_15px_rgba(0,242,254,0.4)] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)]"
          >
            <div className="text-[36px] mb-3">{icon}</div>
            <p className="text-[18px] font-semibold text-white hover:text-[#00f2fe] transition-all">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <h2 className="text-[28px] text-[#f97102] mb-4">Upcoming Bookings</h2>
      <BookingList bookings={upcoming} canCancel cancelBooking={cancelBooking} />

      <h2 className="text-[28px] text-[#f97102] mt-10 mb-4">Past Bookings</h2>
      <BookingList bookings={past} />
    </section>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div
      className="bg-[#111] p-6 rounded-2xl shadow-lg text-center border-2"
      style={{ borderColor: color }}
    >
      <h3 className="text-[20px] mb-2 text-[#b0bec5]">{label}</h3>
      <p className="text-[32px] font-bold" style={{ color }}>{value}</p>
    </div>
  );
}

function BookingList({ bookings, cancelBooking, canCancel }) {
  if (bookings.length === 0)
    return <p className="text-[#999] mb-6">No bookings found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map(b => (
        <div key={b.id} className="bg-[#1a1a1a] p-4 rounded-xl border border-[#333] shadow-md">
          <h3 className="text-lg text-[#00f2fe] font-semibold">
            {b.slot?.slotType?.category || b.category} — {b.slot?.slotType?.room?.name || b.room}
          </h3>
          <p>📅 {b.slot?.slotType?.date || b.date}</p>
          <p>⏰ {b.slot?.slotType?.startTime || b.timeSlot?.split(' - ')[0]} - {b.slot?.slotType?.endTime || b.timeSlot?.split(' - ')[1]}</p>
          <p className="text-sm text-[#aaa]">Purpose: {b.purpose}</p>
          {canCancel && (
            <button
              className="mt-3 bg-red-500 px-3 py-1 rounded hover:bg-red-700 text-white transition-colors"
              onClick={() => cancelBooking(b.id)}
            >
              Cancel
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
