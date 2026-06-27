export const dynamic = "force-dynamic"
import { db } from '@/lib/db'
import Link from 'next/link'
import { PROVINCES } from '@/config'

interface SearchParams { province?: string; type?: string; q?: string; page?: string }

export default async function CariPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const page = Number(sp.page || 1)
  const limit = 12
  const skip = (page - 1) * limit

  const where = {
    status: 'APPROVED' as const,
    ...(sp.province && { province: sp.province }),
    ...(sp.type && { type: sp.type as any }),
    ...(sp.q && {
      OR: [
        { name: { contains: sp.q, mode: 'insensitive' as const } },
        { city: { contains: sp.q, mode: 'insensitive' as const } },
      ]
    }),
  }

  let universities: Awaited<ReturnType<typeof db.university.findMany<{ include: { _count: { select: { reviews: true; applications: true } }; reviews: { select: { rating: true } } } }>>> = []
  let total = 0
  try {
    ;[universities, total] = await Promise.all([
      db.university.findMany({
        where,
        take: limit,
        skip,
        include: { _count: { select: { reviews: true, applications: true } }, reviews: { select: { rating: true } } },
        orderBy: { name: 'asc' },
      }),
      db.university.count({ where }),
    ])
  } catch { /* db unavailable — show empty state */ }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Cari Universitas</h1>
      <p className="text-sm text-gray-500 mb-6">{total} universitas ditemukan</p>

      {/* Filters */}
      <form className="flex gap-3 mb-8 flex-wrap">
        <input name="q" defaultValue={sp.q} placeholder="Nama universitas atau kota..." className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-48 outline-none focus:border-[#033F85]"/>
        <select name="province" defaultValue={sp.province} className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#033F85]">
          <option value="">Semua Provinsi</option>
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select name="type" defaultValue={sp.type} className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#033F85]">
          <option value="">Semua Tipe</option>
          <option value="NEGERI">Negeri</option>
          <option value="PRIVATE">Swasta</option>
        </select>
        <button type="submit" className="bg-[#033F85] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#022D5E] transition-colors">Cari</button>
      </form>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {universities.map((uni: any) => {
          const avgRating = uni.reviews.length
            ? (uni.reviews.reduce((s: number, r: any) => s + r.rating, 0) / uni.reviews.length).toFixed(1)
            : null
          return (
            <Link key={uni.id} href={`/universitas/${uni.slug}`} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-[#B8CCE8] transition-all">
              <div className="h-20 bg-[#E8F0FB] border-b-[3px] border-[#F4A900] flex items-center justify-center text-3xl">🎓</div>
              <div className="p-4">
                <div className="font-bold text-gray-900 text-sm mb-1">{uni.name}</div>
                <div className="text-xs text-gray-400 mb-3">{uni.city}, {uni.province}</div>
                <div className="flex gap-1.5 flex-wrap mb-3">
                  <span className="text-xs font-semibold bg-[#E8F0FB] text-[#033F85] px-2 py-0.5 rounded-full">{uni.type === 'NEGERI' ? 'Negeri' : 'Swasta'}</span>
                  {uni.accreditation && <span className="text-xs font-semibold bg-[#E6F4EC] text-green-700 px-2 py-0.5 rounded-full">Ak. {uni.accreditation}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {avgRating ? `⭐ ${avgRating} (${uni._count.reviews})` : `${uni._count.applications} pendaftar`}
                  </span>
                  <span className="text-xs font-bold text-[#033F85]">Lihat profil →</span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {universities.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-medium">Tidak ada universitas ditemukan</p>
          <p className="text-sm mt-1">Coba ubah filter pencarian</p>
        </div>
      )}
    </div>
  )
}
