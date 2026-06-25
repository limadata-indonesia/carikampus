import Link from 'next/link'
import { PRICING, TEST_CONFIG } from '@/config'
import { formatRupiah } from '@/lib/utils'

export const metadata = { title: 'Tes Minat Bakat', description: '144 soal psikometri RIASEC + kognitif. Temukan jurusan dan universitas terbaik untukmu.' }

export default function TesMinatPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#033F85] py-10 text-center relative">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F4A900]" />
        <div className="max-w-2xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-3">Tes Minat &amp; Bakat</h1>
          <p className="text-white/80 text-sm mb-6">144 soal psikometri RIASEC + tes kognitif. Hasilnya merekomendasikan jurusan dan universitas yang paling cocok untukmu.</p>
          <div className="flex justify-center gap-8">
            {[
              { val: TEST_CONFIG.totalQuestions, lbl: 'Soal' },
              { val: `~${TEST_CONFIG.totalMinutes}`, lbl: 'Menit' },
              { val: TEST_CONFIG.sections.length, lbl: 'Bagian' },
              { val: 'Auto', lbl: 'Save' },
            ].map(({ val, lbl }) => (
              <div key={lbl} className="text-center">
                <div className="text-xl font-bold text-[#F4A900]">{val}</div>
                <div className="text-xs text-white/60 uppercase tracking-wide mt-1">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* School code */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex items-center gap-4 mb-8 border-l-4 border-l-[#F4A900]">
          <div className="text-2xl">🎟</div>
          <div className="flex-1">
            <div className="font-bold text-gray-900 text-sm mb-0.5">Punya kode akses dari sekolah?</div>
            <div className="text-xs text-gray-400">Masukkan kode yang diberikan guru BK kamu untuk akses tes gratis.</div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <input type="text" placeholder="SMAN1JKT-2025-X9K4" className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#033F85] w-52"/>
            <button className="bg-[#033F85] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#022D5E] transition-colors">Gunakan</button>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mb-6">— atau beli akses individual —</p>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {(Object.entries(PRICING) as [string, typeof PRICING.BASIC][]).map(([key, pkg]) => (
            <div key={key} className={`bg-white rounded-xl p-6 relative ${key === 'FULL' ? 'border-2 border-[#033F85] shadow-lg' : 'border border-gray-200'}`}>
              {key === 'FULL' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F4A900] text-[#033F85] text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">Paling Populer</div>
              )}
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">{pkg.label}</div>
              <div className="text-3xl font-bold text-[#033F85] mb-1">{formatRupiah(pkg.amount)}<span className="text-xs font-normal text-gray-400">/akses</span></div>
              <div className="text-xs text-gray-400 mb-4">{pkg.desc}</div>
              <Link
                href="/masuk"
                className={`block w-full text-center text-sm font-bold py-2.5 rounded-lg transition-colors ${key === 'FULL' ? 'bg-[#F4A900] text-[#033F85] hover:bg-[#D99200]' : 'border-2 border-[#033F85] text-[#033F85] hover:bg-[#E8F0FB]'}`}
              >
                Mulai Sekarang
              </Link>
            </div>
          ))}
        </div>

        {/* Sections breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="font-bold text-gray-900 mb-4">Bagian dalam tes</h2>
          <div className="space-y-3">
            {TEST_CONFIG.sections.map((s, i) => (
              <div key={s.id} className="flex items-center gap-4 p-3 rounded-lg bg-gray-50">
                <div className="w-7 h-7 rounded-full bg-[#033F85] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{s.name}</div>
                  <div className="text-xs text-gray-400">{s.questions} soal · ~{s.minutes} menit</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
