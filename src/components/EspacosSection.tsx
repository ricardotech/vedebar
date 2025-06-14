import React from 'react';

const espacos = [
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
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
      </div>
    </section>
  );
} 