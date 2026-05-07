# MACC-CINO.COM — E-Ticaret Sistemi Kurulum Kılavuzu

## Proje Özeti

macc-cino.com için tam kapsamlı bir e-ticaret sistemi kurulacak.

- **Frontend:** Next.js 14 (App Router) + Framer Motion + Tailwind CSS
- **Backend:** Medusa.js v2 (headless e-commerce engine)
- **Dil:** Türkçe (tüm UI ve içerik Türkçe)
- **Domain:** macc-cino.com

Sistem iki katmandan oluşuyor:
1. **Medusa Backend** — Ürün yönetimi, sipariş, ödeme, stok, admin paneli
2. **Next.js Storefront** — Müşterinin gördüğü site, animasyonlu premium UI

---

## BÖLÜM 1: PROJE KURULUMU

### 1.1 — Medusa Backend Kurulumu

```bash
# Medusa CLI ile proje oluştur
npx create-medusa-app@latest macc-cino-backend
# PostgreSQL veritabanı gerekli, kurulum sırasında otomatik ayarlar

cd macc-cino-backend

# Gerekli eklentiler
npm install medusa-payment-stripe medusa-fulfillment-manual medusa-file-local
```

**Medusa Admin Panel:** `http://localhost:9000/app` adresinden erişilir. Buradan ürünler, siparişler, müşteriler yönetilir.

**Medusa API:** `http://localhost:9000/store` adresinden storefront API'sine erişilir.

### 1.2 — Next.js Storefront Kurulumu

```bash
npx create-next-app@latest macc-cino-storefront --typescript --tailwind --app --src-dir
cd macc-cino-storefront

# Gerekli paketler
npm install framer-motion @medusajs/medusa-js @medusajs/product
npm install @tanstack/react-query
npm install lenis # smooth scroll
npm install clsx tailwind-merge
```

### 1.3 — Ortam Değişkenleri

**Backend `.env`:**
```env
DATABASE_URL=postgresql://localhost/macc_cino
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
JWT_SECRET=supersecret_jwt_macc_cino
COOKIE_SECRET=supersecret_cookie_macc_cino
```

