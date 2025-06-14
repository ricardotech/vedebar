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
    "Uma experiência única",
    "de coquetelaria e arte",
    "o bar com alma brasileira",
    "VEDÊ"
  ];

  useEffect(() => {
    if (!textRef.current || !isVisible) {
      return;
    }

    const tl = gsap.timeline();

    // Initial setup
    gsap.set(textRef.current, { opacity: 1 }); // Text should be visible for typing

    titles.forEach((title, index) => {
      const isLast = index === titles.length - 1;

      // Typing animation
      tl.to(textRef.current, {
        duration: title.length * 0.1, // Adjust speed of typing
        text: title,
        ease: "none",
      });

      if (!isLast) {
        // Wait, then "delete" the text from right to left
        const deleteVars = { length: title.length };
        tl.to(deleteVars, {
            duration: title.length * 0.05, // Adjust speed of deleting
            length: 0,
            onUpdate: () => {
                if (textRef.current) {
                    textRef.current.textContent = title.substring(0, Math.round(deleteVars.length));
                }
            },
            ease: "none"
        }, "+=1.5");
      }
    });
    
    // Final title stays for a moment then fades out
    tl.to({}, { duration: 3 })
      .to(textRef.current, {
        opacity: 0,
        y: -50,
        scale: 1.3,
        duration: 1.5,
        ease: "power3.in"
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
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm">
      <div
        ref={textRef}
        className="text-white text-4xl md:text-6xl lg:text-8xl font-bold text-center px-8 tracking-wider"
        style={{
          fontFamily: "Georgia, serif",
          textShadow: "0 8px 32px rgba(0,0,0,0.6)",
          letterSpacing: "0.05em"
        }}
      />
    </div>
  );
} 