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
      <header className="w-full flex justify-center items-center py-6">
        <Image
          src="/images/vedebar_Logo.png"
          alt="Vedebar Logo"
          width={120}
          height={120}
          className="h-20 w-auto"
          priority
        />
      </header>
      <div className="flex flex-col w-full">
        {drinks.map((drink, idx) => (
          <div key={idx} className="w-full">
            <Image
              src={drink.src}
              alt={drink.name}
              width={500}
              height={500}
              className="w-full h-auto border border-green-900"
              priority={idx < 4}
            />
          </div>
        ))}
      </div>
    </div>
  );
} 