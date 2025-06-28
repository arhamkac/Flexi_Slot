import React, { useEffect } from 'react';

export default function Banner() {
  useEffect(() => {
    const btn = document.getElementById('scrollButton');
    const target = document.getElementById('classroom');
    if (btn && target) {
      const handler = () => target.scrollIntoView({ behavior: 'smooth' });
      btn.addEventListener('click', handler);
      return () => btn.removeEventListener('click', handler);
    }
  }, []);

  return (
    <section
      className="banner py-[100px] text-center w-full"
      style={{
        backgroundImage: 'url("https://manybackgrounds.com/images/hd/mountain-trees-minimalist-7xpryajznty61ra3.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center -330px',
      }}
    >
      <div className="w-full mx-auto relative px-4">
        <h2 className="text-[32px] mb-5 text-[#00f2fe] sm:text-[48px]">Book your slots in advance</h2>
        <p className="text-[16px] mb-10 text-[#b0bec5] sm:text-[20px]">
          Pick a slot and experience the future
        </p>
        <button
          id="scrollButton"
          className="px-[20px] py-[10px] rounded-[25px] bg-[#00f2fe] text-[#0a0a0a] text-[16px] sm:px-[30px] sm:py-[15px] sm:text-[18px] transition-all duration-300 hover:bg-[#00ff11] hover:scale-110"
        >
          Explore Slots
        </button>
      </div>
    </section>
  );
}