**Frontend `.env.local`:**
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_SITE_URL=https://macc-cino.com
```

---

## BÖLÜM 2: ÜRÜN VERİLERİ (4 SKU)

Tüm ürünler "Matcha Konsantre Tip Pure" — sıvı matcha konsantresi, cam şişe, Ceremonial Grade, organik.

### Ürün 1: Matcha Konsantre 250ml

| Alan | Değer |
|---|---|
| Başlık | Matcha Konsantre 250ml |
| Slug | matcha-konsantre-250ml |
| Hacim | 250ml |
| Porsiyon | ~20 porsiyon |
| Hedef | Test amaçlı, küçük işletmeler, düşük hacim |
| Açıklama | Denemek ve küçük ölçekli kullanım için ideal başlangıç boyutu. Ceremonial Grade organik matcha konsantresi. |
| Fiyat | 1490 (€14.90 — Medusa kuruş cinsinden saklar) |
| SKU | MCC-PURE-250 |
| Ağırlık | 400g (şişe dahil tahmini) |
| Etiket Boyutu | 188mm × 65mm |

### Ürün 2: Matcha Konsantre 500ml

| Alan | Değer |
|---|---|
| Başlık | Matcha Konsantre 500ml |
| Slug | matcha-konsantre-500ml |
| Hacim | 500ml |
| Porsiyon | ~50 porsiyon |
| Hedef | Orta hacimli tüketim, düzenli kullanım |
| Açıklama | Düzenli kullanım ve orta ölçekli işletmeler için en uygun boyut. Ceremonial Grade organik matcha konsantresi. |
| Fiyat | 2490 (€24.90) |
| SKU | MCC-PURE-500 |
| Ağırlık | 750g |
| Etiket Boyutu | 230mm × 75mm |

### Ürün 3: Matcha Konsantre 1000ml

| Alan | Değer |
|---|---|
| Başlık | Matcha Konsantre 1000ml |
| Slug | matcha-konsantre-1000ml |
| Hacim | 1000ml |
| Porsiyon | ~100 porsiyon |
| Hedef | Yoğun kullanım, yüksek hacim, maksimum verimlilik |
| Açıklama | Yoğun kullanım için büyük boy, maksimum verimlilik. Ceremonial Grade organik matcha konsantresi. |
| Fiyat | 3990 (€39.90) |
| SKU | MCC-PURE-1000 |
| Ağırlık | 1400g |
| Etiket Boyutu | 200mm × 150mm |

### Ürün 4: Matcha Konsantre 1000ml Pompalı

| Alan | Değer |
|---|---|
| Başlık | Matcha Konsantre 1000ml Pompalı |
| Slug | matcha-konsantre-1000ml-pompali |
| Hacim | 1000ml + pompa dozajlama sistemi |
| Porsiyon | ~100 porsiyon |
| Hedef | Profesyonel kullanım, kafeler, zincir restoranlar, hızlı servis |
| Açıklama | Pompa dozajlama sistemiyle hızlı ve hassas servis. 1 pompa = 10ml = 1 porsiyon. Profesyoneller için tasarlandı. Ceremonial Grade organik matcha konsantresi. |
| Fiyat | 4490 (€44.90) |
| SKU | MCC-PURE-1000P |
| Ağırlık | 1500g |
| Etiket Boyutu | 200mm × 150mm |
| Özel Badge | "PRO" / "Profesyonel" |
| Özellik | Dahili pompa dozajlayıcı (1 pompa = 10ml) |

### Tüm Ürünlerde Ortak Bilgiler

**Zutaten / İçindekiler:**
Su, Organik Matcha Tozu*, Doğal Renklendirici: Klorofil, Tatlandırıcı: Sukraloz, Askorbik Asit.
*Organik tarımdan, Ceremonial Grade

**Besin Değerleri — 100ml başına:**
| Besin | 100ml | Porsiyon (12.5ml) |
|---|---|---|
| Enerji | 150.33 kJ / 35.93 kcal | 18.8 kJ / 4.5 kcal |
| Yağ | 0.55 g | 0.07 g |
| — Doymuş Yağ | 0.11 g | 0.01 g |
| Karbonhidrat | 4.21 g | 0.53 g |
| — Şeker | 0.0 g | 0.0 g |
| Protein | 3.33 g | 0.42 g |
| Tuz | <0.01 g | <0.005 g |

**Kullanım Talimatları:**
- 12.5ml (2 yemek kaşığı) konsantreyi 150ml su veya süt (bitkisel alternatifler dahil) ile karıştırın
- Alternatif: 1-2 pompa (pompalı model)
- Kullanmadan önce iyice çalkalayın
- Köpürtme veya süzme gerektirmez — anında servise hazır

**Saklama:**
- Açılmamış: 12 ay oda sıcaklığında
- Açıldıktan sonra: Buzdolabında 2-8°C
- Açtıktan sonra 4 hafta içinde tüketin
- Seyreltmeden içmeyin

**Ambalaj:** Dozajlama sistemli cam şişe

**Üretim:** Almanya'da üretilmektedir

**Ekonomik Bilgi:**
- 1 şişe (250ml) = ~20 porsiyon
- 1 şişe (1000ml) = ~100 porsiyon
- Piyasa satış fiyatı: içecek başına 4-6 €
- Yüksek kar marjı potansiyeli

---

## BÖLÜM 3: MEDUSA BACKEND SEED SCRIPT

Medusa admin panelinden manuel giriş yerine seed script ile ürünleri otomatik oluştur:

```typescript
// seed.ts — Medusa v2 ürün seed dosyası
// Bu dosyayı backend kök dizinine koy ve `npx medusa exec seed.ts` ile çalıştır

import { ExecArgs } from "@medusajs/framework/types";

