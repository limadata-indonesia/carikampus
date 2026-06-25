export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universitas', label: 'Universitas', icon: '🏛' },
  { href: '/admin/pengguna', label: 'Pengguna', icon: '👥' },
  { href: '/admin/transaksi', label: 'Transaksi', icon: '💳' },
]

export default async function AdminPenggunaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Manajemen Pengguna</h1>
        <p className="text-sm text-gray-400 mb-6">Kelola semua pengguna platform</p>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">👥</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada pengguna</h2>
          <p className="text-sm text-gray-400">Pengguna yang mendaftar akan muncul di sini.</p>
        </div>
      </div>
    </DashboardShell>
  )
}
