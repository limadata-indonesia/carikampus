'use client'
import Link from 'next/link'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Terjadi kesalahan</h1>
        <p className="text-sm text-gray-400 mb-2">{error.message || 'Sesuatu yang tidak terduga terjadi.'}</p>
        <p className="text-xs text-gray-300 mb-8">Coba refresh halaman atau kembali ke beranda.</p>
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="bg-[#033F85] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#022D5E]">Coba lagi</button>
          <Link href="/" className="border border-gray-300 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50">Beranda</Link>
        </div>
      </div>
    </div>
  )
}
