export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import SearchForm from '@/components/ui/SearchForm'
import SlideInCards from '@/components/ui/SlideInCards'

type FeaturedUni = {
  id: string
  name: string
  slug: string
  city: string
  type: string
  accreditation: string | null
  qsRanking: number | null
  reviews: { rating: number }[]
  faculties: { _count: { programs: number } }[]
}

async function getHomeData(): Promise<{ count: number; featured: FeaturedUni[] }> {
  try {
    const [count, featured] = await Promise.all([
      db.university.count({ where: { status: 'APPROVED' } }),
      db.university.findMany({
        where: { status: 'APPROVED' },
        take: 20,
        orderBy: [{ qsRanking: 'asc' }, { name: 'asc' }],
        select: {
          id: true, name: true, slug: true, city: true,
          type: true, accreditation: true, qsRanking: true,
          reviews: { select: { rating: true } },
          faculties: { select: { _count: { select: { programs: true } } } },
        },
      }),
    ])
    return { count, featured }
  } catch {
    return { count: 0, featured: [] }
  }
}

const TYPE_LABELS: Record<string, string> = {
  NEGERI: 'Negeri', PRIVATE: 'Swasta', KEAGAMAAN: 'Keagamaan', KEDINASAN: 'Kedinasan',
}

const TYPE_COLORS: Record<string, string> = {
  NEGERI: 'bg-[#E0F7F5] text-[#2EC4B6]',
  PRIVATE: 'bg-[#FEF3D0] text-[#D99200]',
  KEAGAMAAN: 'bg-[#E8F0FB] text-[#033F85]',
  KEDINASAN: 'bg-[#F3E8FF] text-purple-700',
}

