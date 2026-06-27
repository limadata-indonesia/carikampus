export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'
import { db } from '@/lib/db'

const SIDEBAR_ITEMS = [
  { href: '/dashboard/sekolah', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/sekolah/siswa', label: 'Daftar Siswa', icon: '👥' },
  { href: '/dashboard/sekolah/kode-akses', label: 'Kode Akses', icon: '🎟' },
  { href: '/dashboard/sekolah/hasil', label: 'Hasil Tes Siswa', icon: '📈' },
]

export default async function DashboardSekolahPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  // School admins are identified by their email domain or directly linked via access batches
  // For now, find batches where pic matches user email
  const userEmail = session.user?.email ?? ''
  const batches = await db.schoolAccessBatch.findMany({
    where: { pic: userEmail },
    include: { codes: true },
  })

  const totalCodes = batches.reduce((s, b) => s + b.quota, 0)
  const usedCodes = batches.reduce((s, b) => s + b.used, 0)
  const unusedCodes = totalCodes - usedCodes

  // Count completed tests from students who used codes from this school's batches
  const usedCodesFromBatches = batches.flatMap(b => b.codes.filter(c => c.used).map(c => c.code))
  const testsCompleted = usedCodesFromBatches.length > 0
    ? await db.testAccessGrant.count({
        where: {
          accessCode: { in: usedCodesFromBatches },
          active: true,
        },
      })
    : 0

  const hasBatch = batches.length > 0

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Sekolah" subtitle="Guru BK / Admin" avatarText="BK" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Dashboard Sekolah</h1>
        <p className="text-sm text-gray-400 mb-6">Kelola akses tes minat untuk siswa kamu</p>

        {!hasBatch ? (
          <div className="bg-[#E8F0FB] border border-[#B8CCE8] rounded-xl p-5 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#033F85] rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">🎟</div>
              <div className="flex-1">
                <div className="font-bold text-[#033F85] text-sm">Belum ada kode akses batch</div>
                <div className="text-xs text-gray-500 mt-0.5">Hubungi tim Cari Kampus untuk mendapatkan kode akses batch gratis untuk sekolahmu</div>
              </div>
              <a href="mailto:hello@carikampus.id" className="bg-[#033F85] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E] whitespace-nowrap flex-shrink-0">Hubungi Kami</a>
            </div>
          </div>
        ) : (
          <div className="bg-[#E8F0FB] border border-[#B8CCE8] rounded-xl p-5 mb-6">
            <div className="font-bold text-[#033F85] text-sm mb-3">🎟 Batch Aktif ({batches.length})</div>
            <div className="space-y-2">
              {batches.map(b => (
                <div key={b.id} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 text-sm">
                  <code className="font-mono font-bold text-[#033F85]">{b.code}</code>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-600">{b.schoolName}</span>
                  <span className="ml-auto text-gray-400 text-xs">{b.used}/{b.quota} dipakai</span>
                  {b.expiresAt && <span className="text-xs text-red-400">Exp {new Date(b.expiresAt).toLocaleDateString('id-ID')}</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { val: String(totalCodes), lbl: 'Total Kode', color: '#033F85' },
            { val: String(usedCodes), lbl: 'Sudah Dapat Kode', color: '#F4A900' },
            { val: String(testsCompleted), lbl: 'Tes Selesai', color: '#1A7F3C' },
            { val: String(unusedCodes), lbl: 'Belum Mulai', color: '#C53030' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
