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
    <section className="drinks-section py-32 backdrop-blur-sm pb-[20vh] animated-section" style={{ backgroundColor: 'var(--bar-green-opacity-95)' }}>
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
            <div key={drink.id} className="drink-card group cursor-pointer h-full" onClick={() => onDrinkClick(drink)}>
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
  );
} 