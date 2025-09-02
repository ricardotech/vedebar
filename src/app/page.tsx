"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroAnimation from "../components/IntroAnimation";
import HeroSection from "../components/HeroSection";
import DrinksSection from "../components/DrinksSection";
import EspacosSection from "../components/EspacosSection";
import ExperienceSection from "../components/ExperienceSection";
import OperatingHoursSection from "../components/OperatingHoursSection";
import MapsSection from "../components/MapsSection";
import Footer from "../components/Footer";
import StickyLogo from "../components/StickyLogo";
import ReservationModal from "../components/ReservationModal";
import DrinkModal from "../components/DrinkModal";
import NavigationOverlay from "../components/NavigationOverlay";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
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

  const drinks = [
    {
      id: 1,
      name: "Iça Manauara",
      description: "Cachaça de jambu, cachaça ouro infusionada pixuri, maracujá, amora, xarope de pixuri e finalizado com espuma de açaí com guaraná e pixuri ralado. Doce, frutado, refrescante",
      image: "/bebidas/01.jpg"
    },
    {
      id: 2,
      name: "Tropicália",
      description: "Gin brasileiro, maracujá, manjericão e toque de pimenta",
      image: "/bebidas/02.jpg"
    },
    {
      id: 3,
      name: "Guigó",
      description: "Cachaça envelhecida infusionada amburana, vermouth dry, suco de caju, lillet, xarope simples, triple sec. Defumado com casca de caju e amburan",
      image: "/bebidas/03.jpg"
    },
    {
      id: 4,
      name: "Cabruca",
      description: "Vodka infusionada nibs de cacau, leão do norte, mix de limões, suco de maracujá, xarope de caramelo, clara, finalizado com chocolate amargo. Redescobrindo as maravilhas nativas da mata atlântica, tão rica e poderosa que nos traz calma, alegria e conforta os corações. Leve, aromático, herbal",
      image: "/bebidas/04.jpg"
    },
    {
      id: 5,
      name: "Canindé",
      description: "Whiskey infusionado casca de jatobá, paratudo, xarope de baru, maracujá, mix de limões, curaçau blue e pasta de camu-camu. Cítrico, refrescante e frutado",
      image: "/bebidas/05.jpg"
    },
    {
      id: 6,
      name: "King Fashioned",
      description: "Whiskey infusionado com café, xarope simples, angostura e grãos de café. Seco, aromático, encorpado",
      image: "/bebidas/06.jpg"
    },
    {
      id: 7,
      name: "Ajuba",
      description: "Drink especial da casa com ingredientes selecionados",
      image: "/bebidas/07.jpg"
    },
    {
      id: 8,
      name: "Negroni Verão",
      description: "GIN BEG, campari, vermute rosso, suco de laranja e água com gás. Refrescante e amargo",
      image: "/bebidas/08.jpg"
    },
    {
      id: 9,
      name: "Penicilin",
      description: "Scotch whiskey, gengibre, mix de limões e mel. Seco, aromático",
      image: "/bebidas/09.jpg"
    },
    {
      id: 10,
      name: "Pisco Sour",
      description: "Pisco reservado, mix de limões, xarope simples, clara pasteurizada e angostura. Cítrico, refrescante",
      image: "/bebidas/11.jpg"
    }
  ];

  const modalImages = [
    "/bebidas/01.jpg",
    "/bebidas/02.jpg",
    "/bebidas/03.jpg",
    "/bebidas/04.jpg",
    "/bebidas/05.jpg",
    "/bebidas/06.jpg",
    "/bebidas/07.jpg",
    "/bebidas/08.jpg"
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

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    gsap.to(mainContentRef.current, {
      opacity: 1,
      duration: 2,
      ease: "power2.out"
    });
    
    // Start videos when animation completes and videos are loaded
    if (videoLoaded && videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
    if (reservationsVideoLoaded && reservationsVideoRef.current) {
      reservationsVideoRef.current.play().catch(console.error);
    }
  };

  useEffect(() => {
    // Initial setup
    gsap.set(bgImageRef.current, { opacity: 0.15 });
    gsap.set(mainContentRef.current, { opacity: 0 });

    if (!animationVisible) {
      // Skip animation if disabled
      setAnimationComplete(true);
      gsap.set(mainContentRef.current, { opacity: 1 });
      if (videoLoaded && videoRef.current) {
        videoRef.current.play().catch(console.error);
      }
      if (reservationsVideoLoaded && reservationsVideoRef.current) {
        reservationsVideoRef.current.play().catch(console.error);
      }
    }
  }, [animationVisible, videoLoaded, reservationsVideoLoaded]);
>>>>>>> remotes/vedebar/main

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

      {/* Navigation Overlay - Always visible */}
      <NavigationOverlay isVisible={true} />

      {/* Intro Animation */}
      <IntroAnimation 
        isVisible={animationVisible && !animationComplete}
        onComplete={handleAnimationComplete}
      />

      {/* Sticky Logo */}
      <StickyLogo 
        stickyLogoRef={stickyLogoRef}
        animationComplete={animationComplete}
      />

      {/* Reservation Modal */}
      <ReservationModal 
        modalRef={modalRef}
        modalContentRef={modalContentRef}
        imageScrollRef={imageScrollRef}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        modalImages={modalImages}
      />

      {/* Main Content */}
      <main
        ref={mainContentRef}
        className="relative z-10 min-h-screen"
        style={{
          display: animationComplete ? "block" : "none"
        }}
      >
        {/* Hero Section */}
        <HeroSection 
          videoRef={videoRef}
          animationComplete={animationComplete}
          videoLoaded={videoLoaded}
        />

        {/* Drinks Collection */}
        <div id="drinks">
          <DrinksSection 
            drinks={drinks}
            onDrinkClick={openDrinkModal}
          />
        </div>

         {/* Nossos Espaços Section */}
         <EspacosSection />

         {/* Experience Section */}
         <div id="experience">
           <ExperienceSection 
            reservationsVideoRef={reservationsVideoRef}
            animationComplete={animationComplete}
            reservationsVideoLoaded={reservationsVideoLoaded}
            onReserveClick={openModal}
          />
         </div>


        {/* Operating Hours Section */}
        <OperatingHoursSection />

        {/* Google Maps Section */}
        <div id="maps">
          <MapsSection />
        </div>

        {/* Footer */}
        <div id="footer">
          <Footer />
        </div>
      </main>

      {/* Individual Drink Modal */}
      <DrinkModal 
        drinkModalRef={drinkModalRef}
        drinkModalContentRef={drinkModalContentRef}
        selectedDrink={selectedDrink}
        isDrinkModalOpen={isDrinkModalOpen}
        onClose={closeDrinkModal}
      />
    </div>
  );
}