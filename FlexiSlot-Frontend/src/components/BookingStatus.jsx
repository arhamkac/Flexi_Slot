import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const formatDate = (isoDate) => {
  if (!isoDate) return 'N/A';
  const [year, month, day] = isoDate.split('-');
  return `${day}-${month}-${year.slice(2)}`;
};

const BookingStatus = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

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

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmCancel) return;

    try {
      // Try to cancel via API first
      try {
        await axios.delete(`/api/bookings/cancel/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      } catch (apiError) {
        console.log('API cancel failed, using localStorage:', apiError);
        
        // Fallback: Remove from localStorage
        const storedBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const updatedBookings = storedBookings.filter(booking => booking.id !== bookingId);
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      }
      
      // Update local state
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
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
          <div className="text-[#00f2fe] text-xl mb-4">Loading your bookings...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00f2fe] mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
      <header className="bg-[#111] text-[#00f2fe] text-center py-6">
        <h1 className="text-3xl font-bold">Your Bookings</h1>
      </header>

      <div className="flex-grow flex flex-col items-center px-4 py-6">
        <button
          onClick={() => navigate('/')}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          HOME
        </button>

        {bookings.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-400 text-lg mb-4">No bookings found.</p>
            <button
              onClick={() => navigate('/booking')}
              className="bg-[#00f2fe] hover:bg-[#00ff11] text-black px-6 py-2 rounded font-semibold"
            >
              Book Your First Slot
            </button>
          </div>
        ) : (
          <div className="space-y-6 w-full max-w-2xl">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#1a1a1a] rounded-lg p-6 shadow-md border border-[#00f2fe]"
              >
                <h2 className="text-xl font-semibold text-[#00f2fe] mb-2">
                  Booking ID #{booking.id}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p><strong>Name:</strong> {booking.user?.name || user?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {booking.user?.email || user?.email || 'N/A'}</p>
                    <p><strong>Room:</strong> {booking.slot?.slotType?.room?.name || booking.room || 'N/A'}</p>
                    <p><strong>Category:</strong> {booking.slot?.slotType?.category || booking.category || 'N/A'}</p>
                  </div>
                  <div>
                    <p><strong>Date:</strong> {formatDate(booking.slot?.slotType?.date || booking.date)}</p>
                    <p><strong>Time:</strong> {booking.slot?.slotType?.startTime || booking.timeSlot?.split(' - ')[0] || 'N/A'} - {booking.slot?.slotType?.endTime || booking.timeSlot?.split(' - ')[1] || 'N/A'}</p>
                    <p><strong>Purpose:</strong> {booking.purpose || 'N/A'}</p>
                    <p><strong>Status:</strong> <span className="text-green-400">Confirmed</span></p>
                  </div>
                </div>

                <button
                  onClick={() => handleCancel(booking.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-[#111] text-center text-sm text-gray-400 py-4">
        &copy; 2024 FlexiSlot
      </footer>
    </div>
  );
};

export default BookingStatus;
