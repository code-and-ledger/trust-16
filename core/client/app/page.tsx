'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use next/navigation for the new app router
import Image from 'next/image';
import SplashScreen from './components/splash-screen';

const Home: React.FC = () => {
  const [click, setClick] = useState(false);
  const [visible, setVisible] = useState(true); // State to control text opacity
  const router = useRouter(); // Initialize useRouter from next/navigation

  // Handle key press event
  useEffect(() => {
    const handleKeyPress = () => {
      setClick(true);
      router.push('/connect'); // Navigate to the connect page
    };

    // Add event listener for key press
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [router]);

  // Handle faster blinking effect for the h1 text
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible((prevVisible) => !prevVisible); // Toggle visibility
    }, 600); // Set interval to 0.6 seconds (600ms) for faster blinking

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="bg-background w-screen h-screen overflow-hidden flex flex-col justify-center items-center relative">
      <div
        className={`absolute top-0 bottom-0 right-1/2 bg-black transition-all duration-600 ease-in-out ${
          click ? 'w-1/2 h-full' : 'w-0 h-0'
        }`}
      />
      <div className="flex flex-col justify-center items-center">
        <Image
          src="/trust16.svg"
          alt="Trust SVG"
          width={256}
          height={256}
        />
        <h1
          className={`text-3xl font-bold mt-4 mb-4 transition-opacity duration-600 ease-in-out ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Press any button to continue
        </h1>
      </div>
      {/* Render SplashScreen when `click` is true */}
      {click && <SplashScreen />}
    </div>
  );
};

export default Home;
