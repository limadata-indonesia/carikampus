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
]

export default async function LamaranSiswaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')
  const name = session.user?.name || 'Siswa'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <DashboardShell sidebar={<DashboardSidebar title={name} subtitle="Akun Siswa" avatarText={initials} items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Lamaran Saya</h1><p className="text-sm text-gray-400 mt-0.5">Pantau status pendaftaran ke universitas</p></div>
          <Link href="/cari" className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">+ Cari Universitas</Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada lamaran</h2>
          <p className="text-sm text-gray-400 mb-6">Temukan universitas yang kamu minati dan mulai proses pendaftaran.</p>
          <Link href="/cari" className="inline-block bg-[#033F85] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#022D5E]">Cari Universitas</Link>
        </div>
      </div>
    </DashboardShell>
  )
}
