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
      className="hidden"
      style={{
        display: "none"
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