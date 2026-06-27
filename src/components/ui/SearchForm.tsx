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
    <form onSubmit={handleSearch} className="flex max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl mb-8">
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Cari universitas, jurusan, atau kota..."
        className="flex-1 px-4 py-3.5 text-sm text-gray-800 outline-none"
      />
      <select
        value={province}
        onChange={e => setProvince(e.target.value)}
        className="border-l border-gray-200 px-3 py-3.5 text-sm text-gray-500 bg-white outline-none"
      >
        <option value="">Semua provinsi</option>
        {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <button
        type="submit"
        className="bg-[#F4A900] text-[#033F85] px-5 py-3.5 text-sm font-bold hover:bg-[#D99200] transition-colors whitespace-nowrap"
      >
        Cari
      </button>
    </form>
  )
}
