import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'
import ArticleEditor from '../ArticleEditor'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universitas', label: 'Universitas', icon: '🏛' },
  { href: '/admin/artikel', label: 'Artikel', icon: '📝' },
  { href: '/admin/pengguna', label: 'Pengguna', icon: '👥' },
  { href: '/admin/transaksi', label: 'Transaksi', icon: '💳' },
]

export default async function NewArtikelPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS} />}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin/artikel" className="text-sm text-gray-400 hover:text-[#033F85]">← Artikel</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-900">Artikel Baru</span>
        </div>
        <ArticleEditor />
      </div>
    </DashboardShell>
  )
}
