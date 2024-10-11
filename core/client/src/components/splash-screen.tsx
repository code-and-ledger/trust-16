import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SplashScreen = () => {
  const [isFirstSvg, setIsFirstSvg] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsFirstSvg(prev => !prev);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="w-64 h-64 relative transition-opacity duration-500 ease-in-out">
        <Image
          src={isFirstSvg ? "/trust16.svg" : "/trust16Inverted.svg"}
          alt="Trust SVG"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};

export default SplashScreen;