export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universitas', label: 'Universitas', icon: '🏛' },
  { href: '/admin/pengguna', label: 'Pengguna', icon: '👥' },
  { href: '/admin/transaksi', label: 'Transaksi', icon: '💳' },
]

export default async function AdminPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Panel</h1>
        <p className="text-sm text-gray-400 mb-6">Kelola seluruh platform Cari Kampus Cari Kerja</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: '0', lbl: 'Universitas pending', color: '#F4A900' },
            { val: '0', lbl: 'Total universitas', color: '#033F85' },
            { val: '0', lbl: 'Total pengguna', color: '#1A7F3C' },
            { val: 'Rp 0', lbl: 'Revenue bulan ini', color: '#5B21B6' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIDEBAR_ITEMS.slice(1).map(({ href, icon, label }) => (
            <Link key={href} href={href} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-[#033F85] hover:shadow-sm transition-all">
              <span className="text-2xl">{icon}</span>
              <div className="font-bold text-gray-900 text-sm">{label}</div>
              <span className="ml-auto text-gray-300">›</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
