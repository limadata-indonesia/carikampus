'use client'
import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { TEST_CONFIG } from '@/config'

// ── 54 RIASEC questions ────────────────────────────────────────────────────
const RIASEC_QUESTIONS = [
  { id: 1,  cat: 'R', item: 'Memperbaiki peralatan elektronik atau mesin' },
  { id: 2,  cat: 'R', item: 'Bekerja di luar ruangan dengan tangan' },
  { id: 3,  cat: 'R', item: 'Mengoperasikan alat berat atau kendaraan' },
  { id: 4,  cat: 'R', item: 'Membangun atau merakit sesuatu dari nol' },
  { id: 5,  cat: 'R', item: 'Berkebun, bertani, atau bekerja dengan hewan' },
  { id: 6,  cat: 'R', item: 'Mempelajari cara kerja mesin atau sistem mekanik' },
  { id: 7,  cat: 'R', item: 'Melakukan pekerjaan fisik yang membutuhkan keterampilan tangan' },
  { id: 8,  cat: 'R', item: 'Bekerja di laboratorium atau bengkel teknik' },
  { id: 9,  cat: 'R', item: 'Merancang atau memodifikasi perangkat fisik' },
  { id: 10, cat: 'I', item: 'Melakukan eksperimen ilmiah di laboratorium' },
  { id: 11, cat: 'I', item: 'Membaca jurnal atau buku ilmiah' },
  { id: 12, cat: 'I', item: 'Menganalisis data dan mencari pola' },
  { id: 13, cat: 'I', item: 'Memecahkan teka-teki atau masalah matematika yang kompleks' },
  { id: 14, cat: 'I', item: 'Meneliti topik yang belum banyak diketahui orang' },
  { id: 15, cat: 'I', item: 'Menggunakan logika untuk menguji hipotesis' },
  { id: 16, cat: 'I', item: 'Belajar tentang sains, teknologi, atau filsafat' },
  { id: 17, cat: 'I', item: 'Mengembangkan teori atau model baru' },
  { id: 18, cat: 'I', item: 'Bekerja di bidang riset atau pengembangan' },
  { id: 19, cat: 'A', item: 'Melukis, menggambar, atau membuat desain grafis' },
  { id: 20, cat: 'A', item: 'Menulis cerita, puisi, atau konten kreatif' },
  { id: 21, cat: 'A', item: 'Bermain musik atau menyanyi' },
  { id: 22, cat: 'A', item: 'Mendesain interior ruangan atau tampilan visual' },
  { id: 23, cat: 'A', item: 'Membuat film, fotografi, atau konten video' },
  { id: 24, cat: 'A', item: 'Mengekspresikan diri melalui seni pertunjukan' },
  { id: 25, cat: 'A', item: 'Membuat kerajinan tangan atau produk kreatif' },
  { id: 26, cat: 'A', item: 'Bekerja di industri fashion atau styling' },
  { id: 27, cat: 'A', item: 'Menciptakan sesuatu yang orisinal dan inovatif' },
  { id: 28, cat: 'S', item: 'Membantu teman atau keluarga yang sedang kesulitan' },
  { id: 29, cat: 'S', item: 'Mengajar atau melatih orang lain' },
  { id: 30, cat: 'S', item: 'Bekerja sebagai konselor atau pendamping' },
  { id: 31, cat: 'S', item: 'Berpartisipasi dalam kegiatan sosial atau komunitas' },
  { id: 32, cat: 'S', item: 'Mendengarkan dan memberikan saran kepada orang lain' },
  { id: 33, cat: 'S', item: 'Bekerja di rumah sakit, sekolah, atau LSM' },
  { id: 34, cat: 'S', item: 'Merawat orang sakit atau lansia' },
  { id: 35, cat: 'S', item: 'Memediasi konflik antar individu atau kelompok' },
  { id: 36, cat: 'S', item: 'Mengorganisir kegiatan yang melibatkan banyak orang' },
  { id: 37, cat: 'E', item: 'Memimpin sebuah proyek atau tim' },
  { id: 38, cat: 'E', item: 'Melakukan negosiasi atau persuasi' },
  { id: 39, cat: 'E', item: 'Memulai bisnis atau usaha baru' },
  { id: 40, cat: 'E', item: 'Berpidato atau presentasi di depan umum' },
  { id: 41, cat: 'E', item: 'Menjual produk atau layanan' },
  { id: 42, cat: 'E', item: 'Mengambil keputusan strategis yang berisiko' },
  { id: 43, cat: 'E', item: 'Bersaing dalam kontes atau kompetisi' },
  { id: 44, cat: 'E', item: 'Mengelola anggaran atau keuangan proyek' },
  { id: 45, cat: 'E', item: 'Meyakinkan orang lain untuk mengikuti ideamu' },
  { id: 46, cat: 'C', item: 'Mencatat dan mengorganisir data dengan rapi' },
  { id: 47, cat: 'C', item: 'Bekerja dengan spreadsheet atau laporan keuangan' },
  { id: 48, cat: 'C', item: 'Mengikuti prosedur dan aturan dengan teliti' },
  { id: 49, cat: 'C', item: 'Menjaga arsip atau sistem dokumentasi' },
  { id: 50, cat: 'C', item: 'Bekerja di lingkungan yang terstruktur dan terprediksi' },
  { id: 51, cat: 'C', item: 'Menghitung, mengaudit, atau memeriksa akurasi data' },
  { id: 52, cat: 'C', item: 'Membuat jadwal atau rencana yang detail' },
  { id: 53, cat: 'C', item: 'Bekerja di bidang administrasi atau akuntansi' },
  { id: 54, cat: 'C', item: 'Memastikan kepatuhan terhadap regulasi atau standar' },
]

