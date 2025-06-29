import React from "react";

const Guidelines = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-4xl mx-auto border border-cyan-400 rounded-lg p-8 bg-[#0d0d0d] shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-cyan-400">Booking Guidelines</h1>
        <ul className="list-disc list-inside space-y-4 text-gray-300">
          <li>Users must register with valid information before booking any slot.</li>
          <li>Each slot can be booked only once per user per day.</li>
          <li>Booking confirmation will be sent via email.</li>
          <li>Cancellation is allowed up to 2 hours before the slot time.</li>
          <li> Double-check your selected date and time before confirming.</li>
          <li> You can modify or cancel bookings from the “My Bookings” section.</li>
          <li>Contact support in case of booking failure or technical errors.</li>
        </ul>
        <p className="mt-6 text-sm text-gray-500">
          By using FlexiSlot, you agree to our{" "}
          <span className="text-cyan-400 underline cursor-pointer">Terms of Service</span> and{" "}
          <span className="text-cyan-400 underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Guidelines;
