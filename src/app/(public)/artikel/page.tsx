import Link from 'next/link'

export const metadata = { title: 'Artikel', description: 'Tips memilih kampus, jurusan, dan karier terbaik untukmu' }

const SAMPLE_ARTICLES = [
  { slug: 'cara-memilih-jurusan', title: 'Cara Memilih Jurusan yang Tepat Sesuai Minat Bakat', excerpt: 'Memilih jurusan kuliah adalah salah satu keputusan terpenting dalam hidupmu. Simak panduan lengkapnya di sini.', category: 'Tips Karier', date: '20 Jun 2025', readTime: '5 menit', emoji: '🎯' },
  { slug: 'universitas-terbaik-indonesia', title: '10 Universitas Terbaik di Indonesia 2025 Versi QS Ranking', excerpt: 'QS World University Rankings 2025 telah dirilis. Berikut 10 universitas Indonesia dengan ranking terbaik.', category: 'Universitas', date: '15 Jun 2025', readTime: '7 menit', emoji: '🏆' },
  { slug: 'tes-minat-riasec', title: 'Apa Itu Tes RIASEC dan Mengapa Penting Untuk Siswa SMA?', excerpt: 'Tes RIASEC adalah alat psikometri yang membantu siswa menemukan jurusan kuliah yang sesuai dengan kepribadian mereka.', category: 'Tes Minat', date: '10 Jun 2025', readTime: '4 menit', emoji: '🧠' },
  { slug: 'tips-snbt-2025', title: 'Tips Lolos SNBT 2025: Strategi Belajar dari Mahasiswa Baru UI', excerpt: 'Mahasiswa baru Universitas Indonesia berbagi strategi belajar yang terbukti membantu mereka lolos SNBT 2025.', category: 'SNBT', date: '5 Jun 2025', readTime: '6 menit', emoji: '📚' },
  { slug: 'biaya-kuliah-swasta', title: 'Perbandingan Biaya Kuliah PTN vs PTS di Jakarta 2025', excerpt: 'Berapa biaya kuliah di universitas negeri vs swasta Jakarta? Kami bandingkan UKT, biaya awal, dan biaya per semester.', category: 'Biaya Kuliah', date: '1 Jun 2025', readTime: '8 menit', emoji: '💰' },
  { slug: 'jurusan-prospek-kerja', title: '10 Jurusan dengan Prospek Kerja Terbaik di Era AI 2025', excerpt: 'Era kecerdasan buatan mengubah lanskap karier. Jurusan apa yang paling menjanjikan di 5-10 tahun ke depan?', category: 'Karier', date: '25 Mei 2025', readTime: '9 menit', emoji: '🚀' },
]

const CATEGORIES = ['Semua', 'Tips Karier', 'Universitas', 'Tes Minat', 'SNBT', 'Biaya Kuliah', 'Karier']

export default function ArtikelPage() {
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

        {/* Featured article */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6 hover:shadow-md transition-shadow">
          <div className="bg-[#E8F0FB] border-b-[3px] border-[#F4A900] h-40 flex items-center justify-center text-6xl">🎯</div>
          <div className="p-6">
            <span className="text-xs font-bold bg-[#E8F0FB] text-[#033F85] px-2 py-0.5 rounded-full">Tips Karier</span>
            <h2 className="text-xl font-bold text-gray-900 mt-3 mb-2">{SAMPLE_ARTICLES[0].title}</h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{SAMPLE_ARTICLES[0].excerpt}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{SAMPLE_ARTICLES[0].date} · {SAMPLE_ARTICLES[0].readTime} baca</span>
              <Link href={`/artikel/${SAMPLE_ARTICLES[0].slug}`} className="text-sm font-bold text-[#033F85] hover:underline">Baca selengkapnya →</Link>
            </div>
          </div>
        </div>

        {/* Article grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {SAMPLE_ARTICLES.slice(1).map((article) => (
            <div key={article.slug} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-sm hover:border-[#B8CCE8] transition-all">
              <div className="h-24 flex items-center justify-center text-4xl border-b-[3px] border-[#F4A900]" style={{ background: '#F4F5F6' }}>{article.emoji}</div>
              <div className="p-4">
                <span className="text-xs font-bold bg-[#E8F0FB] text-[#033F85] px-2 py-0.5 rounded-full">{article.category}</span>
                <h3 className="font-bold text-gray-900 text-sm mt-2 mb-1 leading-snug">{article.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">{article.date} · {article.readTime}</span>
                  <Link href={`/artikel/${article.slug}`} className="text-xs font-bold text-[#033F85] hover:underline">Baca →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
