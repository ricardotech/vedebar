"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

// Register TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

interface IntroAnimationProps {
  isVisible: boolean;
  onComplete: () => void;
}

export default function IntroAnimation({ isVisible, onComplete }: IntroAnimationProps) {
  const textRef = useRef<HTMLDivElement>(null);

  const titles = [
    "O bar com a alma brasileira"
  ];

  useEffect(() => {
    if (!textRef.current || !isVisible) {
      return;
    }

    const tl = gsap.timeline();

    // Initial setup
    gsap.set(textRef.current, { opacity: 1 }); // Text should be visible for typing

    // Logo animation first
    tl.fromTo(".logo-animation", {
      opacity: 0,
      scale: 0.5,
      y: 50
    }, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out"
    })
    .to(".logo-animation", {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1
    }, "-=0.2")
    
    // Text typing animation
    .to(textRef.current, {
      duration: titles[0].length * 0.05, // Faster typing
      text: titles[0],
      ease: "none",
    }, "-=0.3");
    
    // Quick fade out
    tl.to({}, { duration: 1 })
      .to([".logo-animation", textRef.current], {
        opacity: 0,
        y: -30,
        scale: 0.9,
        duration: 0.8,
        ease: "power3.in",
        stagger: 0.1
      })
      .call(() => {
        onComplete();
      });

    return () => {
      tl.kill();
    };
  }, [isVisible, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/30 backdrop-blur-sm">
      {/* Logo */}
      <div className="logo-animation mb-8">
        <img 
          src="/VedeLogoWhite.png" 
          alt="Vedê Bar Logo" 
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain"
        />
      </div>
      
      {/* Text */}
      <div
        ref={textRef}
        className="text-white text-2xl md:text-4xl lg:text-5xl font-bold text-center px-8 tracking-wider"
        style={{
          fontFamily: "Georgia, serif",
          textShadow: "0 8px 32px rgba(0,0,0,0.8)",
          letterSpacing: "0.05em"
        }}
      />
      
    </div>
  );
} 