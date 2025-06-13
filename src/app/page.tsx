"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const drinksContainerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  
  const [animationComplete, setAnimationComplete] = useState(false);

  const titles = [
    "BEM-VINDOS",
    "EXPERIÊNCIA ÚNICA", 
    "COQUETELARIA & ARTE",
    "ALMA BRASILEIRA",
    "VEDÊ BAR"
  ];

  const drinks = [
    {
      id: 1,
      name: "CAIPIRINHA ARTESANAL",
      description: "Nossa versão clássica com cachaça premium e limões selecionados da fazenda",
      image: "/bebidas/bebida1.png",
      price: "28",
      category: "CLÁSSICOS"
    },
    {
      id: 2,
      name: "TROPICÁLIA",
      description: "Gin brasileiro, maracujá, manjericão e toque de pimenta biquinho",
      image: "/bebidas/bebida2.png",
      price: "35",
      category: "AUTORAIS"
    },
    {
      id: 3,
      name: "IPANEMA SUNSET",
      description: "Vodka premium, açaí, limão siciliano e espuma de coco fresco",
      image: "/bebidas/bebida3.png",
      price: "32",
      category: "PREMIUM"
    },
    {
      id: 4,
      name: "AMAZÔNIA",
      description: "Cachaça envelhecida, cupuaçu, gengibre e mel silvestre do Pará",
      image: "/bebidas/bebida4.png",
      price: "38",
      category: "PREMIUM"
    },
    {
      id: 5,
      name: "SERTÃO DOURADO",
      description: "Whiskey nacional, rapadura, limão e ervas nativas do cerrado",
      image: "/bebidas/bebida5.png",
      price: "42",
      category: "PREMIUM"
    },
    {
      id: 6,
      name: "CARNAVAL",
      description: "Rum especial, frutas vermelhas, manjericão e champagne francês",
      image: "/bebidas/bebida6.png",
      price: "36",
      category: "CELEBRAÇÃO"
    },
    {
      id: 7,
      name: "BOSSA NOVA",
      description: "Gin artesanal, elderflower, pepino e água tônica premium",
      image: "/bebidas/bebida7.png",
      price: "34",
      category: "AUTORAIS"
    },
    {
      id: 8,
      name: "CERRADO SELVAGEM",
      description: "Mezcal importado, pequi, limão galego e sal de ervas nativas",
      image: "/bebidas/bebida8.png",
      price: "40",
      category: "SELVAGEM"
    },
    {
      id: 9,
      name: "RIO DOURADO",
      description: "Cachaça gold, caju fresco, canela do Ceilão e açúcar mascavo",
      image: "/bebidas/bebida9.png",
      price: "30",
      category: "CLÁSSICOS"
    },
    {
      id: 10,
      name: "PANTANAL",
      description: "Gin brasileiro, taperebá, capim santo e água mineral com gás",
      image: "/bebidas/bebida10.png",
      price: "33",
      category: "AUTORAIS"
    },
    {
      id: 11,
      name: "NORDESTE VIBRANTE",
      description: "Cachaça branca, pitanga, hortelã selvagem e água de coco verde",
      image: "/bebidas/bebida11.png",
      price: "29",
      category: "REGIONAL"
    },
    {
      id: 12,
      name: "MATA ATLÂNTICA",
      description: "Vodka premium, jabuticaba, tomilho e tônica artesanal",
      image: "/bebidas/bebida12.png",
      price: "37",
      category: "PREMIUM"
    }
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Initial setup
    gsap.set(bgImageRef.current, { opacity: 0.15 });
    gsap.set(textRef.current, { opacity: 0 });
    gsap.set(mainContentRef.current, { opacity: 0 });

    // Intro animation
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
          rotationX: 90
        },
        { 
          opacity: 1, 
          y: 0,
          rotationX: 0,
          duration: 1.2,
          ease: "power4.out"
        }
      );

      if (!isLast) {
        tl.to(textRef.current, {
          opacity: 0,
          y: -50,
          rotationX: -90,
          duration: 0.8,
          ease: "power4.in"
        }, "+=1.5");
      } else {
        tl.to({}, { duration: 2 })
        .to(textRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 1,
          ease: "power4.in"
        })
        .to(mainContentRef.current, {
          opacity: 1,
          duration: 1.5,
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

  useEffect(() => {
    if (!animationComplete) return;

    // Header animation on scroll
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom 90%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Horizontal scrolling setup
    if (horizontalSectionRef.current && drinksContainerRef.current) {
      const horizontalSection = horizontalSectionRef.current;
      const drinksContainer = drinksContainerRef.current;
      
      const scrollWidth = drinksContainer.scrollWidth;
      const containerWidth = horizontalSection.offsetWidth;
      
      gsap.to(drinksContainer, {
        x: -(scrollWidth - containerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          start: "top top",
          end: () => `+=${scrollWidth - containerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    }

    // Drink cards stagger animation
    const drinkCards = document.querySelectorAll('.drink-card');
    gsap.fromTo(drinkCards,
      {
        opacity: 0,
        y: 100,
        rotationY: 45
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hero parallax
    gsap.to(heroRef.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationComplete]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black">
      {/* Background */}
      <div 
        ref={bgImageRef}
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          opacity: 0.15
        }}
      />

      {/* Intro Animation */}
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black" 
           style={{ display: animationComplete ? "none" : "flex" }}>
        <div
          ref={textRef}
          className="text-white text-4xl md:text-6xl lg:text-8xl font-black text-center px-8 tracking-[0.2em] uppercase"
          style={{
            fontFamily: "Arial Black, sans-serif",
            textShadow: "4px 4px 0px #333",
            transform: "perspective(1000px)"
          }}
        />
      </div>

      {/* Fixed Header */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-40 bg-black border-b-4 border-white"
        style={{ display: animationComplete ? "block" : "none" }}
      >
        <div className="flex justify-between items-center px-8 py-6">
          <h1 className="text-3xl font-black text-white tracking-[0.3em] uppercase">
            VEDÊ
          </h1>
          <nav className="hidden md:flex space-x-12">
            <button className="text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black px-4 py-2 transition-all duration-300">
              MENU
            </button>
            <button className="text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black px-4 py-2 transition-all duration-300">
              RESERVAS
            </button>
            <button className="text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black px-4 py-2 transition-all duration-300">
              CONTATO
            </button>
          </nav>
          <button className="bg-white text-black px-6 py-2 font-black uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300">
            RESERVE
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main 
        ref={mainContentRef}
        className="relative z-10"
        style={{ display: animationComplete ? "block" : "none" }}
      >
        {/* Hero Section */}
        <section ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden">
          <div className="text-center relative z-10">
            <h1 className="text-8xl md:text-[12rem] lg:text-[16rem] font-black text-white mb-8 tracking-[0.1em] uppercase leading-none" 
                style={{ 
                  fontFamily: "Arial Black, sans-serif",
                  textShadow: "8px 8px 0px #333, 16px 16px 0px #111"
                }}>
              VEDÊ
            </h1>
            <div className="w-32 h-2 bg-white mx-auto mb-12" />
            <p className="text-2xl md:text-4xl text-white font-bold uppercase tracking-[0.2em] mb-16 max-w-4xl mx-auto leading-tight">
              COQUETELARIA & ARTE<br />
              <span className="text-yellow-400">EXPERIÊNCIA BRASILEIRA</span>
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <button className="bg-white text-black px-12 py-6 font-black text-xl uppercase tracking-wider hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105">
                EXPLORAR DRINKS
              </button>
              <button className="border-4 border-white text-white hover:bg-white hover:text-black px-12 py-6 font-black text-xl uppercase tracking-wider transition-all duration-300">
                FAZER RESERVA
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal Scrolling Drinks Section */}
        <section 
          ref={horizontalSectionRef}
          className="relative overflow-hidden bg-gradient-to-r from-green-900 to-green-700"
        >
          {/* Section Header */}
          <div className="absolute top-0 left-0 z-10 p-12 bg-black/80">
            <h2 className="text-6xl md:text-8xl font-black text-white mb-4 uppercase tracking-[0.1em]">
              COLEÇÃO
            </h2>
            <p className="text-xl text-white/80 font-bold uppercase tracking-wider">
              DRINKS AUTORAIS
            </p>
          </div>

          <div 
            ref={drinksContainerRef}
            className="flex items-center py-24 pl-96"
            style={{ width: 'fit-content' }}
          >
            {drinks.map((drink, index) => (
              <div key={drink.id} className="drink-card flex-shrink-0 mr-12 group cursor-pointer">
                <div className="w-80 h-[32rem] bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-500 hover:shadow-[24px_24px_0px_0px_rgba(0,0,0,1)] hover:transform hover:-translate-x-2 hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 border-b-4 border-black overflow-hidden">
                    <img 
                      src={drink.image} 
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 h-64 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-black uppercase tracking-wider bg-black text-white px-3 py-1">
                          {drink.category}
                        </span>
                        <span className="text-2xl font-black text-black">
                          R${drink.price}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-black mb-4 leading-tight uppercase tracking-wide">
                        {drink.name}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium leading-relaxed">
                        {drink.description}
                      </p>
                    </div>
                    
                    <button className="w-full bg-black text-white py-3 font-black uppercase tracking-wider hover:bg-yellow-400 hover:text-black transition-all duration-300">
                      PEDIR
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Call to Action Card */}
            <div className="flex-shrink-0 ml-12">
              <div className="w-80 h-[32rem] bg-yellow-400 border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-4xl font-black text-black mb-8 uppercase tracking-wider leading-tight">
                    VIVA A<br />EXPERIÊNCIA<br />COMPLETA
                  </h3>
                  <button className="bg-black text-white px-8 py-4 font-black uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300">
                    RESERVAR MESA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="min-h-screen bg-black text-white flex items-center justify-center py-32">
          <div className="container mx-auto px-8 text-center">
            <h2 className="text-6xl md:text-8xl font-black mb-12 uppercase tracking-[0.1em]" 
                style={{ textShadow: "4px 4px 0px #333" }}>
              RESERVE<br />
              <span className="text-yellow-400">AGORA</span>
            </h2>
            <div className="w-32 h-2 bg-white mx-auto mb-12" />
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto mb-16 font-bold uppercase tracking-wider leading-relaxed">
              UMA NOITE ONDE ARTE, CULTURA E SABORES BRASILEIROS<br />
              SE ENCONTRAM EM PERFEITA HARMONIA
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
              <button className="bg-yellow-400 text-black px-16 py-6 font-black text-xl uppercase tracking-wider hover:bg-white transition-all duration-300 transform hover:scale-105">
                WHATSAPP
              </button>
              <button className="border-4 border-white text-white hover:bg-white hover:text-black px-16 py-6 font-black text-xl uppercase tracking-wider transition-all duration-300">
                LOCALIZAÇÃO
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}