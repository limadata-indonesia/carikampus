'use client'
import { useEffect, useRef } from 'react'

export default function SlideInCards({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = ref.current?.querySelectorAll<HTMLElement>('[data-slide]')
    if (!cards) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = el.dataset.delay ?? '0'
            el.style.transitionDelay = `${delay}ms`
            el.classList.add('slide-in-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    cards.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .slide-in-card {
          opacity: 0;
          transform: translateX(60px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .slide-in-visible {
          opacity: 1 !important;
          transform: translateX(0) !important;
        }
      `}</style>
      <div ref={ref}>{children}</div>
    </>
  )
}
