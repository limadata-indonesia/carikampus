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

export default async function KodeAksesPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Sekolah" subtitle="Guru BK / Admin" avatarText="BK" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Kode Akses</h1>
        <p className="text-sm text-gray-400 mb-6">Kelola kode akses tes untuk siswa kamu</p>

        <div className="bg-[#FEF3D0] border border-[#F4A900]/40 rounded-xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <div className="font-bold text-gray-900 text-sm mb-1">Cara mendapatkan kode akses batch</div>
              <p className="text-xs text-gray-600 leading-relaxed">Hubungi tim Cari Kampus di <strong>hello@carikampus.id</strong> dengan menyertakan nama sekolah, jumlah siswa, dan kelas. Kami akan menyiapkan kode akses batch gratis untuk sekolah mitra.</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">🎟</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada kode akses</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Setelah mendapat kode batch dari kami, kamu bisa generate kode individual untuk masing-masing siswa di sini.</p>
          <a href="mailto:hello@carikampus.id?subject=Permintaan Kode Akses Batch" className="inline-block bg-[#F4A900] text-[#033F85] text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#D99200]">📧 Hubungi Kami</a>
        </div>
      </div>
    </DashboardShell>
  )
}
