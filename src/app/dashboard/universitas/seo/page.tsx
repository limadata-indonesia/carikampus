export const dynamic = 'force-dynamic'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/layout/DashboardSidebar'
import DashboardShell from '@/components/layout/DashboardShell'

const SIDEBAR_ITEMS = [
  { href: '/dashboard/universitas', label: 'Dashboard', icon: '📊' },
  { href: '/dashboard/universitas/profil', label: 'Edit Profil', icon: '🏛' },
  { href: '/dashboard/universitas/program', label: 'Program Studi', icon: '📚' },
  { href: '/dashboard/universitas/statistik', label: 'Statistik', icon: '📈' },
  { href: '/dashboard/universitas/seo', label: 'SEO & GEO', icon: '🔍' },
  { href: '/dashboard/universitas/blog', label: 'Blog', icon: '✍️' },
]

export default async function SeoGeoPage() {
  const session = await auth()
  if (!session) redirect('/masuk')

  return (
    <DashboardShell sidebar={<DashboardSidebar title="Dashboard Universitas" subtitle="Admin Universitas" avatarText="UN" items={SIDEBAR_ITEMS}/>}>
      <div className="p-6 max-w-3xl">
        <h1 className="text-xl font-bold text-gray-900 mb-1">SEO & GEO</h1>
        <p className="text-sm text-gray-400 mb-6">Optimalkan visibilitas di Google dan AI (ChatGPT, Gemini, AI Overview)</p>

        <div className="space-y-5">
          {/* SEO Score */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900 text-sm">Skor Visibilitas</h2>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { score: 0, label: 'SEO Score', color: '#033F85', max: 100 },
                { score: 0, label: 'GEO / AI Score', color: '#F4A900', max: 100 },
                { score: 0, label: 'Keterbacaan', color: '#1A7F3C', max: 100 },
              ].map(({ score, label, color }) => (
                <div key={label} className="text-center">
                  <div className="w-16 h-16 rounded-full border-4 flex items-center justify-center mx-auto mb-2 text-xl font-bold" style={{ borderColor: color, color }}>
                    {score}
                  </div>
                  <div className="text-xs font-semibold text-gray-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta SEO */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 text-sm mb-4">Meta SEO</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-500">Meta title</label>
                  <span className="text-xs text-gray-400">0 / 60 karakter</span>
                </div>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Nama Universitas | Program Studi Terbaik di Indonesia"/>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-gray-500">Meta description</label>
                  <span className="text-xs text-gray-400">0 / 160 karakter</span>
                </div>
                <textarea rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="Deskripsi singkat universitas untuk Google..."/>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Kata kunci fokus</label>
                <input type="text" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="teknik informatika Jakarta"/>
              </div>
            </div>
            {/* SERP Preview */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="text-xs text-gray-400 mb-2 font-semibold">Preview Google SERP</div>
              <div className="text-[#1a0dab] text-sm font-medium">Nama Universitas | Program Studi Terbaik</div>
              <div className="text-xs text-green-700">carikampus.id/universitas/nama-universitas</div>
              <div className="text-xs text-gray-600 mt-1">Deskripsi universitas akan muncul di sini sebagai meta description Google...</div>
            </div>
          </div>

          {/* GEO */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 text-sm mb-1">GEO — Optimasi AI</h2>
            <p className="text-xs text-gray-400 mb-4">Teks ini digunakan AI seperti ChatGPT dan Gemini saat menjawab pertanyaan tentang universitas kamu</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Deskripsi untuk AI</label>
                <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]" placeholder="[Nama Universitas] adalah universitas [tipe] yang berlokasi di [kota], Indonesia. Berdiri sejak [tahun], universitas ini menawarkan program studi di bidang [bidang utama]..."/>
              </div>
            </div>
          </div>

          <button className="bg-[#033F85] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#022D5E]">Simpan Pengaturan SEO</button>
        </div>
      </div>
    </DashboardShell>
  )
}