export default async function seed({ container }: ExecArgs) {
  const productService = container.resolve("product");
  const regionService = container.resolve("region");
  const salesChannelService = container.resolve("sales_channel");

  // Region oluştur (EUR)
  const region = await regionService.createRegions({
    name: "Avrupa",
    currency_code: "eur",
    countries: ["de", "tr", "at", "ch"],
  });

  // Ürün koleksiyonu
  const collection = await productService.createCollections({
    title: "Matcha Konsantre",
    handle: "matcha-konsantre",
  });

  // Ortak metadata
  const sharedMetadata = {
    grade: "Ceremonial Grade",
    origin: "Organik",
    production_country: "Almanya",
    shelf_life_months: 12,
    after_opening_weeks: 4,
    storage_temp: "2-8°C",
    dosage_ml: 12.5,
    mix_ratio: "12.5ml konsantre + 150ml su/süt",
    ingredients: "Su, Organik Matcha Tozu, Doğal Renklendirici: Klorofil, Tatlandırıcı: Sukraloz, Askorbik Asit",
  };

  // 4 ürün oluştur
  const products = [
    {
      title: "Matcha Konsantre 250ml",
      handle: "matcha-konsantre-250ml",
      subtitle: "Başlangıç Boyutu",
      description: "Denemek ve küçük ölçekli kullanım için ideal başlangıç boyutu. Ceremonial Grade organik matcha konsantresi. ~20 porsiyon.",
      status: "published",
      collection_id: collection.id,
      metadata: { ...sharedMetadata, volume_ml: 250, portions: 20, label_size: "188mm × 65mm" },
      options: [{ title: "Boyut", values: ["250ml"] }],
      variants: [{
        title: "250ml",
        sku: "MCC-PURE-250",
        prices: [{ amount: 1490, currency_code: "eur" }],
        manage_inventory: true,
      }],
    },
    {
      title: "Matcha Konsantre 500ml",
      handle: "matcha-konsantre-500ml",
      subtitle: "Standart Boyut",
      description: "Düzenli kullanım ve orta ölçekli işletmeler için en uygun boyut. Ceremonial Grade organik matcha konsantresi. ~50 porsiyon.",
      status: "published",
      collection_id: collection.id,
      metadata: { ...sharedMetadata, volume_ml: 500, portions: 50, label_size: "230mm × 75mm" },
      options: [{ title: "Boyut", values: ["500ml"] }],
      variants: [{
        title: "500ml",
        sku: "MCC-PURE-500",
        prices: [{ amount: 2490, currency_code: "eur" }],
        manage_inventory: true,
      }],
    },
    {
      title: "Matcha Konsantre 1000ml",
      handle: "matcha-konsantre-1000ml",
      subtitle: "Büyük Boy",
      description: "Yoğun kullanım için büyük boy, maksimum verimlilik. Ceremonial Grade organik matcha konsantresi. ~100 porsiyon.",
      status: "published",
      collection_id: collection.id,
      metadata: { ...sharedMetadata, volume_ml: 1000, portions: 100, label_size: "200mm × 150mm" },
      options: [{ title: "Boyut", values: ["1000ml"] }],
      variants: [{
        title: "1000ml",
        sku: "MCC-PURE-1000",
        prices: [{ amount: 3990, currency_code: "eur" }],
        manage_inventory: true,
      }],
    },
    {
      title: "Matcha Konsantre 1000ml Pompalı",
      handle: "matcha-konsantre-1000ml-pompali",
      subtitle: "Profesyonel",
      description: "Pompa dozajlama sistemiyle hızlı ve hassas servis. 1 pompa = 10ml = 1 porsiyon. Profesyoneller için tasarlandı. Ceremonial Grade organik matcha konsantresi. ~100 porsiyon.",
      status: "published",
      collection_id: collection.id,
      tags: [{ value: "PRO" }, { value: "Pompalı" }],
      metadata: {
        ...sharedMetadata,
        volume_ml: 1000,
        portions: 100,
        label_size: "200mm × 150mm",
        has_pump: true,
        pump_dosage_ml: 10,
      },
      options: [{ title: "Boyut", values: ["1000ml Pompalı"] }],
      variants: [{
        title: "1000ml Pompalı",
        sku: "MCC-PURE-1000P",
        prices: [{ amount: 4490, currency_code: "eur" }],
        manage_inventory: true,
      }],
    },
  ];

  for (const product of products) {
    await productService.createProducts(product);
  }

  console.log("✅ macc-cino ürünleri başarıyla oluşturuldu!");
}
```

> **NOT:** Medusa v2 API'si sürekli güncelleniyor. Yukarıdaki seed script yapısal bir referanstır. `npx medusa exec` veya admin panelinden oluşturabilirsin. Önemli olan ürün verilerinin doğruluğudur.

---

## BÖLÜM 4: FRONTEND MİMARİSİ

### 4.1 — Dosya Yapısı

```
macc-cino-storefront/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fontlar, smooth scroll
│   │   ├── page.tsx                # Ana sayfa (tüm sectionlar burada)
│   │   ├── urunler/
│   │   │   └── [handle]/
│   │   │       └── page.tsx        # Ürün detay sayfası
│   │   ├── sepet/
│   │   │   └── page.tsx            # Sepet sayfası
│   │   ├── odeme/
│   │   │   └── page.tsx            # Ödeme sayfası
│   │   ├── siparis-onay/
│   │   │   └── page.tsx            # Sipariş onay
│   │   ├── white-label/
│   │   │   └── page.tsx            # White label bilgi sayfası
│   │   └── iletisim/
│   │       └── page.tsx            # İletişim formu
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx          # Sticky header + scroll progress
│   │   │   ├── Footer.tsx          # Footer
│   │   │   ├── MobileMenu.tsx      # Mobil menü
│   │   │   └── ScrollProgress.tsx  # Üst scroll çubuğu
│   │   ├── sections/
│   │   │   ├── Hero.tsx            # Hero section
│   │   │   ├── Products.tsx        # Ürün showcase
│   │   │   ├── HowItWorks.tsx      # Nasıl hazırlanır
│   │   │   ├── Benefits.tsx        # Avantajlar
│   │   │   ├── UseCases.tsx        # Kimler için
│   │   │   ├── Comparison.tsx      # Ürün karşılaştırma
│   │   │   ├── Nutrition.tsx       # Besin değerleri
│   │   │   ├── Economics.tsx       # Ekonomik avantaj
│   │   │   ├── WhiteLabel.tsx      # White label section
│   │   │   ├── StorageTips.tsx     # Saklama bilgileri
│   │   │   └── Contact.tsx         # İletişim formu
│   │   ├── product/
│   │   │   ├── ProductCard.tsx     # Ürün kartı (animasyonlu)
│   │   │   ├── ProductDetail.tsx   # Ürün detay bileşeni
│   │   │   ├── AddToCart.tsx       # Sepete ekle butonu
│   │   │   └── ProBadge.tsx        # PRO badge (pompalı ürün)
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx      # Yan açılan sepet
│   │   │   ├── CartItem.tsx        # Sepet öğesi
│   │   │   └── CartSummary.tsx     # Sepet özeti
│   │   ├── ui/
│   │   │   ├── Button.tsx          # Animasyonlu buton
│   │   │   ├── MagneticButton.tsx  # Manyetik hover efektli buton
│   │   │   ├── CountUp.tsx         # Sayı sayma animasyonu
│   │   │   ├── TextReveal.tsx      # Metin ortaya çıkma animasyonu
│   │   │   ├── ParallaxCard.tsx    # 3D tilt kart
│   │   │   ├── AnimatedSection.tsx # Scroll-trigger wrapper
│   │   │   ├── GrainOverlay.tsx    # Grain doku overlay
│   │   │   └── WaveDiv.tsx         # Dalga şekli section ayırıcı
│   │   └── icons/
│   │       └── MatchaLeaf.tsx      # Özel SVG ikonlar
│   ├── lib/
│   │   ├── medusa.ts              # Medusa JS client kurulumu
│   │   ├── utils.ts               # Yardımcı fonksiyonlar (cn, formatPrice vb.)
│   │   └── constants.ts           # Sabit veriler (besin değerleri, içerikler)
│   ├── hooks/
│   │   ├── useCart.ts             # Sepet hook'u (Medusa)
│   │   ├── useProducts.ts        # Ürün listesi hook'u
│   │   ├── useSmoothScroll.ts    # Lenis smooth scroll
│   │   └── useCountUp.ts         # Sayı animasyonu hook'u
│   └── styles/
│       └── globals.css            # Tailwind + özel stiller
├── public/
│   ├── images/
│   │   ├── bottle-250.webp        # Ürün görselleri (placeholder)
│   │   ├── bottle-500.webp
│   │   ├── bottle-1000.webp
│   │   ├── bottle-1000-pump.webp
│   │   ├── matcha-powder.webp
│   │   └── og-image.jpg           # Social media preview
│   └── fonts/                     # Özel fontlar
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

