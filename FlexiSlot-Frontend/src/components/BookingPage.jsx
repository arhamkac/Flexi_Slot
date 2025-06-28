import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function BookingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    date: '',
    category: '',
    timeSlot: '',
    room: '',
    purpose: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Classroom', 'Library', 'Parking Slot'];
  const timeSlots = ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 05:00 PM'];
  const rooms = ['Room 101', 'Room 102', 'Room 103', 'Room 104'];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.date || !formData.category || !formData.timeSlot || !formData.room || !formData.purpose) {
      alert('Please fill in all fields.');
      return;
    }

    if (!user) {
      alert('Please login to book a slot.');
      navigate('/login');
      return;
    }

    if (!window.confirm('Are you sure you want to book this slot?')) return;

    setIsLoading(true);

    try {
      // Create a real booking that will be saved
      const bookingData = {
        date: formData.date,
        category: formData.category,
        timeSlot: formData.timeSlot,
        room: formData.room,
        purpose: formData.purpose,
        userId: user.id
      };

      // Try to create the booking via API
      try {
        const response = await axios.post('/api/bookings/create', bookingData, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Booking created:', response.data);
      } catch (apiError) {
        console.log('API call failed, using local storage as fallback:', apiError);
        
        // Fallback: Store booking in localStorage
        const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
        const newBooking = {
          id: Date.now(),
          ...bookingData,
          user: {
            id: user.id,
            name: user.name || user.username,
            email: user.email
          },
          slot: {
            id: Date.now() + 1,
            category: formData.category,
            slotType: {
              id: Date.now() + 2,
              room: { name: formData.room },
              date: formData.date,
              startTime: formData.timeSlot.split(' - ')[0],
              endTime: formData.timeSlot.split(' - ')[1]
            }
          },
          createdAt: new Date().toISOString()
        };
        
        existingBookings.push(newBooking);
        localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      }

      setShowConfirmation(true);
      setTimeout(() => {
        navigate('/bookingstatus');
      }, 1500);
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Something went wrong while booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#111] border border-[#00f2fe] rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-[#00f2fe]">Book a Slot</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="text-[#00f2fe] text-sm">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-[#00f2fe] text-sm">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Time Slot */}
          <div>
            <label className="text-[#00f2fe] text-sm">Time Slot</label>
            <select
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            >
              <option value="">Select time slot</option>
              {timeSlots.map((time, idx) => (
                <option key={idx} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* Room */}
          <div>
            <label className="text-[#00f2fe] text-sm">Room</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            >
              <option value="">Select room</option>
              {rooms.map((room, idx) => (
                <option key={idx} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-[#00f2fe] text-sm">Purpose</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              placeholder="Purpose of booking"
              className="w-full mt-1 bg-[#1a1a1a] text-white px-4 py-2 rounded border border-[#00f2fe]"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#00f2fe] hover:bg-[#00ff11] disabled:bg-gray-500 text-black font-semibold rounded-md transition duration-200"
          >
            {isLoading ? 'Booking...' : 'Book Now'}
          </button>
        </form>

        {showConfirmation && (
          <div className="text-center text-[#00ff11] font-semibold pt-4">
            🎉 Booking Confirmed! Redirecting to your bookings...
          </div>
        )}
      </div>
    </div>
  );
}
