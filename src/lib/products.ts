export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: "phones" | "laptops" | "audio" | "accessories" | "wearables";
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  description: { en: string; sw: string };
  specs: { label: { en: string; sw: string }; value: string }[];
  stock: number;
  featured?: boolean;
};

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=1200&q=80`;

export const products: Product[] = [
  {
    id: "1",
    slug: "iphone-15-pro-256gb",
    name: "iPhone 15 Pro 256GB",
    brand: "Apple",
    category: "phones",
    price: 2850000,
    oldPrice: 3100000,
    image: img("photo-1592750475338-74b7b21085ab"),
    description: {
      en: "Titanium design, A17 Pro chip, and the most advanced iPhone camera system. Sealed box, 1 year warranty.",
      sw: "Muundo wa titanium, chipu ya A17 Pro, na mfumo bora wa kamera. Boksi imefungwa, dhamana ya mwaka 1.",
    },
    specs: [
      { label: { en: "Display", sw: "Skrini" }, value: "6.1\" Super Retina XDR" },
      { label: { en: "Chip", sw: "Chipu" }, value: "A17 Pro" },
      { label: { en: "Storage", sw: "Hifadhi" }, value: "256GB" },
      { label: { en: "Camera", sw: "Kamera" }, value: "48MP Main + Telephoto" },
      { label: { en: "Battery", sw: "Betri" }, value: "Up to 23 hrs video" },
    ],
    stock: 8,
    featured: true,
  },
  {
    id: "2",
    slug: "samsung-galaxy-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phones",
    price: 2650000,
    oldPrice: 2900000,
    image: img("photo-1610945265064-0e34e5519bbf"),
    description: {
      en: "Galaxy AI, 200MP camera, S Pen built-in. Sealed and ready to deliver in Dar es Salaam.",
      sw: "Galaxy AI, kamera ya 200MP, S Pen ndani. Imefungwa na tayari kuwasilishwa Dar es Salaam.",
    },
    specs: [
      { label: { en: "Display", sw: "Skrini" }, value: "6.8\" QHD+ Dynamic AMOLED" },
      { label: { en: "Chip", sw: "Chipu" }, value: "Snapdragon 8 Gen 3" },
      { label: { en: "Storage", sw: "Hifadhi" }, value: "256GB / 12GB RAM" },
      { label: { en: "Camera", sw: "Kamera" }, value: "200MP + 50MP + 12MP + 10MP" },
      { label: { en: "Battery", sw: "Betri" }, value: "5000 mAh" },
    ],
    stock: 12,
    featured: true,
  },
  {
    id: "3",
    slug: "macbook-air-m3-13",
    name: "MacBook Air M3 13\"",
    brand: "Apple",
    category: "laptops",
    price: 3450000,
    image: img("photo-1517336714731-489689fd1ca8"),
    description: {
      en: "Apple M3 chip, 8GB unified memory, 256GB SSD. All-day battery, fanless design.",
      sw: "Chipu ya Apple M3, kumbukumbu 8GB, SSD 256GB. Betri ya siku nzima, bila feni.",
    },
    specs: [
      { label: { en: "Display", sw: "Skrini" }, value: "13.6\" Liquid Retina" },
      { label: { en: "Chip", sw: "Chipu" }, value: "Apple M3 8-core" },
      { label: { en: "Memory", sw: "Kumbukumbu" }, value: "8GB unified" },
      { label: { en: "Storage", sw: "Hifadhi" }, value: "256GB SSD" },
      { label: { en: "Battery", sw: "Betri" }, value: "Up to 18 hrs" },
    ],
    stock: 5,
    featured: true,
  },
  {
    id: "4",
    slug: "airpods-pro-2",
    name: "AirPods Pro (2nd Gen)",
    brand: "Apple",
    category: "audio",
    price: 485000,
    oldPrice: 550000,
    image: img("photo-1606220945770-b5b6c2c55bf1"),
    description: {
      en: "Active Noise Cancellation, Adaptive Audio, USB-C charging case.",
      sw: "Kufunga kelele, sauti inayobadilika, kifaa cha kuchaji cha USB-C.",
    },
    specs: [
      { label: { en: "Chip", sw: "Chipu" }, value: "H2" },
      { label: { en: "ANC", sw: "ANC" }, value: "Yes, Adaptive" },
      { label: { en: "Battery", sw: "Betri" }, value: "Up to 30 hrs (case)" },
      { label: { en: "Charging", sw: "Chaji" }, value: "USB-C / MagSafe / Qi" },
    ],
    stock: 20,
    featured: true,
  },
  {
    id: "5",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: "audio",
    price: 720000,
    image: img("photo-1583394838336-acd977736f90"),
    description: {
      en: "Industry-leading noise cancellation, 30-hour battery, premium comfort.",
      sw: "Kufunga kelele bora kabisa, betri ya saa 30, faraja ya hali ya juu.",
    },
    specs: [
      { label: { en: "Type", sw: "Aina" }, value: "Over-ear, Wireless" },
      { label: { en: "ANC", sw: "ANC" }, value: "Industry-leading" },
      { label: { en: "Battery", sw: "Betri" }, value: "30 hrs" },
      { label: { en: "Codec", sw: "Codec" }, value: "LDAC, AAC, SBC" },
    ],
    stock: 9,
  },
  {
    id: "6",
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9 45mm",
    brand: "Apple",
    category: "wearables",
    price: 1150000,
    image: img("photo-1546868871-7041f2a55e12"),
    description: {
      en: "S9 chip, brighter display, Double Tap gesture, advanced health features.",
      sw: "Chipu ya S9, skrini angavu zaidi, ishara ya Double Tap, vipengele vya afya.",
    },
    specs: [
      { label: { en: "Case", sw: "Mwili" }, value: "45mm Aluminum" },
      { label: { en: "Chip", sw: "Chipu" }, value: "S9 SiP" },
      { label: { en: "GPS", sw: "GPS" }, value: "Yes" },
      { label: { en: "Battery", sw: "Betri" }, value: "Up to 18 hrs" },
    ],
    stock: 6,
    featured: true,
  },
  {
    id: "7",
    slug: "google-pixel-8-pro",
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "phones",
    price: 2200000,
    image: img("photo-1598327105666-5b89351aff97"),
    description: {
      en: "Tensor G3, the best Google AI camera, 7 years of updates.",
      sw: "Tensor G3, kamera bora ya Google AI, miaka 7 ya masasisho.",
    },
    specs: [
      { label: { en: "Display", sw: "Skrini" }, value: "6.7\" LTPO OLED 120Hz" },
      { label: { en: "Chip", sw: "Chipu" }, value: "Google Tensor G3" },
      { label: { en: "Storage", sw: "Hifadhi" }, value: "128GB / 12GB RAM" },
      { label: { en: "Camera", sw: "Kamera" }, value: "50MP + 48MP + 48MP" },
    ],
    stock: 4,
  },
  {
    id: "8",
    slug: "anker-65w-charger",
    name: "Anker 65W GaN Charger",
    brand: "Anker",
    category: "accessories",
    price: 95000,
    oldPrice: 120000,
    image: img("photo-1583863788434-e58a36330cf0"),
    description: {
      en: "Compact 65W USB-C charger. Powers laptops, phones, and tablets.",
      sw: "Chaja ndogo ya 65W USB-C. Inawasha laptops, simu, na tablets.",
    },
    specs: [
      { label: { en: "Power", sw: "Nguvu" }, value: "65W PD" },
      { label: { en: "Ports", sw: "Vituo" }, value: "1x USB-C" },
      { label: { en: "Tech", sw: "Teknolojia" }, value: "GaN II" },
    ],
    stock: 30,
  },
];

export const categories: { id: Product["category"] | "all"; en: string; sw: string }[] = [
  { id: "all", en: "All", sw: "Zote" },
  { id: "phones", en: "Phones", sw: "Simu" },
  { id: "laptops", en: "Laptops", sw: "Laptops" },
  { id: "audio", en: "Audio", sw: "Sauti" },
  { id: "wearables", en: "Wearables", sw: "Saa" },
  { id: "accessories", en: "Accessories", sw: "Vifaa" },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatTZS = (n: number) =>
  new Intl.NumberFormat("en-US").format(n) + " TZS";
