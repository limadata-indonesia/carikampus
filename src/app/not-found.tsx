import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-[#033F85] mb-4">404</div>
        <div className="w-16 h-1 bg-[#F4A900] rounded mx-auto mb-6" />
        <h1 className="text-xl font-bold text-gray-900 mb-2">Halaman tidak ditemukan</h1>
        <p className="text-sm text-gray-400 mb-8">Halaman yang kamu cari tidak ada atau telah dipindahkan.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="bg-[#033F85] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#022D5E]">← Beranda</Link>
          <Link href="/cari" className="border border-gray-300 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50">Cari Universitas</Link>
        </div>
      </div>
    </div>
  )
}
