export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/dashboard/siswa', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/siswa/tes', label: 'Tes Minat Saya', icon: '🧠' },
  { href: '/dashboard/siswa/lamaran', label: 'Lamaran Saya', icon: '📝' },
  { href: '/cari', label: 'Cari Universitas', icon: '🔍' },
  { href: '/tes-minat', label: 'Mulai Tes', icon: '🎯' },
]

export default async function DashboardSiswaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  const name = session.user?.name || 'Siswa'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <DashboardShell sidebar={
      <DashboardSidebar title={name} subtitle="Akun Siswa" avatarText={initials} items={SIDEBAR_ITEMS} />
    }>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">Selamat datang, {name.split(' ')[0]}! 👋</h1>
          <p className="text-sm text-gray-400 mt-0.5">Temukan kampus dan karier yang tepat untukmu</p>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link href="/tes-minat" className="bg-[#033F85] rounded-xl p-5 hover:bg-[#022D5E] transition-colors">
            <div className="text-2xl mb-2">🧠</div>
            <div className="text-white font-bold text-sm mb-1">Mulai Tes Minat</div>
            <div className="text-white/60 text-xs">144 soal · ~90 menit · RIASEC + Kognitif</div>
          </Link>
          <Link href="/cari" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#033F85] hover:shadow-sm transition-all">
            <div className="text-2xl mb-2">🔍</div>
            <div className="font-bold text-gray-900 text-sm mb-1">Cari Universitas</div>
            <div className="text-gray-400 text-xs">500+ universitas di 34 provinsi</div>
          </Link>
          <Link href="/dashboard/siswa/lamaran" className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#033F85] hover:shadow-sm transition-all">
            <div className="text-2xl mb-2">📝</div>
            <div className="font-bold text-gray-900 text-sm mb-1">Lamaran Saya</div>
            <div className="text-gray-400 text-xs">Pantau status pendaftaranmu</div>
          </Link>
        </div>

        {/* Status cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: '0', lbl: 'Tes Selesai', color: '#033F85' },
            { val: '0', lbl: 'Universitas Disimpan', color: '#F4A900' },
            { val: '0', lbl: 'Lamaran Aktif', color: '#1A7F3C' },
            { val: '0', lbl: 'Rekomendasi', color: '#5B21B6' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        {/* CTA - no test yet */}
        <div className="bg-gradient-to-r from-[#033F85] to-[#022D5E] rounded-xl p-6 flex items-center gap-5">
          <div className="text-4xl">🎯</div>
          <div className="flex-1">
            <div className="text-white font-bold mb-1">Belum pernah tes minat?</div>
            <div className="text-white/70 text-sm">Temukan jurusan dan universitas yang paling cocok berdasarkan kepribadian dan bakatmu.</div>
          </div>
          <Link href="/tes-minat" className="bg-[#F4A900] text-[#033F85] text-sm font-bold px-5 py-2.5 rounded-lg hover:bg-[#D99200] whitespace-nowrap flex-shrink-0">
            Mulai Tes →
          </Link>
        </div>
      </div>
    </DashboardShell>
  )
}
