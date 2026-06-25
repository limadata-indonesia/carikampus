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

export default async function ProgramStudiPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Fakultas & Program Studi</h1><p className="text-sm text-gray-400 mt-0.5">Kelola daftar fakultas dan program studi</p></div>
          <button className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">+ Tambah Fakultas</button>
        </div>

        {/* Empty state */}
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">📚</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada fakultas</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Tambahkan fakultas dan program studi agar calon mahasiswa bisa menemukan jurusan yang mereka cari.</p>
          <div className="flex gap-3 justify-center">
            <button className="bg-[#033F85] text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#022D5E]">+ Tambah Fakultas</button>
            <button className="border border-gray-300 text-gray-600 text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-gray-50">Import dari Excel</button>
          </div>
        </div>

        {/* Example of how it looks when filled */}
        <div className="mt-6 bg-[#E8F0FB] border border-[#B8CCE8] rounded-xl p-4">
          <div className="text-xs font-bold text-[#033F85] mb-2">💡 Contoh tampilan setelah diisi:</div>
          <div className="bg-white rounded-lg p-3 space-y-2">
            {['Fakultas Teknik (8 prodi)', 'Fakultas Ilmu Komputer (4 prodi)', 'Fakultas Ekonomi & Bisnis (5 prodi)'].map(f => (
              <div key={f} className="flex items-center justify-between text-sm border border-gray-100 rounded-lg p-2.5">
                <span className="font-medium text-gray-700">{f}</span>
                <div className="flex gap-1">
                  <button className="text-xs text-[#033F85] px-2 py-0.5 border border-[#033F85] rounded hover:bg-[#E8F0FB]">Edit</button>
                  <button className="text-xs text-green-600 px-2 py-0.5 border border-green-300 rounded hover:bg-green-50">+ Prodi</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
