"use client";

import React from "react";

interface Drink {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface DrinksSectionProps {
  drinks: Drink[];
  onDrinkClick: (drink: Drink) => void;
}

export default function DrinksSection({ drinks, onDrinkClick }: DrinksSectionProps) {
  return (
    <section className="drinks-section animated-section">
      {/* Compact title section with background */}
      <div className="py-16 backdrop-blur-sm" style={{ backgroundColor: '#5b4a1f' }}>
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Clássicos e Autorais
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mb-6" />
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Cada criação é uma obra de arte líquida, inspirada na riqueza cultural e natural do Brasil.
            </p>
          </div>
        </div>
      </div>

      {/* Full width image grid - 5x2 layout, no background */}
      <div className="w-full">
        <div className="grid grid-cols-5 gap-0 w-full">
          {drinks.slice(0, 10).map((drink, index) => (
            <div key={drink.id} className="drink-card group cursor-pointer h-full relative" onClick={() => onDrinkClick(drink)}>
              <div className="relative aspect-square overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={drink.image}
                  alt={drink.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  style={{
                    filter: 'sepia(15%) saturate(120%) hue-rotate(15deg) brightness(0.9) contrast(1.1)',
                    boxShadow: 'inset 0 0 60px rgba(139, 97, 63, 0.3)'
                  }}
                />
                
                {/* Ambient Lighting Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-amber-800/30"></div>
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-black/70 to-amber-800/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-center items-center p-4 text-center">
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
  );
} 