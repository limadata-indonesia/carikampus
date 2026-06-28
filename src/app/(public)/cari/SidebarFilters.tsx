'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { PROVINCES } from '@/config'

export default function SidebarFilters() {
  const router = useRouter()
  const sp = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const update = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(sp.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    startTransition(() => {
      router.push(`/cari?${params.toString()}`, { scroll: false })
    })
  }, [router, sp])

  const reset = useCallback(() => {
    startTransition(() => router.push('/cari', { scroll: false }))
  }, [router])

  const hasFilters = sp.get('q') || sp.get('province') || sp.get('type') || sp.get('accreditation')

  return (
    <aside className="w-64 flex-shrink-0">
      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-6 sticky top-20 transition-opacity ${isPending ? 'opacity-60' : 'opacity-100'}`}>

        {/* Search */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#4A4555] mb-2">Cari</label>
          <input
            type="text"
            defaultValue={sp.get('q') ?? ''}
            placeholder="Nama, kota..."
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#033F85] focus:ring-2 focus:ring-[#033F85]/10 transition"
            onChange={e => {
              const val = e.target.value
              clearTimeout((window as any).__cariDebounce)
              ;(window as any).__cariDebounce = setTimeout(() => update('q', val), 400)
            }}
          />
        </div>

        {/* Province */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#4A4555] mb-2">Provinsi</label>
          <select
            value={sp.get('province') ?? ''}
            onChange={e => update('province', e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-[#033F85] bg-white"
          >
            <option value="">Semua Provinsi</option>
            {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#4A4555] mb-2">Tipe</label>
          <div className="space-y-2">
            {[['', 'Semua'], ['PRIVATE', 'Swasta'], ['NEGERI', 'Negeri'], ['KEAGAMAAN', 'Keagamaan'], ['KEDINASAN', 'Kedinasan']].map(([val, lbl]) => (
              <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value={val}
                  checked={(sp.get('type') ?? '') === val}
                  onChange={() => update('type', val)}
                  className="accent-[#033F85]"
                />
                <span className="text-sm text-[#0F0D14]">{lbl}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Accreditation */}
        <div>
          <label className="block text-xs font-black uppercase tracking-widest text-[#4A4555] mb-2">Akreditasi</label>
          <div className="space-y-2">
            {[['', 'Semua'], ['Unggul', 'Unggul'], ['A', 'A'], ['B', 'B'], ['C', 'C']].map(([val, lbl]) => (
              <label key={val} className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="radio"
                  name="accreditation"
                  value={val}
                  checked={(sp.get('accreditation') ?? '') === val}
                  onChange={() => update('accreditation', val)}
                  className="accent-[#033F85]"
                />
                <span className="text-sm text-[#0F0D14]">{lbl}</span>
              </label>
            ))}
          </div>
        </div>

        {hasFilters && (
          <button
            onClick={reset}
            className="w-full text-xs text-[#4A4555] hover:text-[#033F85] transition-colors py-1"
          >
            Reset semua filter
          </button>
        )}

        {isPending && (
          <div className="text-center text-xs text-[#4A4555] animate-pulse">Memuat...</div>
        )}
      </div>
    </aside>
  )
}
