"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { drinks, barImages, categories } from "@/bebidas";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const menuSectionRef = useRef<HTMLDivElement>(null);
  const gallerySectionRef = useRef<HTMLDivElement>(null);
  
  const [animationComplete, setAnimationComplete] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedDrink, setSelectedDrink] = useState<typeof drinks[0] | null>(null);

  const titles = [
    "Bem-vindos",
    "Uma experiência única", 
    "Coquetelaria & Arte",
    "O bar com alma brasileira",
    "VEDÊ BAR"
  ];

  const filteredDrinks = selectedCategory === "Todos" 
    ? drinks 
    : drinks.filter(drink => drink.category === selectedCategory);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Initial setup with 0.25 opacity
    gsap.set([bgImageRef.current, overlayRef.current, textRef.current], {
      opacity: 0,
    });
    
    gsap.set(menuSectionRef.current, { opacity: 0, y: 100 });
    gsap.set(gallerySectionRef.current, { opacity: 0, y: 100 });

    // Phase 1: Background image fade in to 0.25 opacity
    tl.to(bgImageRef.current, {
      opacity: 0.25,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(overlayRef.current, {
      opacity: 0.25,
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
        // Phase 3: Hold the final title and enable scroll
        tl.to({}, { duration: 2 })
        .call(() => {
          setAnimationComplete(true);
        });
      }
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Scroll-triggered animations
  useEffect(() => {
    if (!animationComplete) return;

    // Menu section animation
    gsap.fromTo(menuSectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: menuSectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Gallery section animation
    gsap.fromTo(gallerySectionRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: gallerySectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Parallax effect for background
    gsap.to(bgImageRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

  }, [animationComplete]);

  const handleDrinkClick = (drink: typeof drinks[0]) => {
    setSelectedDrink(drink);
  };

  const closeDrinkModal = () => {
    setSelectedDrink(null);
  };

  return (
    <div ref={containerRef} className="relative w-full bg-black text-white">
      {/* Hero Section with Animation */}
      <section ref={heroSectionRef} className="relative w-full h-screen overflow-hidden">
        {/* Background Image */}
        <div 
          ref={bgImageRef}
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-110"
          style={{
            backgroundImage: "url('/bg.jpeg')",
          }}
        />
        
        {/* Overlay */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/80"
        />

        {/* Animated Text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={textRef}
            className="text-white text-4xl md:text-6xl lg:text-8xl font-light text-center px-8 tracking-widest"
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              textShadow: "0 4px 40px rgba(0,0,0,0.8)",
              letterSpacing: "0.1em"
            }}
          >
            {/* Text will be dynamically updated */}
          </div>
        </div>

        {/* Scroll indicator */}
        {animationComplete && (
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
            <div className="w-px h-12 bg-white/30 mx-auto mb-4"></div>
            <p className="text-sm font-light tracking-wider">SCROLL</p>
          </div>
        )}
      </section>

      {/* Content Sections - Only show after animation */}
      {animationComplete && (
        <>
          {/* Menu Section */}
          <section ref={menuSectionRef} className="min-h-screen py-24 bg-black">
            <div className="max-w-7xl mx-auto px-6">
              {/* Section Header */}
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
                  Menu
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                  Coquetéis únicos inspirados na cultura brasileira
                </p>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-4 mb-16">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Drinks Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredDrinks.map((drink, index) => (
                  <div
                    key={drink.id}
                    onClick={() => handleDrinkClick(drink)}
                    className="group cursor-pointer"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm">
                      <div className="aspect-square relative">
                        <Image
                          src={drink.src}
                          alt={drink.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/60 transition-all duration-500" />
                        
                        {/* Name */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="text-white text-xl md:text-2xl font-light text-center px-4 tracking-wide">
                            {drink.name}
                          </h3>
                        </div>

                        {/* Description on hover */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h3 className="text-white text-2xl font-light mb-4 text-center">
                            {drink.name}
                          </h3>
                          <p className="text-white/80 text-sm text-center leading-relaxed">
                            {drink.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Gallery Section */}
          <section ref={gallerySectionRef} className="min-h-screen py-24 bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
              {/* Section Header */}
              <div className="text-center mb-20">
                <h2 className="text-5xl md:text-7xl font-light mb-6 tracking-wide">
                  Ambiente
                </h2>
                <p className="text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
                  Um espaço onde arte, cultura e gastronomia se encontram
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {barImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-3xl aspect-video"
                    style={{
                      animationDelay: `${index * 0.2}s`
                    }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Title */}
                    <div className="absolute bottom-8 left-8">
                      <h3 className="text-white text-2xl md:text-3xl font-light mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-32 bg-gradient-to-b from-zinc-950 to-black">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-5xl md:text-7xl font-light mb-8 tracking-wide">
                Faça uma Reserva
              </h2>
              <p className="text-xl text-white/70 mb-12 font-light leading-relaxed">
                Garanta seu lugar nesta experiência única
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <a 
                  href="tel:+5511999999999"
                  className="group px-12 py-4 bg-white text-black rounded-full text-lg font-medium transition-all duration-300 hover:bg-white/90 hover:scale-105"
                >
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    Ligar Agora
                  </span>
                </a>
                <a 
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-12 py-4 border border-white/30 text-white rounded-full text-lg font-medium transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
                >
                  <span className="group-hover:tracking-wider transition-all duration-300">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-16 bg-black border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-8 md:mb-0">
                  <h3 className="text-2xl font-light tracking-wider mb-2">VEDÊ BAR</h3>
                  <p className="text-white/50 text-sm">Coquetelaria & Arte</p>
                </div>
                
                <div className="flex space-x-8">
                  <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Instagram</a>
                  <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">Facebook</a>
                  <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">WhatsApp</a>
                </div>
              </div>
              
              <div className="border-t border-white/10 mt-12 pt-8 text-center">
                <p className="text-white/30 text-sm">
                  © 2024 Vedê Bar. Todos os direitos reservados.
                </p>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Drink Detail Modal */}
      {selectedDrink && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={closeDrinkModal}
        >
          <div 
            className="max-w-2xl w-full bg-white/10 backdrop-blur-sm rounded-3xl p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeDrinkModal}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl"
            >
              ×
            </button>
            
            <div className="aspect-square w-48 mx-auto mb-8 relative">
              <Image
                src={selectedDrink.src}
                alt={selectedDrink.name}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            
            <h3 className="text-3xl font-light text-center mb-4 tracking-wide">
              {selectedDrink.name}
            </h3>
            
            <p className="text-white/80 text-center mb-6 leading-relaxed">
              {selectedDrink.description}
            </p>
            
            <div className="mb-6">
              <h4 className="text-white/70 text-sm uppercase tracking-wider mb-3">Ingredientes</h4>
              <div className="flex flex-wrap gap-2">
                {selectedDrink.ingredients.map((ingredient, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/80"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                {selectedDrink.category}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}