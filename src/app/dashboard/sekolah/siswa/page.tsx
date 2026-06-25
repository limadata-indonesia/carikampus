export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/dashboard/sekolah', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/sekolah/siswa', label: 'Daftar Siswa', icon: '👥' },
  { href: '/dashboard/sekolah/kode-akses', label: 'Kode Akses', icon: '🎟' },
  { href: '/dashboard/sekolah/hasil', label: 'Hasil Tes Siswa', icon: '📈' },
]

export default async function DaftarSiswaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Sekolah" subtitle="Guru BK / Admin" avatarText="BK" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Daftar Siswa</h1><p className="text-sm text-gray-400 mt-0.5">Kelola siswa dan kode akses tes</p></div>
          <div className="flex gap-2">
            <button className="border border-gray-300 text-gray-600 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-gray-50 text-xs">📥 Import CSV</button>
            <button className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">+ Tambah Siswa</button>
          </div>
        </div>

        {/* Search & filter */}
        <div className="flex gap-3 mb-5">
          <input type="text" placeholder="Cari nama atau NISN..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#033F85]"/>
          <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#033F85] text-gray-600">
            <option>Semua status</option><option>Tes selesai</option><option>Belum mulai</option>
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada siswa</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Tambahkan siswa satu per satu atau import sekaligus via file CSV.</p>
          <div className="flex gap-3 justify-center">
            <button className="bg-[#033F85] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#022D5E]">+ Tambah Siswa</button>
            <button className="border border-gray-300 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50">📥 Import CSV</button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
