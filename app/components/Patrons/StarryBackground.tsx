"use client"
import React, { useState, useEffect } from 'react';

const StarryBackground = ({ children }: { children?: React.ReactNode }) => {
  
  const [starStyles, setStarStyles] = useState({
    small: '',
    medium: '',
    large: ''
  });

  const generateStars = (count: number) => {
    let shadowString = '';
    for (let i = 0; i < count; i++) {
      const x = Math.floor(Math.random() * 100);
      const y = Math.floor(Math.random() * 100);
      shadowString += `${x}vw ${y}vh 0 #fff, `; 
    }
    return shadowString.slice(0, -2);
  };

  useEffect(() => {
    const small = generateStars(700);
    const medium = generateStars(200);
    const large = generateStars(100);

    setStarStyles({
      small,
      medium,
      large
    });
  }, []);

  return (
    // CHANGE 1: 'h-screen' hata diya aur 'min-h-screen' lagaya. 'overflow-hidden' hata diya.
    <div className="relative w-full min-h-screen bg-[#050b14] text-white selection:bg-cyan-500/30">
      
      {/* CHANGE 2: Background Elements ko 'fixed' container me daal diya.
          Isse stars screen pe chipke rahenge jab aap scroll karoge.
      */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        
        {/* --- LAYER 1: FOG/NEBULA --- */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vh] bg-blue-900/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[80vw] h-[40vh] bg-slate-800/30 rotate-12 blur-[80px]" />
        <div className="absolute top-[30%] right-[10%] w-[60vw] h-[50vh] bg-blue-900/20 -rotate-12 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[60vh] bg-blue-950/40 rounded-full blur-[120px]" />

        {/* --- LAYER 2: THE STARS --- */}
        {starStyles.small && (
          <>
            <div 
              className="absolute w-[1px] h-[1px] bg-transparent opacity-80"
              style={{ boxShadow: starStyles.small }}
            />
            <div 
              className="absolute w-[2px] h-[2px] bg-transparent opacity-60"
              style={{ boxShadow: starStyles.medium }}
            />
            <div 
              className="absolute w-[3px] h-[3px] bg-transparent opacity-40 animate-pulse"
              style={{ boxShadow: starStyles.large }}
            />
          </>
        )}
        
        {/* --- LAYER 2.5: DIMMING OVERLAY --- */}
        <div className="absolute inset-0 bg-black/50 z-[1]" />
      </div>

      {/* --- LAYER 3: CONTENT --- */}
      {/* Content ab 'relative' hai, jo fixed background ke upar scroll karega */}
      <div className="relative z-10 w-full">
        {children}
      </div>

    </div>
  );
};

export default StarryBackground;
