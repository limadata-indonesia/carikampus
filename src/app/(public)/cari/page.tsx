export const dynamic = "force-dynamic"
import { Suspense } from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'
import SidebarFilters from './SidebarFilters'

interface SearchParams { province?: string; type?: string; accreditation?: string; q?: string }

const TYPE_LABEL: Record<string, string> = {
  NEGERI: 'Negeri', PRIVATE: 'Swasta', KEAGAMAAN: 'Keagamaan', KEDINASAN: 'Kedinasan',
}
const TYPE_COLOR: Record<string, string> = {
  NEGERI: 'bg-[#E0F7F5] text-[#2EC4B6]',
  PRIVATE: 'bg-[#E8F0FB] text-[#033F85]',
  KEAGAMAAN: 'bg-[#FEF3D0] text-[#D99200]',
  KEDINASAN: 'bg-[#F3E8FF] text-purple-700',
}

export default async function CariPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams

  const where = {
    status: 'APPROVED' as const,
    ...(sp.province && { province: sp.province }),
    ...(sp.type     && { type: sp.type as any }),
    ...(sp.accreditation && { accreditation: sp.accreditation }),
    ...(sp.q && {
      OR: [
        { name:     { contains: sp.q, mode: 'insensitive' as const } },
        { city:     { contains: sp.q, mode: 'insensitive' as const } },
        { province: { contains: sp.q, mode: 'insensitive' as const } },
      ],
    }),
  }

  let universities: any[] = []
  let total = 0
  try {
    ;[universities, total] = await Promise.all([
      db.university.findMany({
        where,
        take: 20,
        include: {
          _count: { select: { reviews: true, applications: true } },
          reviews: { select: { rating: true } },
          faculties: { include: { _count: { select: { programs: true } } } },
        },
        orderBy: [{ qsRanking: 'asc' }, { name: 'asc' }],
      }),
      db.university.count({ where }),
    ])
  } catch { /* db unavailable */ }

  return (
    <div className="bg-[#F8F6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-[#0F0D14] tracking-tight mb-1">Cari Universitas</h1>
          <p className="text-[#4A4555]">
            {total > 0 ? <><span className="font-bold text-[#033F85]">{total}</span> universitas ditemukan</> : 'Tidak ada hasil'}
          </p>
        </div>

        <div className="flex gap-8 items-start">

          {/* ── SIDEBAR ── */}
          <Suspense fallback={<div className="w-64 flex-shrink-0 h-96 bg-white rounded-2xl border border-gray-100 animate-pulse" />}>
            <SidebarFilters />
          </Suspense>

          {/* ── LIST ── */}
          <div className="flex-1 min-w-0 space-y-3">
            {universities.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 py-20 text-center text-[#4A4555]">
                <div className="text-4xl mb-3">🔍</div>
                <p className="font-bold text-[#0F0D14]">Tidak ada universitas ditemukan</p>
                <p className="text-sm mt-1">Coba ubah filter pencarian</p>
              </div>
            ) : universities.map((uni: any) => {
              const avgRating = uni.reviews.length
                ? (uni.reviews.reduce((s: number, r: any) => s + r.rating, 0) / uni.reviews.length).toFixed(1)
                : null
              const totalPrograms = uni.faculties.reduce((s: number, f: any) => s + f._count.programs, 0)

              return (
                <Link
                  key={uni.id}
                  href={`/universitas/${uni.slug}`}
                  className="flex items-center gap-5 bg-white rounded-2xl border border-gray-100 px-5 py-4 hover:border-[#B8CCE8] hover:shadow-md transition-all group"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#E8F0FB] flex items-center justify-center text-2xl flex-shrink-0">
                    🎓
                  </div>

                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1 flex-wrap">
                      <span className="font-black text-[#0F0D14] text-base leading-snug group-hover:text-[#033F85] transition-colors">
                        {uni.name}
                      </span>
                      {uni.qsRanking && (
                        <span className="text-[10px] font-black bg-[#FEF3D0] text-[#D99200] px-2 py-0.5 rounded-full flex-shrink-0">
                          QS #{uni.qsRanking}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-[#4A4555] mb-2">{uni.city}, {uni.province}</div>
                    <div className="flex flex-wrap gap-1.5">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TYPE_COLOR[uni.type] ?? 'bg-gray-100 text-gray-600'}`}>
                        {TYPE_LABEL[uni.type] ?? uni.type}
                      </span>
                      {uni.accreditation && (
                        <span className="text-xs font-semibold bg-[#E6F4EC] text-green-700 px-2.5 py-0.5 rounded-full">
                          Akreditasi {uni.accreditation}
                        </span>
                      )}
                      {uni.founded && (
                        <span className="text-xs text-[#4A4555] bg-gray-100 px-2.5 py-0.5 rounded-full">
                          Est. {uni.founded}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex flex-col items-end gap-1.5 flex-shrink-0 text-right">
                    {avgRating ? (
                      <div className="text-sm font-bold text-[#0F0D14]">⭐ {avgRating} <span className="font-normal text-[#4A4555] text-xs">({uni._count.reviews} ulasan)</span></div>
                    ) : (
                      <div className="text-sm text-[#4A4555]">{uni._count.reviews} ulasan</div>
                    )}
                    {totalPrograms > 0 && (
                      <div className="text-xs text-[#4A4555]">{totalPrograms} program studi</div>
                    )}
                    {uni.totalStudents && (
                      <div className="text-xs text-[#4A4555]">{uni.totalStudents.toLocaleString('id')} mahasiswa</div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex-shrink-0">
                    <span className="text-sm font-black text-[#033F85] group-hover:bg-[#033F85] group-hover:text-white px-4 py-2 rounded-full border-2 border-[#033F85] transition-all whitespace-nowrap">
                      Lihat Profil →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}
