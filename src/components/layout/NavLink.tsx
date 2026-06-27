'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname.startsWith(href)
  return (
    <Link
      href={href}
      className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
        active
          ? 'bg-[#033F85] text-white shadow-sm'
          : 'text-gray-500 hover:text-[#1A1520] hover:bg-white'
      }`}
    >
      {label}
    </Link>
  )
}
