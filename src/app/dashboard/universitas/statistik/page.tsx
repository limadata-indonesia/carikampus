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

export default async function StatistikPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Statistik</h1>
        <p className="text-sm text-gray-400 mb-6">Performa profil universitas kamu</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: '0', lbl: 'Penglihatan profil', sub: '30 hari terakhir', color: '#033F85' },
            { val: '0', lbl: 'Pendaftar masuk', sub: 'Total', color: '#F4A900' },
            { val: '0', lbl: 'Disimpan siswa', sub: 'Total', color: '#1A7F3C' },
            { val: '0', lbl: 'Klik tombol daftar', sub: '30 hari terakhir', color: '#5B21B6' },
          ].map(({ val, lbl, sub, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-700 font-medium mt-1">{lbl}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="text-4xl mb-3">📈</div>
          <h2 className="font-bold text-gray-900 mb-2">Data akan muncul setelah profil live</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">Lengkapi profil universitas dan tunggu approval admin untuk mulai melihat statistik penglihatan, pendaftar, dan konversi.</p>
        </div>
      </div>
    </DashboardShell>
  )
}
