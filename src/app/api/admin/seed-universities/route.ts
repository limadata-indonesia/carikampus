import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { db } from '@/lib/db'

const UNIVERSITIES = [
  {
    name: 'Universitas Bina Nusantara',
    slug: 'binus-university',
    type: 'PRIVATE' as const,
    accreditation: 'Unggul',
    province: 'DKI Jakarta', city: 'Jakarta Barat',
    address: 'Jl. K.H. Syahdan No.9, Kemanggisan, Jakarta Barat',
    phone: '021-5345830', email: 'info@binus.ac.id', website: 'https://binus.ac.id',
    description: 'Universitas swasta terkemuka di Indonesia dengan keunggulan di bidang teknologi, bisnis, dan seni. Binus dikenal sebagai salah satu kampus terbaik untuk program IT dan manajemen.',
    founded: 1974, totalStudents: 47000, totalFaculties: 8, qsRanking: 801,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'School of Computer Science', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'Unggul', duration: 4 },
        { name: 'Sistem Informasi', degree: 'S1', accreditation: 'Unggul', duration: 4 },
        { name: 'Ilmu Komputer', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'School of Business Management', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'Unggul', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'School of Design', programs: [
        { name: 'Desain Komunikasi Visual', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Desain Interior', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Pelita Harapan',
    slug: 'universitas-pelita-harapan',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Banten', city: 'Tangerang',
    address: 'Jl. M.H. Thamrin Boulevard 1100, Lippo Village, Tangerang',
    phone: '021-5460901', email: 'info@uph.edu', website: 'https://uph.edu',
    description: 'UPH adalah universitas Kristen dengan standar internasional, menawarkan program berkualitas tinggi dalam hukum, kedokteran, teknik, bisnis, dan ilmu sosial.',
    founded: 1994, totalStudents: 12000, totalFaculties: 9, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Bisnis', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Komputer', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Sistem Informasi', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Trisakti',
    slug: 'universitas-trisakti',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DKI Jakarta', city: 'Jakarta Barat',
    address: 'Jl. Kyai Tapa No.1, Grogol, Jakarta Barat',
    phone: '021-5663232', email: 'humas@trisakti.ac.id', website: 'https://trisakti.ac.id',
    description: 'Universitas Trisakti adalah kampus swasta bersejarah yang kuat di bidang teknik, hukum, ekonomi, dan arsitektur. Dikenal dengan semangat nasionalismenya.',
    founded: 1965, totalStudents: 28000, totalFaculties: 10, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik Sipil & Perencanaan', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Arsitektur', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Lingkungan', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Ekonomi dan Bisnis', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ekonomi Pembangunan', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Atma Jaya Jakarta',
    slug: 'universitas-atma-jaya-jakarta',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DKI Jakarta', city: 'Jakarta Selatan',
    address: 'Jl. Jend. Sudirman No.51, Karet Semanggi, Jakarta Selatan',
    phone: '021-5703306', email: 'info@atmajaya.ac.id', website: 'https://atmajaya.ac.id',
    description: 'UAJ merupakan universitas Katolik terkemuka dengan reputasi kuat di bidang teknik, hukum, ekonomi, dan psikologi. Fokus pada pengembangan karakter dan integritas.',
    founded: 1960, totalStudents: 15000, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Mesin', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Psikologi', programs: [
        { name: 'Psikologi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Tarumanagara',
    slug: 'universitas-tarumanagara',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DKI Jakarta', city: 'Jakarta Barat',
    address: 'Jl. S. Parman No.1, Grogol, Jakarta Barat',
    phone: '021-5672548', email: 'info@tarumanagara.ac.id', website: 'https://untar.ac.id',
    description: 'Untar adalah salah satu universitas swasta tertua dan terbesar di Jakarta, unggul dalam arsitektur, hukum, psikologi, dan ilmu komunikasi.',
    founded: 1959, totalStudents: 22000, totalFaculties: 9, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Arsitektur', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Elektro', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Psikologi', programs: [
        { name: 'Psikologi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Komunikasi', programs: [
        { name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Mercu Buana',
    slug: 'universitas-mercu-buana',
    type: 'PRIVATE' as const,
    accreditation: 'B',
    province: 'DKI Jakarta', city: 'Jakarta Barat',
    address: 'Jl. Meruya Selatan No.1, Kembangan, Jakarta Barat',
    phone: '021-5840816', email: 'info@mercubuana.ac.id', website: 'https://mercubuana.ac.id',
    description: 'UMB dikenal dengan program teknik, desain, dan komunikasi yang terjangkau namun berkualitas, dengan kampus yang lengkap di Jakarta Barat.',
    founded: 1985, totalStudents: 30000, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Komunikasi', programs: [
        { name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Hubungan Masyarakat', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Islam Indonesia',
    slug: 'universitas-islam-indonesia',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DI Yogyakarta', city: 'Yogyakarta',
    address: 'Jl. Kaliurang Km 14,5, Sleman, Yogyakarta',
    phone: '0274-898444', email: 'info@uii.ac.id', website: 'https://uii.ac.id',
    description: 'UII adalah universitas Islam swasta tertua di Indonesia, dengan keunggulan di bidang hukum, ekonomi, teknik, dan ilmu sosial. Berlokasi strategis di Yogyakarta.',
    founded: 1945, totalStudents: 25000, totalFaculties: 10, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Ekonomi', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ekonomi Islam', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknik Industri', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Muhammadiyah Yogyakarta',
    slug: 'universitas-muhammadiyah-yogyakarta',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DI Yogyakarta', city: 'Bantul',
    address: 'Jl. Brawijaya, Kasihan, Bantul, Yogyakarta',
    phone: '0274-387656', email: 'info@umy.ac.id', website: 'https://umy.ac.id',
    description: 'UMY adalah perguruan tinggi Muhammadiyah unggulan dengan visi internasional. Dikenal dengan program hubungan internasional, kedokteran, dan teknik yang kompetitif.',
    founded: 1981, totalStudents: 18000, totalFaculties: 8, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Ilmu Sosial dan Ilmu Politik', programs: [
        { name: 'Hubungan Internasional', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ilmu Pemerintahan', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Elektro', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Sanata Dharma',
    slug: 'universitas-sanata-dharma',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DI Yogyakarta', city: 'Yogyakarta',
    address: 'Jl. Affandi (Gejayan), Mrican, Sleman, Yogyakarta',
    phone: '0274-513301', email: 'info@usd.ac.id', website: 'https://usd.ac.id',
    description: 'USD adalah universitas Jesuit terkemuka di Yogyakarta dengan tradisi pendidikan humanis yang kuat. Unggul di bidang pendidikan, psikologi, farmasi, dan sastra.',
    founded: 1955, totalStudents: 9000, totalFaculties: 8, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Psikologi', programs: [
        { name: 'Psikologi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Keguruan dan Ilmu Pendidikan', programs: [
        { name: 'Pendidikan Matematika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Pendidikan Bahasa Inggris', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Farmasi', programs: [
        { name: 'Farmasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Telkom',
    slug: 'universitas-telkom',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Barat', city: 'Bandung',
    address: 'Jl. Telekomunikasi No.1, Terusan Buah Batu, Bandung',
    phone: '022-7566456', email: 'info@telkomuniversity.ac.id', website: 'https://telkomuniversity.ac.id',
    description: 'Universitas Telkom adalah kampus teknologi terkemuka di Bandung, berafiliasi dengan Telkom Indonesia. Unggul dalam teknik telekomunikasi, informatika, dan bisnis digital.',
    founded: 1990, totalStudents: 32000, totalFaculties: 7, qsRanking: 1001,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik Elektro', programs: [
        { name: 'Teknik Elektro', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Telekomunikasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Informatika', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Sistem Informasi', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ilmu Komputasi', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Ekonomi dan Bisnis', programs: [
        { name: 'Manajemen Bisnis Telekomunikasi dan Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Parahyangan',
    slug: 'universitas-parahyangan',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Barat', city: 'Bandung',
    address: 'Jl. Ciumbuleuit No.94, Bandung',
    phone: '022-2032655', email: 'info@unpar.ac.id', website: 'https://unpar.ac.id',
    description: 'Unpar adalah universitas Katolik bergengsi di Bandung dengan tradisi akademik yang kuat. Dikenal dengan program arsitektur, hukum, teknik, dan ilmu sosial.',
    founded: 1955, totalStudents: 9500, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Arsitektur', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Sosial dan Ilmu Politik', programs: [
        { name: 'Hubungan Internasional', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ilmu Administrasi Publik', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Petra',
    slug: 'universitas-petra',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Timur', city: 'Surabaya',
    address: 'Jl. Siwalankerto 121–131, Surabaya',
    phone: '031-2983000', email: 'info@petra.ac.id', website: 'https://petra.ac.id',
    description: 'Universitas Kristen Petra adalah kampus swasta terkemuka di Surabaya, unggul di bidang arsitektur, desain, teknik, dan ilmu komunikasi.',
    founded: 1961, totalStudents: 11000, totalFaculties: 6, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik Sipil & Perencanaan', programs: [
        { name: 'Arsitektur', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Desain Interior', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknik Industri', programs: [
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Surabaya',
    slug: 'universitas-surabaya',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Timur', city: 'Surabaya',
    address: 'Jl. Raya Kalirungkut, Tenggilis Mejoyo, Surabaya',
    phone: '031-2981180', email: 'info@ubaya.ac.id', website: 'https://ubaya.ac.id',
    description: 'UBAYA adalah universitas swasta modern dengan fokus riset dan inovasi. Memiliki program farmasi, teknik, bisnis, dan psikologi yang kompetitif di Jawa Timur.',
    founded: 1968, totalStudents: 12000, totalFaculties: 8, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Farmasi', programs: [
        { name: 'Farmasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Mesin', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Bisnis dan Ekonomika', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Ciputra',
    slug: 'universitas-ciputra',
    type: 'PRIVATE' as const,
    accreditation: 'B',
    province: 'Jawa Timur', city: 'Surabaya',
    address: 'CitraLand CBD Boulevard, Sambikerep, Surabaya',
    phone: '031-7451699', email: 'info@ciputra.ac.id', website: 'https://ciputra.ac.id',
    description: 'UC adalah kampus wirausaha terkemuka dengan pendekatan entrepreneurship di setiap program studi. Ideal untuk calon pengusaha dan profesional kreatif.',
    founded: 2006, totalStudents: 7000, totalFaculties: 5, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Bisnis', programs: [
        { name: 'International Business Management', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Manajemen Perhotelan', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Desain', programs: [
        { name: 'Desain Komunikasi Visual', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Arsitektur', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Muhammadiyah Malang',
    slug: 'universitas-muhammadiyah-malang',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Timur', city: 'Malang',
    address: 'Jl. Raya Tlogomas No.246, Lowokwaru, Malang',
    phone: '0341-464318', email: 'info@umm.ac.id', website: 'https://umm.ac.id',
    description: 'UMM adalah salah satu universitas Muhammadiyah terbesar di Indonesia. Dikenal dengan program teknik, hukum, kedokteran, dan ilmu sosial yang komprehensif.',
    founded: 1964, totalStudents: 36000, totalFaculties: 10, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Sipil', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Mesin', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Sosial dan Ilmu Politik', programs: [
        { name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Ilmu Pemerintahan', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Dian Nuswantoro',
    slug: 'universitas-dian-nuswantoro',
    type: 'PRIVATE' as const,
    accreditation: 'B',
    province: 'Jawa Tengah', city: 'Semarang',
    address: 'Jl. Imam Bonjol No.207, Pendrikan Kidul, Semarang',
    phone: '024-3517261', email: 'info@dinus.ac.id', website: 'https://dinus.ac.id',
    description: 'Udinus merupakan kampus swasta terbesar di Semarang dengan keunggulan di bidang teknologi informasi, kesehatan, dan desain. Kampus modern dengan fasilitas lengkap.',
    founded: 2001, totalStudents: 20000, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Ilmu Komputer', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Sistem Informasi', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Desain Komunikasi Visual', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Kesehatan', programs: [
        { name: 'Rekam Medis dan Informasi Kesehatan', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Kesehatan Masyarakat', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Esa Unggul',
    slug: 'universitas-esa-unggul',
    type: 'PRIVATE' as const,
    accreditation: 'B',
    province: 'DKI Jakarta', city: 'Jakarta Barat',
    address: 'Jl. Arjuna Utara No.9, Duri Kepa, Kebon Jeruk, Jakarta Barat',
    phone: '021-5674223', email: 'info@esaunggul.ac.id', website: 'https://esaunggul.ac.id',
    description: 'UEU adalah kampus swasta di Jakarta Barat yang unggul di bidang kesehatan, hukum, desain, dan informatika dengan biaya kuliah yang terjangkau.',
    founded: 1993, totalStudents: 15000, totalFaculties: 8, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Ilmu-Ilmu Kesehatan', programs: [
        { name: 'Fisioterapi', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Gizi', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Kesehatan Masyarakat', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Desain dan Industri Kreatif', programs: [
        { name: 'Desain Komunikasi Visual', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Desain Produk', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Pancasila',
    slug: 'universitas-pancasila',
    type: 'PRIVATE' as const,
    accreditation: 'B',
    province: 'DKI Jakarta', city: 'Jakarta Selatan',
    address: 'Jl. Srengseng Sawah, Jagakarsa, Jakarta Selatan',
    phone: '021-7864730', email: 'info@univpancasila.ac.id', website: 'https://univpancasila.ac.id',
    description: 'UP adalah kampus swasta dengan sejarah panjang di Jakarta Selatan, dikenal kuat di bidang farmasi, hukum, ekonomi, dan teknik. Berlokasi asri di kawasan Jagakarsa.',
    founded: 1966, totalStudents: 16000, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Farmasi', programs: [
        { name: 'Farmasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Hukum', programs: [
        { name: 'Ilmu Hukum', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Ekonomi dan Bisnis', programs: [
        { name: 'Manajemen', degree: 'S1', accreditation: 'B', duration: 4 },
        { name: 'Akuntansi', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Ahmad Dahlan',
    slug: 'universitas-ahmad-dahlan',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'DI Yogyakarta', city: 'Yogyakarta',
    address: 'Jl. Kapas No.9, Semaki, Umbulharjo, Yogyakarta',
    phone: '0274-563515', email: 'info@uad.ac.id', website: 'https://uad.ac.id',
    description: 'UAD adalah universitas Muhammadiyah di Yogyakarta yang dikenal dengan program farmasi, psikologi, dan pendidikan. Kampus aktif dengan kehidupan mahasiswa yang dinamis.',
    founded: 1994, totalStudents: 22000, totalFaculties: 9, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Farmasi', programs: [
        { name: 'Farmasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Psikologi', programs: [
        { name: 'Psikologi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknologi Industri', programs: [
        { name: 'Teknik Informatika', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Kimia', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
  {
    name: 'Universitas Widya Mandala Surabaya',
    slug: 'universitas-widya-mandala-surabaya',
    type: 'PRIVATE' as const,
    accreditation: 'A',
    province: 'Jawa Timur', city: 'Surabaya',
    address: 'Jl. Dinoyo No.42–44, Darmo, Wonokromo, Surabaya',
    phone: '031-5678478', email: 'info@ukwms.ac.id', website: 'https://ukwms.ac.id',
    description: 'UKWMS adalah universitas Katolik bersejarah di Surabaya yang unggul dalam farmasi, teknik kimia, pendidikan, dan ilmu komunikasi. Dikenal dengan riset farmasi yang kuat.',
    founded: 1960, totalStudents: 8500, totalFaculties: 7, qsRanking: null,
    status: 'APPROVED' as const,
    faculties: [
      { name: 'Fakultas Farmasi', programs: [
        { name: 'Farmasi', degree: 'S1', accreditation: 'A', duration: 4 },
      ]},
      { name: 'Fakultas Teknik', programs: [
        { name: 'Teknik Kimia', degree: 'S1', accreditation: 'A', duration: 4 },
        { name: 'Teknik Industri', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
      { name: 'Fakultas Ilmu Komunikasi', programs: [
        { name: 'Ilmu Komunikasi', degree: 'S1', accreditation: 'B', duration: 4 },
      ]},
    ],
  },
]

export async function GET() {
  try {
    // 1. Delete non-cascade relations for NEGERI universities first
    const negeriIds = await db.university.findMany({
      where: { type: 'NEGERI' },
      select: { id: true },
    })
    const ids = negeriIds.map(u => u.id)

    if (ids.length > 0) {
      await db.application.deleteMany({ where: { universityId: { in: ids } } })
      await db.savedUniversity.deleteMany({ where: { universityId: { in: ids } } })
      await db.university.deleteMany({ where: { id: { in: ids } } })
    }

    // 2. Create 20 private universities
    const created: string[] = []
    for (const uni of UNIVERSITIES) {
      const { faculties, ...uniData } = uni
      const created_uni = await db.university.upsert({
        where: { slug: uniData.slug },
        update: { ...uniData },
        create: {
          ...uniData,
          faculties: {
            create: faculties.map(f => ({
              name: f.name,
              programs: { create: f.programs },
            })),
          },
        },
      })
      created.push(created_uni.name)
    }

    // Clear ISR cache so homepage shows fresh data immediately
    revalidatePath('/')
    revalidatePath('/cari')

    return NextResponse.json({
      ok: true,
      deleted_negeri: ids.length,
      created: created.length,
      universities: created,
    })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
