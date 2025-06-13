"use client";

import { useEffect, useState, useRef } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";

export default function Home() {
  // Array of titles to animate
  const titles = [
    "Creative Design",
    "Digital Solutions",
    "Modern Experiences",
    "Innovative Ideas",
    "Bold Visions"
  ];

  const [currentTitle, setCurrentTitle] = useState(0);
  const titleRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initialize GSAP animation after it's loaded
    const initAnimation = () => {
      if (typeof window.gsap !== 'undefined' && titleRef.current) {
        // Set initial state
        window.gsap.set(titleRef.current, { y: 0, opacity: 1 });
        
        const interval = setInterval(() => {
          // Animate out current title
          window.gsap.to(titleRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.7,
            ease: "power2.inOut",
            onComplete: () => {
              // Change title
              setCurrentTitle(prev => (prev + 1) % titles.length);
              
              // Reset position for next title
              window.gsap.set(titleRef.current, { y: 100, opacity: 0 });
              
              // Animate in new title
              window.gsap.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.inOut"
              });
            }
          });
        }, 3000); // Change title every 3 seconds
        
        return () => clearInterval(interval);
      }
    };

    // Wait for GSAP to be available
    if (typeof window !== 'undefined' && typeof window.gsap !== 'undefined') {
      initAnimation();
    } else {
      // If GSAP isn't available immediately, wait a bit
      const timer = setTimeout(initAnimation, 500);
      return () => clearTimeout(timer);
    }
  }, [titles.length]);

  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center min-h-screen bg-green-600"
    >
      <div className="max-w-4xl w-full min-h-[50vh] flex items-center justify-start px-8">
        <h1 
          ref={titleRef}
          className="text-white text-6xl md:text-8xl font-bold tracking-tighter"
        >
          {titles[currentTitle]}
        </h1>
      </div>
      
      {/* GSAP from CDN */}
      <Script 
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" 
        strategy="afterInteractive"
        onLoad={() => {
          console.log("GSAP loaded");
        }}
      />
    </div>
  );
}

// Add TypeScript declaration for GSAP
declare global {
  interface Window {
    gsap: any;
  }
}
