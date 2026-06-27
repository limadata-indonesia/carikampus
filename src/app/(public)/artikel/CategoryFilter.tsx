'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const CATEGORIES = ['Semua', 'Tips Karier', 'Universitas', 'Tes Minat', 'SNBT', 'Biaya Kuliah', 'Karier']

export default function CategoryFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'Semua'

  function select(cat: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (cat === 'Semua') {
      params.delete('category')
    } else {
      params.set('category', cat)
    }
    router.push(`/artikel?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 flex-wrap mb-8">
      {CATEGORIES.map(cat => {
        const isActive = cat === active
        return (
          <button
            key={cat}
            onClick={() => select(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              isActive
                ? 'bg-[#033F85] text-white border-[#033F85]'
                : 'border-gray-300 text-gray-600 hover:border-[#033F85] hover:text-[#033F85]'
            }`}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
