export interface Drink {
  id: number;
  src: string;
  name: string;
  description: string;
  ingredients: string[];
  category: string;
  price?: string;
}

export const drinks: Drink[] = [
  {
    id: 1,
    src: "/images/bebida1.png",
    name: "Caipirinha Tradicional",
    description: "A clássica brasileira com cachaça artesanal, limão fresco e açúcar demerara",
    ingredients: ["Cachaça artesanal", "Limão tahiti", "Açúcar demerara", "Gelo"],
    category: "Clássicos"
  },
  {
    id: 2,
    src: "/images/bebida2.png",
    name: "Tropical Sunset",
    description: "Coquetel tropical com manga, maracujá e rum dourado",
    ingredients: ["Rum dourado", "Polpa de manga", "Maracujá", "Água de coco", "Hortelã"],
    category: "Tropicais"
  },
  {
    id: 3,
    src: "/images/bebida3.png",
    name: "Amazon Spirit",
    description: "Drink inspirado na floresta com cupuaçu, cachaça e especiarias",
    ingredients: ["Cachaça premium", "Cupuaçu", "Gengibre", "Capim santo", "Açaí"],
    category: "Autorais"
  },
  {
    id: 4,
    src: "/images/bebida4.png",
    name: "Rio Breeze",
    description: "Refrescante com caju, limão siciliano e água tônica premium",
    ingredients: ["Vodka premium", "Caju", "Limão siciliano", "Água tônica", "Manjericão"],
    category: "Refrescantes"
  },
  {
    id: 5,
    src: "/images/bebida5.png",
    name: "Samba Night",
    description: "Vibrante com frutas vermelhas, prosecco e hibisco",
    ingredients: ["Prosecco", "Frutas vermelhas", "Hibisco", "Mel", "Champagne"],
    category: "Espumantes"
  },
  {
    id: 6,
    src: "/images/bebida6.png",
    name: "Cerrado Gold",
    description: "Premium com pequi, cachaça envelhecida e especiarias do cerrado",
    ingredients: ["Cachaça envelhecida", "Pequi", "Baru", "Canela", "Cravo"],
    category: "Premium"
  },
  {
    id: 7,
    src: "/images/bebida7.png",
    name: "Bahia Sunset",
    description: "Inspirado no pôr do sol baiano com dendê, camarão e pimenta",
    ingredients: ["Rum especial", "Dendê", "Pimenta malagueta", "Leite de coco", "Coentro"],
    category: "Exóticos"
  },
  {
    id: 8,
    src: "/images/bebida8.png",
    name: "Pantanal Fresh",
    description: "Refrescante com ervas do pantanal e gin artesanal",
    ingredients: ["Gin artesanal", "Ervas pantaneiras", "Tônica", "Limão", "Pepino"],
    category: "Gin"
  },
  {
    id: 9,
    src: "/images/bebida9.png",
    name: "Verde Mata",
    description: "Coquetel verde com ingredientes da mata atlântica",
    ingredients: ["Cachaça", "Folhas nativas", "Lima da pérsia", "Xarope de cana", "Espuma"],
    category: "Naturais"
  },
  {
    id: 10,
    src: "/images/bebida10.png",
    name: "Ouro Preto",
    description: "Drink dourado com rapadura, cachaça mineira e especiarias",
    ingredients: ["Cachaça mineira", "Rapadura", "Canela", "Gengibre", "Limão"],
    category: "Tradicionais"
  },
  {
    id: 11,
    src: "/images/bebida11.png",
    name: "Nordeste Soul",
    description: "Alma nordestina com cajá, rum e temperos regionais",
    ingredients: ["Rum aged", "Cajá", "Pimenta rosa", "Mel de abelha", "Água de flor"],
    category: "Regionais"
  },
  {
    id: 12,
    src: "/images/bebida12.png",
    name: "Sunset Beach",
    description: "Perfeito para o final do dia com frutas cítricas e champagne",
    ingredients: ["Champagne", "Frutas cítricas", "Elderflower", "Pétalas de rosa", "Gelo seco"],
    category: "Sofisticados"
  },
  {
    id: 13,
    src: "/images/bebida13.jpg",
    name: "Urban Jungle",
    description: "Moderno e urbano com botanicals e gin premium",
    ingredients: ["Gin premium", "Botanicals urbanos", "Tônica artesanal", "Especiarias", "Garnish"],
    category: "Modernos"
  },
  {
    id: 14,
    src: "/images/bebida14.jpg",
    name: "Cabruca",
    description: "GIN BEG, campari, vermute rosso, suco de laranja e água com gás. Refrescante e amargo",
    ingredients: ["Gin Beefeater", "Campari", "Vermute rosso", "Suco de laranja", "Água com gás"],
    category: "Signature"
  }
];

export const barImages = [
  {
    id: 1,
    src: "/images/bar3.jpg",
    alt: "Vista panorâmica do ambiente",
    title: "Ambiente Sofisticado"
  },
  {
    id: 2,
    src: "/images/bar1.jpg", 
    alt: "Balcão principal com iluminação ambiente",
    title: "Balcão Central"
  },
  {
    id: 3,
    src: "/images/bar2.jpg",
    alt: "Área lounge com arte brasileira",
    title: "Espaço Lounge"
  },
  {
    id: 4,
    src: "/images/bar4.jpg",
    alt: "Galeria de arte com obras locais",
    title: "Galeria de Arte"
  }
];

export const categories = [
  "Todos",
  "Clássicos", 
  "Tropicais",
  "Autorais",
  "Refrescantes",
  "Espumantes",
  "Premium",
  "Signature"
]; 