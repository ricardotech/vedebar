"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  const [animationComplete, setAnimationComplete] = useState(false);

  const titles = [
    "Bem-vindos",
    "Uma experiência única",
    "Coquetelaria & Arte",
    "O bar com alma brasileira",
    "VEDÊ BAR"
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Initial setup
    gsap.set([bgImageRef.current, overlayRef.current, textRef.current], {
      opacity: 0,
    });

    // Phase 1: Background image fade in
    tl.to(bgImageRef.current, {
      opacity: 0.7,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(overlayRef.current, {
      opacity: 0.8,
      duration: 1,
      ease: "power2.inOut"
    }, "-=1");

    // Phase 2: Text animations
    titles.forEach((title, index) => {
      const isLast = index === titles.length - 1;
      
      tl.call(() => {
        if (textRef.current) {
          textRef.current.textContent = title;
        }
      })
      .fromTo(textRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.9 
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power2.out"
        }
      );

      if (!isLast) {
        tl.to(textRef.current, {
          opacity: 0,
          y: -30,
          scale: 1.1,
          duration: 0.8,
          ease: "power2.in"
        }, "+=1.5");
      } else {
        // Phase 3: Hold the final title
        tl.to({}, { duration: 2 });
        
        // Phase 4: Transform to header layout
        tl.to(textRef.current, {
          scale: 0.6,
          y: -window.innerHeight * 0.35,
          x: -window.innerWidth * 0.3,
          duration: 1.5,
          ease: "power2.inOut"
        })
        .to(overlayRef.current, {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          duration: 1,
          ease: "power2.inOut"
        }, "-=1")
        .to(bgImageRef.current, {
          opacity: 0.3,
          duration: 1,
          ease: "power2.inOut"
        }, "-=1")
        .to(textRef.current, {
          color: "#166534",
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.5")
        .to(mainContentRef.current, {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        }, "-=0.5")
        .call(() => {
          setAnimationComplete(true);
        });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        ref={bgImageRef}
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          backgroundAttachment: "fixed"
        }}
      />
      


      {/* Animated Text */}
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          ref={textRef}
          className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center px-8 tracking-wider"
          style={{
            fontFamily: "Georgia, serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}
        >
          {/* Text will be dynamically updated */}
        </div>
      </div>

      {/* Main Content (appears after animation) */}
      <main 
        ref={mainContentRef}
        className="relative z-10"
        style={{ 
          display: animationComplete ? "block" : "none"
        }}
      >
        <section className="min-h-screen flex items-center justify-center bg-white/90">
          <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6" style={{ fontFamily: "Georgia, serif" }}>
              Vedê | Coquetelaria & Arte
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              🇧🇷 O bar com alma brasileira onde cada drink é uma obra de arte
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="bg-green-800 hover:bg-green-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Ver Menu
              </button>
              <button className="border-2 border-green-800 text-green-800 hover:bg-green-800 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Reservar Mesa
              </button>
            </div>
          </div>
        </section>

        {/* Additional sections */}
        <section id="sobre" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-8" style={{ fontFamily: "Georgia, serif" }}>
                Nossa História
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                No Vedê Bar, celebramos a rica cultura brasileira através de coquetéis únicos e arte local. 
                Cada drink conta uma história, cada ambiente respira criatividade. Venha viver uma experiência 
                sensorial completa onde sabores, aromas e arte se encontram.
              </p>
            </div>
          </div>
        </section>

        <section id="arte" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Arte & Cultura
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Um espaço dedicado à expressão artística brasileira, onde artistas locais expõem suas obras 
                e a cultura nacional ganha vida.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}