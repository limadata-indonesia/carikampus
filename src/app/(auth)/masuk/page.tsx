'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function MasukForm() {
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard/siswa'
  const error = searchParams.get('error')

  const handleGoogle = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl })
  }

  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 text-center mb-1">Masuk</h1>
        <p className="text-sm text-gray-400 text-center mb-6">ke akun Cari Kampus Cari Kerja</p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-xs text-red-600 mb-4">
            {error === 'OAuthSignin' ? 'Gagal login dengan Google. Coba lagi.' : 'Terjadi kesalahan. Coba lagi.'}
          </div>
        )}

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 mb-4 disabled:opacity-50 transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {loading ? 'Memuat...' : 'Masuk dengan Google'}
        </button>

        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div>
          <div className="relative flex justify-center"><span className="text-xs text-gray-400 bg-white px-2">atau masuk dengan email</span></div>
        </div>

        <div className="space-y-3">
          <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
          <input type="password" placeholder="Password" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
          <button className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E] transition-colors">
            Masuk
          </button>
        </div>

        <p className="text-xs text-center text-gray-400 mt-5">
          Belum punya akun?{' '}
          <Link href="/daftar/siswa" className="text-[#033F85] font-semibold hover:underline">Daftar sekarang</Link>
        </p>

        {/* Admin shortcut */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link href="/admin" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
            Admin Panel →
          </Link>
        </div>
      </div>

      {/* Role selector hint */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: 'Siswa', href: '/daftar/siswa', icon: '🎓' },
          { label: 'Universitas', href: '/daftar/universitas', icon: '🏛' },
          { label: 'Guru BK', href: '/dashboard/sekolah', icon: '📋' },
        ].map(({ label, href, icon }) => (
          <Link key={label} href={href} className="bg-white border border-gray-200 rounded-xl py-3 text-xs font-semibold text-gray-500 hover:border-[#033F85] hover:text-[#033F85] transition-all">
            <div className="text-lg mb-1">{icon}</div>
            {label}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function MasukPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-sm h-96 bg-white rounded-2xl border border-gray-200 animate-pulse"/>}>
      <MasukForm />
    </Suspense>
  )
}