### 4.2 — Tailwind Konfigürasyonu

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        matcha: {
          50: "#f0f7ea",
          100: "#dcedc8",
          200: "#aed581",
          300: "#8bc34a",
          400: "#6b9b37",
          500: "#4a7c23",
          600: "#3d6b1c",
          700: "#2D5016",
          800: "#1e3a0f",
          900: "#0f1f08",
          950: "#080f04",
        },
        gold: {
          300: "#E0C885",
          400: "#D4B86A",
          500: "#C5A55A",
          600: "#A8893E",
          700: "#8B6D22",
        },
        cream: "#F7F5F0",
        dark: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
      },
      animation: {
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 1.5s infinite",
        "grain": "grain 8s steps(10) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(197,165,90,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(197,165,90,0.6)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

### 4.3 — Medusa Client Kurulumu

```typescript
// src/lib/medusa.ts
import Medusa from "@medusajs/medusa-js";

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const medusa = new Medusa({
  baseUrl: BACKEND_URL,
  maxRetries: 3,
});
```

### 4.4 — Sabit Veriler

```typescript
// src/lib/constants.ts

export const PRODUCTS_DATA = {
  "matcha-konsantre-250ml": {
    volume: 250,
    portions: 20,
    targetText: "Test amaçlı, küçük işletmeler, düşük hacim",
    labelSize: "188mm × 65mm",
    badge: null,
  },
  "matcha-konsantre-500ml": {
    volume: 500,
    portions: 50,
    targetText: "Orta hacimli tüketim, düzenli kullanım",
    labelSize: "230mm × 75mm",
    badge: null,
  },
  "matcha-konsantre-1000ml": {
    volume: 1000,
    portions: 100,
    targetText: "Yoğun kullanım, maksimum verimlilik",
    labelSize: "200mm × 150mm",
    badge: null,
  },
  "matcha-konsantre-1000ml-pompali": {
    volume: 1000,
    portions: 100,
    targetText: "Profesyonel kullanım, kafeler, hızlı servis",
    labelSize: "200mm × 150mm",
    badge: "PRO",
    hasPump: true,
    pumpDosage: 10,
  },
};

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

export const INGREDIENTS = "Su, Organik Matcha Tozu*, Doğal Renklendirici: Klorofil, Tatlandırıcı: Sukraloz, Askorbik Asit.";
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
    description: "En yüksek kalite Japonya matcha'sı, organik sertifikalı",
  },
];

export const USE_CASES = [
  { icon: "☕", title: "Kafeler & Restoranlar", description: "Hızlı servis, tutarlı kalite, yüksek kar marjı" },
  { icon: "🏢", title: "Kurumsal Ofisler", description: "Çalışan memnuniyeti, kolay self-servis" },
  { icon: "🏋️", title: "Fitness & Sağlık Merkezleri", description: "Doğal enerji, düşük kalori, sağlıklı alternatif" },
  { icon: "🏪", title: "Perakende & RTD Markaları", description: "White label ile kendi markanızı oluşturun" },
  { icon: "🔗", title: "Zincir Restoranlar", description: "Standart süreçler, ölçeklenebilir operasyon" },
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
    description: "12.5ml konsantre koyun (2 yemek kaşığı veya 1 pompa)",
  },
  {
    step: 2,
    title: "Karıştır",
    description: "150ml su, süt veya bitkisel süt ekleyip karıştırın",
  },
  {
    step: 3,
    title: "Keyfini Çıkar",
    description: "Anında servise hazır — köpürtme veya süzme gerektirmez",
  },
];
```

---

## BÖLÜM 5: FRONTEND UI/UX TASARIM SPECİFİKASYONLARI

### 5.1 — Marka Kimliği

| Özellik | Değer |
|---|---|
| Marka Adı | macc-cino |
| Tagline | "Matcha — standart. ölçeklenebilir. ekonomik." |
| Ruh Hali | Premium, temiz, Japon estetiği + modern hassasiyet |
| Ana Renk | Deep Matcha Green #2D5016 |
| Vurgu Renk | Gold #C5A55A |
| Arka Plan | Off-white #F7F5F0 (cream) |
| Koyu Ton | #1A1A1A (dark) |
| Tipografi Display | Distinctive serif veya display font (Playfair Display, Cormorant, veya benzeri premium font — Inter/Roboto KULLANMA) |
| Tipografi Body | Temiz sans-serif (DM Sans, Outfit, veya benzeri — ama sıradan olmasın) |

### 5.2 — Animasyon Spesifikasyonları (Framer Motion)

Aşağıdaki animasyonlar MUTLAKA uygulanmalı:

**Sayfa Yükleme:**
```tsx
// Staggered hero animasyonu
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};
const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};
```

**Scroll Tetiklemeli Section Girişi:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

**Ürün Kartları — 3D Tilt:**
```tsx
// Hover'da hafif 3D döndürme efekti
const handleMouseMove = (e: MouseEvent) => {
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  rotateX.set(y * -10); // max 5deg
  rotateY.set(x * 10);
};
```

**Manyetik Buton:**
```tsx
// Buton, cursor'a doğru hafifçe kayar (50px yarıçap içinde)
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  style={{ x: springX, y: springY }}
  transition={{ type: "spring", stiffness: 150, damping: 15 }}
>
```

**Sayı Sayma Animasyonu:**
```tsx
// Viewport'a girince 0'dan hedef sayıya kadar sayar
const count = useMotionValue(0);
const rounded = useTransform(count, Math.round);
useEffect(() => {
  if (inView) {
    animate(count, targetValue, { duration: 2, ease: "easeOut" });
  }
}, [inView]);
```

**Metin Ortaya Çıkma (Word-by-Word):**
```tsx
// Başlıklar kelime kelime ortaya çıkar
{text.split(" ").map((word, i) => (
  <motion.span
    key={i}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: i * 0.08, duration: 0.5 }}
  >
    {word}{" "}
  </motion.span>
))}
```

**Spring Fizik Parametreleri:**
```tsx
// Kart etkileşimleri için
{ type: "spring", stiffness: 100, damping: 15 }

// Buton hover için
{ type: "spring", stiffness: 400, damping: 25 }
```

**Floating/Bobbing Animasyon (Dekoratif elementler):**
```tsx
<motion.div
  animate={{ y: [0, -10, 0] }}
  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
/>
```

**Scroll İlerleme Çubuğu:**
```tsx
const { scrollYProgress } = useScroll();
<motion.div
  className="fixed top-0 left-0 right-0 h-[3px] bg-matcha-600 origin-left z-50"
  style={{ scaleX: scrollYProgress }}
/>
```

### 5.3 — UI Detayları

**Glassmorphism Kartlar:**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
}
```

**Grain Overlay:**
```css
.grain-overlay::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise pattern */
  opacity: 0.03;
  pointer-events: none;
  z-index: 9999;
}
```

**Section Ayırıcı (Dalga SVG):**
```tsx
// Sectionlar arası organik dalga şekli
<svg viewBox="0 0 1440 80" className="w-full">
  <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
    fill="currentColor" />