export default async function HomePage() {
  const { count, featured } = await getHomeData()

  const sorted = [...featured].sort((a, b) => {
    if (a.qsRanking && b.qsRanking) return a.qsRanking - b.qsRanking
    if (a.qsRanking) return -1
    if (b.qsRanking) return 1
    return 0
  })

  return (
    <>
      {/* ── HERO ─────────────────────────────── */}
      <section className="bg-[#F8F6F0] pt-14 pb-16 overflow-hidden relative">
        {/* background blobs */}
        <div className="absolute top-0 right-1/3 w-96 h-96 rounded-full bg-[#F4A900]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[#2EC4B6]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── LEFT: copy ── */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#F4A900]/20 text-[#0F0D14] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F4A900] inline-block" />
                Platform #1 Universitas Indonesia
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-[#0F0D14] mb-5 leading-[1.05] tracking-tighter">
                Temukan kampus<br />
                <span className="text-[#033F85]">&amp; karier</span>{' '}
                <span className="relative inline-block">
                  untukmu
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#F4A900]/40 -z-10 rounded" />
                </span>{' '}
                <span className="text-[#2EC4B6]">→</span>
              </h1>

              <p className="text-[#4A4555] text-lg mb-8 max-w-md leading-relaxed">
                Direktori universitas terlengkap, tes minat bakat psikometri, dan jalur karier — satu platform untuk masa depanmu.
              </p>

              <SearchForm />

              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-xs text-[#4A4555]">Populer:</span>
                {['Universitas Indonesia', 'ITB', 'UGM', 'Unair', 'UI', 'Binus'].map(q => (
                  <a
                    key={q}
                    href={`/cari?q=${encodeURIComponent(q)}`}
                    className="text-xs font-semibold text-[#033F85] bg-[#E8F0FB] px-3 py-1 rounded-full hover:bg-[#033F85] hover:text-white transition-colors"
                  >
                    {q}
                  </a>
                ))}
              </div>

            </div>

            {/* ── RIGHT: 2×2 photo grid collage ── */}
            <div className="hidden lg:flex items-center justify-center select-none">
              {/* Fixed 480×480 canvas — photos are 220px, gap 20px, outer pad 10px */}
              <div className="relative" style={{ width: 480, height: 480 }}>

                {/* ── Blobs (peek out from behind corners) ── */}
                <div className="absolute" style={{ width: 150, height: 150, top: -16, left: -16, borderRadius: '50%', background: '#B8D4F5', zIndex: 0 }} />
                <div className="absolute" style={{ width: 96, height: 96, top: -8, right: 60, borderRadius: '50%', background: '#FFE07A', zIndex: 0 }} />
                <div className="absolute" style={{ width: 110, height: 110, bottom: -16, left: 60, borderRadius: '50%', background: '#A8E6E0', zIndex: 0 }} />
                <div className="absolute" style={{ width: 140, height: 140, bottom: -16, right: -16, borderRadius: '50%', background: '#DCDCDC', zIndex: 0 }} />

                {/* ── Photos — 220×220, 20px gap, 10px outer padding ── */}
                {/* Top-left: bottom-right corner pill */}
                <div className="absolute overflow-hidden shadow-lg" style={{ width: 220, height: 220, top: 10, left: 10, borderRadius: '20px 20px 80px 20px', zIndex: 2 }}>
                  <Image src="/hero-1.jpg" alt="Mahasiswa" fill className="object-cover object-top" sizes="220px" priority />
                </div>
                {/* Top-right: standard */}
                <div className="absolute overflow-hidden shadow-lg" style={{ width: 220, height: 220, top: 10, left: 250, borderRadius: '20px', zIndex: 2 }}>
                  <Image src="/hero-2.jpg" alt="Wisudawan" fill className="object-cover object-top" sizes="220px" />
                </div>
                {/* Bottom-left: standard */}
                <div className="absolute overflow-hidden shadow-lg" style={{ width: 220, height: 220, top: 250, left: 10, borderRadius: '20px', zIndex: 2 }}>
                  <Image src="/hero-3.jpg" alt="Wisudawan Brawijaya" fill className="object-cover object-top" sizes="220px" />
                </div>
                {/* Bottom-right: top-left corner pill */}
                <div className="absolute overflow-hidden shadow-lg" style={{ width: 220, height: 220, top: 250, left: 250, borderRadius: '80px 20px 20px 20px', zIndex: 2 }}>
                  <Image src="/hero-4.jpg" alt="Wisudawan UIN Jakarta" fill className="object-cover object-top" sizes="220px" />
                </div>

                {/* ── Decorative shapes ── */}
                {/* Triangle outline — top-right */}
                <svg className="absolute" style={{ right: -28, top: 8, zIndex: 5 }} width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M18 4L33 30H3L18 4Z" stroke="#4A90D9" strokeWidth="2.2" fill="none" strokeLinejoin="round"/>
                </svg>
                {/* Square outline — middle-right */}
                <svg className="absolute" style={{ right: -22, top: 250, zIndex: 5 }} width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <rect x="2" y="2" width="18" height="18" stroke="#F4A900" strokeWidth="2.2" fill="none" rx="2"/>
                </svg>
                {/* Wavy line — bottom-left */}
                <svg className="absolute" style={{ left: -10, bottom: 14, zIndex: 5 }} width="56" height="26" viewBox="0 0 56 26" fill="none">
                  <path d="M2 18 Q10 6 20 16 Q30 26 40 16 Q50 6 56 12" stroke="#4A90D9" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── UNIVERSITAS UNGGULAN ─────────────── */}
      {sorted.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-[#2EC4B6] mb-1">Pilihan Terbaik</p>
              <h2 className="text-3xl font-black text-[#0F0D14] tracking-tight">Universitas Unggulan</h2>
            </div>
            <Link href="/cari" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#033F85] bg-[#E8F0FB] px-4 py-2 rounded-full hover:bg-[#033F85] hover:text-white transition-colors">
              Lihat semua →
            </Link>
          </div>

          <SlideInCards>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sorted.map((uni, i) => {
              const avgRating = uni.reviews.length
                ? (uni.reviews.reduce((s, r) => s + r.rating, 0) / uni.reviews.length).toFixed(1)
                : null
              const totalPrograms = uni.faculties.reduce((s, f) => s + f._count.programs, 0)
              const words = uni.name.split(' ').filter(w => w.length > 2)
              const initial = words.length >= 2
                ? words.slice(0, 3).map(w => w[0]).join('').toUpperCase()
                : uni.name.slice(0, 3).toUpperCase()

              return (
                <Link
                  key={uni.id}
                  href={`/universitas/${uni.slug}`}
                  data-slide
                  data-delay={i * 60}
                  className="slide-in-card bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-[transform,box-shadow,opacity] group"
                  style={{ boxShadow: '0 2px 12px rgba(26,21,32,0.06)' }}
                >
                  {/* Card header */}
                  <div className="h-20 bg-gradient-to-br from-[#033F85] to-[#022D5E] flex items-center justify-center relative">
                    <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-black text-xs">
                      {initial}
                    </div>
                    {uni.qsRanking && (
                      <div className="absolute top-2 right-2 bg-[#F4A900] text-[#0F0D14] text-[10px] font-black px-2 py-0.5 rounded-full">
                        #{uni.qsRanking}
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="font-extrabold text-[#0F0D14] text-xs mb-0.5 group-hover:text-[#033F85] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {uni.name}
                    </div>
                    <div className="text-[11px] text-[#4A4555] mb-2 truncate">{uni.city}</div>

                    <div className="flex gap-1 flex-wrap mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[uni.type] ?? 'bg-gray-100 text-gray-500'}`}>
                        {TYPE_LABELS[uni.type] ?? uni.type}
                      </span>
                      {uni.accreditation && (
                        <span className="text-[10px] font-bold bg-[#E0F7F5] text-[#2EC4B6] px-2 py-0.5 rounded-full">
                          Ak.{uni.accreditation}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-[#4A4555] border-t border-gray-100 pt-2">
                      <span>{totalPrograms} prodi</span>
                      {avgRating
                        ? <span className="font-bold">⭐ {avgRating}</span>
                        : <span className="text-[#F4A900] font-black">→</span>
                      }
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          </SlideInCards>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-[#2EC4B6] mb-2">Simple & Mudah</p>
            <h2 className="text-3xl font-black text-[#0F0D14] tracking-tight">Cara Kerjanya</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔍', title: 'Cari & Filter', desc: 'Temukan universitas berdasarkan lokasi, jurusan, akreditasi, dan fasilitas di seluruh 34 provinsi Indonesia.', bg: 'bg-[#E0F7F5]', num: '01' },
              { icon: '🧠', title: 'Tes Minat Bakat', desc: '144 soal psikometri berbasis RIASEC. Hasilnya langsung rekomendasikan jurusan dan kampus yang paling cocok.', bg: 'bg-[#FEF3D0]', num: '02' },
              { icon: '📝', title: 'Daftar & Bayar', desc: 'Submit pendaftaran dan bayar biaya registrasi langsung — GoPay, QRIS, Virtual Account bank tersedia.', bg: 'bg-[#E8F0FB]', num: '03' },
            ].map(({ icon, title, desc, bg, num }) => (
              <div key={title} className="rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow group" style={{ boxShadow: '0 2px 12px rgba(26,21,32,0.05)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center text-2xl`} aria-hidden="true">{icon}</div>
                  <span className="text-4xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">{num}</span>
                </div>
                <h3 className="font-black text-[#0F0D14] mb-2 text-lg tracking-tight">{title}</h3>
                <p className="text-sm text-[#4A4555] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* CTA 1 — yellow */}
          <div className="bg-[#F4A900] rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/20" />
            <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full bg-white/10" />
            <h3 className="font-black text-white text-2xl mb-3 tracking-tight leading-tight">Daftarkan<br />Universitas Kamu</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">Jangkau ribuan calon mahasiswa di seluruh Indonesia. Buat profil, kelola program studi, dan terima pendaftaran langsung.</p>
            <Link href="/daftar/universitas" className="inline-flex items-center gap-2 bg-[#1A1520] text-white text-sm font-black px-5 py-2.5 rounded-full hover:bg-[#033F85] transition-colors">
              Daftar Sekarang →
            </Link>
          </div>

          {/* CTA 2 — navy */}
          <div className="bg-[#033F85] rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/10" />
            <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full bg-[#F4A900]/20" />
            <h3 className="font-black text-white text-2xl mb-3 tracking-tight leading-tight">Program Sekolah<br /><span className="text-[#F4A900]">Akses Gratis</span></h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">Kode akses batch gratis untuk sekolah mitra. Tes minat bakat untuk siswa kelas 12 sebagai persiapan kuliah.</p>
            <Link href="/tes-minat" className="inline-flex items-center gap-2 bg-[#F4A900] text-[#0F0D14] text-sm font-black px-5 py-2.5 rounded-full hover:bg-[#D99200] transition-colors">
              Info Program Sekolah →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
