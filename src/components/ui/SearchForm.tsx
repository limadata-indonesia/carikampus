'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PROVINCES } from '@/config'

export default function SearchForm() {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [province, setProvince] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (province) params.set('province', province)
    router.push(`/cari${params.size ? '?' + params.toString() : ''}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex max-w-xl bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 mb-10">
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Cari universitas, jurusan, atau kota..."
        className="flex-1 px-5 py-4 text-sm text-[#0F0D14] outline-none placeholder:text-gray-400"
      />
      <select
        value={province}
        onChange={e => setProvince(e.target.value)}
        className="border-l border-gray-100 px-3 py-4 text-sm text-gray-400 bg-white outline-none hidden md:block"
      >
        <option value="">Semua provinsi</option>
        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <button
        type="submit"
        className="bg-[#1A1520] text-white px-6 py-4 text-sm font-black hover:bg-[#033F85] transition-colors whitespace-nowrap rounded-r-2xl"
      >
        Cari →
      </button>
    </form>
  )
}
