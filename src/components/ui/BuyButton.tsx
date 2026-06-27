'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

declare global {
  interface Window {
    snap?: { pay: (token: string, opts: Record<string, () => void>) => void }
  }
}

export default function BuyButton({ pkg, variant }: { pkg: string; variant: 'primary' | 'outline' }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ package: pkg }),
      })
      if (res.status === 401) {
        router.push('/masuk?callbackUrl=/tes-minat')
        return
      }
      const { data } = await res.json()
      if (data?.snapToken && window.snap) {
        window.snap.pay(data.snapToken, {
          onSuccess: () => router.push('/dashboard/siswa/tes?status=success'),
          onPending: () => router.push('/dashboard/siswa/tes?status=pending'),
          onError:   () => setLoading(false),
          onClose:   () => setLoading(false),
        })
      } else {
        setLoading(false)
      }
    } catch {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className={`block w-full text-center text-sm font-bold py-2.5 rounded-lg transition-colors disabled:opacity-60 ${
        variant === 'primary'
          ? 'bg-[#F4A900] text-[#033F85] hover:bg-[#D99200]'
          : 'border-2 border-[#033F85] text-[#033F85] hover:bg-[#E8F0FB]'
      }`}
    >
      {loading ? 'Memproses...' : 'Mulai Sekarang'}
    </button>
  )
}
