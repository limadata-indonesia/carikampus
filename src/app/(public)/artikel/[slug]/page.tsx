export const dynamic = 'force-dynamic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { db } from '@/lib/db'

const CATEGORY_COLORS: Record<string, string> = {
  'Tips Karier':  'bg-[#E8F0FB] text-[#033F85]',
  'Universitas':  'bg-amber-100 text-amber-700',
  'Tes Minat':    'bg-purple-100 text-purple-700',
  'SNBT':         'bg-green-100 text-green-700',
  'Biaya Kuliah': 'bg-red-100 text-red-700',
  'Karier':       'bg-teal-100 text-teal-700',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const article = await db.article.findUnique({ where: { slug }, select: { title: true, excerpt: true } })
    if (!article) return {}
    return { title: article.title, description: article.excerpt ?? undefined }
  } catch { return {} }
}

export default async function ArtikelDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let article: { id: string; title: string; slug: string; excerpt: string | null; content: string; category: string; emoji: string | null; readTime: string | null; publishedAt: Date | null } | null = null

  try {
    article = await db.article.findUnique({
      where: { slug, published: true },
      select: { id: true, title: true, slug: true, excerpt: true, content: true, category: true, emoji: true, readTime: true, publishedAt: true },
    })
  } catch {
    // DB not available yet
  }

  if (!article) notFound()

  const dateStr = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

  const paragraphs = article.content.split(/\n\n+/)

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/artikel" className="text-sm text-gray-400 hover:text-[#033F85] flex items-center gap-1 mb-6">← Semua artikel</Link>

      <div className="text-6xl mb-6 text-center">{article.emoji ?? '📝'}</div>

      <span className={`text-xs font-bold px-3 py-1 rounded-full ${CATEGORY_COLORS[article.category] ?? 'bg-gray-100 text-gray-600'}`}>
        {article.category}
      </span>

      <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2 leading-snug">{article.title}</h1>
      <div className="text-xs text-gray-400 mb-6">{dateStr}{dateStr && article.readTime ? ' · ' : ''}{article.readTime ? `${article.readTime} baca` : ''}</div>

      <div className="h-px bg-gray-200 mb-6" />

      <div className="space-y-4">
        {paragraphs.map((para, i) => {
          // Detect headings: lines starting with digit+dot or all-caps-like short lines
          const isHeading = /^\d+\.\s/.test(para) || (para.length < 80 && !para.includes('. ') && i > 0)
          if (isHeading && para.length < 100) {
            return (
              <h2 key={i} className="text-base font-bold text-gray-900 mt-6 mb-1">{para}</h2>
            )
          }
          return (
            <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
          )
        })}
      </div>

      <div className="h-px bg-gray-200 my-8" />

      <div className="bg-[#033F85] rounded-xl p-6 text-center">
        <h3 className="text-white font-bold mb-2">Temukan jurusan yang tepat untukmu</h3>
        <p className="text-white/70 text-sm mb-4">Ikuti tes minat bakat RIASEC dan dapatkan rekomendasi jurusan personal</p>
        <Link href="/tes-minat" className="inline-block bg-[#F4A900] text-[#033F85] text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#D99200]">
          Mulai Tes Minat
        </Link>
      </div>
    </div>
  )
}
