"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

// Register ScrollTrigger and TextPlugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin);
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reservationsVideoRef = useRef<HTMLVideoElement>(null);
  const stickyLogoRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const imageScrollRef = useRef<HTMLDivElement>(null);
  const drinkModalRef = useRef<HTMLDivElement>(null);
  const drinkModalContentRef = useRef<HTMLDivElement>(null);

  const [animationComplete, setAnimationComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [reservationsVideoLoaded, setReservationsVideoLoaded] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(true); // Toggle for development
  const [selectedDrink, setSelectedDrink] = useState<typeof drinks[0] | null>(null);
  const [isDrinkModalOpen, setIsDrinkModalOpen] = useState(false);

  const titles = [
    "Uma experiência única",
    "de coquetelaria e arte",
    "o bar com alma brasileira",
    "VEDÊ"
  ];

  const drinks = [
    {
      id: 1,
      name: "Iça Manauara",
      description: "Cachaça de jambu, cachaça ouro infusionada pixuri, maracujá, amora, xarope de pixuri e finalizado com espuma de açaí com guaraná e pixuri ralado. Doce, frutado, refrescante",
      image: "/bebidas/bebida1.png"
    },
    {
      id: 2,
      name: "Tropicália",
      description: "Gin brasileiro, maracujá, manjericão e toque de pimenta",
      image: "/bebidas/bebida2.png"
    },
    {
      id: 3,
      name: "Guigó",
      description: "Cachaça envelhecida infusionada amburana, vermouth dry, suco de caju, lillet, xarope simples, triple sec. Defumado com casca de caju e amburan",
      image: "/bebidas/bebida3.png"
    },
    {
      id: 4,
      name: "Cabruca",
      description: "Vodka infusionada nibs de cacau, leão do norte, mix de limões, suco de maracujá, xarope de caramelo, clara, finalizado com chocolate amargo. Redescobrindo as maravilhas nativas da mata atlântica, tão rica e poderosa que nos traz calma, alegria e conforta os corações. Leve, aromático, herbal",
      image: "/bebidas/bebida4.png"
    },
    {
      id: 5,
      name: "Canindé",
      description: "Whiskey infusionado casca de jatobá, paratudo, xarope de baru, maracujá, mix de limões, curaçau blue e pasta de camu-camu. Cítrico, refrescante e frutado",
      image: "/bebidas/bebida5.png"
    },
    {
      id: 6,
      name: "King Fashioned",
      description: "Whiskey infusionado com café, xarope simples, angostura e grãos de café. Seco, aromático, encorpado",
      image: "/bebidas/bebida6.png"
    },
    {
      id: 7,
      name: "Ajuba",
      description: "Drink especial da casa com ingredientes selecionados",
      image: "/bebidas/bebida7.png"
    },
    {
      id: 8,
      name: "Negroni Verão",
      description: "GIN BEG, campari, vermute rosso, suco de laranja e água com gás. Refrescante e amargo",
      image: "/bebidas/bebida8.png"
    },
    {
      id: 9,
      name: "Penicilin",
      description: "Scotch whiskey, gengibre, mix de limões e mel. Seco, aromático",
      image: "/bebidas/bebida9.png"
    },
    {
      id: 10,
      name: "Pisco Sour",
      description: "Pisco reservado, mix de limões, xarope simples, clara pasteurizada e angostura. Cítrico, refrescante",
      image: "/bebidas/bebida10.png"
    },
    {
      id: 13,
      name: "Negroni Verão",
      description: "GIN BEG, campari, vermute rosso, suco de laranja e água com gás. Refrescante e amargo",
      image: "/bebidas/bebida13.jpg"
    },
    {
      id: 14,
      name: "Premium Selection",
      description: "Drink especial do chef com destilados importados e frutas exóticas",
      image: "/bebidas/bebida14.jpg"
    }
  ];

  const modalImages = [
    "/bebidas/bebida1.png",
    "/bebidas/bebida2.png",
    "/bebidas/bebida3.png",
    "/bebidas/bebida4.png",
    "/bebidas/bebida5.png",
    "/bebidas/bebida6.png",
    "/bebidas/bebida7.png",
    "/bebidas/bebida8.png"
  ];

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    gsap.set(modalRef.current, { display: 'flex' });
    gsap.fromTo(modalRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(modalContentRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );

    // Start image scroll animation
    gsap.to(imageScrollRef.current, {
      x: "-50%",
      duration: 30,
      ease: "none",
      repeat: -1
    });
  };

  const closeModal = () => {
    gsap.to(modalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power3.in"
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        setIsModalOpen(false);
        document.body.style.overflow = 'auto';
        gsap.set(modalRef.current, { display: 'none' });
      }
    });
  };

  const openDrinkModal = (drink: typeof drinks[0]) => {
    setSelectedDrink(drink);
    setIsDrinkModalOpen(true);
    document.body.style.overflow = 'hidden';
    
    // Animate modal in
    gsap.set(drinkModalRef.current, { display: 'flex' });
    gsap.fromTo(drinkModalRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" }
    );
    gsap.fromTo(drinkModalContentRef.current,
      { scale: 0.8, opacity: 0, y: 50 },
      { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 }
    );
  };

  const closeDrinkModal = () => {
    gsap.to(drinkModalContentRef.current, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      duration: 0.3,
      ease: "power3.in"
    });
    gsap.to(drinkModalRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => {
        setIsDrinkModalOpen(false);
        setSelectedDrink(null);
        document.body.style.overflow = 'auto';
        gsap.set(drinkModalRef.current, { display: 'none' });
      }
    });
  };

  useEffect(() => {
    const mainVideo = videoRef.current;
    const reservationsVideo = reservationsVideoRef.current;

    const mainCanPlay = () => setVideoLoaded(true);
    const reservationsCanPlay = () => setReservationsVideoLoaded(true);

    if (mainVideo) {
      mainVideo.preload = 'auto';
      mainVideo.addEventListener('canplaythrough', mainCanPlay);
      mainVideo.load();
    }

    if (reservationsVideo) {
      reservationsVideo.preload = 'auto';
      reservationsVideo.addEventListener('canplaythrough', reservationsCanPlay);
      reservationsVideo.load();
    }

    return () => {
      if (mainVideo) {
        mainVideo.removeEventListener('canplaythrough', mainCanPlay);
      }
      if (reservationsVideo) {
        reservationsVideo.removeEventListener('canplaythrough', reservationsCanPlay);
      }
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || !animationVisible) {
      // Skip animation if disabled
      if (!animationVisible) {
        setAnimationComplete(true);
        gsap.set(mainContentRef.current, { opacity: 1 });
        if (videoLoaded && videoRef.current) {
          videoRef.current.play().catch(console.error);
        }
      }
      return;
    }

    const tl = gsap.timeline();

    // Initial setup
    gsap.set(bgImageRef.current, { opacity: 0.15 });
    gsap.set(mainContentRef.current, { opacity: 0 });
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
      .to(mainContentRef.current, {
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      }, "-=1")
      .call(() => {
        setAnimationComplete(true);
        // Start videos when animation completes and videos are loaded
        if (videoLoaded && videoRef.current) {
          videoRef.current.play().catch(console.error);
        }
        if (reservationsVideoLoaded && reservationsVideoRef.current) {
          reservationsVideoRef.current.play().catch(console.error);
        }
      });

    return () => {
      tl.kill();
    };
  }, [videoLoaded, animationVisible, reservationsVideoLoaded]);

  // Start videos when both animation is complete and videos are loaded
  useEffect(() => {
    if (animationComplete && videoLoaded && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (animationComplete && reservationsVideoLoaded && reservationsVideoRef.current) {
      reservationsVideoRef.current.play().catch(console.error);
    }
  }, [animationComplete, videoLoaded, reservationsVideoLoaded]);

  useEffect(() => {
    if (!animationComplete) return;

    // Hero parallax effect
    const heroParallax = gsap.to(heroRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Sticky logo animation
    gsap.set(stickyLogoRef.current, {
      opacity: 0,
      y: -50,
      scale: 0.8
    });

    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "bottom center",
      end: "bottom top",
      onEnter: () => {
        // Logo appears and stays white - now has good contrast with green background
        gsap.to(stickyLogoRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out"
        });
      },
      onLeaveBack: () => {
        gsap.to(stickyLogoRef.current, {
          opacity: 0,
          y: -50,
          scale: 0.8,
          duration: 0.4,
          ease: "power3.in"
        });
      }
    });

    // Drink cards animation
    const drinkCards = document.querySelectorAll('.drink-card');
    drinkCards.forEach((card, index) => {
      gsap.fromTo(card,
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.1
        }
      );

      // Hover animations
      const cardElement = card as HTMLElement;
      cardElement.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      cardElement.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Section animations
    const sections = document.querySelectorAll('.animated-section');
    sections.forEach(section => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 60
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationComplete]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      {/* Background Image - Fixed opacity */}
      <div
        ref={bgImageRef}
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.jpeg')",
          backgroundAttachment: "fixed",
          opacity: 0.15
        }}
      />

      {/* Intro Animation */}
      {animationVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-sm"
          style={{ display: animationComplete ? "none" : "flex" }}>
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
      )}

      {/* Sticky Logo */}
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

      {/* Reservation Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] hidden items-center justify-center p-4"
        style={{ 
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
        onClick={closeModal}
      >
        <div 
          ref={modalContentRef}
          className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Static Header */}
          <div className="flex-shrink-0 relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Scrolling Images */}
            <div className="h-32 overflow-hidden relative bg-gradient-to-r from-green-800 to-green-900">
              <div 
                ref={imageScrollRef}
                className="flex absolute top-0 left-0 h-full"
                style={{ width: '200%' }}
              >
                {[...modalImages, ...modalImages].map((image, index) => (
                  <div key={index} className="h-32 w-32 flex-shrink-0 mx-2">
                    <img 
                      src={image} 
                      alt={`Drink ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Header Content */}
            <div className="p-8 pb-4 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Reserve sua Mesa
              </h2>
              <div className="w-16 h-1 bg-green-800 mx-auto mb-4" />
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Garante sua experiência única no Vedê Bar. Preencha os dados abaixo e entraremos em contato.
              </p>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-8">
            {/* Reservation Form */}
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Data</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Horário</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pessoas</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300">
                    <option>1 pessoa</option>
                    <option>2 pessoas</option>
                    <option>3 pessoas</option>
                    <option>4 pessoas</option>
                    <option>5+ pessoas</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
                <textarea
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-800 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Alguma preferência ou observação especial?"
                />
              </div>

              {/* Additional spacing before footer */}
              <div className="h-4"></div>
            </form>
          </div>

          {/* Static Footer */}
          <div className="flex-shrink-0 p-8 pt-4 bg-gradient-to-t from-white to-transparent">
            <div className="text-center">
              <button
                type="submit"
                className="bg-green-800 hover:bg-green-900 text-white px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        ref={mainContentRef}
        className="relative z-10 min-h-screen"
        style={{
          display: animationComplete ? "block" : "none"
        }}
      >
        {/* Experience Section */}
        <section className="flex items-center justify-center min-h-screen w-full">
          {/* Video Background */}
          <video
            ref={reservationsVideoRef}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            style={{ 
              display: animationComplete && reservationsVideoLoaded ? "block" : "none",
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
                onClick={openModal}
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
                VEDE
              </h1>
            </div>
          </div>
        </section>

        {/* Drinks Collection */}
        <section className="drinks-section py-32 bg-green-800/95 backdrop-blur-sm pb-[20vh] animated-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 md:mt-[10vh]" style={{ fontFamily: "Georgia, serif" }}>
                Nossa Coleção
              </h2>
              <div className="w-16 h-1 bg-white mx-auto mb-8" />
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
                Cada criação é uma obra de arte líquida, <br/>inspirada na riqueza cultural e natural do Brasil
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
              {drinks.map((drink, index) => (
                <div key={drink.id} className="drink-card group cursor-pointer h-full" onClick={() => openDrinkModal(drink)}>
                  <div className="relative aspect-square overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                    <img
                      src={drink.image}
                      alt={drink.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center">
                      <h3 className="text-white text-lg md:text-xl font-bold mb-2 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                        {drink.name}
                      </h3>
                      <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-4 mb-3">
                        {drink.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Operating Hours Section */}
        <section className="operating-hours-section py-32 bg-green-800/95 backdrop-blur-sm animated-section">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-12" style={{ fontFamily: "Georgia, serif" }}>
              Horário de Funcionamento
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-12" />
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8">
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "Georgia, serif" }}>
                  Vedê | Coquetelaria & Arte
                </h3>
                <p className="text-lg text-white/90 mb-6">
                </p>
                <div className="w-12 h-0.5 bg-white/50 mx-auto mb-6" />
                <p className="text-lg text-white/90 mb-6 font-medium">Quarta a domingo</p>
                
                <div className="space-y-3 text-white/90">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Quarta e quinta</span>
                    <span>18h - 23h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sexta</span>
                    <span>18h - 01h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Sábado</span>
                    <span>16h - 01h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Domingo</span>
                    <span>15h - 21h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps Section */}
        <section className="maps-section py-32 bg-gray-900 animated-section">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6" style={{ fontFamily: "Georgia, serif" }}>
                Nossa Localização
              </h2>
              <div className="w-16 h-1 bg-white mx-auto mb-8" />
              <p className="text-xl text-white/80 mb-4">
                Rua das Figueiras, 1206 - Santo André, SP
              </p>
              <p className="text-lg text-white/60">
                09080-300
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-2 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3654.7394444444445!2d-46.5388888!3d-23.6666667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce42f8b3f9f3f9%3A0x1234567890abcdef!2sRua%20das%20Figueiras%2C%201206%20-%20Santo%20Andr%C3%A9%2C%20SP%2C%2009080-300!5e0!3m2!1spt-BR!2sbr!4v1234567890123"
                  width="100%"
                  height="450"
                  style={{ border: 0, borderRadius: '20px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Vedê Bar Location"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-black text-white py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Logo and Description */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "Georgia, serif" }}>
                  VEDÊ
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Coquetelaria & Arte com alma brasileira. Uma experiência sensorial única onde cada drink conta uma história.
                </p>
              </div>

              {/* Contact Info */}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-4">Contato</h4>
                <div className="space-y-2 text-white/70">
                  <p>Rua das Figueiras, 1206</p>
                  <p>Santo André, SP - 09080-300</p>
                  <p className="mt-4">
                    <a href="tel:+5511999999999" className="hover:text-white transition-colors">
                      (11) 99999-9999
                    </a>
                  </p>
                  <p>
                    <a href="mailto:contato@vedebar.com" className="hover:text-white transition-colors">
                      contato@vedebar.com
                    </a>
                  </p>
                </div>
              </div>

              {/* Social and Hours */}
              <div className="text-center md:text-right">
                <h4 className="text-lg font-semibold mb-4">Funcionamento</h4>
                <div className="space-y-1 text-white/70 text-sm">
                  <p>Quarta e quinta: 18h - 23h</p>
                  <p>Sexta: 18h - 01h</p>
                  <p>Sábado: 16h - 01h</p>
                  <p>Domingo: 15h - 21h</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/20 mt-12 pt-8 text-center">
              <p className="text-white/50 text-sm">
                &copy; 2024 Vedê Bar. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>

      {/* Individual Drink Modal */}
      <div
        ref={drinkModalRef}
        className="fixed inset-0 z-[110] hidden items-center justify-center p-4"
        style={{ 
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)'
        }}
        onClick={closeDrinkModal}
      >
        <div 
          ref={drinkModalContentRef}
          className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={closeDrinkModal}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors duration-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Modal Content */}
          <div className="p-8 md:p-12 text-center">
            {selectedDrink && (
              <>
                <div className="mb-8">
                  <img 
                    src={selectedDrink.image} 
                    alt={selectedDrink.name}
                    className="w-48 h-48 md:w-64 md:h-64 object-cover rounded-2xl mx-auto mb-8 shadow-xl"
                  />
                </div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {selectedDrink.name}
                </h2>
                
                <div className="w-16 h-1 bg-green-800 mx-auto mb-8" />
                
                <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 max-w-4xl mx-auto font-light leading-relaxed">
                  {selectedDrink.description}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}