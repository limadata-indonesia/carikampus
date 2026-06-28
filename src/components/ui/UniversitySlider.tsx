'use client'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

type Uni = {
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

const TYPE_LABELS: Record<string, string> = {
  NEGERI: 'Negeri', PRIVATE: 'Swasta', KEAGAMAAN: 'Keagamaan', KEDINASAN: 'Kedinasan',
}
const TYPE_COLORS: Record<string, string> = {
  NEGERI: 'bg-[#E0F7F5] text-[#2EC4B6]',
  PRIVATE: 'bg-[#E8F0FB] text-[#033F85]',
  KEAGAMAAN: 'bg-[#FEF3D0] text-[#D99200]',
  KEDINASAN: 'bg-[#F3E8FF] text-purple-700',
}

export default function UniversitySlider({ universities }: { universities: Uni[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const CARD_W = 210 // px — must match card width below
  const GAP    = 16

  const checkScroll = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    el.addEventListener('scroll', checkScroll, { passive: true })
    checkScroll()
    return () => el.removeEventListener('scroll', checkScroll)
  }, [])

  const slide = (dir: 'prev' | 'next') => {
    const el = trackRef.current
    if (!el) return
    const step = (CARD_W + GAP) * 3
    el.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      {/* Prev */}
      <button
        onClick={() => slide('prev')}
        disabled={!canPrev}
        className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center text-[#033F85] hover:border-[#033F85] hover:bg-[#033F85] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous"
      >
        ‹
      </button>

      {/* Track */}
      <style>{`.__uni-track::-webkit-scrollbar{display:none}`}</style>
      <div
        ref={trackRef}
        className="__uni-track flex gap-4 overflow-x-auto scroll-smooth pb-2"
        style={{ scrollSnapType: 'x mandatory', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {universities.map((uni) => {
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
              className="flex-shrink-0 bg-white rounded-2xl border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all group"
              style={{ width: CARD_W, scrollSnapAlign: 'start', boxShadow: '0 2px 12px rgba(26,21,32,0.06)' }}
            >
              {/* Header */}
              <div className="h-24 bg-gradient-to-br from-[#033F85] to-[#022D5E] flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white font-black text-sm">
                  {initial}
                </div>
                {uni.qsRanking && (
                  <div className="absolute top-2 right-2 bg-[#F4A900] text-[#0F0D14] text-[10px] font-black px-2 py-0.5 rounded-full">
                    #{uni.qsRanking}
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="font-extrabold text-[#0F0D14] text-sm mb-0.5 group-hover:text-[#033F85] transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
                  {uni.name}
                </div>
                <div className="text-xs text-[#4A4555] mb-2 truncate">{uni.city}</div>
                <div className="flex gap-1 flex-wrap mb-2">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${TYPE_COLORS[uni.type] ?? 'bg-gray-100 text-gray-500'}`}>
                    {TYPE_LABELS[uni.type] ?? uni.type}
                  </span>
                  {uni.accreditation && (
                    <span className="text-[11px] font-bold bg-[#E0F7F5] text-[#2EC4B6] px-2 py-0.5 rounded-full">
                      Ak.{uni.accreditation}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-[#4A4555] border-t border-gray-100 pt-2">
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

      {/* Next */}
      <button
        onClick={() => slide('next')}
        disabled={!canNext}
        className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border-2 border-gray-200 shadow-md flex items-center justify-center text-[#033F85] hover:border-[#033F85] hover:bg-[#033F85] hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next"
      >
        ›
      </button>
    </div>
  )
}
