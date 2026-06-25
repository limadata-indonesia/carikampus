import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#011E3F] text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#F4A900] rounded-md flex items-center justify-center font-black text-[#033F85] text-sm">CK</div>
              <div>
                <div className="text-sm font-bold leading-tight">Cari Kampus</div>
                <div className="text-sm font-bold text-[#F4A900] leading-tight">Cari Kerja</div>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Platform universitas dan karier terlengkap di Indonesia.
            </p>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3 text-[#F4A900]">Platform</div>
            <div className="space-y-2 text-sm text-white/70">
              <div><Link href="/cari" className="hover:text-white">Cari Universitas</Link></div>
              <div><Link href="/tes-minat" className="hover:text-white">Tes Minat Bakat</Link></div>
              <div><Link href="/artikel" className="hover:text-white">Artikel</Link></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3 text-[#F4A900]">Untuk Universitas</div>
            <div className="space-y-2 text-sm text-white/70">
              <div><Link href="/daftar/universitas" className="hover:text-white">Daftarkan Kampus</Link></div>
              <div><Link href="/dashboard/universitas" className="hover:text-white">Dashboard</Link></div>
            </div>
          </div>
          <div>
            <div className="font-semibold text-sm mb-3 text-[#F4A900]">Untuk Sekolah</div>
            <div className="space-y-2 text-sm text-white/70">
              <div><Link href="/daftar/sekolah" className="hover:text-white">Program Sekolah</Link></div>
              <div><Link href="/dashboard/sekolah" className="hover:text-white">Dashboard BK</Link></div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-white/40">
          <span>© 2025 Cari Kampus Cari Kerja. All rights reserved.</span>
          <span>carikampus.id</span>
        </div>
      </div>
    </footer>
  )
}
