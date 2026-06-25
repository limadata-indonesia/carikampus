export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/dashboard/universitas', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/universitas/profil', label: 'Edit Profil', icon: '🏛' },
  { href: '/dashboard/universitas/program', label: 'Program Studi', icon: '📚' },
  { href: '/dashboard/universitas/statistik', label: 'Statistik', icon: '📈' },
  { href: '/dashboard/universitas/seo', label: 'SEO & GEO', icon: '🔍' },
  { href: '/dashboard/universitas/blog', label: 'Blog', icon: '✍️' },
]

export default async function EditProfilPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6 max-w-3xl">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Edit Profil Universitas</h1>
        <p className="text-sm text-gray-400 mb-6">Informasi ini akan ditampilkan di halaman profil publik</p>

        <div className="space-y-5">
          {/* Logo & Banner */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 text-sm mb-4">Logo & Foto Kampus</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Logo universitas</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl h-28 flex flex-col items-center justify-center hover:border-[#033F85] cursor-pointer transition-colors">
                  <div className="text-2xl mb-1">🖼</div>
                  <div className="text-xs text-gray-400">PNG/JPG · min 200×200px</div>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-2 block">Banner halaman profil</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl h-28 flex flex-col items-center justify-center hover:border-[#033F85] cursor-pointer transition-colors">
                  <div className="text-2xl mb-1">🖼</div>
                  <div className="text-xs text-gray-400">PNG/JPG · 1200×400px</div>
                </div>
              </div>
            </div>
          </div>

          {/* Basic info */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 text-sm mb-4">Informasi Dasar</h2>
            <div className="space-y-3">
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Nama universitas</label><input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Universitas Indonesia"/></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Tipe</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85] text-gray-700">
                    <option>Negeri</option><option>Swasta</option><option>Keagamaan</option><option>Kedinasan</option>
                  </select>
                </div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Akreditasi</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85] text-gray-700">
                    <option>A (Unggul)</option><option>B (Baik Sekali)</option><option>C (Baik)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Provinsi</label><input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="DKI Jakarta"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Kota</label><input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Jakarta Pusat"/></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Alamat lengkap</label><input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Jl. Contoh No. 1"/></div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Tahun berdiri</label><input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="1950"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Total mahasiswa</label><input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="15000"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">QS Ranking</label><input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="500"/></div>
              </div>
              <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Deskripsi</label><textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Ceritakan keunggulan universitas kamu..."/></div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 text-sm mb-4">Kontak & Pendaftaran</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Website</label><input type="url" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="https://universitas.ac.id"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Email</label><input type="email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="info@universitas.ac.id"/></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Biaya pendaftaran (Rp)</label><input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="200000"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Bulan intake</label><input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Februari"/></div>
                <div><label className="text-xs font-semibold text-gray-500 mb-1 block">Tahun intake</label><input type="number" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="2026"/></div>
              </div>
            </div>
          </div>

          <button className="bg-[#033F85] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#022D5E]">Simpan Perubahan</button>
        </div>
      </div>
    </DashboardShell>
  )
}
