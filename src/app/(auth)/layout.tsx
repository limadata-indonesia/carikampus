import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F4F5F6] flex flex-col items-center justify-center p-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 bg-[#F4A900] rounded-lg flex items-center justify-center font-black text-[#033F85] text-sm">
          CK
        </div>
        <div>
          <div className="text-sm font-bold text-[#033F85] leading-tight">Cari Kampus</div>
          <div className="text-sm font-bold text-[#F4A900] leading-tight">Cari Kerja</div>
        </div>
      </Link>
      {children}
    </div>
  )
}
