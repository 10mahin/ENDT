
import React, { useEffect, useState } from 'react';

interface LoadingOverlayProps {
  onLoadingComplete: () => void;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ onLoadingComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 400);
    const exitTimer = setTimeout(() => setIsExiting(true), 2400);
    const completeTimer = setTimeout(() => onLoadingComplete(), 3200);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <h1 
          className={`text-white text-5xl md:text-7xl font-black tracking-[0.8em] translate-x-[0.4em] transition-all duration-[1500ms] ease-out ${
            showLogo ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-95 blur-md'
          }`}
        >
          ENDT
        </h1>
        <div 
          className={`mt-8 w-12 h-px bg-white/20 transition-all duration-[2000ms] delay-500 ease-out ${
            showLogo ? 'w-32 opacity-100' : 'w-0 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default LoadingOverlay;
