import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-4 animate-fadeIn">
      <div className="flex flex-col items-center relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-lime-300/40 blur-xl rounded-full scale-150"></div>
        
        {/* Mouse outline */}
        <div className="w-6 h-10 border-2 border-lime-300 rounded-full flex justify-center relative z-10">
          {/* Scroll wheel */}
          <div className="w-1 h-3 bg-lime-300 rounded-full mt-2 animate-bounce"></div>
        </div>
        
        {/* Down arrow */}
        <div className="mt-2 animate-bounce relative z-10">
          <svg 
            className="w-6 h-6 text-lime-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
      
      {/* Scroll text */}
      <p className="text-lime-300 text-sm mt-2 font-medium tracking-wide text-center">
        Scroll to explore
      </p>
    </div>
  );
};

export default ScrollIndicator; 