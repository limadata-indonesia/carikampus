'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SidebarItem {
  href: string
  label: string
  icon: string
  badge?: number
}

interface DashboardSidebarProps {
  title: string
  subtitle: string
  avatarText: string
  items: SidebarItem[]
  accentColor?: string
}

export default function DashboardSidebar({ title, subtitle, avatarText, items }: DashboardSidebarProps) {
  const pathname = usePathname()
  return (
    <aside className="w-[230px] bg-[#033F85] flex flex-col min-h-screen flex-shrink-0">
      <div className="flex items-center gap-2.5 p-4 border-b border-white/10">
        <div className="w-9 h-9 rounded-lg bg-[#F4A900] flex items-center justify-center font-bold text-[#033F85] text-xs flex-shrink-0">{avatarText}</div>
        <div><div className="text-sm font-bold text-white leading-tight">{title}</div><div className="text-xs text-white/50 mt-0.5">{subtitle}</div></div>
      </div>
      <nav className="flex-1 py-3">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link key={item.href} href={item.href}
              className={cn('flex items-center gap-2.5 px-4 py-2.5 text-sm border-l-[3px] transition-all',
                active ? 'bg-[#F4A900]/15 text-[#F4A900] font-bold border-l-[#F4A900]'
                       : 'text-white/65 border-l-transparent hover:bg-white/8 hover:text-white')}>
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge ? <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span> : null}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70">
          <span>←</span> Kembali ke site
        </Link>
      </div>
    </aside>
  )
}
