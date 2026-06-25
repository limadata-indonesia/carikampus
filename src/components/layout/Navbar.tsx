'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/cari',      label: 'Universitas' },
  { href: '/tes-minat', label: 'Tes Minat' },
  { href: '/artikel',   label: 'Artikel' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-[#033F85] border-b-[3px] border-[#F4A900]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[#F4A900] rounded-md flex items-center justify-center font-black text-[#033F85] text-sm">
            CK
          </div>
          <div>
            <div className="text-sm font-bold text-white leading-tight">Cari Kampus</div>
            <div className="text-sm font-bold text-[#F4A900] leading-tight">Cari Kerja</div>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                pathname.startsWith(href)
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/15 hover:text-white'
              )}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/masuk"
            className="px-3 py-1.5 text-sm font-semibold text-white border border-white/50 rounded-md hover:bg-white/10 transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/tes-minat"
            className="px-3 py-1.5 text-sm font-bold bg-[#F4A900] text-[#033F85] rounded-md hover:bg-[#D99200] transition-colors"
          >
            Mulai Tes Minat
          </Link>
        </div>

      </div>
    </nav>
  )
}
