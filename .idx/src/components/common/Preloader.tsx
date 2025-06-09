import React from 'react';

const Preloader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="w-20 h-30 p-3 rounded-full bg-[#ffc500] animate-[bounce_1s_ease-in-out_infinite] opacity-70 flex justify-center items-center">
        <img className="w-20 h-20" src="/images/icon-alt.svg" alt="logo" />
      </div>
      {/* <div className="mt-4 text-black font-medium text-lg">
        Please wait
        <span className="inline-block animate-[dots_1.5s_infinite]">...</span>
      </div> */}
    </div>
  );
};

export default Preloader; 