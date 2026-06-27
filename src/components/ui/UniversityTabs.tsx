'use client'
import { useEffect, useState } from 'react'

const TABS = [
  { label: 'Tentang',       id: 'tentang' },
  { label: 'Fakultas',      id: 'fakultas' },
  { label: 'Program Studi', id: 'program-studi' },
  { label: 'Ulasan',        id: 'ulasan' },
]

export default function UniversityTabs() {
  const [active, setActive] = useState('tentang')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    const offset = 120 // sticky header height
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
    setActive(id)
  }

  return (
    <div className="flex gap-0 border-t border-gray-100">
      {TABS.map(({ label, id }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className={`px-5 py-3 text-sm font-semibold border-b-[3px] transition-colors ${
            active === id
              ? 'border-[#F4A900] text-[#033F85]'
              : 'border-transparent text-gray-400 hover:text-[#033F85]'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
