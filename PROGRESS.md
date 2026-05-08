# macc-cino — İlerleme Durumu

Son güncelleme: 2026-05-08

## Genel Mimari

- **Frontend:** `c:/Users/PC/Desktop/Shop Macc-cino/macc-cino-storefront/` — Next.js 16, App Router, Tailwind 4, Framer Motion
- **Backend:** `c:/Users/PC/Desktop/Shop Macc-cino/macc-cino-backend/apps/backend/` — Medusa v2.14.2 (Türkçe-localized starter, Iyzico + PayTR önceden gelmiş)
- **DB:** Coolify'da Postgres (`77.42.89.120:5412`, public expose)
- **Redis:** Coolify'da (henüz public expose yok, Medusa şu an in-memory fake kullanıyor)
- **Deploy hedefi:** Coolify (VPS: `77.42.89.120`)

## Önemli Bilgiler

- **Medusa admin:** http://localhost:9000/app — `info@macc-cino.com / vogo123`
- **Storefront:** http://localhost:3000
- **Publishable key:** `pk_0be27affc49db85aff45664e158b9ecca835551a0f4ade759873a490dc51b54b` (storefront `.env.local` içinde)
- **Postgres (Coolify public):** `postgres://postgres:9i0vNpGAHUFLkZif0eeC3wfzjvWnIqGpnuB2z6Fcs8YV6cAqqsStCI5QQxBjdY4j@77.42.89.120:5412/postgres?sslmode=disable`

## Yapıldı ✅

