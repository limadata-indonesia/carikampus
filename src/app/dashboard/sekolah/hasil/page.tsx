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

export default async function HasilTesSiswaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Sekolah" subtitle="Guru BK / Admin" avatarText="BK" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Hasil Tes Siswa</h1>
        <p className="text-sm text-gray-400 mb-6">Lihat profil RIASEC dan rekomendasi jurusan siswa</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">📈</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada hasil tes</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">Hasil tes siswa akan muncul di sini setelah mereka menyelesaikan tes minat bakat.</p>
        </div>
      </div>
    </DashboardShell>
  )
}