</svg>
```

**Gölgeler:**
```css
box-shadow: 0 8px 32px rgba(45, 80, 22, 0.12);  /* Yeşil tonlu gölge */
box-shadow: 0 4px 16px rgba(197, 165, 90, 0.15); /* Gold glow */
```

**Dekoratif Elementler:**
- Japon dalga desenleri (seigaiha) subtle arka plan
- Enso daireler (Zen felsefesi referansı)
- Matcha yaprak line-art SVG'leri
- Bambu dalı çizimleri

---

## BÖLÜM 6: SAYFA SECTION DETAYLARI

### Section 1: HERO
- Tam ekran, matcha-green gradient arka plan
- Havada uçuşan matcha tozu parçacık animasyonu (Framer Motion)
- Ana başlık: **"Matcha'nın Geleceği Sıvı"** — staggered kelime animasyonu
- Alt başlık: "Profesyonel kullanım için standartlaştırılmış matcha konsantresi"
- Sağda veya ortada hafifçe dönen/yüzen şişe mockup'ı
- CTA: "Ürünleri Keşfet" (manyetik hover efekti)
- İkincil CTA: "Nasıl Çalışır?" (smooth scroll)
- Aşağı kaydırma göstergesi (bounce animasyonu)
- Cursor takip eden gradient spotlight efekti

### Section 2: ÜRÜNLER ("Ürünlerimiz")
- 4 ürün kartı grid (desktop: 4 sütun, tablet: 2x2, mobil: tek sütun)
- Her kartta: şişe görseli placeholder, hacim badge, porsiyon sayısı (count-up), kısa açıklama, fiyat, "Sepete Ekle" butonu
- Ürün 4 (Pompalı): "PRO" badge ile pulse-glow animasyonu
- Kartlar hover'da 3D tilt efekti
- Viewport'a girince staggered ortaya çıkma

### Section 3: NASIL HAZIRLANIR ("Nasıl Hazırlanır?")
- 3 adım: Dozajla → Karıştır → Keyfini Çıkar
- Adımları birbirine bağlayan çizgi/yol animasyonu (draw-line)
- Her adım scroll'da ortaya çıkar
- Altında: "Köpürtme veya süzme gerektirmez — anında hazır!" vurgusu
- Pompalı model için bonus: "Tek pompa, tek porsiyon"

### Section 4: AVANTAJLAR ("Neden macc-cino?")
- 6 avantaj kartı (2x3 grid)
- Spring fizik ile sıralı ortaya çıkma
- İkonlarda sürekli hafif animasyon (pulse, bounce)
- Büyük sayaç alanı: "1 şişe = 100 porsiyon" (count-up)

### Section 5: KİMLER İÇİN ("Kimler İçin?")
- Tab veya horizontal scroll ile 5 segment
- Her tab'da açıklama + ikon
- Smooth crossfade geçiş

### Section 6: KARŞILAŞTIRMA ("Hangi Boy Sana Uygun?")
- 4 sütunlu tablo (250ml, 500ml, 1000ml, 1000ml Pompalı)
- Satırlar: Hacim, Porsiyon, İdeal Kullanım, Dozajlama, Fiyat
- Mouse takip eden highlight
- 1000ml Pompalı sütununda "Önerilen" badge
- Satırlar scroll'da sıralı slide-in

### Section 7: BESİN DEĞERLERİ ("İçindekiler & Besin Değerleri")
- Açılır/kapanır panel (smooth height animasyonu)
- İçerik listesi
- 100ml / Porsiyon toggle
- Tablo satırları sıralı slide-in
- Badge: "Organik • Vegan • Glutensiz"

### Section 8: EKONOMİK AVANTAJ ("Ekonomik Avantaj")
- Maliyet/gelir infographic animasyonu
- Bar chart büyüme animasyonu
- Sayılar count-up
- "1 şişe = ~100 porsiyon, piyasa fiyatı 4-6€/içecek"

### Section 9: WHITE LABEL ("Kendi Markanızı Oluşturun")
- Boş etiket → markalı etiket morph animasyonu
- Bilgiler: Almanya üretimi, 2-4 hafta teslimat, ölçeklenebilir, özel etiket desteği
- Etiket boyutları listesi
- CTA: "White Label Teklif Al"

### Section 10: SAKLAMA ("Saklama & Kullanım")
- 4 ipucu, ikon + metin, slide-in animasyon

### Section 11: İLETİŞİM
- Sol: form (firma adı, isim, email, telefon, ürün seçimi multi-select, tahmini tüketim, mesaj)
- Sağ: iletişim bilgileri
- "Teklif İste" butonu (loading animasyonu)
- Trust badge'leri

### Section 12: FOOTER
- Koyu arka plan, logo, navigasyon, yasal linkler, sosyal medya

---

## BÖLÜM 7: MEDusa–FRONTEND ENTEGRASYONU

### 7.1 — Ürünleri Çekme

```typescript
// src/hooks/useProducts.ts
import { useQuery } from "@tanstack/react-query";
import { medusa } from "@/lib/medusa";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { products } = await medusa.products.list({
        limit: 10,
        expand: "variants,variants.prices,collection,tags",
      });
      return products;
    },
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ["product", handle],
    queryFn: async () => {
      const { products } = await medusa.products.list({ handle });
      return products[0] ?? null;
    },
    enabled: !!handle,
  });
}
```

### 7.2 — Sepet İşlemleri

```typescript
// src/hooks/useCart.ts
import { medusa } from "@/lib/medusa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Cart ID'yi localStorage'da tut
const CART_KEY = "macc_cino_cart_id";

