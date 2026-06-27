export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { db } from '@/lib/db'

export const metadata = { title: 'Artikel', description: 'Tips memilih kampus, jurusan, dan karier terbaik untukmu' }

const CATEGORIES = ['Semua', 'Tips Karier', 'Universitas', 'Tes Minat', 'SNBT', 'Biaya Kuliah', 'Karier']

const CATEGORY_COLORS: Record<string, string> = {
  'Tips Karier':  'bg-[#E8F0FB] text-[#033F85]',
  'Universitas':  'bg-amber-100 text-amber-700',
  'Tes Minat':    'bg-purple-100 text-purple-700',
  'SNBT':         'bg-green-100 text-green-700',
  'Biaya Kuliah': 'bg-red-100 text-red-700',
  'Karier':       'bg-teal-100 text-teal-700',
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default async function ArtikelPage() {
  let articles: { id: string; title: string; slug: string; excerpt: string | null; category: string; publishedAt: Date | null; readTime: string | null; emoji: string | null }[] = []
  try {
    articles = await db.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      select: { id: true, title: true, slug: true, excerpt: true, category: true, publishedAt: true, readTime: true, emoji: true },
    })
  } catch {
    // table not yet created — fall back to empty
  }

  const featured = articles[0]
  const rest = articles.slice(1)

  return (
    <>
      <div className="bg-[#033F85] py-10 relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4A900]" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-white mb-3">Artikel & Panduan</h1>
          <p className="text-white/70 text-sm">Tips memilih kampus, jurusan, dan karier terbaik untukmu</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Categories */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map((cat, i) => (
            <button key={cat} className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${i === 0 ? 'bg-[#033F85] text-white border-[#033F85]' : 'border-gray-300 text-gray-600 hover:border-[#033F85] hover:text-[#033F85]'}`}>
              {cat}
            </button>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-500">Belum ada artikel yang dipublikasikan.</p>
          </div>
        )}

        {/* Featured article */}
        {featured && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 hover:shadow-md transition-shadow">
            <div className="bg-[#E8F0FB] border-b-[3px] border-[#F4A900] h-40 flex items-center justify-center text-6xl">
              {featured.emoji ?? '📝'}
            </div>
            <div className="p-6">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-gray-100 text-gray-600'}`}>
                {featured.category}
              </span>
              <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2">{featured.title}</h2>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {featured.publishedAt ? formatDate(featured.publishedAt) : ''} · {featured.readTime} baca
                </span>
                <Link href={`/artikel/${featured.slug}`} className="text-sm font-bold text-[#033F85] hover:underline">Baca selengkapnya →</Link>
              </div>
            </div>
          </div>
        )}

        {/* Article grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {rest.map(article => (
              <div key={article.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm hover:border-[#B8CCE8] transition-all">
                <div className="h-24 flex items-center justify-center text-4xl border-b-[3px] border-[#F4A900]" style={{ background: '#F4F5F6' }}>
                  {article.emoji ?? '📝'}
                </div>
                <div className="p-4">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
                    {article.category}
                  </span>
                  <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1 leading-snug">{article.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">
                      {article.publishedAt ? formatDate(article.publishedAt) : ''} · {article.readTime}
                    </span>
                    <Link href={`/artikel/${article.slug}`} className="text-xs font-bold text-[#033F85] hover:underline">Baca →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
