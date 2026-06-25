'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function AdminMasukPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-[#033F85] rounded-xl flex items-center justify-center mx-auto mb-3">
            <span className="text-[#F4A900] text-xl">⚙️</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-xs text-gray-400 mt-1">Cari Kampus Cari Kerja — Platform Admin</p>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Email admin</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@carikampus.id"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"
            />
          </div>
        </div>

        <button
          disabled={loading}
          onClick={async () => {
            setLoading(true)
            await signIn('credentials', { email, password, callbackUrl: '/admin' })
            setLoading(false)
          }}
          className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E] transition-colors disabled:opacity-50"
        >
          {loading ? 'Memuat...' : 'Masuk ke Admin Panel'}
        </button>

        <div className="mt-4 bg-[#FEF3D0] rounded-lg p-3 text-xs text-gray-500">
          <strong className="text-gray-700">Akses terbatas.</strong> Halaman ini hanya untuk tim internal Cari Kampus Cari Kerja.
        </div>

        <div className="mt-4 text-center">
          <Link href="/" className="text-xs text-gray-300 hover:text-gray-500">← Kembali ke beranda</Link>
        </div>
      </div>
    </div>
  )
}
