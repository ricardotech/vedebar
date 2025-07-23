"use client";

import React from "react";

interface Drink {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DrinkModalProps {
  drinkModalRef: React.RefObject<HTMLDivElement | null>;
  drinkModalContentRef: React.RefObject<HTMLDivElement | null>;
  selectedDrink: Drink | null;
  isDrinkModalOpen: boolean;
  onClose: () => void;
}

export default function DrinkModal({
  drinkModalRef,
  drinkModalContentRef,
  selectedDrink,
  isDrinkModalOpen,
  onClose,
}: DrinkModalProps) {
  return (
    <div
      ref={drinkModalRef}
      className="fixed inset-0 z-[110] hidden items-center justify-center p-4"
      style={{ 
        backdropFilter: 'blur(15px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
      }}
      onClick={onClose}
    >
      <div 
        ref={drinkModalContentRef}
        className="bg-white dark:bg-gray-900 backdrop-blur-sm rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                {selectedDrink.name}
              </h2>
              
              <div className="w-16 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--bar-green)' }} />
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
                {selectedDrink.description}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 