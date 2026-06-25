'use client'
import { useState } from 'react'
import Link from 'next/link'

const STEPS = ['Informasi dasar', 'Verifikasi email', 'Dokumen legal', 'Selesai']

export default function DaftarUniversitasPage() {
  const [step, setStep] = useState(0)
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  return (
    <div className="w-full max-w-lg">
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Step header */}
        <div className="bg-[#033F85] px-6 py-4 border-b-[3px] border-[#F4A900]">
          <div className="flex items-center gap-2 mb-3">
            {STEPS.map((s, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i <= step ? 'bg-[#F4A900] text-[#033F85]' : 'bg-white/20 text-white/50'}`}>{i + 1}</div>
                {i < STEPS.length - 1 && <div className={`h-px w-6 ${i < step ? 'bg-[#F4A900]' : 'bg-white/20'}`} />}
              </div>
            ))}
          </div>
          <div className="text-white font-bold text-sm">{STEPS[step]}</div>
        </div>

        <div className="p-6">
          {step === 0 && (
            <>
              <p className="text-sm text-gray-400 mb-5">Daftarkan universitas kamu dan jangkau ribuan calon mahasiswa.</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Nama universitas *</label>
                  <input type="text" placeholder="Universitas Contoh Indonesia" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Tipe *</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85] text-gray-700">
                      <option value="NEGERI">Negeri</option>
                      <option value="PRIVATE">Swasta</option>
                      <option value="KEAGAMAAN">Keagamaan</option>
                      <option value="KEDINASAN">Kedinasan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Akreditasi</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85] text-gray-700">
                      <option>A (Unggul)</option>
                      <option>B (Baik Sekali)</option>
                      <option>C (Baik)</option>
                      <option>Proses</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Provinsi *</label>
                    <input type="text" placeholder="DKI Jakarta" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Kota *</label>
                    <input type="text" placeholder="Jakarta Selatan" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Email resmi universitas *</label>
                  <input type="email" placeholder="admin@universitas.ac.id" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
                  <p className="text-xs text-gray-400 mt-1">Harus menggunakan domain .ac.id untuk verifikasi otomatis</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Password *</label>
                  <input type="password" placeholder="Min. 8 karakter" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#033F85]"/>
                </div>
              </div>
              <button onClick={() => setStep(1)} className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E] mt-5">Lanjut ke verifikasi →</button>
              <p className="text-xs text-center text-gray-400 mt-3">Sudah terdaftar? <Link href="/masuk" className="text-[#033F85] font-semibold">Masuk</Link></p>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-sm text-gray-500 mb-2">Kode OTP 6 digit dikirim ke <strong>admin@universitas.ac.id</strong></p>
              <p className="text-xs text-gray-400 mb-6">Cek inbox dan folder spam. Berlaku 10 menit.</p>
              <div className="flex gap-2 justify-center mb-6">
                {otp.map((val, i) => (
                  <input key={i} type="text" maxLength={1} value={val}
                    onChange={e => { const n = [...otp]; n[i] = e.target.value; setOtp(n); if (e.target.value && i < 5) (document.querySelectorAll('.otp-input')[i + 1] as HTMLInputElement)?.focus() }}
                    className="otp-input w-11 h-11 border-2 border-gray-300 rounded-lg text-center text-lg font-bold outline-none focus:border-[#033F85]"/>
                ))}
              </div>
              <button onClick={() => setStep(2)} className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E]">Verifikasi OTP →</button>
              <button className="w-full text-center text-xs text-gray-400 mt-3 hover:text-[#033F85]">Kirim ulang kode</button>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-sm text-gray-500 mb-5">Upload dokumen legalitas universitas untuk diverifikasi admin kami.</p>
              <div className="space-y-4">
                {[
                  { label: 'SK Pendirian (Kemendikbud/Kemenag) *', hint: 'PDF, maks. 10MB' },
                  { label: 'Sertifikat Akreditasi BAN-PT *', hint: 'PDF, maks. 10MB' },
                  { label: 'Logo universitas *', hint: 'PNG/JPG, min. 200×200px' },
                ].map(({ label, hint }) => (
                  <div key={label}>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">{label}</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#033F85] cursor-pointer transition-colors">
                      <div className="text-2xl mb-1">📎</div>
                      <div className="text-xs text-gray-400">{hint}</div>
                      <div className="text-xs text-[#033F85] font-semibold mt-1">Klik untuk upload</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(3)} className="w-full bg-[#033F85] text-white text-sm font-bold py-2.5 rounded-lg hover:bg-[#022D5E] mt-5">Kirim untuk review →</button>
            </>
          )}

          {step === 3 && (
            <div className="text-center py-4">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Pendaftaran terkirim!</h2>
              <p className="text-sm text-gray-500 mb-6">Tim kami akan memverifikasi dokumen kamu dalam <strong>1-3 hari kerja</strong>. Kamu akan mendapat notifikasi via email.</p>
              <div className="bg-[#E8F0FB] rounded-xl p-4 text-left mb-5">
                <div className="text-xs font-bold text-[#033F85] mb-2">Yang terjadi selanjutnya:</div>
                {['Admin memverifikasi dokumen', 'Email konfirmasi dikirim', 'Akun aktif dan profil live'].map((s, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600 mb-1">
                    <div className="w-5 h-5 rounded-full bg-[#033F85] text-white flex items-center justify-center font-bold flex-shrink-0">{i + 1}</div>
                    {s}
                  </div>
                ))}
              </div>
              <Link href="/" className="inline-block bg-[#F4A900] text-[#033F85] text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#D99200]">Kembali ke beranda</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
