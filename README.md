# Cari Kampus Cari Kerja

Platform universitas dan karier terlengkap di Indonesia.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Prisma · Supabase · NextAuth.js · Midtrans · Resend

---

## Quick Start

```bash
# 1. Clone
git clone https://github.com/limadata-indonesia/carikampus-demo.git
cd carikampus-demo

# 2. Install
npm install

# 3. Environment
cp .env.example .env.local
# Fill in your Supabase, Google OAuth, Midtrans, Resend credentials

# 4. Database
npx prisma db push
npx prisma generate

# 5. Run
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

### Supabase setup
1. Create project at supabase.com
2. Go to **Settings → Database → Connection String**
3. Copy `Transaction` URL → `DATABASE_URL` (add `?pgbouncer=true&connection_limit=1`)
4. Copy `Direct` URL → `DIRECT_URL`

### Google OAuth
1. console.cloud.google.com → Create OAuth 2.0 credentials
2. Authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Midtrans
1. dashboard.midtrans.com → Settings → Access Keys
2. Copy Server Key and Client Key

---

## Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (navbar + footer)
│   │   ├── (home)/        # Homepage
│   │   ├── cari/          # Browse universities
│   │   ├── universitas/   # University profiles
│   │   └── tes-minat/     # Test purchase page
│   ├── (auth)/            # Auth pages
│   │   ├── masuk/         # Login
│   │   └── daftar/        # Registration flows
│   ├── dashboard/
│   │   ├── universitas/   # University admin dashboard
│   │   ├── sekolah/       # School BK dashboard
│   │   └── siswa/         # Student dashboard
│   ├── admin/             # Platform admin
│   ├── tes/               # Live test flow
│   └── api/               # API routes
├── components/
│   ├── layout/            # Navbar, Footer, Sidebar
│   ├── university/        # University cards, profile
│   ├── test/              # Test flow components
│   └── dashboard/         # Dashboard widgets
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # NextAuth config
│   ├── supabase.ts        # Supabase client
│   └── utils.ts           # Helpers
├── config/                # App config, pricing, provinces
├── types/                 # TypeScript types
└── hooks/                 # Custom React hooks
```

## Colour Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `brand.DEFAULT` | `#033F85` | Primary — navbar, buttons, headings |
| `brand.hover` | `#022D5E` | Hover state |
| `brand.dark` | `#011E3F` | Dark sections |
| `brand.light` | `#E8F0FB` | Light bg tint |
| `gold.DEFAULT` | `#F4A900` | Accent — CTA, gold bar, highlights |
| `gold.hover` | `#D99200` | Gold hover |
| `grey.mid` | `#9BA2AB` | UoM mid grey |
| `grey.light` | `#E3E6E6` | UoM light grey |

---

© 2025 Cari Kampus Cari Kerja
