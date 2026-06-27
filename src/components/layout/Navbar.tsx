import Link from 'next/link'
import NavLink from './NavLink'

const NAV_LINKS = [
  { href: '/cari',      label: 'Universitas' },
  { href: '/tes-minat', label: 'Tes Minat' },
  { href: '/artikel',   label: 'Artikel' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#F4A900] rounded-xl flex items-center justify-center font-black text-[#033F85] text-sm" aria-hidden="true">
            CK
          </div>
          <div>
            <div className="text-sm font-extrabold text-[#033F85] leading-tight tracking-tight">Cari Kampus</div>
            <div className="text-xs font-bold text-[#F4A900] leading-tight tracking-tight">Cari Kerja</div>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-100 rounded-full p-1">
          {NAV_LINKS.map(({ href, label }) => (
            <NavLink key={href} href={href} label={label} />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/masuk"
            className="px-4 py-2 text-sm font-bold text-[#1A1520] border-2 border-gray-200 rounded-full hover:border-[#033F85] hover:text-[#033F85] transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/tes-minat"
            className="px-4 py-2 text-sm font-black bg-[#1A1520] text-white rounded-full hover:bg-[#033F85] transition-colors"
          >
            Mulai Tes Minat →
          </Link>
        </div>

      </div>
    </nav>
  )
}
