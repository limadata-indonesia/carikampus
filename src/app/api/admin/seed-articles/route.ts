import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

const ARTICLES = [
  {
    slug: 'cara-memilih-jurusan',
    title: 'Cara Memilih Jurusan yang Tepat Sesuai Minat Bakat',
    category: 'Tips Karier',
    emoji: '🎯',
    readTime: '5 menit',
    excerpt: 'Memilih jurusan kuliah adalah salah satu keputusan terpenting dalam hidupmu. Simak panduan lengkapnya di sini.',
    publishedAt: new Date('2025-06-20'),
    content: `Memilih jurusan kuliah adalah salah satu keputusan terpenting dalam hidupmu. Keputusan ini akan memengaruhi karier, lingkungan sosial, dan kepuasan hidupmu selama bertahun-tahun ke depan. Namun, banyak siswa SMA yang memilih jurusan berdasarkan tekanan orang tua, ikut-ikutan teman, atau sekadar jurusan yang "bergengsi" — bukan berdasarkan minat dan bakat yang sesungguhnya.

Berikut panduan langkah demi langkah untuk memilih jurusan yang benar-benar tepat:

1. Kenali minat dan bakatmu melalui tes psikometri

Langkah pertama adalah memahami dirimu sendiri secara ilmiah. Tes minat bakat berbasis RIASEC (Realistic, Investigative, Artistic, Social, Enterprising, Conventional) membantu mengidentifikasi pola minat dan kepribadianmu secara objektif. Bukan sekadar "aku suka matematika", tapi memahami mengapa kamu suka dan bagaimana kecenderungan kognitifmu bekerja.

Platform CariKampus menyediakan tes psikometri 144 soal yang telah divalidasi untuk siswa Indonesia. Hasilnya langsung merekomendasikan jurusan-jurusan yang paling sesuai dengan profilmu.

2. Pisahkan antara passion dan karier

Banyak siswa bingung membedakan "apa yang aku sukai untuk dilakukan" dan "apa yang bisa menghidupi aku". Keduanya penting, tapi tidak harus selalu sama persis. Idealnya, cari titik temu antara minat, bakat, dan prospek karier yang baik.

Misalnya, kamu menyukai musik tapi juga punya kemampuan analitis yang kuat. Jurusan seperti Manajemen Industri Kreatif atau Teknologi Audio bisa menjadi jembatan yang tepat.

3. Riset prospek karier secara mendalam

Di era AI dan otomasi, lanskap karier berubah cepat. Riset prospek kerja 5-10 tahun ke depan, bukan hanya kondisi saat ini. Beberapa pertanyaan penting:

- Apakah pekerjaan di bidang ini bisa digantikan AI dalam 10 tahun?
- Berapa rata-rata gaji fresh graduate di bidang ini?
- Seberapa besar demand tenaga kerja di industri ini?
- Apakah bidang ini berkembang atau stagnan?

Bidang teknologi informasi, data science, kesehatan, dan energi terbarukan diprediksi memiliki pertumbuhan tertinggi dalam dekade mendatang.

4. Cek kurikulum, bukan hanya nama jurusan

Dua universitas bisa sama-sama punya jurusan "Teknik Informatika", tapi kurikulumnya bisa sangat berbeda. Satu mungkin berfokus pada software engineering dan web development, sementara yang lain lebih ke hardware dan embedded systems. Selalu download dan baca silabus mata kuliah sebelum memutuskan.

5. Kunjungi kampus dan bicara dengan mahasiswa aktif

Open house universitas bukan sekadar pameran — manfaatkan untuk berbicara langsung dengan mahasiswa aktif jurusan yang kamu minati. Tanyakan: Apa hal yang paling menantang? Apa yang tidak diceritakan di brosur? Bagaimana kehidupan sehari-hari di jurusan ini?

6. Pertimbangkan akreditasi dan reputasi program studi

Akreditasi BAN-PT adalah indikator kualitas minimum. Namun lebih dari itu, cek juga reputasi program studi di industri — apakah alumni-nya banyak bekerja di perusahaan top? Apakah jurusan ini punya kerjasama industri yang aktif?

Kesimpulan

Memilih jurusan bukan keputusan yang harus dibuat terburu-buru. Luangkan waktu untuk mengenal dirimu, riset menyeluruh, dan jangan ragu untuk meminta bantuan konselor pendidikan. Ingat: pilihan jurusan yang tepat bukan yang paling populer, tapi yang paling sesuai dengan potensimu.`,
  },
  {
    slug: 'universitas-terbaik-indonesia-2025',
    title: '10 Universitas Terbaik di Indonesia 2025 Versi QS Ranking',
    category: 'Universitas',
    emoji: '🏆',
    readTime: '7 menit',
    excerpt: 'QS World University Rankings 2025 telah dirilis. Berikut 10 universitas Indonesia dengan ranking terbaik.',
    publishedAt: new Date('2025-06-15'),
    content: `QS World University Rankings 2025 telah resmi dirilis, dan universitas-universitas Indonesia menunjukkan kemajuan yang signifikan di panggung global. Tahun ini, lebih dari 10 institusi Indonesia berhasil masuk dalam daftar 1.500 universitas terbaik dunia — rekor terbaru yang mencerminkan investasi besar dalam kualitas pendidikan tinggi.

Metodologi QS Ranking 2025

Sebelum melihat daftarnya, penting memahami bagaimana QS menilai universitas. Ada 9 indikator utama:

- Academic Reputation (30%): Persepsi dari lebih dari 135.000 akademisi global
- Employer Reputation (15%): Survei terhadap 75.000+ perusahaan tentang kualitas lulusan
- Faculty Student Ratio (10%): Rasio dosen per mahasiswa
- Citations per Faculty (20%): Dampak riset yang diukur dari sitasi
- International Faculty & Student Ratio (10%): Keragaman internasional
- Employability & Outcomes (5%): Tingkat penyerapan lulusan
- Sustainability (5%): Komitmen kampus terhadap keberlanjutan lingkungan
- International Research Network (5%): Jaringan riset internasional

10 Universitas Terbaik Indonesia 2025

1. Universitas Indonesia (UI) — #206 Dunia
Peningkatan 15 peringkat dari tahun lalu. UI unggul dalam academic reputation dan employer reputation, didukung oleh program riset yang aktif di bidang kesehatan, teknik, dan ilmu sosial.

2. Universitas Gadjah Mada (UGM) — #237 Dunia
UGM konsisten di 20 besar ASEAN. Kekuatan utama di bidang pertanian, hukum, dan ekonomi. Program double degree dengan universitas Eropa terus diperluas.

3. Institut Teknologi Bandung (ITB) — #265 Dunia
Pilihan utama untuk sains dan teknik. Citations per faculty ITB tertinggi di antara universitas Indonesia, mencerminkan produktivitas riset yang tinggi.

4. Institut Pertanian Bogor (IPB) — #521-530 Dunia
Peringkat pertanian dan ilmu pangan IPB masuk top 100 dunia — pencapaian luar biasa. IPB dikenal dengan inovasi-inovasi di bidang ketahanan pangan dan bioteknologi.

5. Universitas Airlangga (UNAIR) — #521-530 Dunia
UNAIR merupakan salah satu universitas dengan program kedokteran dan farmasi terbaik di Indonesia. Riset di bidang penyakit tropis mendapat pengakuan internasional.

6. Universitas Diponegoro (UNDIP) — #701-750 Dunia
UNDIP terus meningkat pesat, didorong oleh investasi besar dalam fasilitas riset dan kerjasama industri di kawasan Jawa Tengah.

7. Institut Teknologi Sepuluh Nopember (ITS) — #751-800 Dunia
ITS dikenal dengan kekuatan di bidang teknik kelautan, perkapalan, dan informatika. Lulusannya banyak diserap industri maritim dan teknologi.

8. Universitas Brawijaya (UB) — #801-900 Dunia
UB memiliki salah satu jumlah mahasiswa terbesar di Indonesia. Kekuatan di bidang pertanian, peternakan, dan teknologi pangan.

9. Universitas Padjadjaran (UNPAD) — #801-900 Dunia
UNPAD unggul di bidang farmasi, hukum, dan komunikasi. Berlokasi di Bandung, kampus ini dikenal dengan kehidupan akademik yang aktif.

10. Universitas Hasanuddin (UNHAS) — #1001-1200 Dunia
Universitas terkemuka di Indonesia Timur. UNHAS memimpin dalam riset kelautan, kedokteran, dan hukum untuk kawasan Sulawesi dan sekitarnya.

Catatan penting untuk calon mahasiswa

Ranking bukan satu-satunya faktor penentu. Banyak program studi di universitas yang tidak masuk 10 besar ini justru lebih unggul di bidang spesifik tertentu. Misalnya, Universitas Negeri Malang untuk pendidikan, Universitas Udayana untuk pariwisata dan budaya Bali, atau Institut Seni Indonesia untuk seni pertunjukan.

Pilih universitas yang terbaik untuk jurusan yang kamu minati, bukan sekadar universitas dengan ranking tertinggi secara keseluruhan.`,
  },
  {
    slug: 'apa-itu-tes-riasec',
    title: 'Apa Itu Tes RIASEC dan Mengapa Penting Untuk Siswa SMA?',
    category: 'Tes Minat',
    emoji: '🧠',
    readTime: '4 menit',
    excerpt: 'Tes RIASEC adalah alat psikometri yang membantu siswa menemukan jurusan kuliah yang sesuai dengan kepribadian mereka.',
    publishedAt: new Date('2025-06-10'),
    content: `RIASEC adalah model psikologis yang dikembangkan oleh John L. Holland pada 1970-an untuk mengelompokkan minat karier dan kepribadian manusia ke dalam 6 kategori utama. Model ini telah diuji secara ilmiah selama lebih dari 50 tahun dan digunakan di lebih dari 40 negara sebagai alat bimbingan karier.

Di Indonesia, tes RIASEC mulai populer digunakan dalam bimbingan konseling SMA sebagai alat bantu pemilihan jurusan kuliah dan perencanaan karier.

Enam Tipe Kepribadian RIASEC

R — Realistic (Realistis)
Orang dengan tipe Realistic menyukai kegiatan yang melibatkan benda fisik, alat, dan mesin. Mereka cenderung praktis, koordinasi motorik baik, dan lebih suka bekerja dengan tangan.
Jurusan cocok: Teknik Mesin, Teknik Sipil, Teknik Elektro, Agroteknologi, Kehutanan
Contoh karier: Insinyur, Teknisi, Arsitek Lansekap, Pilot

I — Investigative (Investigatif)
Tipe Investigative menyukai memecahkan masalah, menganalisis data, dan berpikir kritis. Mereka senang belajar dan meneliti hal-hal yang kompleks.
Jurusan cocok: Ilmu Komputer, Matematika, Fisika, Kedokteran, Biologi
Contoh karier: Peneliti, Data Scientist, Dokter, Software Engineer

A — Artistic (Artistik)
Tipe Artistic kreatif, imajinatif, dan ekspresif. Mereka kurang menyukai rutinitas yang terstruktur dan lebih menyukai kebebasan berkreasi.
Jurusan cocok: Desain Grafis, Arsitektur, Seni Rupa, Ilmu Komunikasi, Sastra
Contoh karier: Desainer, Jurnalis, Penulis, Art Director, Fotografer

S — Social (Sosial)
Tipe Social menyukai berinteraksi, membantu, dan mengajar orang lain. Mereka empatik, pandai berkomunikasi, dan termotivasi oleh kontribusi sosial.
Jurusan cocok: Psikologi, Pendidikan, Keperawatan, Pekerjaan Sosial, Bimbingan Konseling
Contoh karier: Guru, Psikolog, Konselor, Perawat, HR Manager

E — Enterprising (Wirausaha)
Tipe Enterprising memiliki jiwa kepemimpinan, suka memengaruhi orang lain, dan berorientasi pada hasil. Mereka ambisus, percaya diri, dan menyukai tantangan.
Jurusan cocok: Manajemen, Hukum, Administrasi Bisnis, Marketing, Ilmu Politik
Contoh karier: Entrepreneur, Pengacara, Manajer, Konsultan, Politisi

C — Conventional (Konvensional)
Tipe Conventional menyukai keteraturan, prosedur, dan bekerja dengan data dan angka. Mereka terorganisir, teliti, dan dapat diandalkan.
Jurusan cocok: Akuntansi, Statistika, Manajemen Informatika, Administrasi Perkantoran
Contoh karier: Akuntan, Auditor, Analis Keuangan, Data Entry Specialist

Bagaimana Tes RIASEC Bekerja?

Tes RIASEC yang valid terdiri dari ratusan pernyataan yang mengukur preferensi aktivitas, kompetensi yang dirasakan, dan nilai-nilai kerja seseorang. Hasilnya berupa kode tiga huruf (misalnya "IAS" atau "ESC") yang merepresentasikan tiga tipe dominan.

Kombinasi tiga kode inilah yang kemudian dicocokkan dengan database profesi dan jurusan untuk menghasilkan rekomendasi yang personal.

Tes RIASEC di CariKampus

Platform CariKampus menyediakan tes psikometri berbasis RIASEC yang:
- Terdiri dari 144 soal tervalidasi
- Disesuaikan dengan konteks pendidikan dan karier Indonesia
- Menghasilkan rekomendasi jurusan dan universitas yang spesifik
- Dilengkapi penjelasan kepribadian dan gaya belajar

Tes ini bisa diselesaikan dalam 20-30 menit dan hasilnya langsung dapat diakses setelah selesai.

Apakah Hasil Tes RIASEC Selalu Akurat?

Tes RIASEC adalah alat bantu, bukan penentu mutlak. Hasilnya paling akurat jika kamu menjawab dengan jujur tanpa memikirkan "jawaban yang benar". Minat manusia juga bisa berkembang seiring waktu, jadi tes ini idealnya dilakukan lebih dari sekali dalam periode yang berbeda.

Gunakan hasil RIASEC sebagai titik awal eksplorasi, bukan sebagai keputusan final.`,
  },
  {
    slug: 'tips-lolos-snbt-2025',
    title: 'Tips Lolos SNBT 2025: Strategi Belajar dari Mahasiswa Baru UI',
    category: 'SNBT',
    emoji: '📚',
    readTime: '6 menit',
    excerpt: 'Mahasiswa baru Universitas Indonesia berbagi strategi belajar yang terbukti membantu mereka lolos SNBT 2025.',
    publishedAt: new Date('2025-06-05'),
    content: `SNBT (Seleksi Nasional Berdasarkan Tes) 2025 telah mengukir berbagai kisah sukses. Kami berbincang dengan 8 mahasiswa baru Universitas Indonesia dari berbagai fakultas untuk menggali strategi belajar yang benar-benar bekerja — bukan tips generik, tapi pengalaman nyata yang mereka jalani.

Apa Itu SNBT dan Bagaimana Formatnya?

SNBT menggantikan SBMPTN sebagai ujian masuk PTN utama di Indonesia. Terdiri dari dua komponen besar:

TPS (Tes Potensi Skolastik) — mengukur kemampuan kognitif dasar:
- Penalaran Umum
- Pengetahuan dan Pemahaman Umum
- Pemahaman Bacaan dan Menulis
- Pengetahuan Kuantitatif

TKA (Tes Kompetensi Akademik) — untuk jurusan tertentu (Saintek/Soshum)

Strategi dari Mahasiswa UI yang Berhasil

1. "Mulai dari Analisis Kelemahan, Bukan Materi Favorit"
— Rizky, Fakultas Teknik UI

"Kesalahan terbesar teman-temanku adalah belajar materi yang sudah dikuasai karena terasa lebih nyaman. Aku justru langsung fokus ke kelemahan. Bulan pertama aku habiskan untuk mengerjakan soal-soal, menandai yang salah, dan membuat pola kesalahan. Dari situ baru ketahuan aku lemah di Penalaran Kuantitatif, dan di situ aku alokasikan 60% waktu belajar."

2. "Spaced Repetition, Bukan Belajar Maraton"
— Anisa, FKM UI

"Belajar 8 jam sehari di hari terakhir itu tidak efektif. Aku pakai teknik spaced repetition — review materi setiap 1 hari, 3 hari, 7 hari, dan 14 hari setelah pertama kali belajar. Metode ini terbukti secara ilmiah memperkuat ingatan jangka panjang. Aku pakai aplikasi Anki untuk flashcard dan jadwal review otomatis."

3. "Simulasi Kondisi Ujian Sesungguhnya"
— Bagas, Fakultas Ekonomi UI

"Tiga bulan sebelum ujian, setiap Sabtu aku lakukan simulasi ujian penuh — timer, tidak boleh buka buku, dalam kondisi diam. Ini melatih stamina mental dan manajemen waktu. Banyak yang nilainya bagus saat latihan biasa tapi anjlok saat ujian karena tidak terbiasa dengan tekanan waktu."

4. "Analisis Soal SNBT 5 Tahun Terakhir"
— Putri, Fakultas Hukum UI

"Pola soal SNBT itu cenderung konsisten. Aku download semua soal 5 tahun terakhir dan membuat matriks topik yang sering muncul. Hasilnya: teks bacaan kompleks muncul di setiap tahun, perbandingan dan proporsi selalu ada di bagian kuantitatif, dan inferensi logis adalah soal terbanyak di penalaran umum. Dengan matriks ini, aku bisa mengalokasikan waktu belajar lebih efisien."

5. "Jangan Abaikan TPS, Fokuslah di Sini"
— Deni, FMIPA UI

"Banyak siswa Saintek obsesi belajar Matematika dan Fisika untuk TKA, tapi lupa bahwa TPS punya bobot besar dalam seleksi. TPS menguji kemampuan dasar yang susah ditingkatkan dalam waktu singkat — tapi bisa dilatih. Aku minimal 2 jam per hari khusus untuk latihan soal TPS."

6. "Buat Grup Belajar Kecil, Tapi Pilih Anggotanya"
— Sara, Fakultas Psikologi UI

"Grup belajar yang terlalu besar jadi tidak fokus. Aku belajar bersama 3 orang saja, masing-masing kuat di bidang berbeda. Setiap sesi, kami gantian mengajarkan materi — karena mengajarkan sesuatu adalah cara belajar terbaik. Ini disebut 'Feynman Technique'."

Timeline Belajar yang Efektif

6 Bulan Sebelum SNBT:
- Identifikasi kelemahan via soal latihan
- Pelajari format dan tipe soal SNBT
- Mulai rutinitas belajar konsisten (1-2 jam/hari)

3 Bulan Sebelum:
- Intensifkan belajar (3-4 jam/hari)
- Fokus ke topik prioritas (frekuensi tinggi di soal ujian)
- Mulai simulasi mingguan

1 Bulan Sebelum:
- Full simulasi setiap minggu
- Review kesalahan dan perkuat pemahaman
- Jaga pola tidur dan kesehatan

1 Minggu Sebelum:
- Ringankan belajar, jangan terlalu keras
- Pastikan dokumen lengkap
- Tidur cukup dan jaga kondisi fisik

Pesan dari Para Mahasiswa

"SNBT bukan ujian kecerdasan. Ini ujian persiapan dan strategi. Orang yang persiapan lebih baik hampir selalu menang, apapun latar belakangnya." — Rizky, mahasiswa Teknik UI.`,
  },
  {
    slug: 'biaya-kuliah-ptn-vs-pts-jakarta-2025',
    title: 'Perbandingan Biaya Kuliah PTN vs PTS di Jakarta 2025',
    category: 'Biaya Kuliah',
    emoji: '💰',
    readTime: '8 menit',
    excerpt: 'Berapa biaya kuliah di universitas negeri vs swasta Jakarta? Kami bandingkan UKT, biaya awal, dan biaya per semester.',
    publishedAt: new Date('2025-06-01'),
    content: `Biaya kuliah adalah salah satu faktor terpenting dalam keputusan memilih universitas, namun sering kali kurang transparan. Kami melakukan riset mendalam untuk membandingkan biaya nyata kuliah di PTN vs PTS di Jakarta — termasuk biaya-biaya tersembunyi yang sering tidak disebutkan dalam brosur resmi.

Sistem Biaya PTN: Memahami UKT

Perguruan Tinggi Negeri (PTN) di Indonesia menggunakan sistem Uang Kuliah Tunggal (UKT) yang bersifat progresif berdasarkan kemampuan ekonomi keluarga. UKT dibagi dalam 8 kelompok:

- UKT 1: Rp 500.000/semester (keluarga sangat miskin)
- UKT 2: Rp 1.000.000/semester
- UKT 3-4: Rp 2.000.000 - 4.000.000/semester
- UKT 5-6: Rp 4.000.000 - 6.000.000/semester
- UKT 7-8: Rp 6.000.000 - 12.500.000/semester (keluarga mampu)

Besaran UKT juga bervariasi berdasarkan jurusan dan universitas. Jurusan kedokteran dan teknik cenderung memiliki UKT tertinggi.

PTN Jakarta: Estimasi Biaya Lengkap (2025)

Universitas Indonesia (UI)
- UKT rata-rata: Rp 2.000.000 - 7.500.000/semester
- UKT Kedokteran: Rp 5.000.000 - 12.500.000/semester
- Iuran Pengembangan Institusi (IPI): Rp 10.000.000 - 50.000.000 (jalur mandiri)
- Biaya hidup di sekitar UI: Rp 2.500.000 - 4.000.000/bulan
- Total estimasi 4 tahun (UKT menengah + biaya hidup): Rp 200.000.000 - 250.000.000

Universitas Negeri Jakarta (UNJ)
- UKT rata-rata: Rp 1.500.000 - 5.500.000/semester
- UKT Pendidikan: Rp 1.500.000 - 4.000.000/semester
- Tidak ada IPI untuk jalur reguler (SNBT/SNBP)
- Total estimasi 4 tahun: Rp 80.000.000 - 130.000.000

PTS Jakarta: Estimasi Biaya Lengkap (2025)

Universitas Bina Nusantara (BINUS)
- Uang pangkal: Rp 10.000.000 - 35.000.000 (tergantung jurusan)
- BPP per semester: Rp 12.000.000 - 22.000.000
- Jurusan Computer Science: Rp 19.000.000 - 22.000.000/semester
- Total estimasi 4 tahun: Rp 180.000.000 - 280.000.000

Universitas Tarumanagara (UNTAR)
- Uang pangkal: Rp 15.000.000 - 40.000.000
- SPP per semester: Rp 8.000.000 - 18.000.000
- Total estimasi 4 tahun: Rp 130.000.000 - 200.000.000

Universitas Trisakti
- Uang pangkal: Rp 15.000.000 - 50.000.000
- BPP per semester: Rp 10.000.000 - 25.000.000
- Jurusan Teknik Sipil: Rp 18.000.000/semester
- Total estimasi 4 tahun: Rp 160.000.000 - 260.000.000

Universitas Pelita Harapan (UPH)
- Uang pangkal: Rp 20.000.000 - 60.000.000
- BPP per semester: Rp 20.000.000 - 35.000.000
- Satu-satunya PTS dengan akreditasi FIBAA Internasional untuk beberapa program
- Total estimasi 4 tahun: Rp 250.000.000 - 400.000.000

Faktor-Faktor yang Sering Diabaikan

1. Biaya Tambahan PTS
PTS sering memiliki biaya tambahan yang tidak tercantum di brosur: biaya praktikum, biaya ujian tambahan, biaya wisuda, biaya pengembangan, biaya sertifikasi, dan lain-lain. Bisa mencapai Rp 3.000.000 - 10.000.000 per tahun.

2. Beasiswa PTS yang Signifikan
Banyak PTS menawarkan beasiswa prestasi yang bisa memotong biaya 30-70%. BINUS misalnya punya beasiswa hingga 100% untuk nilai UTBK tertinggi. Bandingkan biaya setelah beasiswa, bukan biaya nominal.

3. Return on Investment (ROI)
Biaya kuliah perlu dipertimbangkan dalam konteks gaji yang akan diperoleh setelah lulus. Lulusan UI Teknik atau BINUS Computer Science rata-rata mendapat gaji awal Rp 8.000.000 - 15.000.000/bulan, yang berarti ROI-nya relatif singkat.

4. Biaya Hidup yang Sering Terabaikan
Biaya hidup (kos, makan, transportasi) di Jakarta bisa mencapai Rp 3.000.000 - 5.000.000/bulan. Untuk 4 tahun, ini berarti Rp 144.000.000 - 240.000.000 — seringkali lebih besar dari biaya kuliah itu sendiri.

Kesimpulan: PTN atau PTS?

PTN (melalui SNBT/SNBP) masih menawarkan value terbaik jika kamu berhasil masuk, terutama untuk jurusan-jurusan dengan UKT rendah. Namun jika jurusan pilihanmu lebih kuat di PTS tertentu, atau jika ada beasiswa signifikan, PTS bisa menjadi pilihan yang lebih cerdas secara finansial.

Yang terpenting: jangan hanya melihat biaya nominal. Pertimbangkan kualitas pendidikan, prospek karier, jaringan alumni, dan potensi penghasilan setelah lulus.`,
  },
  {
    slug: 'jurusan-prospek-kerja-era-ai-2025',
    title: '10 Jurusan dengan Prospek Kerja Terbaik di Era AI 2025',
    category: 'Karier',
    emoji: '🚀',
    readTime: '9 menit',
    excerpt: 'Era kecerdasan buatan mengubah lanskap karier. Jurusan apa yang paling menjanjikan di 5-10 tahun ke depan?',
    publishedAt: new Date('2025-05-25'),
    content: `Revolusi kecerdasan buatan (AI) sedang mengubah lanskap karier secara fundamental. Beberapa pekerjaan yang populer hari ini mungkin akan tergantikan oleh AI dalam 10 tahun ke depan, sementara kategori pekerjaan baru bermunculan yang bahkan belum ada namanya saat ini.

Laporan World Economic Forum 2024 memperkirakan bahwa 85 juta pekerjaan akan terdisrupsi oleh AI, namun 97 juta pekerjaan baru akan tercipta — kebanyakan di bidang yang memanfaatkan AI, bukan bersaing dengannya.

Berikut 10 jurusan yang paling menjanjikan di era AI:

1. Ilmu Data dan Kecerdasan Buatan (Data Science & AI)

Ini adalah jurusan "hot" nomor satu. Data scientist dan AI engineer adalah posisi paling dicari di Indonesia 5 tahun terakhir, dengan pertumbuhan demand 300% sejak 2019.

Apa yang dipelajari: Machine learning, statistika, pemrograman Python/R, big data, neural networks.
Prospek karier: AI Engineer, Data Scientist, ML Engineer, Business Intelligence Analyst.
Gaji rata-rata fresh graduate: Rp 8.000.000 - 15.000.000/bulan.
Universitas unggulan: UI, ITB, ITS, BINUS.

2. Teknik Informatika / Computer Science

Fondasi dari semua inovasi teknologi. Lulusan Teknik Informatika memiliki flexibility karier tertinggi — bisa masuk ke hampir semua industri.

Apa yang dipelajari: Algoritma, software engineering, database, cybersecurity, cloud computing.
Prospek karier: Software Engineer, Backend/Frontend Developer, DevOps, Security Engineer.
Gaji rata-rata: Rp 7.000.000 - 18.000.000/bulan.
Perusahaan yang merekrut: Gojek, Tokopedia, Shopee, Google Indonesia, Microsoft.

3. Keamanan Siber (Cybersecurity)

Dengan meningkatnya serangan siber global, demand untuk ahli keamanan siber meningkat 400% dalam 5 tahun terakhir. Indonesia sendiri mengalami kerugian Rp 78 triliun dari kejahatan siber di 2024.

Apa yang dipelajari: Network security, ethical hacking, cryptography, forensik digital.
Prospek karier: Security Analyst, Penetration Tester, CISO, Security Consultant.
Gaji rata-rata: Rp 10.000.000 - 25.000.000/bulan.

4. Teknik Biomedis (Biomedical Engineering)

Persimpangan antara teknologi dan kesehatan. AI dalam diagnosa medis, alat kesehatan pintar, dan telemedicine adalah area pertumbuhan terbesar dalam industri kesehatan global.

Apa yang dipelajari: Biologi, teknik, AI untuk medis, pengembangan alat kesehatan.
Prospek karier: Biomedical Engineer, Medical Device Developer, Health Tech Analyst.
Gaji rata-rata: Rp 8.000.000 - 20.000.000/bulan.
Prospek global: Sangat tinggi, terutama untuk ekspat ke Singapura dan Malaysia.

5. Teknik Lingkungan (Environmental Engineering)

Krisis iklim dan regulasi lingkungan yang makin ketat menciptakan demand besar untuk insinyur lingkungan. Indonesia menargetkan net-zero carbon pada 2060, membutuhkan ribuan profesional lingkungan.

Apa yang dipelajari: Pengolahan limbah, energi terbarukan, manajemen lingkungan, carbon trading.
Prospek karier: Environmental Engineer, Carbon Analyst, ESG Consultant, Sustainability Manager.
Gaji rata-rata: Rp 7.000.000 - 16.000.000/bulan.

6. Farmasi dan Bioteknologi

Industri farmasi Indonesia tumbuh 12% per tahun, didorong oleh aging population dan kesadaran kesehatan pasca-pandemi. Bioteknologi membuka peluang baru di bidang obat-obatan berbasis AI.

Apa yang dipelajari: Kimia organik, farmakologi, biologi molekuler, drug development.
Prospek karier: Apoteker, Peneliti Farmasi, Regulatory Affairs, Drug Safety Specialist.
Gaji rata-rata: Rp 6.000.000 - 14.000.000/bulan.

7. Manajemen Bisnis Digital

Di era e-commerce dan digitalisasi, manajer bisnis yang memahami teknologi digital sangat langka dan dicari. Kombinasi business acumen + digital literacy adalah paket yang mahal.

Apa yang dipelajari: Digital marketing, e-commerce, business analytics, manajemen strategi.
Prospek karier: Digital Marketing Manager, E-commerce Manager, Growth Hacker, Product Manager.
Gaji rata-rata: Rp 7.000.000 - 18.000.000/bulan.

8. Desain UX/UI dan Produk Digital

Setiap aplikasi, website, dan produk digital membutuhkan desainer yang memahami perilaku pengguna. Indonesia memiliki lebih dari 200 juta pengguna internet aktif yang semuanya butuh produk yang mudah digunakan.

Apa yang dipelajari: Design thinking, user research, Figma, prototyping, psikologi pengguna.
Prospek karier: UX Designer, UI Designer, Product Designer, UX Researcher.
Gaji rata-rata: Rp 8.000.000 - 20.000.000/bulan.

9. Teknik Energi Terbarukan

Transisi energi adalah mega-trend global yang akan berlangsung 30 tahun ke depan. Indonesia, dengan sumber daya surya, angin, dan geothermal yang melimpah, membutuhkan ribuan insinyur energi terbarukan.

Apa yang dipelajari: Solar energy, wind power, baterai, smart grid, kebijakan energi.
Prospek karier: Energy Engineer, Solar Project Manager, EV Engineer, Energy Analyst.
Gaji rata-rata: Rp 8.000.000 - 18.000.000/bulan.

10. Psikologi Industri dan Organisasi

Ironis, di era AI yang mengotomasi banyak pekerjaan, keahlian manusia seperti empati, negosiasi, dan pemahaman perilaku justru semakin berharga. Psikolog industri membantu perusahaan mengelola perubahan dan memanusiakan tempat kerja.

Apa yang dipelajari: Psikologi organisasi, manajemen SDM, assessment center, pelatihan.
Prospek karier: HR Business Partner, Organizational Development Specialist, Talent Assessor, Change Management Consultant.
Gaji rata-rata: Rp 7.000.000 - 15.000.000/bulan.

Pesan Akhir: Skill > Jurusan

Nama jurusan semakin tidak relevan dibandingkan skill spesifik yang kamu miliki. Seorang lulusan Sastra Indonesia yang menguasai AI writing tools dan SEO bisa menghasilkan lebih besar dari lulusan Teknik yang tidak punya kemampuan apapun selain gelar. Fokuslah membangun portofolio nyata, tidak hanya IPK.`,
  },
]

export async function GET() {
  try {
    const results = []
    for (const art of ARTICLES) {
      const created = await db.article.upsert({
        where: { slug: art.slug },
        update: {
          title: art.title,
          category: art.category,
          emoji: art.emoji,
          readTime: art.readTime,
          excerpt: art.excerpt,
          content: art.content,
          published: true,
          publishedAt: art.publishedAt,
        },
        create: {
          title: art.title,
          slug: art.slug,
          category: art.category,
          emoji: art.emoji,
          readTime: art.readTime,
          excerpt: art.excerpt,
          content: art.content,
          published: true,
          publishedAt: art.publishedAt,
        },
      })
      results.push({ slug: created.slug, title: created.title })
    }
    return NextResponse.json({ ok: true, count: results.length, articles: results })
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 })
  }
}
