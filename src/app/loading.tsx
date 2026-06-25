export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F4F5F6] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 bg-[#F4A900] rounded-lg flex items-center justify-center font-black text-[#033F85] animate-pulse">CK</div>
        <div className="text-sm text-gray-400">Memuat...</div>
      </div>
    </div>
  )
}
