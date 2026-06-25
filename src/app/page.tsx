import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { PROVINCES } from '@/config'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative bg-[#033F85] pb-10 pt-14 text-center overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4A900]" />
          <div className="max-w-3xl mx-auto px-6">
            <div className="inline-block bg-[#F4A900] text-[#033F85] text-xs font-bold px-4 py-1 rounded-full mb-5 uppercase tracking-wide">
              Platform #1 Universitas Indonesia
            </div>
            <h1 className="text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
              Temukan kampus &amp; karier<br />
              <span className="text-[#F4A900]">yang tepat untukmu</span>
            </h1>
            <p className="text-white/80 text-base mb-8 max-w-md mx-auto">
              Direktori universitas terlengkap, tes minat bakat psikometri, dan jalur karier — satu platform untuk masa depanmu.
            </p>

            {/* Search */}
            <div className="flex max-w-xl mx-auto bg-white rounded-lg overflow-hidden shadow-2xl mb-8">
              <input
                type="text"
                placeholder="Cari universitas, jurusan, atau kota..."
                className="flex-1 px-4 py-3.5 text-sm text-gray-800 outline-none"
              />
              <select className="border-l border-gray-200 px-3 py-3.5 text-sm text-gray-500 bg-white outline-none">
                <option>Semua provinsi</option>
                {PROVINCES.map(p => <option key={p}>{p}</option>)}
              </select>
              <Link
                href="/cari"
                className="bg-[#F4A900] text-[#033F85] px-5 py-3.5 text-sm font-bold hover:bg-[#D99200] transition-colors whitespace-nowrap"
              >
                Cari
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-10 pt-6 border-t border-white/15">
              {[
                { val: '500+', lbl: 'Universitas' },
                { val: '3.200+', lbl: 'Program Studi' },
                { val: '34', lbl: 'Provinsi' },
                { val: '48k+', lbl: 'Mahasiswa Terbantu' },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="text-center">
                  <div className="text-2xl font-bold text-[#F4A900]">{val}</div>
                  <div className="text-xs text-white/60 uppercase tracking-wide mt-1">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Cara Kerjanya</h2>
            <div className="w-8 h-0.5 bg-[#F4A900] mt-1 rounded" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: '🔍', title: 'Cari & Filter', desc: 'Temukan universitas berdasarkan lokasi, jurusan, akreditasi, dan fasilitas di seluruh 34 provinsi Indonesia.', color: 'bg-[#E8F0FB]', href: '/cari' },
              { icon: '🧠', title: 'Tes Minat Bakat', desc: '144 soal psikometri berbasis RIASEC. Hasilnya langsung rekomendasikan jurusan dan kampus yang paling cocok.', color: 'bg-[#FEF3D0]', href: '/tes-minat' },
              { icon: '📝', title: 'Daftar & Bayar', desc: 'Submit pendaftaran dan bayar biaya registrasi langsung — GoPay, QRIS, Virtual Account bank tersedia.', color: 'bg-[#E6F4EC]', href: '/masuk' },
            ].map(({ icon, title, desc, color, href }) => (
              <Link key={title} href={href} className="bg-white rounded-xl border border-gray-200 p-6 border-t-[3px] border-t-[#033F85] hover:shadow-md transition-shadow">
                <div className={`w-11 h-11 ${color} rounded-lg flex items-center justify-center text-2xl mb-4`}>{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Unis */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Universitas Unggulan</h2>
              <div className="w-8 h-0.5 bg-[#F4A900] mt-1 rounded" />
            </div>
            <Link href="/cari" className="text-sm font-semibold text-[#033F85]">Lihat semua →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {[
              { name: 'Universitas Indonesia', city: 'Depok, Jawa Barat', tags: ['Teknik', 'Kedokteran', 'Hukum'], rating: '4.8', reviews: '2.1k', icon: '🎓', bg: 'bg-[#E8F0FB]' },
              { name: 'Bina Nusantara University', city: 'Jakarta Barat', tags: ['IT', 'Bisnis', 'Desain'], rating: '4.6', reviews: '1.8k', icon: '🏛', bg: 'bg-[#E6F4EC]' },
              { name: 'Institut Teknologi Bandung', city: 'Bandung, Jawa Barat', tags: ['Sains', 'Teknik', 'Arsitektur'], rating: '4.9', reviews: '3.4k', icon: '⚗️', bg: 'bg-[#FEF3D0]' },
            ].map((uni) => (
              <Link key={uni.name} href="/cari" className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:-translate-y-0.5 hover:shadow-lg hover:border-[#B8CCE8] transition-all">
                <div className={`h-20 ${uni.bg} border-b-[3px] border-[#F4A900] flex items-center justify-center text-3xl`}>{uni.icon}</div>
                <div className="p-4">
                  <div className="font-bold text-gray-900 text-sm mb-1">{uni.name}</div>
                  <div className="text-xs text-gray-400 mb-3">📍 {uni.city}</div>
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {uni.tags.map(t => <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">⭐ {uni.rating} ({uni.reviews})</span>
                    <span className="text-xs font-semibold bg-[#E8F0FB] text-[#033F85] px-2 py-0.5 rounded-full">Akreditasi A</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-[#033F85] rounded-xl p-7">
              <h3 className="text-[#F4A900] font-bold text-base mb-2">Daftarkan Universitas Kamu</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5">Jangkau ribuan calon mahasiswa di seluruh Indonesia. Buat profil, kelola program studi, dan terima pendaftaran langsung.</p>
              <Link href="/daftar/universitas" className="inline-block text-sm font-semibold text-white border border-white/40 px-4 py-2 rounded-md hover:bg-white/10 transition-colors">
                Daftar Universitas →
              </Link>
            </div>
            <div className="bg-[#011E3F] rounded-xl p-7">
              <h3 className="text-[#F4A900] font-bold text-base mb-2">Program Sekolah — Akses Gratis</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-5">Kode akses batch gratis untuk sekolah mitra. Tes minat bakat untuk siswa kelas 12 sebagai persiapan kuliah.</p>
              <Link href="/tes-minat" className="inline-block text-sm font-bold bg-[#F4A900] text-[#033F85] px-4 py-2 rounded-md hover:bg-[#D99200] transition-colors">
                Info Program Sekolah →
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
