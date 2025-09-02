import React, { useState } from 'react';

interface EspacoItem {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const espacos: EspacoItem[] = [
  {
    id: 1,
    src: "/espaços/balcaoPrincipal.jpg",
    alt: "Balcão Principal",
    title: "Balcão Principal"
  },
 
  {
    id: 2,
    src: "/espaços/Lounge.jpg",
    alt: "Lounge",
    title: "Lounge"
  },
  {
    id: 3,
    src: "/espaços/VistaPanoramica.jpg",
    alt: "Vista Panorâmica",
    title: "Vista Panorâmica"
  },
  {
    id: 4,
    src: "/espaços/EspacoVede.jpg",
    alt: "Espaço Vedê",
    title: "Espaço Vedê"
  },
];

// Mobile Carousel Component
function MobileCarousel({ espacos }: { espacos: EspacoItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % espacos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + espacos.length) % espacos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="md:hidden max-w-md mx-auto">
      {/* Dots indicator */}
      <div className="flex justify-center mb-6 space-x-2">
        {espacos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* Carousel container */}
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {espacos.map((espaco) => (
              <div key={espaco.id} className="w-full flex-shrink-0">
                <div className="relative aspect-[4/5] overflow-hidden shadow-lg">
                  <img
                    src={espaco.src}
                    alt={espaco.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Title */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white text-xl font-bold text-center px-4" style={{ fontFamily: "Georgia, serif" }}>
                      {espaco.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Touch/swipe area for navigation */}
        <div 
          className="absolute inset-0 flex"
          onTouchStart={(e) => {
            const touchStart = e.touches[0].clientX;
            const handleTouchEnd = (e: TouchEvent) => {
              const touchEnd = e.changedTouches[0].clientX;
              const diff = touchStart - touchEnd;
              
              if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                  nextSlide();
                } else {
                  prevSlide();
                }
              }
              
              document.removeEventListener('touchend', handleTouchEnd);
            };
            
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          {/* Left tap area */}
          <div className="w-1/2 h-full" onClick={prevSlide} />
          {/* Right tap area */}
          <div className="w-1/2 h-full" onClick={nextSlide} />
        </div>
      </div>
    </div>
  );
}

export default function EspacosSection() {
  return (
    <section className="py-32 bg-black animated-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8" style={{ fontFamily: "Georgia, serif" }}>
            Nossos Espaços
          </h2>
          <div className="w-16 h-1 bg-white mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            Ambientes únicos pensados para proporcionar experiências inesquecíveis
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden md:grid grid-cols-2 gap-6 max-w-7xl mx-auto">
          {espacos.map((espaco) => (
            <div key={espaco.id} className="group cursor-pointer">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 hover:shadow-2xl">
                <img
                  src={espaco.src}
                  alt={espaco.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                
                {/* Title */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl md:text-3xl font-bold text-center px-4" style={{ fontFamily: "Georgia, serif" }}>
                    {espaco.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel layout */}
        <MobileCarousel espacos={espacos} />
      </div>
    </section>
  );
} 