const COGNITIVE_QUESTIONS = [
  { id: 55, item: 'Angka berikutnya dalam pola 2, 4, 8, 16, __ adalah?', options: ['24', '32', '28', '20'], answer: 1 },
  { id: 56, item: 'Huruf berikutnya: A, C, E, G, __ adalah?', options: ['H', 'I', 'J', 'K'], answer: 1 },
  { id: 57, item: 'Jika semua A adalah B, dan semua B adalah C, maka semua A adalah?', options: ['C', 'Bukan C', 'Mungkin C', 'Tidak dapat ditentukan'], answer: 0 },
  { id: 58, item: 'Berapakah 15% dari 200?', options: ['25', '30', '35', '20'], answer: 1 },
  { id: 59, item: 'Pola: 1, 1, 2, 3, 5, 8, __ ?', options: ['11', '12', '13', '15'], answer: 2 },
  { id: 60, item: 'Kata yang berlawanan dengan "progresif" adalah?', options: ['Modern', 'Konservatif', 'Liberal', 'Dinamis'], answer: 1 },
  { id: 61, item: 'Jika x + 5 = 12, maka x = ?', options: ['5', '6', '7', '8'], answer: 2 },
  { id: 62, item: 'Hari ini Senin. 100 hari lagi adalah hari apa?', options: ['Selasa', 'Rabu', 'Kamis', 'Jumat'], answer: 2 },
  { id: 63, item: 'Pola: 3, 6, 12, 24, __ ?', options: ['36', '48', '42', '30'], answer: 1 },
  { id: 64, item: 'Sinonim dari "kompeten" adalah?', options: ['Lemah', 'Mampu', 'Bingung', 'Ragu'], answer: 1 },
  { id: 65, item: 'Berapa luas persegi dengan sisi 7 cm?', options: ['28 cm²', '42 cm²', '49 cm²', '14 cm²'], answer: 2 },
  { id: 66, item: 'Mana yang TIDAK termasuk buah tropis?', options: ['Mangga', 'Apel', 'Durian', 'Nangka'], answer: 1 },
  { id: 67, item: 'Pola: 100, 90, 81, 73, __ ?', options: ['65', '66', '67', '64'], answer: 1 },
  { id: 68, item: 'Antonim dari "efisien" adalah?', options: ['Cepat', 'Produktif', 'Boros', 'Hemat'], answer: 2 },
  { id: 69, item: 'Rata-rata dari 10, 20, 30, 40, 50 adalah?', options: ['25', '30', '35', '40'], answer: 1 },
  { id: 70, item: 'Jika A > B dan B > C, maka A __ C?', options: ['<', '=', '>', 'Tidak dapat ditentukan'], answer: 2 },
  { id: 71, item: 'Pola: Z, X, V, T, __ ?', options: ['R', 'S', 'Q', 'P'], answer: 0 },
  { id: 72, item: 'Berapakah 3/4 dari 80?', options: ['50', '55', '60', '65'], answer: 2 },
  { id: 73, item: 'Kata yang paling tepat untuk "tidak pasti / sementara"?', options: ['Pasti', 'Definitif', 'Tentatif', 'Konkret'], answer: 2 },
  { id: 74, item: 'Sebuah mobil berjalan 60 km/jam selama 2,5 jam. Berapa jaraknya?', options: ['120 km', '130 km', '150 km', '160 km'], answer: 2 },
  { id: 75, item: 'Pola: 2, 5, 10, 17, 26, __ ?', options: ['35', '36', '37', '38'], answer: 2 },
  { id: 76, item: 'Berapa persen 45 dari 180?', options: ['20%', '25%', '30%', '35%'], answer: 1 },
  { id: 77, item: 'Antonim dari "ambigu" adalah?', options: ['Samar', 'Jelas', 'Kabur', 'Membingungkan'], answer: 1 },
  { id: 78, item: 'Mana yang merupakan bilangan prima?', options: ['9', '15', '17', '21'], answer: 2 },
  { id: 79, item: 'Pola: 1, 4, 9, 16, 25, __ ?', options: ['30', '34', '36', '49'], answer: 2 },
  { id: 80, item: 'Jika 2x - 3 = 11, maka x = ?', options: ['5', '6', '7', '8'], answer: 2 },
  { id: 81, item: 'Sinonim dari "konsisten" adalah?', options: ['Berubah-ubah', 'Tetap', 'Acak', 'Fleksibel'], answer: 1 },
  { id: 82, item: 'Dalam 1 tahun ada 12 bulan. Bulan ke-8 adalah?', options: ['Juli', 'Agustus', 'September', 'Oktober'], answer: 1 },
  { id: 83, item: 'Pola: 5, 10, 20, 40, __ ?', options: ['60', '70', '80', '100'], answer: 2 },
  { id: 84, item: 'Volume kubus dengan sisi 4 cm adalah?', options: ['16 cm³', '48 cm³', '64 cm³', '32 cm³'], answer: 2 },
  { id: 85, item: 'Jika sebuah baju diskon 30% dari Rp 200.000, harga setelah diskon?', options: ['Rp 120.000', 'Rp 130.000', 'Rp 140.000', 'Rp 150.000'], answer: 2 },
  { id: 86, item: 'Jika semua guru pandai, dan Bu Ani adalah guru, maka Bu Ani?', options: ['Mungkin pandai', 'Pasti pandai', 'Tidak pandai', 'Tidak dapat disimpulkan'], answer: 1 },
  { id: 87, item: 'Berapa hasil dari 12 × 13?', options: ['144', '152', '156', '160'], answer: 2 },
  { id: 88, item: 'Pola: A1, B2, C3, D4, __ ?', options: ['E4', 'E5', 'F5', 'D5'], answer: 1 },
  { id: 89, item: 'Antonim dari "sentralisasi" adalah?', options: ['Desentralisasi', 'Monopoli', 'Konsolidasi', 'Integrasi'], answer: 0 },
  { id: 90, item: 'Berapa keliling lingkaran dengan jari-jari 7 cm (π=22/7)?', options: ['22 cm', '44 cm', '88 cm', '154 cm'], answer: 1 },
  { id: 91, item: 'Mana yang termasuk energi terbarukan?', options: ['Batu bara', 'Minyak bumi', 'Gas alam', 'Tenaga surya'], answer: 3 },
  { id: 92, item: 'Pola: 7, 14, 21, 28, __ ?', options: ['32', '35', '38', '42'], answer: 1 },
  { id: 93, item: 'Sinonim dari "inovatif" adalah?', options: ['Konservatif', 'Kreatif', 'Tradisional', 'Statis'], answer: 1 },
  { id: 94, item: 'Volume balok 5cm × 4cm × 3cm adalah?', options: ['47 cm³', '55 cm³', '60 cm³', '72 cm³'], answer: 2 },
]

