export const dynamic = "force-dynamic"
import Link from 'next/link'
import { db } from '@/lib/db'
import SearchForm from '@/components/ui/SearchForm'

async function getHomeData() {
  const [unis, students, featured] = await Promise.allSettled([
    db.university.count({ where: { status: 'APPROVED' } }),
    db.student.count(),
    db.university.findMany({
      where: { status: 'APPROVED' },
      orderBy: [{ qsRanking: 'asc' }, { name: 'asc' }],
      include: {
        _count: { select: { reviews: true } },
        reviews: { select: { rating: true } },
        faculties: { include: { _count: { select: { programs: true } } } },
      },
    }),
  ])
  return {
    universities: unis.status === 'fulfilled' ? unis.value : 0,
    students:     students.status === 'fulfilled' ? students.value : 0,
    featured:     featured.status === 'fulfilled' ? featured.value : [],
  }
}

const TYPE_LABELS: Record<string, string> = {
  NEGERI: 'Negeri', PRIVATE: 'Swasta', KEAGAMAAN: 'Keagamaan', KEDINASAN: 'Kedinasan',
}

export default async function HomePage() {
  const { universities, students, featured } = await getHomeData()

  // fallback ordering: universities without QS rank go to end
  const sorted = [...featured].sort((a, b) => {
    if (a.qsRanking && b.qsRanking) return a.qsRanking - b.qsRanking
    if (a.qsRanking) return -1
    if (b.qsRanking) return 1
    return 0
  })

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[#033F85] pb-10 pt-14 text-center overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4A900]" />
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-block bg-[#F4A900] text-[#033F85] text-xs font-bold px-4 py-1 rounded-full mb-5 uppercase tracking-wide">
            Platform #1 Universitas Indonesia
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
            Temukan kampus &amp; karier<br />
            <span className="text-[#F4A900]">yang tepat untukmu</span>
          </h1>
          <p className="text-white/80 text-base mb-8 max-w-md mx-auto">
            Direktori universitas terlengkap, tes minat bakat psikometri, dan jalur karier — satu platform untuk masa depanmu.
          </p>

          {/* Search */}
          <SearchForm />

          {/* Stats */}
          <div className="flex justify-center gap-10 pt-6 border-t border-white/15">
            {[
              { val: universities > 0 ? `${universities}+` : '500+', lbl: 'Universitas' },
              { val: '3.200+', lbl: 'Program Studi' },
              { val: '34', lbl: 'Provinsi' },
              { val: students > 0 ? `${(students / 1000).toFixed(0)}k+` : '48k+', lbl: 'Mahasiswa Terbantu' },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="text-center">
                <div className="text-2xl font-bold text-[#F4A900]">{val}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universitas Unggulan */}
      {sorted.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Universitas Unggulan</h2>
              <p className="text-sm text-gray-400 mt-1">{sorted.length} universitas terdaftar</p>
              <div className="w-8 h-0.5 bg-[#F4A900] mt-1 rounded" />
            </div>
            <Link href="/cari" className="text-sm font-semibold text-[#033F85] hover:underline">Lihat semua →</Link>
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
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-[#B8CCE8] transition-all group"
                >
                  <div className="h-20 bg-gradient-to-br from-[#033F85] to-[#022D5E] flex items-center justify-center relative">
                    <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-xs">
                      {initial}
                    </div>
                    {uni.qsRanking && (
                      <div className="absolute top-2 right-2 bg-[#F4A900] text-[#033F85] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        QS #{uni.qsRanking}
                      </div>
                    )}
                  </div>

                  <div className="p-3">
                    <div className="font-bold text-gray-900 text-xs mb-0.5 group-hover:text-[#033F85] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                      {uni.name}
                    </div>
                    <div className="text-[11px] text-gray-400 mb-2 truncate">{uni.city}</div>

                    <div className="flex gap-1 flex-wrap mb-2">
                      <span className="text-[10px] font-semibold bg-[#E8F0FB] text-[#033F85] px-1.5 py-0.5 rounded-full">
                        {TYPE_LABELS[uni.type] ?? uni.type}
                      </span>
                      {uni.accreditation && (
                        <span className="text-[10px] font-semibold bg-[#E6F4EC] text-green-700 px-1.5 py-0.5 rounded-full">
                          Ak.{uni.accreditation}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-gray-400 border-t border-gray-100 pt-2 mt-1">
                      <span>{totalPrograms} prodi</span>
                      {avgRating
                        ? <span>⭐ {avgRating}</span>
                        : <span className="text-[#033F85] font-semibold">→</span>
                      }
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cara Kerjanya</h2>
            <div className="w-8 h-0.5 bg-[#F4A900] mt-1 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🔍', title: 'Cari & Filter', desc: 'Temukan universitas berdasarkan lokasi, jurusan, akreditasi, dan fasilitas di seluruh 34 provinsi Indonesia.', color: 'bg-[#E8F0FB]' },
            { icon: '🧠', title: 'Tes Minat Bakat', desc: '144 soal psikometri berbasis RIASEC. Hasilnya langsung rekomendasikan jurusan dan kampus yang paling cocok.', color: 'bg-[#FEF3D0]' },
            { icon: '📝', title: 'Daftar & Bayar', desc: 'Submit pendaftaran dan bayar biaya registrasi langsung — GoPay, QRIS, Virtual Account bank tersedia.', color: 'bg-[#E6F4EC]' },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 border-t-[3px] border-t-[#033F85]">
              <div className={`w-11 h-11 ${color} rounded-lg flex items-center justify-center text-2xl mb-4`}>{icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-[#033F85] rounded-xl p-7">
            <h3 className="text-[#F4A900] font-bold text-base mb-2">Daftarkan Universitas Kamu</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5">Jangkau ribuan calon mahasiswa di seluruh Indonesia. Buat profil, kelola program studi, dan terima pendaftaran langsung.</p>
            <Link href="/daftar/universitas" className="inline-block text-sm font-semibold text-white border border-white/40 px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
              Daftar Universitas →
            </Link>
          </div>
          <div className="bg-[#011E3F] rounded-xl p-7">
            <h3 className="text-[#F4A900] font-bold text-base mb-2">Program Sekolah — Akses Gratis</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-5">Kode akses batch gratis untuk sekolah mitra. Tes minat bakat untuk siswa kelas 12 sebagai persiapan kuliah.</p>
            <Link href="/tes-minat" className="inline-block text-sm font-bold bg-[#F4A900] text-[#033F85] px-4 py-2 rounded-md hover:bg-[#D99200] transition-colors">
              Info Program Sekolah →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
