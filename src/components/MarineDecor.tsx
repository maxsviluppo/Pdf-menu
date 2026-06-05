import React from "react";

// Watercolor Coral rendering component (Top corals + starfish)
export const CoralHeader: React.FC = () => {
  return (
    <div className="relative w-full flex flex-col items-center pt-8 pb-4 overflow-hidden pointer-events-none select-none">
      {/* Soft blue/cyan watercolor glow backgrounds */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-80 h-32 bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -top-4 left-1/4 w-40 h-24 bg-cyan-100/30 rounded-full blur-2xl pointer-events-none"></div>
      
      {/* Decorative Starfish and Corals illustration with high-fidelity vector styling */}
      <svg
        className="w-48 h-28 text-cyan-600/80 drop-shadow-sm"
        viewBox="0 0 200 120"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Coral Left Branch (Dark Indigo/Blue Watercolor feel) */}
        <path
          d="M75,110 C70,95 62,85 55,80 C48,75 42,78 38,72 C34,66 38,58 36,52 C34,46 28,45 25,38 C22,31 25,24 22,18 C19,12 11,15 13,8 C15,1 25,5 29,12 C33,19 32,27 37,32 C42,37 49,34 53,42 C57,50 51,58 57,64 C63,70 69,67 74,74 C79,81 74,90 79,98 C84,106 79,109 75,110 Z"
          fill="rgba(30, 100, 160, 0.45)"
        />
        <path
          d="M85,110 C83,95 80,82 72,74 C64,66 58,62 56,52 C54,42 62,38 61,28 C60,18 52,14 53,5 C54,-4 62,0 63,8 C64,16 68,22 71,30 C74,38 72,46 79,52 C86,58 91,52 95,62 C99,72 92,82 96,92 C100,102 91,108 85,110 Z"
          fill="rgba(6, 182, 212, 0.4)"
        />

        {/* Coral Right Branch (Soft Coral Pink/Orange feel) */}
        <path
          d="M125,110 C130,95 138,85 145,80 C152,75 158,78 162,72 C166,66 162,58 164,52 C166,46 172,45 175,38 C178,31 175,24 178,18 C181,12 189,15 187,8 C185,1 175,5 171,12 C167,19 168,27 163,32 C158,37 151,34 147,42 C143,50 149,58 143,64 C137,70 131,67 126,74 C121,81 126,90 121,98 C116,106 121,109 125,110 Z"
          fill="rgba(239, 110, 110, 0.35)"
        />
        <path
          d="M115,110 C117,95 120,82 128,74 C136,66 142,62 144,52 C146,42 138,38 139,28 C140,18 148,14 147,5 C146,-4 138,0 137,8 C136,16 132,22 129,30 C126,38 128,46 121,52 C114,58 109,52 105,62 C101,72 108,82 104,92 C100,102 109,108 115,110 Z"
          fill="rgba(244, 150, 110, 0.3)"
        />

        {/* Coral Center Accent */}
        <path
          d="M100,110 C99,98 94,88 90,80 C86,72 82,65 84,55 C86,45 94,38 95,28 C96,18 90,12 94,2 C98,-8 102,-4 101,6 C100,16 97,25 99,35 C101,45 106,52 103,62 C100,72 105,80 102,90 C99,100 101,107 100,110 Z"
          fill="rgba(14, 116, 144, 0.45)"
        />

        {/* Sea Star Left (Blue/Teal Watercolor) */}
        <g transform="translate(68, 62) rotate(15) scale(0.65)">
          <path
            d="M 0 -24 
               L 5 -8 
               L 22 -6 
               L 10 6 
               L 14 22 
               L 0 13 
               L -14 22 
               L -10 6 
               L -22 -6 
               L -5 -8 
               Z"
            fill="rgb(14, 116, 144)"
            stroke="rgba(224, 242, 254, 0.8)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Internal shading */}
          <path
            d="M 0 0 L 0 -24 M 0 0 L 5 -8 M 0 0 L 22 -6 M 0 0 L 10 6 M 0 0 L 14 22 M 0 0 L 0 13 M 0 0 L -14 22 M 0 0 L -10 6 M 0 0 L -22 -6 M 0 0 L -5 -8"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />
        </g>

        {/* Sea Star Right (Cerulean Light Blue) */}
        <g transform="translate(126, 66) rotate(-18) scale(0.58)">
          <path
            d="M 0 -24 
               L 5 -8 
               L 22 -6 
               L 10 6 
               L 14 22 
               L 0 13 
               L -14 22 
               L -10 6 
               L -22 -6 
               L -5 -8 
               Z"
            fill="rgb(6, 143, 182)"
            stroke="rgba(224, 242, 254, 0.8)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Internal shading */}
          <path
            d="M 0 0 L 0 -24 M 0 0 L 5 -8 M 0 0 L 22 -6 M 0 0 L 10 6 M 0 0 L 14 22 M 0 0 L 0 13 M 0 0 L -14 22 M 0 0 L -10 6 M 0 0 L -22 -6 M 0 0 L -5 -8"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1"
          />
        </g>
      </svg>
    </div>
  );
};

// Watercolor Coral footer (Reef/Seaweed at the bottom)
export const CoralFooter: React.FC = () => {
  return (
    <div className="relative w-full h-24 overflow-hidden mt-auto pointer-events-none select-none">
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-sky-100/50 to-transparent"></div>
      
      {/* Coral seaweed rising from left and right bottom */}
      <svg
        className="absolute bottom-0 w-full h-20 text-cyan-700/25"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left seaweed cluster */}
        <path
          d="M0,60 Q20,30 15,10 Q10,-10 5,60"
          fill="rgba(14, 116, 144, 0.25)"
        />
        <path
          d="M10,60 Q30,25 28,5 Q26,-15 15,60"
          fill="rgba(6, 182, 212, 0.2)"
        />
        <path
          d="M25,60 Q40,35 48,15 Q56,-5 35,60"
          fill="rgba(30, 41, 59, 0.15)"
        />
        <path
          d="M40,60 Q55,40 50,20 Q45,0 45,60"
          fill="rgba(14, 116, 144, 0.18)"
        />

        {/* Right seaweed cluster */}
        <path
          d="M400,60 Q380,30 385,10 Q390,-10 395,60"
          fill="rgba(14, 116, 144, 0.25)"
        />
        <path
          d="M390,60 Q370,25 372,5 Q374,-15 385,60"
          fill="rgba(6, 182, 212, 0.2)"
        />
        <path
          d="M375,60 Q360,35 352,15 Q344,-5 365,60"
          fill="rgba(30, 41, 59, 0.15)"
        />
        <path
          d="M360,60 Q345,40 350,20 Q355,0 355,60"
          fill="rgba(14, 116, 144, 0.18)"
        />

        {/* Center sea grass highlights */}
        <path
          d="M150,60 Q160,45 155,30 Q150,15 160,60 M250,60 Q240,40 248,25 Q256,10 245,60"
          stroke="rgba(14, 116, 144, 0.15)"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
};
