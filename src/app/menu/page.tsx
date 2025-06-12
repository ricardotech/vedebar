import Image from "next/image";

const drinks = [
  { src: "/images/bebida1.png", name: "Drink 1" },
  { src: "/images/bebida2.png", name: "Drink 2" },
  { src: "/images/bebida3.png", name: "Drink 3" },
  { src: "/images/bebida4.png", name: "Drink 4" },
  { src: "/images/bebida5.png", name: "Drink 5" },
  { src: "/images/bebida6.png", name: "Drink 6" },
  { src: "/images/bebida7.png", name: "Drink 7" },
  { src: "/images/bebida8.png", name: "Drink 8" },
  { src: "/images/bebida9.png", name: "Drink 9" },
  { src: "/images/bebida10.png", name: "Drink 10" },
  { src: "/images/bebida11.png", name: "Drink 11" },
  { src: "/images/bebida12.png", name: "Drink 12" },
  { src: "/images/bebida13.jpg", name: "Drink 13" },
  { src: "/images/bebida14.jpg", name: "Drink 14" },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-black">
      <header className="w-full flex justify-between items-center py-6 px-8">
        <Image
          src="/images/vedebar_Logo.png"
          alt="Vedebar Logo"
          width={120}
          height={120}
          className="h-20 w-auto"
          priority
        />
        <button className="flex flex-col justify-center items-center w-10 h-10 border border-green-900 rounded bg-black hover:bg-green-950 transition">
          <span className="block w-6 h-0.5 bg-green-900 mb-1"></span>
          <span className="block w-6 h-0.5 bg-green-900 mb-1"></span>
          <span className="block w-6 h-0.5 bg-green-900"></span>
        </button>
      </header>
      <div className="flex flex-col w-full">
        {drinks.map((drink, idx) => (
          <div key={idx} className="w-full relative group touch-manipulation">
            <Image
              src={drink.src}
              alt={drink.name}
              width={500}
              height={500}
              className="w-full h-auto border border-green-900 transition-opacity duration-300 group-hover:opacity-30 group-active:opacity-30"
              priority={idx < 4}
            />
            {idx === 13 && (
              <>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-light tracking-widest">
                  Cabruca
                </div>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300">
                  <p className="text-xl text-center px-4 mb-2 font-medium drop-shadow-lg">
                    GIN BEG, campari, vermute rosso, suco de laranja e água com gás.
                  </p>
                  <p className="text-lg italic font-medium drop-shadow-lg">
                    Refrescante e amargo
                  </p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 