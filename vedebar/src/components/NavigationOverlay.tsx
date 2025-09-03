"use client";

import React, { useState } from "react";
import { gsap } from "gsap";

interface NavigationOverlayProps {
  isVisible: boolean;
}

export default function NavigationOverlay({ isVisible }: NavigationOverlayProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
    
    // Scroll to section after animation completes
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (!isVisible) {
    return true;
  }

  return (
    <nav className="absolute top-8 left-0 right-0 z-60">
      <div className="flex justify-center px-4">
        {/* Mobile Logo - Only visible on mobile */}
        <div className="md:hidden absolute left-4 top-0">
          <img 
            src="/VedeLogoWhite.png" 
            alt="VEDÊ Logo" 
            className="h-10 w-auto"
          />
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 text-white font-medium text-lg">
          <button 
            onClick={() => scrollToSection('drinks')} 
            className="hover:text-[var(--bar-green)] transition-colors cursor-pointer"
          >
            Menu
          </button>
          <button 
            onClick={() => scrollToSection('experience')} 
            className="hover:text-[var(--bar-green)] transition-colors cursor-pointer"
          >
            Reservas
          </button>
          <button 
            onClick={() => scrollToSection('footer')} 
            className="hover:text-[var(--bar-green)] transition-colors cursor-pointer"
          >
            Contato
          </button>
          <button 
            onClick={() => scrollToSection('maps')} 
            className="hover:text-[var(--bar-green)] transition-colors cursor-pointer"
          >
            Localização
          </button>
        </div>
        
        {/* Mobile Hamburger Menu */}
        <div className="md:hidden absolute right-4 top-0">
          <button 
            className="text-white hover:text-[var(--bar-green)] transition-colors w-10 h-10 flex flex-col items-center justify-center space-y-1"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <span className="text-2xl">×</span>
            ) : (
              <>
                <div className="w-6 h-0.5 bg-white transition-all"></div>
                <div className="w-6 h-0.5 bg-white transition-all"></div>
                <div className="w-6 h-0.5 bg-white transition-all"></div>
              </>
            )}
          </button>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-12 right-0 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-[200px]">
              <div className="flex flex-col space-y-4 text-white font-medium">
                <button 
                  onClick={() => scrollToSection('drinks')} 
                  className="text-left hover:text-[var(--bar-green)] transition-colors py-2"
                >
                  Menu
                </button>
                <button 
                  onClick={() => scrollToSection('experience')} 
                  className="text-left hover:text-[var(--bar-green)] transition-colors py-2"
                >
                  Reservas
                </button>
                <button 
                  onClick={() => scrollToSection('footer')} 
                  className="text-left hover:text-[var(--bar-green)] transition-colors py-2"
                >
                  Contato
                </button>
                <button 
                  onClick={() => scrollToSection('maps')} 
                  className="text-left hover:text-[var(--bar-green)] transition-colors py-2"
                >
                  Localização
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}