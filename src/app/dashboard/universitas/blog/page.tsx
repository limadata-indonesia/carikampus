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

export default async function BlogPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div><h1 className="text-xl font-bold text-gray-900">Blog</h1><p className="text-sm text-gray-400 mt-0.5">Tulis konten untuk menarik calon mahasiswa</p></div>
          <button className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">+ Artikel Baru</button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="text-5xl mb-4">✍️</div>
          <h2 className="font-bold text-gray-900 mb-2">Belum ada artikel</h2>
          <p className="text-sm text-gray-400 mb-6 max-w-sm mx-auto">Konten blog membantu meningkatkan SEO dan visibilitas universitas kamu di Google dan AI.</p>
          <button className="inline-block bg-[#033F85] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#022D5E]">Tulis Artikel Pertama</button>
        </div>
      </div>
    </DashboardShell>
  )
}
