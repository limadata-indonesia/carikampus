export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
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

export default async function EditArtikelPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/masuk')

  const { id } = await params
  const article = await db.article.findUnique({ where: { id } })
  if (!article) notFound()

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS} />}>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/admin/artikel" className="text-sm text-gray-400 hover:text-[#033F85]">← Artikel</Link>
          <span className="text-gray-300">/</span>
          <span className="text-sm font-semibold text-gray-900 line-clamp-1">{article.title}</span>
        </div>
        <ArticleEditor initial={{
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt ?? '',
          content: article.content,
          category: article.category,
          emoji: article.emoji ?? '📝',
          readTime: article.readTime ?? '5 menit',
          published: article.published,
        }} />
      </div>
    </DashboardShell>
  )
}
