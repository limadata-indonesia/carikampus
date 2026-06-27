export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'
import { db } from '@/lib/db'

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

  const userId = (session.user as any).id
  const name = session.user?.name || 'Siswa'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const [testsDone, student, applications, latestResult] = await Promise.all([
    db.testSession.count({ where: { userId, status: 'COMPLETED' } }),
    db.student.findUnique({ where: { userId }, include: { savedUniversities: { select: { id: true } } } }),
    db.application.count({ where: { student: { userId } } }),
    db.testResult.findFirst({
      where: { session: { userId, status: 'COMPLETED' } },
      orderBy: { createdAt: 'desc' },
      include: { session: true },
    }),
  ])

  const savedCount = student?.savedUniversities?.length ?? 0
  const recCount = latestResult ? (latestResult.recommendations as any[]).length : 0
  const hasTest = testsDone > 0

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
            { val: String(testsDone), lbl: 'Tes Selesai', color: '#033F85' },
            { val: String(savedCount), lbl: 'Universitas Disimpan', color: '#F4A900' },
            { val: String(applications), lbl: 'Lamaran Aktif', color: '#1A7F3C' },
            { val: String(recCount), lbl: 'Rekomendasi', color: '#5B21B6' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${color}` }}>
              <div className="text-2xl font-bold" style={{ color }}>{val}</div>
              <div className="text-xs text-gray-400 mt-1">{lbl}</div>
            </div>
          ))}
        </div>

        {hasTest && latestResult ? (
          /* Latest result summary */
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Hasil Tes Terakhir</h2>
              <Link href="/dashboard/siswa/tes" className="text-xs text-[#033F85] font-semibold hover:underline">Lihat Semua →</Link>
            </div>
            <div className="flex items-center gap-6 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#033F85] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                {latestResult.topProfile || '—'}
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-0.5">Profil {latestResult.topProfile}</div>
                <div className="text-xs text-gray-400">Skor kognitif: {latestResult.cognitiveScore ?? '—'}%</div>
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {['R','I','A','S','E','C'].map(cat => {
                const score = (latestResult as any)[`riasec${cat}`] as number
                const pct = Math.round((score / 45) * 100)
                return (
                  <div key={cat} className="text-center">
                    <div className="text-xs font-bold text-gray-500 mb-1">{cat}</div>
                    <div className="h-16 bg-gray-100 rounded-lg relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 right-0 bg-[#033F85] rounded-lg transition-all" style={{ height: `${pct}%` }} />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{score}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* CTA - no test yet */
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
        )}
      </div>
    </DashboardShell>
  )
}