export function useCart() {
  const queryClient = useQueryClient();

  const cartId = typeof window !== "undefined" ? localStorage.getItem(CART_KEY) : null;

  const cart = useQuery({
    queryKey: ["cart", cartId],
    queryFn: async () => {
      if (!cartId) return null;
      const { cart } = await medusa.carts.retrieve(cartId);
      return cart;
    },
    enabled: !!cartId,
  });

  const createCart = useMutation({
    mutationFn: async () => {
      const { cart } = await medusa.carts.create({ region_id: "REGION_ID" });
      localStorage.setItem(CART_KEY, cart.id);
      return cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const addItem = useMutation({
    mutationFn: async ({ variantId, quantity }: { variantId: string; quantity: number }) => {
      let currentCartId = cartId;
      if (!currentCartId) {
        const { cart: newCart } = await medusa.carts.create({ region_id: "REGION_ID" });
        localStorage.setItem(CART_KEY, newCart.id);
        currentCartId = newCart.id;
      }
      const { cart } = await medusa.carts.lineItems.create(currentCartId, {
        variant_id: variantId,
        quantity,
      });
      return cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeItem = useMutation({
    mutationFn: async (lineItemId: string) => {
      if (!cartId) return;
      const { cart } = await medusa.carts.lineItems.delete(cartId, lineItemId);
      return cart;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  return { cart: cart.data, addItem, removeItem, createCart };
}
```

### 7.3 — Ödeme Akışı

```
Müşteri akışı:
1. Ürünleri sepete ekle → CartDrawer açılır
2. "Siparişi Tamamla" → /odeme sayfası
3. Adres + teslimat bilgileri formu
4. Ödeme (Stripe entegrasyonu)
5. /siparis-onay sayfası → teşekkür + sipariş özeti
```

---

## BÖLÜM 8: DEPLOYMENT

### 8.1 — Frontend (Vercel)

```bash
# Vercel'e deploy
cd macc-cino-storefront
vercel --prod

# Environment variables Vercel dashboard'dan ayarla:
# NEXT_PUBLIC_MEDUSA_BACKEND_URL = https://api.macc-cino.com
```

### 8.2 — Backend (Railway veya Hetzner)

```bash
# Railway ile kolay deploy
# 1. Railway'de PostgreSQL + Redis oluştur
# 2. Medusa backend'i GitHub'dan Railway'e bağla
# 3. Environment variables ayarla

# Alternatif: Docker ile
docker compose up -d
```

### 8.3 — Domain Ayarları

```
macc-cino.com          → Vercel (frontend)
api.macc-cino.com      → Railway/Hetzner (Medusa backend)
admin.macc-cino.com    → Medusa admin paneli
```

---

## BÖLÜM 9: ADIM ADIM UYGULAMA SIRASI

Claude Code'da şu sırayla ilerle:

### Faz 1: Temel Altyapı
1. Medusa backend'i kur, PostgreSQL bağla
2. Seed script ile 4 ürünü oluştur
3. Admin panelinde ürünleri doğrula
4. Next.js projesini oluştur, Tailwind + Framer Motion kur
5. Medusa client'ı bağla, ürünleri frontend'de çek ve logla

### Faz 2: Ana Sayfa UI
6. Layout (Header + Footer) oluştur
7. Hero section — animasyonlar dahil
8. Products section — kartlar + Medusa'dan veri çekme
9. HowItWorks section
10. Benefits section
11. UseCases section
12. Comparison table
13. Nutrition panel
14. Economics infographic
15. WhiteLabel section
16. StorageTips section
17. Contact form

### Faz 3: E-Ticaret İşlevselliği
18. Sepet sistemi (CartDrawer + addItem/removeItem)
19. Ürün detay sayfaları (/urunler/[handle])
20. Ödeme sayfası + Stripe entegrasyonu
21. Sipariş onay sayfası

### Faz 4: Parlatma
22. Responsive kontrol (mobil, tablet, desktop)
23. SEO meta tagları, Open Graph
24. Performance optimizasyonu (lazy load, will-change)
25. Reduced-motion media query desteği
26. Son test ve deploy

---

## ÖNEMLİ NOTLAR

- **Framer Motion her yerde kullanılmalı.** Statik görünen hiçbir section olmamalı. Her element scroll'da veya hover'da bir animasyona sahip olmalı.
- **Generic görünüm YASAK.** Inter, Roboto, Arial font kullanma. Mor gradient kullanma. Cookie-cutter template görünümünden kaçın. Her tasarım kararı bilinçli ve premium olmalı.
- **Medusa v2 kullanılacak.** API yapısı farklı olabilir, güncel dökümantasyona bak: https://docs.medusajs.com/v2
- **Türkçe karakter desteği:** URL slug'larda Türkçe karakter kullanma (ü→u, ö→o, ş→s, ç→c, ı→i, ğ→g). Sayfa içeriğinde tam Türkçe.
- **Placeholder görseller:** Ürün görselleri yoksa CSS ile şişe siluetleri oluştur veya gradient placeholder kullan. Koyu amber/kahverengi cam şişe + siyah kapak/pompa görünümü.
- **Fiyatlar placeholder.** Gerçek fiyatlar daha sonra güncellenecek.
