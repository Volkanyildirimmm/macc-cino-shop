# macc-cino — İlerleme Durumu

Son güncelleme: 2026-05-07

## Genel Mimari

- **Frontend repo:** [github.com/Volkanyildirimmm/macc-cino-shop](https://github.com/Volkanyildirimmm/macc-cino-shop) — `c:/Users/volka/mac-cino shop/` — Next.js 16, App Router, Tailwind 4, Framer Motion
- **Backend repo:** [github.com/Volkanyildirimmm/macc-cino-shop-backend](https://github.com/Volkanyildirimmm/macc-cino-shop-backend) — `c:/Users/volka/macc-cino-backend/` — Medusa v2.14.2 turbo monorepo, asıl uygulama `apps/backend/` içinde (Türkçe-localized starter, Iyzico + PayTR önceden gelmiş)
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

## Yapılacak ⏳

### Faz 6 — Coolify Deploy

**Hedef:** Üç servis Coolify'da, internal network'le konuşuyor:
1. Postgres (zaten kurulu)
2. Redis (kurulu, ama Medusa internal URL'iyle bağlamak gerekiyor → backend `.env` `REDIS_URL` set)
3. Medusa backend — Dockerfile, `api.macc-cino.com` domain
4. Next.js storefront — Dockerfile, `macc-cino.com` domain

**Adımlar:**
1. **Backend hazırlığı:**
   - `apps/backend/Dockerfile` yaz (Medusa resmi production örneğinden)
   - `apps/backend/.env` production değişkenlerini ayarla (DATABASE_URL = internal Coolify URL, REDIS_URL = internal, CORS = prod domainler)
   - Backend'i ayrı git repo'ya push et VEYA aynı repo monorepo olarak deploy
2. **Frontend hazırlığı:**
   - `next.config.ts`: `output: "standalone"` ekle
   - `Dockerfile` yaz (Next standalone)
   - `.env.production` veya Coolify env vars: `NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.macc-cino.com`, publishable key
3. **Coolify'da:**
   - Medusa app servisi oluştur, git URL ver, env vars set, domain bağla → SSL otomatik
   - Next.js app servisi oluştur, git URL ver, env vars set, domain bağla
   - Postgres'i public-expose'dan **internal-only**'a geri al (güvenlik)
4. **DNS (kullanıcı yapacak):**
   - `macc-cino.com` → Coolify proxy → Next.js
   - `api.macc-cino.com` → Medusa
5. **İlk deploy sonrası:**
   - Migrations: Coolify container exec ile `npx medusa db:migrate`
   - Seed: `npx medusa exec ./src/scripts/seed-matcha.ts`
   - Admin user oluştur

**Notlar:**
- Backend henüz git repo değil. Önce `git init` ve ayrı GitHub repo'su lazım.
- Iyzico/PayTR canlı keyleri prod'da gerçeklerle değiştirilecek (şu an placeholder).
- Frontend `.env.local`'deki backend URL prod'da `https://api.macc-cino.com` olacak.

### Faz 7 — Parlatma

- `next.config.ts` — `images.remotePatterns` Medusa CDN/asset hostname'i ekle
- SEO: anasayfa metadata zaten zengin; ek olarak `/sitemap.ts` Medusa ürünlerinden dinamik üretsin
- `prefers-reduced-motion`: Framer Motion `useReducedMotion` hook'unu Hero, ProductCard, MagneticButton gibi yerlere ekle
- Lighthouse pass (perf/a11y/SEO ≥ 90)
- Mobil/tablet manuel test
- Resend domain doğrulaması + gerçek `RESEND_API_KEY` set

## Ofiste Devam Etmek İçin

1. **İki repo'yu da pull et:**
   ```bash
   git clone https://github.com/Volkanyildirimmm/macc-cino-shop.git
   git clone https://github.com/Volkanyildirimmm/macc-cino-shop-backend.git macc-cino-backend
   ```
2. **Bağımlılıkları kur:**
   ```bash
   cd macc-cino-shop && npm install
   cd ../macc-cino-backend && npm install
   ```
3. **`.env` dosyaları gitignore'da** — ofiste yeniden oluşturulması gerek:
   - **Frontend `macc-cino-shop/.env.local`:**
     ```
     NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
     NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_0be27affc49db85aff45664e158b9ecca835551a0f4ade759873a490dc51b54b
     NEXT_PUBLIC_DEFAULT_REGION=eu
     NEXT_PUBLIC_SITE_URL=http://localhost:3000
     RESEND_API_KEY=
     CONTACT_TO_EMAIL=info@macc-cino.com
     CONTACT_FROM_EMAIL=noreply@macc-cino.com
     ```
   - **Backend `macc-cino-backend/apps/backend/.env`:** "Önemli Bilgiler"deki Postgres URL + Iyzico/PayTR placeholder'lar + JWT/COOKIE secrets (ev bilgisayarında üretilen değerleri kopyala VEYA `node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"` ile yenisi). Migration'lar zaten Coolify Postgres'te uygulanmış, yeniden çalıştırmaya gerek yok.
4. **Çalıştır:**
   ```bash
   # Backend
   cd macc-cino-backend/apps/backend && npm run dev    # localhost:9000
   # Frontend (başka terminal)
   cd macc-cino-shop && npm run dev                    # localhost:3000
   ```
5. **Devam noktası:** Faz 6 — Dockerfile'lar (frontend `output: "standalone"` + Dockerfile, backend Dockerfile), sonra Coolify'da iki app servisi kur, env vars set, domain bağla.

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
