export const revalidate = 3600

import Link from 'next/link'
import Image from 'next/image'
import { db } from '@/lib/db'
import SearchForm from '@/components/ui/SearchForm'

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
        take: 10,
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
              <div className="inline-flex items-center gap-2 bg-[#F4A900]/20 text-[#1A1520] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F4A900] inline-block" />
                Platform #1 Universitas Indonesia
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-[#1A1520] mb-5 leading-[1.05] tracking-tighter">
                Temukan kampus<br />
                <span className="text-[#033F85]">&amp; karier</span>{' '}
                <span className="relative inline-block">
                  untukmu
                  <span className="absolute -bottom-1 left-0 right-0 h-3 bg-[#F4A900]/40 -z-10 rounded" />
                </span>{' '}
                <span className="text-[#2EC4B6]">→</span>
              </h1>

              <p className="text-[#6B6575] text-lg mb-8 max-w-md leading-relaxed">
                Direktori universitas terlengkap, tes minat bakat psikometri, dan jalur karier — satu platform untuk masa depanmu.
              </p>

              <SearchForm />

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  { val: count > 0 ? `${count}+` : '500+', lbl: 'Universitas',   color: 'bg-[#033F85] text-white',     size: 'text-sm' },
                  { val: '3.200+',                          lbl: 'Program Studi', color: 'bg-[#F4A900] text-[#1A1520]', size: 'text-[11px]' },
                  { val: '34',                              lbl: 'Provinsi',       color: 'bg-[#2EC4B6] text-white',     size: 'text-sm' },
                  { val: '48k+',                            lbl: 'Mahasiswa',      color: 'bg-[#1A1520] text-white',     size: 'text-sm' },
                  { val: '200+',                            lbl: 'Mitra Industri', color: 'bg-[#FF6B35] text-white',     size: 'text-sm' },
                  { val: '4.9★',                            lbl: 'Rating',         color: 'bg-[#7C3AED] text-white',     size: 'text-[11px]' },
                ].map(({ val, lbl, color, size }) => (
                  <div key={lbl} className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${color} ${size} flex items-center justify-center font-black leading-none text-center shrink-0`}>
                      {val}
                    </div>
                    <span className="text-sm font-semibold text-[#6B6575]">{lbl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: arch photo collage (Flowy style) ── */}
            <div className="relative h-[500px] hidden lg:block select-none">

              {/* Decorative circle ring behind everything */}
              <div className="absolute"
                style={{ width: 320, height: 320, top: 60, left: '50%', transform: 'translateX(-50%)', borderRadius: '50%', border: '2.5px dashed #F4A900', opacity: 0.5, zIndex: 0 }} />

              {/* Decorative filled circle */}
              <div className="absolute"
                style={{ width: 200, height: 200, top: 120, right: 60, borderRadius: '50%', background: '#FEF3D0', zIndex: 0 }} />

              {/* Photo 4 — UIN Jakarta (new) — ARCH, far-left, behind man */}
              <div className="absolute overflow-hidden shadow-lg"
                style={{
                  width: 155, height: 290,
                  left: 0, top: 60,
                  borderRadius: '9999px 9999px 22px 22px',
                  background: '#FFE8D6',
                  padding: 7,
                  transform: 'rotate(-7deg)',
                  zIndex: 1,
                }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '9999px 9999px 15px 15px', overflow: 'hidden', position: 'relative' }}>
                  <Image src="/hero-4.jpg" alt="Wisudawan UIN Jakarta" fill className="object-cover object-top" sizes="141px" />
                </div>
              </div>

              {/* Photo 1 — man in suit — ARCH, center-left, largest */}
              <div className="absolute overflow-hidden shadow-2xl"
                style={{
                  width: 196, height: 360,
                  left: 100, top: 20,
                  borderRadius: '9999px 9999px 28px 28px',
                  background: '#FEF3D0',
                  padding: 8,
                  transform: 'rotate(-2deg)',
                  zIndex: 2,
                }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '9999px 9999px 20px 20px', overflow: 'hidden', position: 'relative' }}>
                  <Image src="/hero-1.jpg" alt="Profesional muda" fill className="object-cover object-top" sizes="180px" priority />
                </div>
              </div>

              {/* Photo 2 — graduation red — ARCH, right-top */}
              <div className="absolute overflow-hidden shadow-xl"
                style={{
                  width: 172, height: 300,
                  right: 20, top: 0,
                  borderRadius: '9999px 9999px 24px 24px',
                  background: '#E0F7F5',
                  padding: 8,
                  transform: 'rotate(3.5deg)',
                  zIndex: 3,
                }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '9999px 9999px 16px 16px', overflow: 'hidden', position: 'relative' }}>
                  <Image src="/hero-2.jpg" alt="Wisudawan" fill className="object-cover object-top" sizes="156px" />
                </div>
              </div>

              {/* Photo 3 — graduation black — ARCH, right-bottom */}
              <div className="absolute overflow-hidden shadow-xl"
                style={{
                  width: 160, height: 240,
                  right: 50, bottom: 10,
                  borderRadius: '9999px 9999px 20px 20px',
                  background: '#E8F0FB',
                  padding: 8,
                  transform: 'rotate(-2deg)',
                  zIndex: 4,
                }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '9999px 9999px 12px 12px', overflow: 'hidden', position: 'relative' }}>
                  <Image src="/hero-3.jpg" alt="Wisudawan Brawijaya" fill className="object-cover object-top" sizes="144px" />
                </div>
              </div>

              {/* Arrow left — decorative */}
              <svg className="absolute" style={{ left: 10, bottom: 80, zIndex: 5 }} width="52" height="24" viewBox="0 0 52 24" fill="none">
                <path d="M51 12H3M3 12L14 2M3 12L14 22" stroke="#F4A900" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Arrow right — decorative */}
              <svg className="absolute" style={{ right: 8, top: 310, zIndex: 5 }} width="44" height="20" viewBox="0 0 44 20" fill="none">
                <path d="M1 10H41M41 10L31 2M41 10L31 18" stroke="#2EC4B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>

              {/* Badge — check */}
              <div className="absolute flex items-center justify-center shadow-lg"
                style={{ width: 44, height: 44, top: 12, right: 0, borderRadius: '50%', background: '#033F85', zIndex: 6 }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8.5 14.5L16 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Floating stat card */}
              <div className="absolute bg-white rounded-2xl shadow-xl px-4 py-3 border border-gray-100"
                style={{ left: 270, bottom: 80, zIndex: 6 }}>
                <div className="text-[10px] text-[#6B6575] font-semibold uppercase tracking-wide">Bergabung</div>
                <div className="text-sm font-black text-[#1A1520] mt-0.5">48k+ Mahasiswa</div>
                <div className="flex -space-x-1.5 mt-1.5">
                  {['#033F85','#F4A900','#2EC4B6','#1A1520'].map(c => (
                    <div key={c} className="w-5 h-5 rounded-full border-2 border-white" style={{ background: c }} />
                  ))}
                </div>
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
              <h2 className="text-3xl font-black text-[#1A1520] tracking-tight">Universitas Unggulan</h2>
            </div>
            <Link href="/cari" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#033F85] bg-[#E8F0FB] px-4 py-2 rounded-full hover:bg-[#033F85] hover:text-white transition-colors">
              Lihat semua →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sorted.map(uni => {
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
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-[transform,box-shadow] group"
                  style={{ boxShadow: '0 2px 12px rgba(26,21,32,0.06)' }}
                >
                  {/* Card header */}
                  <div className="h-20 bg-gradient-to-br from-[#033F85] to-[#022D5E] flex items-center justify-center relative">
                    <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-black text-xs">
                      {initial}
                    </div>
                    {uni.qsRanking && (
                      <div className="absolute top-2 right-2 bg-[#F4A900] text-[#1A1520] text-[10px] font-black px-2 py-0.5 rounded-full">
                        #{uni.qsRanking}
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="font-extrabold text-[#1A1520] text-xs mb-0.5 group-hover:text-[#033F85] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {uni.name}
                    </div>
                    <div className="text-[11px] text-[#6B6575] mb-2 truncate">{uni.city}</div>

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

                    <div className="flex items-center justify-between text-[11px] text-[#6B6575] border-t border-gray-100 pt-2">
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
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-black uppercase tracking-widest text-[#2EC4B6] mb-2">Simple & Mudah</p>
            <h2 className="text-3xl font-black text-[#1A1520] tracking-tight">Cara Kerjanya</h2>
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
                <h3 className="font-black text-[#1A1520] mb-2 text-lg tracking-tight">{title}</h3>
                <p className="text-sm text-[#6B6575] leading-relaxed">{desc}</p>
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
            <Link href="/tes-minat" className="inline-flex items-center gap-2 bg-[#F4A900] text-[#1A1520] text-sm font-black px-5 py-2.5 rounded-full hover:bg-[#D99200] transition-colors">
              Info Program Sekolah →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
