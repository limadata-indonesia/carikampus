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
]

const PROFILE_LABELS: Record<string, string> = {
  R: 'Realistis', I: 'Investigatif', A: 'Artistik',
  S: 'Sosial', E: 'Enterprising', C: 'Konvensional',
}

export default async function TesMinatSiswaPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  const userId = (session.user as any).id
  const name = session.user?.name || 'Siswa'
  const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const [sessions, inProgress] = await Promise.all([
    db.testSession.findMany({
      where: { userId, status: 'COMPLETED' },
      orderBy: { completedAt: 'desc' },
      include: { result: true },
    }),
    db.testSession.findFirst({ where: { userId, status: 'IN_PROGRESS' } }),
  ])

  return (
    <DashboardShell sidebar={<DashboardSidebar title={name} subtitle="Akun Siswa" avatarText={initials} items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Tes Minat Saya</h1>
            <p className="text-sm text-gray-400">Riwayat dan hasil tes minat bakatmu</p>
          </div>
          <Link href="/tes-minat" className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">
            + Tes Baru
          </Link>
        </div>

        {/* Resume in-progress test */}
        {inProgress && (
          <div className="bg-[#FEF3D0] border border-[#F4A900] rounded-xl p-4 flex items-center gap-4 mb-6">
            <div className="text-2xl">⏸</div>
            <div className="flex-1">
              <div className="font-bold text-[#7A5200] text-sm">Kamu punya tes yang belum selesai</div>
              <div className="text-xs text-[#9A6800] mt-0.5">Tes dimulai {new Date(inProgress.startedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </div>
            <Link href={`/tes/${inProgress.id}`} className="bg-[#F4A900] text-[#033F85] text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#D99200] whitespace-nowrap">
              Lanjutkan →
            </Link>
          </div>
        )}

        {sessions.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">🧠</div>
            <h2 className="font-bold text-gray-900 mb-2">Belum ada tes selesai</h2>
            <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Mulai tes minat bakat untuk menemukan jurusan dan universitas yang paling cocok untukmu.</p>
            <Link href="/tes-minat" className="inline-block bg-[#033F85] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#022D5E]">Mulai Tes Minat</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map((s, i) => {
              const r = s.result
              const topPrimary = r?.topProfile?.[0]
              const topSecondary = r?.topProfile?.[1]
              return (
                <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-[#033F85] flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                      {r?.topProfile || '—'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900 text-sm">Tes #{sessions.length - i}</span>
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Selesai</span>
                      </div>
                      <div className="text-xs text-gray-400 mb-3">
                        {s.completedAt ? new Date(s.completedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                      </div>
                      {r && (
                        <>
                          <div className="text-sm text-gray-700 mb-3">
                            Profil utama: <strong>{topPrimary && PROFILE_LABELS[topPrimary]}</strong>
                            {topSecondary && <> · <strong>{PROFILE_LABELS[topSecondary]}</strong></>}
                            {r.cognitiveScore != null && <> · Kognitif: <strong>{r.cognitiveScore}%</strong></>}
                          </div>
                          {/* RIASEC bars */}
                          <div className="grid grid-cols-6 gap-1.5">
                            {['R','I','A','S','E','C'].map(cat => {
                              const score = (r as any)[`riasec${cat}`] as number
                              const pct = Math.round((score / 45) * 100)
                              return (
                                <div key={cat} className="text-center">
                                  <div className="text-xs font-bold text-gray-400 mb-1">{cat}</div>
                                  <div className="h-10 bg-gray-100 rounded relative overflow-hidden">
                                    <div className="absolute bottom-0 left-0 right-0 bg-[#033F85] rounded" style={{ height: `${pct}%` }} />
                                  </div>
                                  <div className="text-xs text-gray-400 mt-0.5">{score}</div>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
