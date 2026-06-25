export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universitas', label: 'Universitas', icon: '🏛' },
  { href: '/admin/pengguna', label: 'Pengguna', icon: '👥' },
  { href: '/admin/transaksi', label: 'Transaksi', icon: '💳' },
]

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#F4A900',
  APPROVED: '#1A7F3C',
  REJECTED: '#C53030',
}

export default async function AdminUniversitasPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  const universities = await db?.university?.findMany({
    orderBy: { createdAt: 'desc' },
    take: 50,
  }).catch(() => []) || []

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Manajemen Universitas</h1><p className="text-sm text-gray-400 mt-0.5">Approval dan kelola universitas terdaftar</p></div>
          <div className="flex gap-2">
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none">
              <option>Semua status</option><option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>
        </div>

        {universities.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">🏛</div>
            <h2 className="font-bold text-gray-900 mb-2">Belum ada universitas terdaftar</h2>
            <p className="text-sm text-gray-400">Universitas yang mendaftar akan muncul di sini untuk diverifikasi.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Universitas</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Lokasi</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {(universities as any[]).map((uni) => (
                  <tr key={uni.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{uni.name}</td>
                    <td className="px-4 py-3 text-gray-500">{uni.city}, {uni.province}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: STATUS_COLORS[uni.status] + '20', color: STATUS_COLORS[uni.status] }}>
                        {uni.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {uni.status === 'PENDING' && (
                          <>
                            <button className="text-xs text-green-600 border border-green-300 px-2 py-1 rounded hover:bg-green-50">✓ Approve</button>
                            <button className="text-xs text-red-500 border border-red-300 px-2 py-1 rounded hover:bg-red-50">✗ Reject</button>
                          </>
                        )}
                        <button className="text-xs text-[#033F85] border border-[#033F85] px-2 py-1 rounded hover:bg-[#E8F0FB]">Lihat</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
