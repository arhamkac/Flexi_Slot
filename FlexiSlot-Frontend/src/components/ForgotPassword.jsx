import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for token in URL
    const params = new URLSearchParams(location.search);
    const urlToken = params.get("token");
    if (urlToken) {
      setToken(urlToken);
      setShowResetForm(true);
    }
  }, [location.search]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/password/forgot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        if (data.token) {
          setToken(data.token);
          setShowResetForm(true);
        }
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Password reset successful!");
        setShowResetForm(false);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <div className="bg-[#141414] p-8 rounded-lg shadow-md w-full max-w-md border border-[#333]">
        <h1 className="text-2xl font-bold mb-6 text-center text-[#00f2fe]">
          {showResetForm ? 'Reset Password' : 'Forgot Password'}
        </h1>
        <p className="text-center text-sm text-[#888] mb-6">
          {showResetForm 
            ? 'Enter your new password below'
            : 'Enter your email address and we will send you a reset link'
          }
        </p>

        {message && (
          <div className={`text-sm text-center ${message.includes('error') || message.includes('not found') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </div>
        )}

        {error && (
          <div className="text-sm text-center text-red-400">
            {error}
          </div>
        )}

        {!showResetForm ? (
          <form className="space-y-5" onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="email" className="block text-sm text-[#00f2fe] mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#00ff11] transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>

            <div className="text-center">
              <Link
                to="/login"
                className="text-[#00f2fe] hover:underline text-sm"
              >
                Back to Login
              </Link>
            </div>
          </form>
        ) : (
          <form className="space-y-5" onSubmit={handleResetPassword}>
            <div>
              <label htmlFor="newPassword" className="block text-sm text-[#00f2fe] mb-1">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-[#00f2fe] mb-1">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full bg-[#1a1a1a] text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00f2fe] placeholder-[#555]"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00f2fe] text-[#0a0a0a] font-semibold rounded-lg hover:bg-[#00ff11] transition disabled:opacity-50"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="text-[#00f2fe] hover:underline text-sm"
              >
                Back to Email Form
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword; 