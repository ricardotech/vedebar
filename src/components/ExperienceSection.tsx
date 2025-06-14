"use client";

import React from "react";

interface ExperienceSectionProps {
  reservationsVideoRef: React.RefObject<HTMLVideoElement | null>;
  animationComplete: boolean;
  reservationsVideoLoaded: boolean;
  onReserveClick: () => void;
}

export default function ExperienceSection({
  reservationsVideoRef,
  animationComplete,
  reservationsVideoLoaded,
  onReserveClick,
}: ExperienceSectionProps) {
  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      {/* Video Background */}
      <video
        ref={reservationsVideoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted
        playsInline
        style={{ 
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      >
        <source src="/reservations.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Static background for before video loads */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          display: animationComplete && reservationsVideoLoaded ? "none" : "block",
          filter: "brightness(0.4)",
          height: "100vh",
          minHeight: "100vh"
        }}
      />

      <div className="container mx-auto px-6 py-20 text-center relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-6xl text-white tracking-tight leading-tight mb-12"
            style={{ 
              fontFamily: "Georgia, serif", 
              textShadow: "0 8px 32px rgba(0,0,0,0.8)",
              fontWeight: 900
            }}>
            VIVA A EXPERIÊNCIA VEDÊ NO SEU EVENTO PRIVADO
          </h1>
          
          {/* CTA Button */}
          <button
            onClick={onReserveClick}
            className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl"
            style={{
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)"
            }}
          >
            Reservar
          </button>
        </div>
      </div>
    </section>
  );
} 