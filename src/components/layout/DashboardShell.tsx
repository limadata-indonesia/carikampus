interface DashboardShellProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}
export default function DashboardShell({ sidebar, children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar}
      <main className="flex-1 bg-[#F4F5F6] overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
