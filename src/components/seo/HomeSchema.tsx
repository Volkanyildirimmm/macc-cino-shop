const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://macc-cino.com";

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Matcha konsantresi nedir?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Matcha konsantresi, Ceremonial Grade organik matcha tozundan üretilen sıvı bir formdur. Su veya süt ile hızlıca karıştırılarak anında matcha içeceği elde edilir; köpürtme veya süzme gerektirmez.",
      },
    },
    {
      "@type": "Question",
      name: "Matcha konsantresi nasıl kullanılır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "12.5 ml (yaklaşık 2 yemek kaşığı veya 1 pompa) konsantreyi 150 ml su, süt ya da bitkisel süt ile karıştırın. Kullanmadan önce iyice çalkalayın. Anında servise hazırdır.",
      },
    },
    {
      "@type": "Question",
      name: "Bir şişeden kaç porsiyon çıkar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "250 ml şişe yaklaşık 20 porsiyon, 500 ml şişe yaklaşık 50 porsiyon, 1000 ml şişe ise yaklaşık 100 porsiyon verir. Her porsiyon 12.5 ml konsantre içerir.",
      },
    },
    {
      "@type": "Question",
      name: "Matcha konsantresi nasıl saklanır?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Açılmamış şişe oda sıcaklığında 12 ay boyunca saklanabilir. Açıldıktan sonra 2-8°C arasında buzdolabında muhafaza edin ve 4 hafta içinde tüketin.",
      },
    },
    {
      "@type": "Question",
      name: "Konsantre organik ve Ceremonial Grade mi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. macc-cino matcha konsantresi organik tarımdan elde edilen Ceremonial Grade matcha kullanır ve Almanya'da üretilir. Vegan ve glütensizdir.",
      },
    },
    {
      "@type": "Question",
      name: "Pompalı model ne işe yarar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "1000 ml Pompalı model, dahili dozajlama pompası sayesinde her basışta tam 10 ml (1 porsiyon) verir. Profesyonel kafe ve zincir restoranlarda hızlı, tutarlı servis sağlar.",
      },
    },
    {
      "@type": "Question",
      name: "Toptan veya white label mümkün mü?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Evet. Kafeler, zincir restoranlar ve perakende markaları için toptan satış ve özel etiketli (white label) üretim seçeneklerimiz mevcuttur. Teklif için iletişim formunu kullanın.",
      },
    },
  ],
};

const howToLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Matcha Konsantresinden İçecek Nasıl Hazırlanır",
  description:
    "macc-cino matcha konsantresi ile saniyeler içinde hazır matcha içecek hazırlama tarifi.",
  totalTime: "PT1M",
  estimatedCost: { "@type": "MonetaryAmount", currency: "EUR", value: "0.50" },
  supply: [
    { "@type": "HowToSupply", name: "macc-cino matcha konsantresi (12.5 ml)" },
    { "@type": "HowToSupply", name: "Su, süt veya bitkisel süt (150 ml)" },
  ],
  tool: [{ "@type": "HowToTool", name: "Bardak veya shaker" }],
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Dozajla",
      text: "12.5 ml konsantre ölçün (2 yemek kaşığı veya 1 pompa).",
      url: `${SITE_URL}/#nasil-hazirlanir`,
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Karıştır",
      text: "150 ml su, süt veya bitkisel süt ekleyip iyice karıştırın.",
      url: `${SITE_URL}/#nasil-hazirlanir`,
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Servis Et",
      text: "Anında servise hazır — köpürtme veya süzme gerektirmez.",
      url: `${SITE_URL}/#nasil-hazirlanir`,
    },
  ],
};

const itemListLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "macc-cino Matcha Konsantre Ürünleri",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: `${SITE_URL}/urunler/matcha-konsantre-250ml`,
      name: "Matcha Konsantre 250ml",
    },
    {
      "@type": "ListItem",
      position: 2,
      url: `${SITE_URL}/urunler/matcha-konsantre-500ml`,
      name: "Matcha Konsantre 500ml",
    },
    {
      "@type": "ListItem",
      position: 3,
      url: `${SITE_URL}/urunler/matcha-konsantre-1000ml`,
      name: "Matcha Konsantre 1000ml",
    },
    {
      "@type": "ListItem",
      position: 4,
      url: `${SITE_URL}/urunler/matcha-konsantre-1000ml-pompali`,
      name: "Matcha Konsantre 1000ml Pompalı",
    },
  ],
};

export function HomeSchema() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
    </>
  );
}