### Faz 1 — Medusa Backend Kurulumu
- `npx create-medusa-app@latest macc-cino-backend --skip-db --no-browser` ile scaffold (turbo monorepo)
- Coolify Postgres'e `?sslmode=disable` ile bağlandı
- `npx medusa db:migrate` — şema yüklendi (starter ayrıca sample t-shirt/sweatshirt seed'ledi)
- Admin user oluşturuldu: `info@macc-cino.com / vogo123`
- `npm run dev` → `localhost:9000/health` → `OK`

### Faz 2 — 4 SKU Seed
- `apps/backend/src/scripts/seed-matcha.ts` — sample ürünleri silip 4 matcha ekleyen idempotent seed
- Çalıştırma: `cd apps/backend && npx medusa exec ./src/scripts/seed-matcha.ts`
- Ürünler:
  - `matcha-konsantre-250ml` — MCC-PURE-250 — €14.90
  - `matcha-konsantre-500ml` — MCC-PURE-500 — €24.90
  - `matcha-konsantre-1000ml` — MCC-PURE-1000 — €39.90
  - `matcha-konsantre-1000ml-pompali` — MCC-PURE-1000P — €44.90
- Her variant'a 500 stok, "Matcha Konsantre" collection altında

### Faz 3 — Frontend ↔ Medusa
**Yeni dosyalar:**
- `src/lib/medusa.ts` — Medusa JS SDK client
- `src/lib/medusa-fetch.ts` — server-side fetch helpers (Next ISR cache, revalidate 60s)
- `src/lib/product-adapter.ts` — Medusa product → mevcut `ProductData` shape
- `src/app/providers.tsx` — `QueryClientProvider`

**Değişen dosyalar:**
- `src/lib/constants.ts` — `HANDLE_META` (UI-only fields keyed by handle: volume, portions, badge, hasPump...)
- `src/hooks/useProducts.ts` — React Query + SDK + adapter, fallback `PRODUCTS`
- `src/app/layout.tsx` — `<Providers>` wrap
- `src/components/sections/Products.tsx` — async server component, Medusa fetch
- `src/app/urunler/[handle]/page.tsx` — Medusa fetch + fallback constants

**Cart kasıtlı olarak Zustand'da bırakıldı** — checkout sırasında Medusa cart'a dönüştürülecek.

**Storefront `.env.local`:** `NEXT_PUBLIC_MEDUSA_BACKEND_URL`, `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` set.

### Faz 4 — Iyzico/PayTR Checkout
- Başka agent ile yapıldı (kontrol edilmedi, user "sıkıntı yok" dedi)
- Backend starter'da `payment-iyzico` ve `payment-paytr` modülleri zaten dahildi
- `apps/backend/.env`'de placeholder keyler: `IYZICO_API_KEY=placeholder`, `PAYTR_MERCHANT_ID=placeholder` vs. — gerçek keyler müşteriden gelince değiştirilecek
- Frontend `/odeme` sayfası mevcut

### Faz 5 — İletişim Formu API
- `src/app/api/iletisim/route.ts` — POST handler, validation, Resend REST API (key yoksa `console.log`)
- `src/components/sections/Contact.tsx` — input'lara `name`, fetch POST, error/loading state
- `.env.local` placeholder: `RESEND_API_KEY=`, `CONTACT_TO_EMAIL=info@macc-cino.com`
- Test: `curl POST /api/iletisim` → geçerli payload `{ok: true, dev: true}`, geçersiz email → `400 invalid_email`

### Açık Tema Revizyonu (2026-05-07)
- `Revizyon.md` spec'ine göre tüm site açık temaya geçirildi
- `globals.css` palette: `#FAFAF7` base, `#2D5016` matcha primary, `#C5A55A` gold (sadece PRO + WL CTA)
- Tüm sectionlar, kartlar, header, sepet, ödeme akışı beyaz/krem alternatif arka plan
- Footer ve WhiteLabel section koyu kaldı (kontrast)

### Faz 6 Hazırlık (2026-05-08)
- Backend bu makineye çekildi: `c:/Users/PC/Desktop/Shop Macc-cino/macc-cino-backend/`
- Backend `apps/backend/.env` oluşturuldu (Coolify Postgres URL, dev secrets, Iyzico/PayTR placeholder)
- Frontend `.env.local`'e publishable key + Resend placeholder eklendi
- `next.config.ts` → `output: "standalone"` eklendi
- Frontend `Dockerfile` + `.dockerignore` yazıldı (multi-stage, NEXT_PUBLIC_* build args)
- Backend `Dockerfile` + `.dockerignore` yazıldı (turbo monorepo aware, `apps/backend/.medusa/server` çıktısı)
- `COOLIFY-DEPLOY.md` (root'ta) — Coolify panelinde girilecek env şablonları + adımlar

## Yapılacak ⏳

### Faz 6 — Coolify Deploy (devam)

**Hedef:** Üç servis Coolify'da, internal network'le konuşuyor:
1. Postgres (zaten kurulu)
2. Redis (kurulu, ama Medusa internal URL'iyle bağlamak gerekiyor → backend `.env` `REDIS_URL` set)
3. Medusa backend — Dockerfile, `api.macc-cino.com` domain
4. Next.js storefront — Dockerfile, `macc-cino.com` domain

**Kalan adımlar** (detay: root'taki `COOLIFY-DEPLOY.md`):
1. Backend için `git init` + GitHub repo oluştur + push
2. Lokal sağlık kontrolü: `npm run dev` (backend), `npm run dev` (frontend) → ürünler Medusa'dan geliyor mu
3. Coolify'da iki app servisi oluştur (Dockerfile build), env vars gir, domain bağla
4. DNS A record'larını kullanıcı set edecek
5. İlk deploy sonrası: migrations + admin user + seed (lokal'den prod DB'ye bağlanarak en temiz)
6. Postgres'i internal-only'a al

**Notlar:**
- Backend henüz git repo değil — öncelik bu.
- Iyzico/PayTR canlı keyleri prod'da gerçeklerle değiştirilecek (şu an placeholder).
- `NEXT_PUBLIC_*` değişkenleri Coolify "Build Variables" olarak da girilmeli (Dockerfile ARG ile alıyor).

### Faz 7 — Parlatma

- `next.config.ts` — `images.remotePatterns` Medusa CDN/asset hostname'i ekle
- SEO: anasayfa metadata zaten zengin; ek olarak `/sitemap.ts` Medusa ürünlerinden dinamik üretsin
- `prefers-reduced-motion`: Framer Motion `useReducedMotion` hook'unu Hero, ProductCard, MagneticButton gibi yerlere ekle
- Lighthouse pass (perf/a11y/SEO ≥ 90)
- Mobil/tablet manuel test
- Resend domain doğrulaması + gerçek `RESEND_API_KEY` set

## Ofiste Devam Etmek İçin

1. **Repo'yu pull et:** `git clone https://github.com/Volkanyildirimmm/macc-cino-shop.git`
2. **Backend henüz git'te yok** — `c:/Users/volka/macc-cino-backend/` ev bilgisayarında. Ofiste tekrar `npx create-medusa-app` ile kurmak yerine ev bilgisayarından klasörü kopyala VEYA ofiste de aynı kuruluma git (DB Coolify'da olduğu için aynı state'e bağlanırsın). En temiz yol: ev bilgisayarında backend için ayrı GitHub repo oluştur, push et, ofiste pull et.
3. **`.env.local` dosyaları gitignore'da** — ofiste tekrar oluşturulması gerek. Yukarıdaki "Önemli Bilgiler" bölümündeki değerleri kullan.
4. **Backend `.env` aynı şekilde** — DATABASE_URL, secrets, Iyzico/PayTR placeholder'ları yeniden gir.
5. **Devam noktası:** Faz 6 — backend için git repo + Dockerfile, frontend için Dockerfile + standalone output, sonra Coolify'da app servisleri kur.

## Mevcut Komutlar

**Backend:**
```bash
cd c:/Users/volka/macc-cino-backend/apps/backend
npm run dev              # localhost:9000
npx medusa db:migrate    # migrations
npx medusa exec ./src/scripts/seed-matcha.ts   # 4 matcha seed (idempotent)
npx medusa user --email X --password Y         # yeni admin
```

**Frontend:**
```bash
cd c:/Users/volka/mac-cino\ shop
npm run dev              # localhost:3000
npx tsc --noEmit         # type check
npm run build            # prod build (henüz Dockerfile için ayarlanmadı)
```
