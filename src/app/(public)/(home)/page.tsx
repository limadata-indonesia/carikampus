export const dynamic = "force-dynamic"
import Link from 'next/link'
import { PROVINCES } from '@/config'
import { db } from '@/lib/db'

async function getStats() {
  const [unis, students] = await Promise.allSettled([
    db.university.count({ where: { status: 'APPROVED' } }),
    db.student.count(),
  ])
  return {
    universities: unis.status === 'fulfilled' ? unis.value : 500,
    students:     students.status === 'fulfilled' ? students.value : 48000,
  }
}

export default async function HomePage() {
  const stats = await getStats()

  return (
    <>
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
              { val: `${stats.universities}+`, lbl: 'Universitas' },
              { val: '3.200+', lbl: 'Program Studi' },
              { val: '34', lbl: 'Provinsi' },
              { val: `${(stats.students / 1000).toFixed(0)}k+`, lbl: 'Mahasiswa Terbantu' },
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
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Cara Kerjanya</h2>
            <div className="w-8 h-0.5 bg-[#F4A900] mt-1 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: '🔍', title: 'Cari & Filter', desc: 'Temukan universitas berdasarkan lokasi, jurusan, akreditasi, dan fasilitas di seluruh 34 provinsi Indonesia.', color: 'bg-[#E8F0FB]' },
            { icon: '🧠', title: 'Tes Minat Bakat', desc: '144 soal psikometri berbasis RIASEC. Hasilnya langsung rekomendasikan jurusan dan kampus yang paling cocok.', color: 'bg-[#FEF3D0]' },
            { icon: '📝', title: 'Daftar & Bayar', desc: 'Submit pendaftaran dan bayar biaya registrasi langsung — GoPay, QRIS, Virtual Account bank tersedia.', color: 'bg-[#E6F4EC]' },
          ].map(({ icon, title, desc, color }) => (
            <div key={title} className="bg-white rounded-xl border border-gray-200 p-6 border-t-[3px] border-t-[#033F85]">
              <div className={`w-11 h-11 ${color} rounded-lg flex items-center justify-center text-2xl mb-4`}>{icon}</div>
              <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
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
    </>
  )
}
