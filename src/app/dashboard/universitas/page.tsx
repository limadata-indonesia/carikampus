export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
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

export default async function DashboardUniversitasPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  const metrics = [
    { val: '0', lbl: 'Penglihatan profil', delta: 'Bulan ini', color: '#033F85' },
    { val: '0', lbl: 'Pendaftar masuk', delta: 'Total', color: '#F4A900' },
    { val: '0', lbl: 'Program studi', delta: 'Aktif', color: '#1A7F3C' },
    { val: '—', lbl: 'Rating rata-rata', delta: 'Belum ada ulasan', color: '#5B21B6' },
  ]

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Dashboard Universitas</h1><p className="text-sm text-gray-400 mt-0.5">Kelola profil dan pantau performa</p></div>
          <Link href="/dashboard/universitas/profil" className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">Lengkapi Profil</Link>
        </div>

        {/* Setup checklist */}
        <div className="bg-[#E8F0FB] border border-[#B8CCE8] rounded-xl p-5 mb-6">
          <div className="font-bold text-[#033F85] text-sm mb-3">⚡ Setup profil universitas</div>
          <div className="space-y-2">
            {[
              { label: 'Isi informasi dasar', done: false, href: '/dashboard/universitas/profil' },
              { label: 'Tambahkan fakultas & program studi', done: false, href: '/dashboard/universitas/program' },
              { label: 'Upload logo dan foto kampus', done: false, href: '/dashboard/universitas/profil' },
              { label: 'Setup SEO & GEO', done: false, href: '/dashboard/universitas/seo' },
              { label: 'Tulis artikel pertama', done: false, href: '/dashboard/universitas/blog' },
            ].map(({ label, done, href }) => (
              <Link key={label} href={href} className="flex items-center gap-3 hover:bg-[#D4E9FD] p-1.5 rounded-lg transition-colors">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${done ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                  {done && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {metrics.map(({ val, lbl, delta, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
              <div className="text-xs text-gray-300 mt-0.5">{delta}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SIDEBAR_ITEMS.slice(1).map(({ href, icon, label }) => (
            <Link key={href} href={href} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-[#033F85] hover:shadow-sm transition-all">
              <span className="text-2xl">{icon}</span>
              <div><div className="font-bold text-gray-900 text-sm">{label}</div></div>
              <span className="ml-auto text-gray-300">›</span>
            </Link>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
