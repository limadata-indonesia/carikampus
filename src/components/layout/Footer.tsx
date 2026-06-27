import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#1A1520] text-white mt-0">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#F4A900] rounded-xl flex items-center justify-center font-black text-[#1A1520] text-sm">CK</div>
              <div>
                <div className="text-sm font-extrabold leading-tight tracking-tight">Cari Kampus</div>
                <div className="text-xs font-bold text-[#F4A900] leading-tight">Cari Kerja</div>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed">
              Platform universitas dan karier terlengkap di Indonesia.
            </p>
          </div>

          {/* Platform */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#F4A900] mb-4">Platform</div>
            <div className="space-y-2.5 text-sm text-white/60">
              <div><Link href="/cari" className="hover:text-white transition-colors">Cari Universitas</Link></div>
              <div><Link href="/tes-minat" className="hover:text-white transition-colors">Tes Minat Bakat</Link></div>
              <div><Link href="/artikel" className="hover:text-white transition-colors">Artikel</Link></div>
            </div>
          </div>

          {/* Universitas */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-[#2EC4B6] mb-4">Untuk Universitas</div>
            <div className="space-y-2.5 text-sm text-white/60">
              <div><Link href="/daftar/universitas" className="hover:text-white transition-colors">Daftarkan Kampus</Link></div>
              <div><Link href="/dashboard/universitas" className="hover:text-white transition-colors">Dashboard</Link></div>
            </div>
          </div>

          {/* Sekolah */}
          <div>
            <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-4">Untuk Sekolah</div>
            <div className="space-y-2.5 text-sm text-white/60">
              <div><Link href="/daftar/sekolah" className="hover:text-white transition-colors">Program Sekolah</Link></div>
              <div><Link href="/dashboard/sekolah" className="hover:text-white transition-colors">Dashboard BK</Link></div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-white/30">
          <span>© 2025 Cari Kampus Cari Kerja. All rights reserved.</span>
          <span className="font-bold text-white/20">carikampus.id</span>
        </div>
      </div>
    </footer>
  )
}
