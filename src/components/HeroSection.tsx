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

      <div className="container mx-auto px-6 py-20 text-center relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold text-white tracking-tight leading-none"
            style={{ 
              fontFamily: "Georgia, serif", 
              textShadow: "0 8px 32px rgba(0,0,0,0.8)",
              fontWeight: 900
            }}>
            VEDÊ
          </h1>
        </div>
      </div>
    </section>
  );
} 