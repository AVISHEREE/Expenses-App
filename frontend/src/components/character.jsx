import React, { useState, useEffect } from "react";

const AnimatedCharacter = ({ message }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-end justify-center">
      {/* Character Container */}
      <div className="relative flex flex-col items-center mb-8">
        {/* Speech Bubble */}
        {showMessage && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 p-4 bg-white text-gray-800 text-sm font-medium rounded-lg shadow-md animate-fadeInOut">
            {message}
          </div>
        )}

        {/* Character */}
        <div className="relative flex flex-col items-center">
          {/* Head */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-teal-500 rounded-full flex justify-center items-center shadow-lg">
            {/* Glasses */}
            <div className="absolute flex space-x-2">
              <div className="w-5 h-5 border-4 border-red-400 bg-transparent rounded-full"></div>
              <div className="w-5 h-5 border-4 border-red-400 bg-transparent rounded-full"></div>
            </div>
            {/* Hair */}
            <div className="absolute top-[-10px] w-16 h-8 bg-teal-600 rounded-t-full"></div>
            {/* Mouth */}
            <div className="absolute bottom-4 w-8 h-2 bg-red-400 rounded-full"></div>
          </div>

          {/* Body */}
          <div className="relative w-16 h-24 sm:w-20 sm:h-28 bg-orange-400 rounded-t-3xl shadow-md flex justify-center items-center">
            {/* Arms */}
            <div className="absolute -left-4 w-4 h-12 bg-teal-400 rounded-full rotate-[-20deg]"></div>
            <div className="absolute -right-4 w-4 h-12 bg-teal-400 rounded-full rotate-[20deg]"></div>
            {/* Buttons */}
            <div className="flex flex-col space-y-2">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Legs */}
          <div className="flex space-x-4 mt-2">
            <div className="w-4 h-10 bg-teal-500 rounded-full"></div>
            <div className="w-4 h-10 bg-teal-500 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCharacter;
