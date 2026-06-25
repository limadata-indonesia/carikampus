'use client'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

const INTERESTS = [
  { id: 'R', label: 'Realistik', desc: 'Teknik, mekanik, outdoor', emoji: '🔧' },
  { id: 'I', label: 'Investigatif', desc: 'Sains, riset, analisis', emoji: '🔬' },
  { id: 'A', label: 'Artistik', desc: 'Seni, desain, kreativitas', emoji: '🎨' },
  { id: 'S', label: 'Sosial', desc: 'Mengajar, membantu, komunikasi', emoji: '🤝' },
  { id: 'E', label: 'Enterprising', desc: 'Bisnis, kepemimpinan, wirausaha', emoji: '💼' },
  { id: 'C', label: 'Konvensional', desc: 'Administrasi, data, keuangan', emoji: '📊' },
]

export default function DaftarSiswaPage() {
  const [step, setStep] = useState(1)
  const [selected, setSelected] = useState<string[]>([])

  const toggleInterest = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${s <= step ? 'bg-[#033F85] text-white' : 'bg-gray-100 text-gray-400'}`}>{s}</div>
              {s < 3 && <div className={`h-0.5 w-8 ${s < step ? 'bg-[#033F85]' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Daftar sebagai siswa</h1>
            <p className="text-sm text-gray-400 mb-6">Buat akun untuk mulai mencari kampus</p>
            <button onClick={() => signIn('google', { callbackUrl: '/dashboard/siswa' })}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 mb-4">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Daftar dengan Google
            </button>
            <div className="relative mb-4"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"/></div><div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">atau dengan email</div></div>
            <div className="space-y-3">
              <input type="text" placeholder="Nama lengkap" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
              <input type="email" placeholder="Email" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
              <input type="password" placeholder="Password (min. 8 karakter)" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
              <button onClick={() => setStep(2)} className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E]">Lanjut →</button>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4">Sudah punya akun? <Link href="/masuk" className="text-[#033F85] font-semibold">Masuk</Link></p>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Minat kamu apa?</h1>
            <p className="text-sm text-gray-400 mb-4">Pilih yang paling cocok (boleh lebih dari satu)</p>
            <div className="grid grid-cols-2 gap-2 mb-6">
              {INTERESTS.map(({ id, label, desc, emoji }) => (
                <button key={id} onClick={() => toggleInterest(id)}
                  className={`p-3 rounded-xl border-2 text-left transition-all ${selected.includes(id) ? 'border-[#033F85] bg-[#E8F0FB]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="text-xl mb-1">{emoji}</div>
                  <div className="text-xs font-bold text-gray-900">{label}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{desc}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-600 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50">← Kembali</button>
              <button onClick={() => setStep(3)} className="flex-1 bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E]">Lanjut →</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-1">Info sekolah</h1>
            <p className="text-sm text-gray-400 mb-4">Opsional — membantu kami personalisasi rekomendasimu</p>
            <div className="space-y-3 mb-6">
              <input type="text" placeholder="NISN (opsional)" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
              <input type="text" placeholder="Nama sekolah" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85] text-gray-600">
                <option value="">Jenjang yang diminati</option>
                <option>S1 (Sarjana)</option>
                <option>D3 (Diploma 3)</option>
                <option>D4 (Diploma 4)</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-600 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-50">← Kembali</button>
              <button onClick={() => window.location.href = '/dashboard/siswa'} className="flex-1 bg-[#F4A900] text-[#033F85] text-sm font-bold py-2.5 rounded-lg hover:bg-[#D99200]">Selesai 🎉</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
