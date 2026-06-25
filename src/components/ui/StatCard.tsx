interface StatCardProps {
  value: string | number
  label: string
  delta?: string
  deltaUp?: boolean
  accent?: string
}
export default function StatCard({ value, label, delta, deltaUp, accent = '#033F85' }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4" style={{ borderTop: `3px solid ${accent}` }}>
      <div className="text-2xl font-bold" style={{ color: accent }}>{value}</div>
      <div className="text-xs text-gray-400 mt-1">{label}</div>
      {delta && <div className={`text-xs font-semibold mt-1 ${deltaUp !== false ? 'text-green-600' : 'text-red-500'}`}>{delta}</div>}
    </div>
  )
}
