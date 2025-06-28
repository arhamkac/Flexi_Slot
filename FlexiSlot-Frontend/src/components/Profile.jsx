import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ChangePassword from './ChangePassword';
import axios from 'axios';

export default function Profile() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);

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

  if (!user) return <div className="text-white p-8">Loading Profile...</div>;

  return (
    <section className="min-h-screen bg-[#0a0a0a] text-white py-10 px-6">
      <div className="bg-[#1a1a1a] rounded-xl p-8 shadow-md max-w-xl mx-auto border border-[#333]">
        <h1 className="text-3xl font-bold text-[#00f2fe] mb-4">👤 Profile</h1>
        <div className="space-y-3 mb-6">
          <p><strong>Name:</strong> {user.name || user.username}</p>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
        
        <button
          onClick={() => setShowChangePassword(true)}
          className="bg-[#00f2fe] text-[#0a0a0a] px-4 py-2 rounded-lg hover:bg-[#00ff11] transition font-semibold"
        >
          🔐 Change Password
        </button>
      </div>

      <div className="mt-10 max-w-3xl mx-auto">
        <h2 className="text-2xl text-[#f97102] mb-4">📅 Your Bookings</h2>
        
        {loading ? (
          <div className="text-center">
            <div className="text-[#00f2fe] text-lg mb-4">Loading your bookings...</div>
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#00f2fe] mx-auto"></div>
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-[#999]">You have no bookings yet.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((b) => (
              <li key={b.id} className="bg-[#1a1a1a] p-4 rounded-lg border border-[#333]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><strong>Category:</strong> {b.slot?.slotType?.category || b.category || 'N/A'}</p>
                    <p><strong>Room:</strong> {b.slot?.slotType?.room?.name || b.room || 'N/A'}</p>
                    <p><strong>Date:</strong> {b.slot?.slotType?.date || b.date || 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Time:</strong> {b.slot?.slotType?.startTime || b.timeSlot?.split(' - ')[0] || 'N/A'} - {b.slot?.slotType?.endTime || b.timeSlot?.split(' - ')[1] || 'N/A'}</p>
                    <p><strong>Purpose:</strong> {b.purpose || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className="text-green-400">Confirmed</span></p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </section>
  );
}
