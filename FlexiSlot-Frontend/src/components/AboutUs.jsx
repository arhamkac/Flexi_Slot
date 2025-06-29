import React from 'react';
import FlexiSlot from '../assets/Flexi- Slot (2).png'; // Adjust the path as necessary

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Main Content */}
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-5xl font-bold text-center text-[#00f2fe] mb-2">About Us</h1>
        <p className="text-center text-lg text-[#b0bec5] mb-12">Welcome to Flexislot, book your slots in advance</p>

        <div className="flex flex-col md:flex-row items-center mb-10 gap-10">
          <div className="w-full md:w-1/2">
            <img
              src={FlexiSlot}
              alt="Flexislot Logo"
              className="w-[200px] h-[100px] rounded shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-[#00f2fe] mb-3">Our Mission</h2>
            <p className="text-[#b0bec5] text-xl">
              Our mission is to provide a user-friendly, reliable way to schedule appointments,
              meetings, and events — giving you back valuable time for the things that matter most.
              Whether you’re planning ahead or looking for a last-minute slot, Flexislot is here to
              make it simple and stress-free.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-[#00f2fe] mb-3">Our Team Members</h2>
            <ul className="list-disc list-inside text-[#b0bec5] space-y-1">
               
              <li>Anvesha Chauhan</li>
              <li>Arham Kachhara</li>
              <li>Manas Srivastava</li>
              <li>Mehul Raj</li>
              <li>Puneeth</li>
              <li>Sai Vikas</li>
              <li>Nikhil</li>
              <li>Chandrasekhar</li>
            </ul>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-[#00f2fe] mb-3">Why Choose Flexislot?</h2>
            <p className="mb-3 text-[#b0bec5] text-xl">
              At Flexislot, we know that time is one of your most valuable assets. That’s why we
              are committed to making your scheduling experience as smooth and efficient as
              possible. Here’s what sets us apart:
            </p>
            <ul className="list-disc list-inside text-[#b0bec5] space-y-1 text-xl">
              <li>
                <b>Convenience at Your Fingertips:</b> With Flexislot, booking is simple and fast.
                Our user-friendly platform allows you to reserve slots anytime, anywhere, so
                you’re always in control of your schedule.
              </li>
              <li>
                <b>Save Time, Plan Ahead:</b> By booking in advance, you avoid long waits and
                unexpected delays. Flexislot empowers you to organize your day efficiently,
                helping you focus on what truly matters.
              </li>
              <li>
                <b>Designed by the Next Generation:</b> Created by young, innovative minds,
                Flexislot is built on fresh ideas and the latest technology, ensuring a modern,
                reliable service that evolves with you.
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
