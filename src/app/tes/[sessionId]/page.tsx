'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { TEST_CONFIG } from '@/config'

const SAMPLE_QUESTIONS = [
  { id: 1, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Memperbaiki peralatan elektronik atau mesin', category: 'R' },
  { id: 2, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Melakukan eksperimen ilmiah di laboratorium', category: 'I' },
  { id: 3, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Melukis, menggambar, atau membuat desain', category: 'A' },
  { id: 4, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Membantu teman yang sedang kesulitan', category: 'S' },
  { id: 5, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Memimpin sebuah proyek atau tim', category: 'E' },
  { id: 6, section: 'riasec', type: 'option', text: 'Seberapa suka kamu dengan kegiatan berikut?', item: 'Mencatat dan mengorganisir data dengan rapi', category: 'C' },
]

const LIKERT = ['Sangat Tidak Suka', 'Tidak Suka', 'Netral', 'Suka', 'Sangat Suka']

export default function TestPage() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(90 * 60)
  const [paused, setPaused] = useState(false)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (paused || finished) return
    const timer = setInterval(() => setTimeLeft(t => t <= 0 ? 0 : t - 1), 1000)
    return () => clearInterval(timer)
  }, [paused, finished])

  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`

  const handleAnswer = (val: number) => {
    const newAnswers = { ...answers, [SAMPLE_QUESTIONS[currentQ].id]: val }
    setAnswers(newAnswers)
    if (currentQ < SAMPLE_QUESTIONS.length - 1) {
      setTimeout(() => setCurrentQ(q => q + 1), 300)
    }
  }

  const progress = Math.round((Object.keys(answers).length / TEST_CONFIG.totalQuestions) * 100)
  const q = SAMPLE_QUESTIONS[Math.min(currentQ, SAMPLE_QUESTIONS.length - 1)]

  if (finished || Object.keys(answers).length === SAMPLE_QUESTIONS.length) {
    return (
      <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 max-w-md w-full text-center shadow-sm">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tes selesai!</h1>
          <p className="text-gray-400 text-sm mb-6">Hasilmu sedang diproses. Kamu akan melihat rekomendasi jurusan dan universitas terbaik.</p>
          <div className="bg-[#E8F0FB] rounded-xl p-4 mb-6 text-left">
            <div className="text-xs font-bold text-[#033F85] mb-2">Ringkasan tes:</div>
            <div className="text-xs text-gray-600 space-y-1">
              <div>✓ Inventori RIASEC — selesai</div>
              <div className="text-gray-300">○ Tes kognitif — tersedia di paket lengkap</div>
              <div className="text-gray-300">○ Kepribadian — tersedia di paket lengkap</div>
            </div>
          </div>
          <Link href="/dashboard/siswa/tes" className="block w-full bg-[#033F85] text-white text-sm font-bold py-3 rounded-xl hover:bg-[#022D5E] mb-3">Lihat Hasil Tes →</Link>
          <Link href="/" className="block w-full text-sm text-gray-400 hover:text-gray-600">Kembali ke beranda</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4F5F6]">
      {/* Header */}
      <div className="bg-[#033F85] border-b-[3px] border-[#F4A900] px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="text-white font-bold text-sm">Tes Minat Bakat</div>
          <span className="text-white/40 text-xs">|</span>
          <span className="text-white/70 text-xs">{q.section === 'riasec' ? 'Inventori RIASEC' : 'Tes Kognitif'}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className={`font-mono text-sm font-bold ${timeLeft < 300 ? 'text-red-400' : 'text-[#F4A900]'}`}>⏱ {formatTime(timeLeft)}</div>
          <button onClick={() => setPaused(!paused)} className="text-white/70 text-xs border border-white/30 px-3 py-1 rounded-lg hover:bg-white/10">
            {paused ? '▶ Lanjut' : '⏸ Jeda'}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-2">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Soal {currentQ + 1} dari {TEST_CONFIG.totalQuestions}</span>
            <span>{progress}% selesai</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full"><div className="h-full bg-[#033F85] rounded-full transition-all" style={{ width: `${progress}%` }}/></div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-2xl mx-auto px-6 py-10">
        {paused ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">⏸</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Tes dijeda</h2>
            <p className="text-gray-400 text-sm mb-6">Jawaban kamu tersimpan otomatis. Lanjutkan kapanpun siap.</p>
            <button onClick={() => setPaused(false)} className="bg-[#033F85] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#022D5E]">Lanjutkan Tes</button>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="inline-block bg-[#E8F0FB] text-[#033F85] text-xs font-bold px-3 py-1 rounded-full mb-4">Soal {currentQ + 1}</div>
              <p className="text-gray-500 text-sm mb-2">{q.text}</p>
              <h2 className="text-xl font-bold text-gray-900">{q.item}</h2>
            </div>

            <div className="space-y-3">
              {LIKERT.map((label, i) => (
                <button key={i} onClick={() => handleAnswer(i + 1)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left hover:border-[#033F85] hover:bg-[#E8F0FB] ${answers[q.id] === i + 1 ? 'border-[#033F85] bg-[#E8F0FB]' : 'border-gray-200 bg-white'}`}>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold flex-shrink-0 ${answers[q.id] === i + 1 ? 'border-[#033F85] bg-[#033F85] text-white' : 'border-gray-300 text-gray-400'}`}>{i + 1}</div>
                  <span className={`text-sm font-medium ${answers[q.id] === i + 1 ? 'text-[#033F85]' : 'text-gray-700'}`}>{label}</span>
                </button>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} disabled={currentQ === 0}
                className="text-sm text-gray-400 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-30">← Sebelumnya</button>
              <button onClick={() => { if (currentQ < SAMPLE_QUESTIONS.length - 1) setCurrentQ(q => q + 1); else setFinished(true) }}
                className="text-sm font-bold bg-[#033F85] text-white px-5 py-2 rounded-lg hover:bg-[#022D5E]">
                {currentQ === SAMPLE_QUESTIONS.length - 1 ? 'Selesai →' : 'Lewati →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
