"use client";

import React, { useRef } from "react";

interface HeroSectionProps {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  animationComplete: boolean;
  videoLoaded: boolean;
}

export default function HeroSection({
  videoRef,
  animationComplete,
  videoLoaded,
}: HeroSectionProps) {
  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        style={{ 
          display: animationComplete ? "block" : "none",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      >
        <source src="/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static background for before video loads */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          display: animationComplete && videoLoaded ? "none" : "block",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      />

{/* Desktop Layout: Logo Left, Text Right */}
      <div className="hidden md:flex container mx-auto px-6 py-20 relative z-10 items-center justify-center h-full max-w-6xl">
        {/* Logo on the Left - INCREASED SIZE */}
        <div className="flex-shrink-0 mr-12">
          <img 
            src="/VedeLogoWhite.png" 
            alt="Vedê Bar Logo" 
            className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] object-contain"
            style={{
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.8))"
            }}
          />
        </div>
        
        {/* Text on the Right */}
        <div className="flex-1 text-left">
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight leading-tight"
            style={{ 
              fontFamily: "Georgia, serif", 
              textShadow: "0 8px 32px rgba(0,0,0,0.8)",
              fontWeight: 900,
              letterSpacing: "0.02em"
            }}>
            SEU BAR COM<br />ALMA BRASILEIRA
          </h1>
        </div>
      </div>

      {/* Mobile Layout: Text Centered */}
      <div className="md:hidden container mx-auto px-6 py-20 text-center relative z-10 flex items-center justify-center h-full">
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight"
          style={{ 
            fontFamily: "Georgia, serif", 
            textShadow: "0 8px 32px rgba(0,0,0,0.8)",
            fontWeight: 900,
            letterSpacing: "0.02em"
          }}>
          SEU BAR COM<br />ALMA BRASILEIRA
        </h1>
      </div>
    </section>
  );
} 