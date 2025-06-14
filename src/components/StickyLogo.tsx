"use client";

import React from "react";

interface StickyLogoProps {
  stickyLogoRef: React.RefObject<HTMLDivElement | null>;
  animationComplete: boolean;
}

export default function StickyLogo({ stickyLogoRef, animationComplete }: StickyLogoProps) {
  return (
    <div
      ref={stickyLogoRef}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none"
      style={{
        display: animationComplete ? "block" : "none"
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white transition-colors duration-300"
        style={{
          fontFamily: "Georgia, serif",
          textShadow: "0 2px 10px rgba(0,0,0,0.3)",
          letterSpacing: "0.05em"
        }}>
        VEDÊ
      </h1>
    </div>
  );
} 