const PERSONALITY_QUESTIONS = [
  { id: 95,  item: 'Saya lebih suka bekerja sendiri daripada dalam tim' },
  { id: 96,  item: 'Saya mudah beradaptasi dengan perubahan mendadak' },
  { id: 97,  item: 'Saya sering merencanakan segala sesuatu secara detail' },
  { id: 98,  item: 'Saya merasa energi meningkat saat berinteraksi dengan banyak orang' },
  { id: 99,  item: 'Saya lebih memilih fakta daripada intuisi dalam mengambil keputusan' },
  { id: 100, item: 'Saya cenderung menyelesaikan tugas jauh sebelum tenggat waktu' },
  { id: 101, item: 'Saya menikmati situasi yang tidak terduga dan penuh kejutan' },
  { id: 102, item: 'Saya lebih mudah belajar dengan membaca atau menonton video' },
  { id: 103, item: 'Saya mudah berempati dengan perasaan orang lain' },
  { id: 104, item: 'Saya suka mencoba metode baru daripada cara yang sudah terbukti' },
  { id: 105, item: 'Saya merasa nyaman menjadi pusat perhatian' },
  { id: 106, item: 'Saya lebih suka pekerjaan yang memiliki rutinitas yang jelas' },
  { id: 107, item: 'Saya cepat dalam membuat keputusan' },
  { id: 108, item: 'Saya lebih suka berdiskusi daripada membaca untuk memahami sesuatu' },
  { id: 109, item: 'Saya mudah merasa bosan dengan pekerjaan yang berulang' },
  { id: 110, item: 'Saya mementingkan harmoni dalam hubungan sosial' },
  { id: 111, item: 'Saya cenderung perfeksionis dalam pekerjaan saya' },
  { id: 112, item: 'Saya lebih suka belajar dengan mencoba langsung (hands-on)' },
  { id: 113, item: 'Saya dapat fokus dalam waktu lama tanpa gangguan' },
  { id: 114, item: 'Saya senang mengambil peran kepemimpinan dalam kelompok' },
  { id: 115, item: 'Saya lebih suka bekerja dengan data dan angka daripada orang' },
  { id: 116, item: 'Saya mudah terpengaruh oleh perasaan saat mengambil keputusan' },
  { id: 117, item: 'Saya menikmati debat dan diskusi intelektual' },
  { id: 118, item: 'Saya lebih suka proyek jangka panjang daripada tugas singkat' },
  { id: 119, item: 'Saya mudah bergaul dengan orang yang baru dikenal' },
  { id: 120, item: 'Saya cenderung menganalisis masalah sebelum bertindak' },
  { id: 121, item: 'Saya menikmati membantu orang lain berkembang' },
  { id: 122, item: 'Saya lebih suka lingkungan kerja yang fleksibel' },
  { id: 123, item: 'Saya mudah termotivasi oleh penghargaan dan pengakuan' },
  { id: 124, item: 'Saya suka mencatat dan mendokumentasikan pekerjaan saya' },
]

