'use client';  // Mark as a client-side component

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  // Set a timer to hide the header after a certain period of inactivity
  useEffect(() => {
    const inactivityTimer = setInterval(() => {
      if (Date.now() - lastInteraction > 3000) {  // 3 seconds of inactivity
        setShowHeader(false);
      }
    }, 1000);  // Check every second

    // Cleanup the timer when the component unmounts
    return () => clearInterval(inactivityTimer);
  }, [lastInteraction]);

  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      setShowHeader(true);
      setLastInteraction(Date.now());  // Update last interaction time
    };

    // Handle mouse move event
    const handleMouseMove = () => {
      setShowHeader(true);
      setLastInteraction(Date.now());  // Update last interaction time
    };

    // Add event listeners for scroll and mouse movement
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className={`w-full absolute z-10 transition-opacity duration-500 ease-in-out ${!showHeader && 'opacity-0'}`}
      style={{
        backdropFilter: 'blur(10px)',  // Apply blur effect to the content behind the header
        backgroundColor: 'rgba(255, 255, 255, 0.6)',  // White background with some transparency
      }}
    >
      <nav className='container relative flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link className='font-bold text-xl text-black' href="/">Home</Link>
        <div className='space-x-3 text-l'>
          <Link href="/performance" className="text-black">Savings</Link>
          <Link href="/scale" className="text-black">Withdraw</Link>
          <Link href="/reliability" className="text-black">Archives</Link>
          <Link href="/profile" className="text-black">Profile</Link>
        </div>
      </nav>
    </div>
  );
}
