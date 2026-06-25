export const dynamic = "force-dynamic"
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { formatRupiah, formatDate } from '@/lib/utils'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const uni = await db.university.findUnique({ where: { slug: (await params).slug } })
  if (!uni) return {}
  return { title: uni.name, description: uni.description || `Profil ${uni.name} di CariKampus.id` }
}

export default async function UniversityProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const uni = await db.university.findUnique({
    where: { slug: (await params).slug, status: 'APPROVED' },
    include: {
      faculties: { include: { programs: true } },
      facilities: true,
      dormitories: true,
      reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
      _count: { select: { reviews: true, applications: true, savedBy: true } },
    },
  }).catch(() => null)

  if (!uni) notFound()

  const avgRating = uni.reviews.length
    ? (uni.reviews.reduce((s, r) => s + r.rating, 0) / uni.reviews.length).toFixed(1)
    : null

  return (
    <div>
      {/* Banner */}
      <div className="h-40 bg-[#033F85] relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4A900]" />
      </div>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-14 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end gap-4 pb-4 -mt-9">
            <div className="w-18 h-18 rounded-xl bg-white border-[3px] border-[#F4A900] shadow-md flex items-center justify-center text-2xl font-bold text-[#033F85] flex-shrink-0" style={{width:'72px',height:'72px'}}>
              {uni.name.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 pt-10">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{uni.name}</h1>
              <div className="flex gap-3 flex-wrap text-xs text-gray-400">
                <span>📍 {uni.city}, {uni.province}</span>
                <span>🏛 {uni.type === 'NEGERI' ? 'Negeri' : 'Swasta'}</span>
                {uni.founded && <span>📅 Est. {uni.founded}</span>}
                {uni.accreditation && <span className="bg-[#E8F0FB] text-[#033F85] font-bold px-2 py-0.5 rounded-full">Akreditasi {uni.accreditation}</span>}
                {avgRating && <span>⭐ {avgRating} · {uni._count.reviews} ulasan</span>}
              </div>
            </div>
            <div className="flex gap-2 pt-10 flex-shrink-0">
              <button className="border border-[#033F85] text-[#033F85] text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#E8F0FB] transition-colors">❤ Simpan</button>
              <Link href="/tes-minat" className="bg-[#F4A900] text-[#033F85] text-xs font-bold px-4 py-1.5 rounded-md hover:bg-[#D99200] transition-colors">Daftar Sekarang</Link>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-t border-gray-100">
            {['Tentang', 'Fakultas', 'Program Studi', 'Fasilitas', 'Ulasan'].map((tab, i) => (
              <button key={tab} className={`px-5 py-3 text-sm font-semibold border-b-[3px] transition-colors ${i === 0 ? 'border-[#F4A900] text-[#033F85]' : 'border-transparent text-gray-400 hover:text-[#033F85]'}`}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        <div className="space-y-5">
          {/* About */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-3">Tentang {uni.name}</h2>
            <p className="text-sm text-gray-500 leading-relaxed">{uni.description || 'Informasi universitas belum tersedia.'}</p>
          </div>

          {/* Stats */}
          {(uni.totalStudents || uni.totalFaculties || uni.qsRanking) && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Statistik</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { val: uni.totalStudents ? `${(uni.totalStudents/1000).toFixed(0)}k+` : '—', lbl: 'Mahasiswa' },
                  { val: uni.totalFaculties || '—', lbl: 'Fakultas' },
                  { val: uni.faculties.reduce((s,f) => s + f.programs.length, 0) || '—', lbl: 'Program Studi' },
                  { val: uni.qsRanking ? `#${uni.qsRanking}` : '—', lbl: 'QS Ranking' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} className="bg-gray-50 rounded-lg p-3 text-center border-b-2 border-[#F4A900]">
                    <div className="text-lg font-bold text-[#033F85]">{val}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Faculties */}
          {uni.faculties.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Fakultas &amp; Program Studi</h2>
              <div className="space-y-2">
                {uni.faculties.map(fac => (
                  <div key={fac.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-[#F4A900] hover:bg-[#E8F0FB] transition-all cursor-pointer border-l-[3px] border-l-transparent hover:border-l-[#F4A900]">
                    <div>
                      <div className="text-sm font-bold text-gray-900">{fac.name}</div>
                      <div className="text-xs text-gray-400">{fac.programs.length} program studi</div>
                    </div>
                    <span className="text-gray-300">›</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {uni.reviews.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-3">Ulasan Mahasiswa</h2>
              <div className="space-y-4">
                {uni.reviews.map(rev => (
                  <div key={rev.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-[#E8F0FB] flex items-center justify-center text-xs font-bold text-[#033F85]">
                        {rev.authorName.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{rev.authorName}</div>
                        <div className="text-xs text-gray-400">{rev.program} {rev.graduationYear && `· ${rev.graduationYear}`}</div>
                      </div>
                    </div>
                    <div className="text-[#F4A900] text-sm mb-2">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</div>
                    <p className="text-sm text-gray-500 leading-relaxed">{rev.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-32">
            <div className="bg-[#033F85] border-b-[3px] border-[#F4A900] p-4">
              <h3 className="text-sm font-bold text-white">Daftar ke {uni.name}</h3>
              <p className="text-xs text-white/60 mt-0.5">
                {uni.intakeMonth && uni.intakeYear ? `Intake: ${uni.intakeMonth} ${uni.intakeYear}` : 'Pendaftaran dibuka'}
              </p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-gray-400">Biaya pendaftaran</span><span className="font-bold text-gray-900">{formatRupiah(uni.registrationFee)}</span></div>
              {uni.deadline && <div className="flex justify-between text-xs"><span className="text-gray-400">Batas daftar</span><span className="font-bold text-gray-900">{formatDate(uni.deadline)}</span></div>}
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex justify-between text-sm font-bold"><span>Total</span><span className="text-[#033F85]">{formatRupiah(uni.registrationFee)}</span></div>
              <Link href="/tes-minat" className="block w-full text-center bg-[#F4A900] text-[#033F85] text-sm font-bold py-2.5 rounded-lg hover:bg-[#D99200] transition-colors mt-3">
                Daftar Sekarang
              </Link>
              <button className="w-full text-center border-2 border-[#033F85] text-[#033F85] text-xs font-semibold py-2 rounded-lg hover:bg-[#E8F0FB] transition-colors">
                ❤ Simpan ke Favorit
              </button>
              {(uni.website || uni.email || uni.phone) && (
                <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-400">
                  {uni.website && <div>🌐 {uni.website}</div>}
                  {uni.email && <div>✉ {uni.email}</div>}
                  {uni.phone && <div>📞 {uni.phone}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
