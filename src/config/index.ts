export const APP_CONFIG = {
  name: 'Cari Kampus Cari Kerja',
  shortName: 'CariKampus',
  domain: 'carikampus.id',
  description: 'Platform universitas dan karier terlengkap di Indonesia',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

export const BRAND = {
  primary:   '#033F85',
  primaryH:  '#022D5E',
  primaryD:  '#011E3F',
  primaryL:  '#E8F0FB',
  gold:      '#F4A900',
  goldH:     '#D99200',
  goldL:     '#FEF3D0',
  grey:      '#9BA2AB',
  greyLight: '#E3E6E6',
}

export const TEST_CONFIG = {
  sections: [
    { id: 'riasec',      name: 'Minat RIASEC',          questions: 54, minutes: 25 },
    { id: 'kognitif',    name: 'Kemampuan Kognitif',     questions: 40, minutes: 30 },
    { id: 'kepribadian', name: 'Kepribadian & Belajar',  questions: 30, minutes: 20 },
    { id: 'nilai',       name: 'Nilai & Preferensi',     questions: 20, minutes: 15 },
  ],
  totalQuestions: 144,
  totalMinutes: 90,
  autosaveDebounce: 500,
}

export const PRICING = {
  BASIC:  { amount: 49000,  label: 'Tes Dasar',    desc: 'RIASEC + 5 rekomendasi' },
  FULL:   { amount: 129000, label: 'Tes Lengkap',  desc: 'Full psikometri + PDF' },
  FAMILY: { amount: 299000, label: 'Paket Keluarga', desc: '3 akses + konsultasi' },
}

export const PROVINCES = [
  'Aceh', 'Sumatera Utara', 'Sumatera Barat', 'Riau', 'Kepulauan Riau',
  'Jambi', 'Bengkulu', 'Sumatera Selatan', 'Kepulauan Bangka Belitung',
  'Lampung', 'DKI Jakarta', 'Jawa Barat', 'Banten', 'Jawa Tengah',
  'DI Yogyakarta', 'Jawa Timur', 'Bali', 'Nusa Tenggara Barat',
  'Nusa Tenggara Timur', 'Kalimantan Barat', 'Kalimantan Tengah',
  'Kalimantan Selatan', 'Kalimantan Timur', 'Kalimantan Utara',
  'Sulawesi Utara', 'Gorontalo', 'Sulawesi Tengah', 'Sulawesi Barat',
  'Sulawesi Selatan', 'Sulawesi Tenggara', 'Maluku', 'Maluku Utara',
  'Papua Barat', 'Papua',
]
