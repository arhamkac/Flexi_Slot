import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ChangePassword = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (!user || !user.email) {
      setMessage('User not found. Please log in again.');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setMessage('New password must be at least 6 characters long');
      return;
    }

    if (currentPassword === newPassword) {
      setMessage('New password must be different from current password');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/password/change?email=${encodeURIComponent(user.email)}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          currentPassword,
          newPassword 
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-6 border w-96 shadow-lg rounded-lg bg-[#141414] border-[#333]">
        <div className="mt-3">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#00f2fe]">Change Password</h3>
            <button
              onClick={onClose}
              className="text-[#888] hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm text-[#00f2fe] mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm text-[#00f2fe] mb-1">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-[#00f2fe] mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Confirm new password"
              />
            </div>

            {message && (
              <div className={`text-sm ${message.includes('successfully') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-[#333] border border-[#555] rounded-md hover:bg-[#444] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00f2fe]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-[#00f2fe] text-[#0a0a0a] border border-transparent rounded-md hover:bg-[#00ff11] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00f2fe] disabled:opacity-50"
              >
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword; 