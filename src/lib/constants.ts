export interface ProductData {
  id: string;
  handle: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  sku: string;
  volume: number;
  portions: number;
  targetText: string;
  labelSize: string;
  badge: string | null;
  hasPump?: boolean;
  pumpDosage?: number;
  weight: number;
}

export const PRODUCTS: ProductData[] = [
  {
    id: "prod_250",
    handle: "matcha-konsantre-250ml",
    title: "Matcha Konsantre 250ml",
    subtitle: "Başlangıç Boyutu",
    description:
      "Denemek ve küçük ölçekli kullanım için ideal başlangıç boyutu. Ceremonial Grade organik matcha konsantresi.",
    price: 1490,
    sku: "MCC-PURE-250",
    volume: 250,
    portions: 20,
    targetText: "Test amaçlı, küçük işletmeler, düşük hacim",
    labelSize: "188mm × 65mm",
    badge: null,
    weight: 400,
  },
  {
    id: "prod_500",
    handle: "matcha-konsantre-500ml",
    title: "Matcha Konsantre 500ml",
    subtitle: "Standart Boyut",
    description:
      "Düzenli kullanım ve orta ölçekli işletmeler için en uygun boyut. Ceremonial Grade organik matcha konsantresi.",
    price: 2490,
    sku: "MCC-PURE-500",
    volume: 500,
    portions: 50,
    targetText: "Orta hacimli tüketim, düzenli kullanım",
    labelSize: "230mm × 75mm",
    badge: null,
    weight: 750,
  },
  {
    id: "prod_1000",
    handle: "matcha-konsantre-1000ml",
    title: "Matcha Konsantre 1000ml",
    subtitle: "Büyük Boy",
    description:
      "Yoğun kullanım için büyük boy, maksimum verimlilik. Ceremonial Grade organik matcha konsantresi.",
    price: 3990,
    sku: "MCC-PURE-1000",
    volume: 1000,
    portions: 100,
    targetText: "Yoğun kullanım, maksimum verimlilik",
    labelSize: "200mm × 150mm",
    badge: null,
    weight: 1400,
  },
  {
    id: "prod_1000p",
    handle: "matcha-konsantre-1000ml-pompali",
    title: "Matcha Konsantre 1000ml Pompalı",
    subtitle: "Profesyonel",
    description:
      "Pompa dozajlama sistemiyle hızlı ve hassas servis. 1 pompa = 10ml = 1 porsiyon. Profesyoneller için tasarlandı. Ceremonial Grade organik matcha konsantresi.",
    price: 4490,
    sku: "MCC-PURE-1000P",
    volume: 1000,
    portions: 100,
    targetText: "Profesyonel kullanım, kafeler, hızlı servis",
    labelSize: "200mm × 150mm",
    badge: "PRO",
    hasPump: true,
    pumpDosage: 10,
    weight: 1500,
  },
];

export const NUTRITION_DATA = {
  per100ml: {
    energy_kj: 150.33,
    energy_kcal: 35.93,
    fat: 0.55,
    saturated_fat: 0.11,
    carbs: 4.21,
    sugar: 0.0,
    protein: 3.33,
    salt: "<0.01",
  },
  perServing: {
    energy_kj: 18.8,
    energy_kcal: 4.5,
    fat: 0.07,
    saturated_fat: 0.01,
    carbs: 0.53,
    sugar: 0.0,
    protein: 0.42,
    salt: "<0.005",
  },
};

export const INGREDIENTS =
  "Su, Organik Matcha Tozu*, Doğal Renklendirici: Klorofil, Tatlandırıcı: Sukraloz, Askorbik Asit.";
export const INGREDIENTS_NOTE = "*Organik tarımdan, Ceremonial Grade";

export const BENEFITS = [
  {
    icon: "⚡",
    title: "Hızlı Hazırlık",
    description: "Saniyeler içinde hazır, bekleme yok",
  },
  {
    icon: "✅",
    title: "Tutarlı Kalite",
    description: "Her seferinde aynı mükemmel tat, personelden bağımsız",
  },
  {
    icon: "📊",
    title: "Hesaplanabilir Maliyet",
    description: "Hassas dozajlama ile öngörülebilir marjlar",
  },
  {
    icon: "🧑‍🍳",
    title: "Barista Gerektirmez",
    description: "Herkes hazırlayabilir, özel eğitim gerektirmez",
  },
  {
    icon: "📦",
    title: "Uzun Raf Ömrü",
    description: "Açılmamış 12 ay, minimum fire ve kayıp",
  },
  {
    icon: "🌱",
    title: "Organik & Ceremonial Grade",
    description: "En yüksek kalite matcha, organik sertifikalı",
  },
];

export const USE_CASES = [
  {
    icon: "☕",
    title: "Kafeler & Restoranlar",
    description: "Hızlı servis, tutarlı kalite, yüksek kar marjı",
  },
  {
    icon: "🏢",
    title: "Kurumsal Ofisler",
    description: "Çalışan memnuniyeti, kolay self-servis",
  },
  {
    icon: "🏋️",
    title: "Fitness & Sağlık Merkezleri",
    description: "Doğal enerji, düşük kalori, sağlıklı alternatif",
  },
  {
    icon: "🔗",
    title: "Zincir Restoranlar",
    description: "Standart süreçler, ölçeklenebilir operasyon",
  },
];

export const STORAGE_TIPS = [
  { icon: "🔄", text: "Kullanmadan önce iyice çalkalayın" },
  { icon: "❄️", text: "Açtıktan sonra buzdolabında (2-8°C) saklayın" },
  { icon: "⏰", text: "Açtıktan sonra 4 hafta içinde tüketin" },
  { icon: "⚠️", text: "Seyreltmeden içmeyin" },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Dozajla",
    description:
      "12.5ml konsantre koyun (2 yemek kaşığı veya 1 pompa)",
  },
  {
    step: 2,
    title: "Karıştır",
    description:
      "150ml su, süt veya bitkisel süt ekleyip karıştırın",
  },
  {
    step: 3,
    title: "Keyfini Çıkar",
    description:
      "Anında servise hazır — köpürtme veya süzme gerektirmez",
  },
];

export const COMPARISON_ROWS = [
  {
    label: "Hacim",
    values: ["250ml", "500ml", "1000ml", "1000ml + Pompa"],
  },
  {
    label: "Porsiyon",
    values: ["~20", "~50", "~100", "~100"],
  },
  {
    label: "Fiyat",
    values: ["€14.90", "€24.90", "€39.90", "€44.90"],
  },
  {
    label: "Porsiyon Başına",
    values: ["~€0.75", "~€0.50", "~€0.40", "~€0.45"],
  },
  {
    label: "Dozajlama",
    values: ["Kaşık", "Kaşık", "Kaşık", "1 Pompa = 10ml"],
  },
  {
    label: "İdeal Kullanım",
    values: ["Deneme / Ev", "Düzenli / Küçük Kafe", "Yoğun Kullanım", "Profesyonel Servis"],
  },
];