const VALUES_QUESTIONS = [
  { id: 125, item: 'Gaji tinggi lebih penting dari kepuasan kerja' },
  { id: 126, item: 'Saya ingin pekerjaan yang memberikan dampak sosial nyata' },
  { id: 127, item: 'Keseimbangan hidup dan kerja adalah prioritas utama saya' },
  { id: 128, item: 'Saya ingin terus belajar dan berkembang dalam karier' },
  { id: 129, item: 'Prestige dan status sosial pekerjaan sangat penting bagi saya' },
  { id: 130, item: 'Saya lebih suka bekerja di perusahaan besar daripada startup' },
  { id: 131, item: 'Kebebasan berkreasi lebih penting dari stabilitas gaji' },
  { id: 132, item: 'Saya ingin pekerjaan yang memungkinkan saya sering bepergian' },
  { id: 133, item: 'Keamanan kerja jangka panjang adalah hal terpenting' },
  { id: 134, item: 'Saya ingin jadi wirausahawan, bukan karyawan' },
  { id: 135, item: 'Bekerja di bidang yang saya cintai lebih penting dari gaji besar' },
  { id: 136, item: 'Saya ingin pekerjaan yang memberi dampak pada lingkungan' },
  { id: 137, item: 'Kompetisi di tempat kerja membuat saya lebih produktif' },
  { id: 138, item: 'Saya ingin bekerja dengan teknologi terbaru' },
  { id: 139, item: 'Lokasi kerja yang dekat dengan keluarga sangat penting' },
  { id: 140, item: 'Saya bersedia bekerja keras jika ada peluang naik jabatan cepat' },
  { id: 141, item: 'Budaya perusahaan yang positif lebih penting dari kompensasi' },
  { id: 142, item: 'Saya ingin pekerjaan yang memungkinkan remote work' },
  { id: 143, item: 'Saya ingin membuat perbedaan di bidang pendidikan atau kesehatan' },
  { id: 144, item: 'Saya siap pindah kota atau negara untuk karier yang lebih baik' },
]

