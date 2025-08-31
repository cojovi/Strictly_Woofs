import React from 'react';

interface StrictlyWoofsLogoProps {
  width?: number;
  height?: number;
  size?: string;
  className?: string;
}

const StrictlyWoofsLogo: React.FC<StrictlyWoofsLogoProps> = ({ 
  width = 150, 
  height = 40, 
  size,
  className = "" 
}) => {
  const sizeClass = size || "";
  
  return (
    <div className={`flex items-center ${sizeClass} ${className}`}>
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 300 80" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        {/* Dog silhouette */}
        <path
          d="M20 45c0-8 4-15 12-18 3-1 6-1 9 0 2-3 5-5 9-5s7 2 9 5c3-1 6-1 9 0 8 3 12 10 12 18v10c0 8-4 15-12 18-3 1-6 1-9 0-2 3-5 5-9 5s-7-2-9-5c-3 1-6 1-9 0-8-3-12-10-12-18V45z"
          fill="currentColor"
          className="text-pink-400"
        />
        
        {/* Tail */}
        <path
          d="M72 50c3-2 6-3 10-2 4 1 7 4 8 8 1 4-1 8-4 10-3 2-7 2-10 0"
          fill="currentColor"
          className="text-pink-300"
        />
        
        {/* Eyes */}
        <circle cx="42" cy="45" r="2" fill="white" />
        <circle cx="58" cy="45" r="2" fill="white" />
        
        {/* Nose */}
        <ellipse cx="50" cy="52" rx="2" ry="1.5" fill="white" />
        
        {/* Text */}
        <text 
          x="95" 
          y="35" 
          fontSize="16" 
          fontWeight="bold" 
          fill="white" 
          fontFamily="Arial, sans-serif"
        >
          Strictly
        </text>
        <text 
          x="95" 
          y="55" 
          fontSize="16" 
          fontWeight="bold" 
          fill="#ec4899" 
          fontFamily="Arial, sans-serif"
        >
          Woofs
        </text>
      </svg>
    </div>
  );
};

export default StrictlyWoofsLogo;
