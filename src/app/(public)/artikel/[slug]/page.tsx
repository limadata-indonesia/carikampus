import Link from 'next/link'

const ARTICLES: Record<string, { title: string; category: string; date: string; readTime: string; emoji: string; content: string }> = {
  'cara-memilih-jurusan': {
    title: 'Cara Memilih Jurusan yang Tepat Sesuai Minat Bakat',
    category: 'Tips Karier', date: '20 Jun 2025', readTime: '5 menit', emoji: '🎯',
    content: `Memilih jurusan kuliah adalah salah satu keputusan terpenting dalam hidupmu. Keputusan ini akan memengaruhi karier, lingkungan sosial, dan kepuasan hidupmu selama bertahun-tahun ke depan.\n\n1. Kenali minat dan bakatmu\n\nLangkah pertama adalah memahami dirimu sendiri. Apa yang kamu sukai? Bidang apa yang membuatmu bersemangat? Tes minat bakat RIASEC dapat membantu mengidentifikasi pola minat secara ilmiah.\n\n2. Pertimbangkan prospek karier\n\nPilih jurusan yang memiliki prospek kerja baik di masa depan. Di era AI dan digitalisasi, jurusan berbasis teknologi, data, dan bisnis digital memiliki demand yang tinggi.\n\n3. Cek kurikulum dan fasilitas\n\nSebelum memutuskan, pelajari kurikulum jurusan yang kamu minati. Apakah mata kuliahnya sesuai ekspektasi? Bagaimana fasilitas labnya?\n\n4. Konsultasi dengan alumni\n\nBicara dengan mahasiswa atau alumni jurusan yang kamu minati. Mereka bisa memberikan gambaran nyata tentang kehidupan perkuliahan dan prospek karier.\n\n5. Gunakan tes minat bakat\n\nPlatform Cari Kampus Cari Kerja menyediakan tes psikometri berbasis RIASEC yang membantu menemukan jurusan paling sesuai dengan kepribadian dan bakatmu.`
  },
  'tes-minat-riasec': {
    title: 'Apa Itu Tes RIASEC dan Mengapa Penting Untuk Siswa SMA?',
    category: 'Tes Minat', date: '10 Jun 2025', readTime: '4 menit', emoji: '🧠',
    content: `RIASEC adalah model psikologis yang dikembangkan oleh John Holland untuk mengelompokkan minat karier ke dalam 6 tipe kepribadian.\n\nMengapa tes RIASEC penting?\n\nTes RIASEC membantu siswa SMA memahami kecenderungan minat dan kepribadian mereka sebelum memilih jurusan kuliah.\n\n6 Tipe RIASEC:\n\nR (Realistic): Menyukai kegiatan fisik dan teknis. Cocok untuk teknik atau mekanik.\n\nI (Investigative): Senang menganalisis dan memecahkan masalah. Cocok untuk sains atau riset.\n\nA (Artistic): Kreatif dan ekspresif. Cocok untuk desain atau komunikasi.\n\nS (Social): Suka berinteraksi dan membantu orang lain. Cocok untuk pendidikan atau psikologi.\n\nE (Enterprising): Jiwa pemimpin. Cocok untuk bisnis atau manajemen.\n\nC (Conventional): Terstruktur dan detail-oriented. Cocok untuk akuntansi atau IT.`
  },
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug]
  if (!article) return {}
  return { title: article.title }
}

export default function ArtikelDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTICLES[params.slug]

  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">📄</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Artikel tidak ditemukan</h1>
        <Link href="/artikel" className="text-[#033F85] font-semibold hover:underline">← Kembali ke artikel</Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link href="/artikel" className="text-sm text-gray-400 hover:text-[#033F85] flex items-center gap-1 mb-6">← Semua artikel</Link>
      <div className="text-6xl mb-6 text-center">{article.emoji}</div>
      <span className="text-xs font-bold bg-[#E8F0FB] text-[#033F85] px-3 py-1 rounded-full">{article.category}</span>
      <h1 className="text-2xl font-bold text-gray-900 mt-3 mb-2 leading-snug">{article.title}</h1>
      <div className="text-xs text-gray-400 mb-6">{article.date} · {article.readTime} baca</div>
      <div className="h-px bg-gray-200 mb-6" />
      <div className="space-y-4">
        {article.content.split('\n\n').map((para, i) => (
          <p key={i} className="text-sm text-gray-600 leading-relaxed">{para}</p>
        ))}
      </div>
      <div className="h-px bg-gray-200 my-8" />
      <div className="bg-[#033F85] rounded-xl p-6 text-center">
        <h3 className="text-white font-bold mb-2">Temukan jurusan yang tepat untukmu</h3>
        <p className="text-white/70 text-sm mb-4">Ikuti tes minat bakat RIASEC dan dapatkan rekomendasi jurusan personal</p>
        <Link href="/tes-minat" className="inline-block bg-[#F4A900] text-[#033F85] text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#D99200]">Mulai Tes Minat</Link>
      </div>
    </div>
  )
}