const SECTIONS = [
  { id: 'riasec',      label: 'Inventori RIASEC',          questions: RIASEC_QUESTIONS,      type: 'likert' as const },
  { id: 'kognitif',    label: 'Kemampuan Kognitif',         questions: COGNITIVE_QUESTIONS,   type: 'mcq'    as const },
  { id: 'kepribadian', label: 'Kepribadian & Gaya Belajar', questions: PERSONALITY_QUESTIONS, type: 'likert' as const },
  { id: 'nilai',       label: 'Nilai & Preferensi',         questions: VALUES_QUESTIONS,      type: 'likert' as const },
]

const LIKERT = ['Sangat Tidak Setuju', 'Tidak Setuju', 'Netral', 'Setuju', 'Sangat Setuju']

export default function TestPage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const [sectionIdx, setSectionIdx] = useState(0)
  const [qIdx, setQIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(90 * 60)
  const [paused, setPaused] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [finished, setFinished] = useState(false)

  const section = SECTIONS[sectionIdx]
  const questions = section.questions
  const q = questions[qIdx]
  const totalAnswered = Object.keys(answers).length
  const progress = Math.round((totalAnswered / TEST_CONFIG.totalQuestions) * 100)

  useEffect(() => {
    if (paused || finished) return
    const t = setInterval(() => setTimeLeft(s => (s <= 1 ? 0 : s - 1)), 1000)
    return () => clearInterval(t)
  }, [paused, finished])

  const save = useCallback(async (updatedAnswers: Record<number, number>) => {
    await fetch('/api/test/session', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, section: sectionIdx, answers: updatedAnswers }),
    }).catch(() => {})
  }, [sessionId, sectionIdx])

  const handleFinish = useCallback(async (finalAnswers: Record<number, number>) => {
    setSubmitting(true)
    await fetch('/api/test/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, answers: finalAnswers }),
    }).catch(() => {})
    setFinished(true)
    setSubmitting(false)
  }, [sessionId])

  const handleAnswer = useCallback((val: number) => {
    const newAnswers = { ...answers, [q.id]: val }
    setAnswers(newAnswers)
    if (Object.keys(newAnswers).length % 10 === 0) save(newAnswers)
    setTimeout(() => {
      if (qIdx < questions.length - 1) {
        setQIdx(i => i + 1)
      } else if (sectionIdx < SECTIONS.length - 1) {
        setSectionIdx(i => i + 1)
        setQIdx(0)
      } else {
        handleFinish(newAnswers)
      }
    }, 250)
  }, [answers, q, qIdx, questions, sectionIdx, save, handleFinish])

  const formatTime = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  if (finished || submitting) {
    return (
      <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center shadow-sm">
          {submitting ? (
            <>
              <div className="w-12 h-12 border-4 border-[#033F85] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h1 className="text-xl font-bold text-gray-900">Menyimpan hasil...</h1>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Tes selesai!</h1>
              <p className="text-gray-400 text-sm mb-6">Hasilmu sedang diproses. Rekomendasi jurusan dan universitas akan segera tersedia.</p>
              <Link href="/dashboard/siswa/tes" className="block w-full bg-[#033F85] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#022D5E] mb-3">
                Lihat Hasil Tes &rarr;
              </Link>
              <Link href="/" className="block w-full text-sm text-gray-400 hover:text-gray-600">
                Kembali ke beranda
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F5F6]">
      {/* Header */}
      <div className="bg-[#033F85] border-b-[3px] border-[#F4A900] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-white font-bold text-sm">Tes Minat Bakat</span>
          <span className="text-white/40">|</span>
          <span className="text-white/70 text-xs">{section.label}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className={`font-mono text-sm font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-[#F4A900]'}`}>
            &#9201; {formatTime(timeLeft)}
          </span>
          <button onClick={() => setPaused(p => !p)} className="text-white/70 text-xs border border-white/30 px-3 py-1 rounded-lg hover:bg-white/10">
            {paused ? '&#9654; Lanjut' : '&#9208; Jeda'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Soal {totalAnswered + 1} dari {TEST_CONFIG.totalQuestions}</span>
            <span>{progress}% selesai</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full">
            <div className="h-full bg-[#033F85] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {SECTIONS.map((s, i) => (
              <span key={s.id} className={`text-xs px-2 py-0.5 rounded-full font-medium ${i === sectionIdx ? 'bg-[#033F85] text-white' : i < sectionIdx ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                {i < sectionIdx ? '✓ ' : ''}{s.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        {paused ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">&#9208;</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tes dijeda</h2>
            <p className="text-gray-400 text-sm mb-6">Jawaban kamu tersimpan otomatis. Lanjutkan kapanpun siap.</p>
            <button onClick={() => setPaused(false)} className="bg-[#033F85] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#022D5E]">
              Lanjutkan Tes
            </button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-block bg-[#E8F0FB] text-[#033F85] text-xs font-bold px-3 py-1 rounded-full mb-4">
                {section.label} &middot; Soal {qIdx + 1}/{questions.length}
              </div>
              <p className="text-gray-500 text-sm mb-3">
                {section.type === 'likert' ? 'Seberapa setuju kamu dengan pernyataan berikut?' : 'Pilih jawaban yang paling tepat'}
              </p>
              <h2 className="text-xl font-bold text-gray-900 leading-snug">{q.item}</h2>
            </div>

            <div className="space-y-3">
              {section.type === 'likert'
                ? LIKERT.map((label, i) => (
                    <button key={i} onClick={() => handleAnswer(i + 1)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left hover:border-[#033F85] hover:bg-[#E8F0FB] ${answers[q.id] === i + 1 ? 'border-[#033F85] bg-[#E8F0FB]' : 'border-gray-200 bg-white'}`}>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${answers[q.id] === i + 1 ? 'border-[#033F85] bg-[#033F85] text-white' : 'border-gray-300 text-gray-400'}`}>{i + 1}</div>
                      <span className={`text-sm font-medium ${answers[q.id] === i + 1 ? 'text-[#033F85]' : 'text-gray-700'}`}>{label}</span>
                    </button>
                  ))
                : (q as any).options?.map((opt: string, i: number) => (
                    <button key={i} onClick={() => handleAnswer(i)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left hover:border-[#033F85] hover:bg-[#E8F0FB] ${answers[q.id] === i ? 'border-[#033F85] bg-[#E8F0FB]' : 'border-gray-200 bg-white'}`}>
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${answers[q.id] === i ? 'border-[#033F85] bg-[#033F85] text-white' : 'border-gray-300 text-gray-400'}`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className={`text-sm font-medium ${answers[q.id] === i ? 'text-[#033F85]' : 'text-gray-700'}`}>{opt}</span>
                    </button>
                  ))}
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => {
                  if (qIdx > 0) setQIdx(i => i - 1)
                  else if (sectionIdx > 0) { setSectionIdx(i => i - 1); setQIdx(SECTIONS[sectionIdx - 1].questions.length - 1) }
                }}
                disabled={sectionIdx === 0 && qIdx === 0}
                className="text-sm text-gray-400 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-30">
                &larr; Sebelumnya
              </button>
              {answers[q.id] !== undefined && (
                <button
                  onClick={() => {
                    if (qIdx < questions.length - 1) setQIdx(i => i + 1)
                    else if (sectionIdx < SECTIONS.length - 1) { setSectionIdx(i => i + 1); setQIdx(0) }
                    else handleFinish(answers)
                  }}
                  className="text-sm font-bold bg-[#033F85] text-white px-5 py-2 rounded-lg hover:bg-[#022D5E]">
                  {sectionIdx === SECTIONS.length - 1 && qIdx === questions.length - 1 ? 'Selesai →' : 'Selanjutnya →'}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
