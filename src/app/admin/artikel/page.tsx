export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { db } from '@/lib/db'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/universitas', label: 'Universitas', icon: '🏛' },
  { href: '/admin/artikel', label: 'Artikel', icon: '📝' },
  { href: '/admin/pengguna', label: 'Pengguna', icon: '👥' },
  { href: '/admin/transaksi', label: 'Transaksi', icon: '💳' },
]

const CATEGORY_COLORS: Record<string, string> = {
  'Tips Karier':  'bg-blue-100 text-blue-700',
  'Universitas':  'bg-amber-100 text-amber-700',
  'Tes Minat':    'bg-purple-100 text-purple-700',
  'SNBT':         'bg-green-100 text-green-700',
  'Biaya Kuliah': 'bg-red-100 text-red-700',
  'Karier':       'bg-teal-100 text-teal-700',
}

export default async function AdminArtikelPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  let articles: { id: string; title: string; slug: string; category: string; published: boolean; publishedAt: Date | null; emoji: string | null; readTime: string | null }[] = []
  let dbError: string | null = null

  try {
    articles = await db.article.findMany({
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, category: true, published: true, publishedAt: true, emoji: true, readTime: true },
    })
  } catch (e) {
    dbError = String(e)
  }

  const published = articles.filter(a => a.published).length
  const drafts = articles.length - published

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Admin Panel" subtitle="Platform Admin" avatarText="AD" items={SIDEBAR_ITEMS} />}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 mb-0.5">Artikel & Panduan</h1>
            <p className="text-sm text-gray-400">
              {articles.length} total · {published} dipublikasi · {drafts} draft
            </p>
          </div>
          <Link
            href="/admin/artikel/baru"
            className="bg-[#033F85] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#022D5E] transition-colors flex items-center gap-2"
          >
            <span>+</span> Artikel Baru
          </Link>
        </div>

        {dbError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-red-600 font-mono">{dbError}</p>
            <p className="text-xs text-red-500 mt-2">
              Tabel artikel belum ada.{' '}
              <a href="/api/admin/seed-articles" target="_blank" className="underline font-semibold">Klik di sini untuk membuat tabel dan isi artikel sampel</a>
              {' '}lalu refresh halaman ini.
            </p>
          </div>
        )}

        {!dbError && articles.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h3 className="font-bold text-gray-900 mb-2">Belum ada artikel</h3>
            <p className="text-sm text-gray-400 mb-4">Mulai buat artikel pertama atau isi dengan artikel sampel.</p>
            <div className="flex gap-3 justify-center">
              <Link href="/admin/artikel/baru" className="bg-[#033F85] text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-[#022D5E]">
                Buat Artikel
              </Link>
              <a
                href="/api/admin/seed-articles"
                target="_blank"
                className="border border-[#033F85] text-[#033F85] text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#E8F0FB]"
              >
                Isi Artikel Sampel
              </a>
            </div>
          </div>
        )}

        {articles.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Artikel</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategori</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Tanggal</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map(art => (
                  <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{art.emoji ?? '📝'}</span>
                        <div>
                          <div className="font-semibold text-gray-900 line-clamp-1">{art.title}</div>
                          <div className="text-xs text-gray-400">/{art.slug} · {art.readTime}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[art.category] ?? 'bg-gray-100 text-gray-600'}`}>
                        {art.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {art.published
                        ? <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Dipublikasi</span>
                        : <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Draft</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/artikel/${art.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-[#033F85]">Lihat →</Link>
                        <Link href={`/admin/artikel/${art.id}`} className="text-xs font-semibold text-[#033F85] hover:underline">Edit</Link>
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
