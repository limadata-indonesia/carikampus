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

export default async function AdminTransaksiPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Transaksi</h1>
        <p className="text-sm text-gray-400 mb-6">Riwayat pembayaran tes minat dan pendaftaran</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { val: 'Rp 0', lbl: 'Total revenue', color: '#033F85' },
            { val: '0', lbl: 'Transaksi bulan ini', color: '#1A7F3C' },
            { val: '0', lbl: 'Transaksi pending', color: '#F4A900' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">💳</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada transaksi</h2>
          <p className="text-sm text-gray-400">Transaksi pembelian tes dan pendaftaran akan muncul di sini.</p>
        </div>
      </div>
    </DashboardShell>
  )
}
