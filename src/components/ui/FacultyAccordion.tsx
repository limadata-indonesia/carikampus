'use client'
import { useState } from 'react'
import Link from 'next/link'

interface Program {
  id: string
  name: string
  degree: string
  accreditation: string | null
  duration: number | null
}

interface Faculty {
  id: string
  name: string
  programs: Program[]
}

const DEGREE_COLORS: Record<string, string> = {
  S1: 'bg-[#E8F0FB] text-[#033F85]',
  S2: 'bg-purple-100 text-purple-700',
  S3: 'bg-red-100 text-red-700',
  D3: 'bg-orange-100 text-orange-700',
  D4: 'bg-teal-100 text-teal-700',
}

export default function FacultyAccordion({ faculties, uniSlug }: { faculties: Faculty[]; uniSlug: string }) {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="space-y-2">
      {faculties.map(fac => {
        const isOpen = open === fac.id
        return (
          <div
            key={fac.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              isOpen ? 'border-[#F4A900]' : 'border-gray-200'
            }`}
          >
            {/* Faculty header — clickable */}
            <button
              onClick={() => setOpen(isOpen ? null : fac.id)}
              className={`w-full flex items-center justify-between p-3 text-left transition-colors border-l-[3px] ${
                isOpen
                  ? 'bg-[#E8F0FB] border-l-[#F4A900]'
                  : 'bg-white border-l-transparent hover:bg-gray-50 hover:border-l-[#F4A900]'
              }`}
            >
              <div>
                <div className="text-sm font-bold text-gray-900">{fac.name}</div>
                <div className="text-xs text-gray-400">{fac.programs.length} program studi</div>
              </div>
              <span className={`text-gray-400 text-lg transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}>
                ›
              </span>
            </button>

            {/* Programs list */}
            {isOpen && (
              <div className="border-t border-gray-100 divide-y divide-gray-50">
                {fac.programs.length === 0 ? (
                  <p className="px-4 py-3 text-xs text-gray-400">Belum ada program studi terdaftar.</p>
                ) : (
                  fac.programs.map(prog => (
                    <div key={prog.id} className="px-4 py-3 flex items-start justify-between gap-3 hover:bg-gray-50 transition-colors">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-800">{prog.name}</div>
                        <div className="flex gap-1.5 mt-1.5 flex-wrap">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${DEGREE_COLORS[prog.degree] ?? 'bg-gray-100 text-gray-600'}`}>
                            {prog.degree}
                          </span>
                          {prog.accreditation && (
                            <span className="text-[11px] font-semibold bg-[#E6F4EC] text-green-700 px-2 py-0.5 rounded-full">
                              Ak. {prog.accreditation}
                            </span>
                          )}
                          {prog.duration && (
                            <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                              {prog.duration} tahun
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        href={`/universitas/${uniSlug}/program/${prog.id}`}
                        className="text-[11px] font-semibold text-[#033F85] whitespace-nowrap mt-0.5 hover:underline"
                        onClick={e => e.stopPropagation()}
                      >
                        Lihat →
                      </Link>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
