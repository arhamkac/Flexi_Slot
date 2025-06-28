import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingSection() {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'classroom',
      title: 'Classroom',
      bgImage:
        'https://images.unsplash.com/photo-1622737133809-d95047b9e673?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbmltYWwlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww',
      titleColor: 'text-[#00f2fe]',
      slots: ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 05:00 PM'],
    },
    {
      id: 'library',
      title: 'Library',
      bgImage:
        'https://img.freepik.com/premium-photo/minimalist-classroom-clean-contemporary-with-beige-floor_887552-11642.jpg',
      titleColor: 'text-[#000000]',
      slots: ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 05:00 PM'],
    },
    {
      id: 'parking',
      title: 'Parking Slot',
      bgImage:
        'https://images.unsplash.com/photo-1622737133809-d95047b9e673?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1pbmltYWwlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww',
      titleColor: 'text-[#00f2fe]',
      slots: ['8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '01:00 PM - 03:00 PM', '03:00 PM - 05:00 PM'],
    },
  ];

  const handleBookClick = () => {
    // Simple navigation to booking page
    navigate('/booking');
  };

  return (
    <>
      {sections.map(({ id, title, bgImage, titleColor, slots }) => (
        <section
          key={id}
          id={id}
          className="bg-[#111] py-[60px] w-full"
          style={{
            backgroundImage: `url("${bgImage}")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: id === 'classroom' ? 'center -70px' : id === 'library' ? 'center -180px' : 'center -70px',
          }}
        >
          <div className="w-4/5 mx-auto relative">
            <h2 className={`text-[24px] sm:text-[32px] text-center mb-[40px] font-semibold ${titleColor}`}>
              {title}
            </h2>

            {/* Slots grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[30px]">
              {slots.map((time, idx) => (
                <div
                  key={idx}
                  className="bg-[#1a1a1a] border-2 border-[#00f2fe] p-[20px] text-center rounded-[10px] shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.6)]"
                >
                  <h3 className="text-[24px] mb-[10px] text-[#f97102]">Slot {idx + 1}</h3>
                  <p className="text-[16px] mb-[20px] text-[#b0bec5]">{time}</p>
                  <button
                    onClick={handleBookClick}
                    className="bg-[#00f2fe] text-[rgb(32,0,28)] w-[60px] h-[30px] rounded-[15px] hover:text-[#ff00ff] hover:scale-110 transition-all cursor-pointer"
                  >
                    Book
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
