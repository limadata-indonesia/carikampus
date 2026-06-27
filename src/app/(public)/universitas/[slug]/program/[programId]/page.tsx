export const dynamic = 'force-dynamic'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatRupiah } from '@/lib/utils'

export async function generateMetadata({ params }: { params: Promise<{ slug: string; programId: string }> }) {
  try {
    const { programId } = await params
    const prog = await db.program.findUnique({
      where: { id: programId },
      include: { faculty: { include: { university: true } } },
    })
    if (!prog) return {}
    return { title: `${prog.name} — ${prog.faculty.university.name}` }
  } catch { return {} }
}

const DEGREE_LABELS: Record<string, string> = {
  S1: 'Sarjana (S1)', S2: 'Magister (S2)', S3: 'Doktor (S3)',
  D3: 'Diploma 3 (D3)', D4: 'Sarjana Terapan (D4)',
}

const DEGREE_COLORS: Record<string, string> = {
  S1: 'bg-[#E8F0FB] text-[#033F85]',
  S2: 'bg-purple-100 text-purple-700',
  S3: 'bg-red-100 text-red-700',
  D3: 'bg-orange-100 text-orange-700',
  D4: 'bg-teal-100 text-teal-700',
}

const CAREER_SUGGESTIONS: Record<string, string[]> = {
  'Teknik Informatika':      ['Software Engineer', 'Data Scientist', 'DevOps Engineer', 'Product Manager', 'AI/ML Engineer'],
  'Sistem Informasi':        ['Business Analyst', 'IT Consultant', 'System Analyst', 'Project Manager', 'ERP Specialist'],
  'Ilmu Komputer':           ['Software Engineer', 'Researcher', 'Data Engineer', 'Cybersecurity Analyst', 'Game Developer'],
  'Manajemen':               ['Business Analyst', 'Marketing Manager', 'Entrepreneur', 'HR Manager', 'Operations Manager'],
  'Akuntansi':               ['Akuntan Publik', 'Auditor', 'Tax Consultant', 'CFO', 'Financial Analyst'],
  'Ilmu Hukum':              ['Pengacara', 'Hakim', 'Notaris', 'Legal Counsel', 'Konsultan Hukum'],
  'Pendidikan Dokter':       ['Dokter Umum', 'Dokter Spesialis', 'Peneliti Medis', 'Konsultan Kesehatan'],
  'Teknik Sipil':            ['Civil Engineer', 'Project Manager', 'Quantity Surveyor', 'Urban Planner'],
  'Teknik Mesin':            ['Mechanical Engineer', 'Manufacturing Engineer', 'R&D Engineer', 'Automotive Engineer'],
  'Teknik Elektro':          ['Electrical Engineer', 'Power Systems Engineer', 'Embedded Systems Developer'],
  'Desain Komunikasi Visual':['Graphic Designer', 'UI/UX Designer', 'Art Director', 'Brand Strategist'],
  'Agribisnis':              ['Agribusiness Manager', 'Farm Manager', 'Agricultural Consultant', 'Food Industry Manager'],
  'Agroteknologi':           ['Agronomist', 'Plant Researcher', 'Agricultural Engineer', 'Soil Scientist'],
  'Ilmu Komunikasi':         ['Jurnalis', 'Public Relations', 'Content Strategist', 'Media Planner'],
  'Sosiologi':               ['Peneliti Sosial', 'Policy Analyst', 'Community Developer', 'NGO Manager'],
  'Statistika':              ['Data Analyst', 'Statistician', 'Data Scientist', 'Research Analyst'],
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string; programId: string }> }) {
  const { slug, programId } = await params

  let program: any = null
  let dbError: string | null = null

  try {
    program = await db.program.findUnique({
      where: { id: programId },
      include: {
        faculty: {
          include: {
            university: {
              select: {
                id: true, name: true, slug: true, accreditation: true,
                city: true, province: true, type: true, registrationFee: true,
                website: true, email: true, phone: true,
              },
            },
          },
        },
      },
    })
  } catch (e) { dbError = String(e) }

  if (dbError) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-500 text-sm font-mono">{dbError}</p>
    </div>
  )

  if (!program || program.faculty.university.slug !== slug) notFound()

  const uni = program.faculty.university
  const careers = CAREER_SUGGESTIONS[program.name] ?? []

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-[#033F85]">Beranda</Link>
        <span>›</span>
        <Link href="/cari" className="hover:text-[#033F85]">Universitas</Link>
        <span>›</span>
        <Link href={`/universitas/${slug}`} className="hover:text-[#033F85]">{uni.name}</Link>
        <span>›</span>
        <span className="text-gray-600 font-medium">{program.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-5">

          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#E8F0FB] flex items-center justify-center text-2xl flex-shrink-0">📚</div>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-gray-900 mb-1">{program.name}</h1>
                <div className="flex gap-2 flex-wrap items-center text-xs text-gray-500 mb-3">
                  <span>{uni.name}</span>
                  <span>·</span>
                  <span>{program.faculty.name}</span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${DEGREE_COLORS[program.degree] ?? 'bg-gray-100 text-gray-600'}`}>
                    {DEGREE_LABELS[program.degree] ?? program.degree}
                  </span>
                  {program.accreditation && (
                    <span className="text-xs font-semibold bg-[#E6F4EC] text-green-700 px-2.5 py-1 rounded-full">
                      Akreditasi {program.accreditation}
                    </span>
                  )}
                  {program.duration && (
                    <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
                      {program.duration} tahun
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info grid */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-4">Informasi Program Studi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Jenjang', value: DEGREE_LABELS[program.degree] ?? program.degree },
                { label: 'Akreditasi', value: program.accreditation ? `BAN-PT ${program.accreditation}` : '—' },
                { label: 'Masa Studi', value: program.duration ? `${program.duration} tahun` : '—' },
                { label: 'Perguruan Tinggi', value: uni.type === 'NEGERI' ? 'Negeri' : 'Swasta' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-lg p-3 border-b-2 border-[#F4A900]">
                  <div className="text-xs text-gray-400 mb-1">{label}</div>
                  <div className="text-sm font-bold text-[#033F85]">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Career paths */}
          {careers.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h2 className="font-bold text-gray-900 mb-1">Prospek Karier</h2>
              <p className="text-xs text-gray-400 mb-4">Pilihan karier umum lulusan program ini</p>
              <div className="flex flex-wrap gap-2">
                {careers.map(c => (
                  <span key={c} className="text-sm bg-[#E8F0FB] text-[#033F85] font-medium px-3 py-1.5 rounded-full">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* What you'll learn */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-900 mb-3">Tentang Program Ini</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Program studi <strong>{program.name}</strong> di {uni.name} menawarkan pendidikan {DEGREE_LABELS[program.degree] ?? program.degree} selama {program.duration ?? '4'} tahun.
              Program ini berada di bawah {program.faculty.name} dan telah terakreditasi {program.accreditation ?? 'BAN-PT'} oleh Badan Akreditasi Nasional Perguruan Tinggi.
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mt-2">
              Lulusan program ini dipersiapkan untuk berkarier di berbagai sektor industri yang relevan dengan disiplin ilmu yang dipelajari selama masa studi.
            </p>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden sticky top-20">
            <div className="bg-[#033F85] border-b-[3px] border-[#F4A900] p-4">
              <h3 className="text-sm font-bold text-white">Daftar ke Program Ini</h3>
              <p className="text-xs text-white/60 mt-0.5">{uni.name}</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Biaya pendaftaran</span>
                <span className="font-bold text-gray-900">{formatRupiah(uni.registrationFee)}</span>
              </div>
              <div className="h-px bg-gray-100" />
              <div className="flex justify-between text-sm font-bold">
                <span>Total</span>
                <span className="text-[#033F85]">{formatRupiah(uni.registrationFee)}</span>
              </div>
              <Link
                href="/tes-minat"
                className="block w-full text-center bg-[#F4A900] text-[#033F85] text-sm font-bold py-2.5 rounded-lg hover:bg-[#D99200] transition-colors"
              >
                Daftar Sekarang
              </Link>
              <Link
                href={`/universitas/${slug}`}
                className="block w-full text-center border border-[#033F85] text-[#033F85] text-xs font-semibold py-2 rounded-lg hover:bg-[#E8F0FB] transition-colors"
              >
                ← Kembali ke Profil
              </Link>
            </div>
            {(uni.website || uni.email || uni.phone) && (
              <div className="px-4 pb-4 space-y-1.5 text-xs text-gray-400 border-t border-gray-100 pt-3">
                {uni.website && <div>🌐 {uni.website}</div>}
                {uni.email && <div>✉ {uni.email}</div>}
                {uni.phone && <div>📞 {uni.phone}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
