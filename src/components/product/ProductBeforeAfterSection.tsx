'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronsLeftRight, Sparkles } from 'lucide-react'
import type { BeforeAfterContent } from '@/lib/productPageSections'

interface ProductBeforeAfterSectionProps {
  content: BeforeAfterContent
}

export default function ProductBeforeAfterSection({ content }: ProductBeforeAfterSectionProps) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const { left, width } = el.getBoundingClientRect()
    const pct = ((clientX - left) / width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true
    containerRef.current?.setPointerCapture(e.pointerId)
    setFromClientX(e.clientX)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    setFromClientX(e.clientX)
  }

  const stopDragging = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false
    if (containerRef.current?.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-mist/40 to-ivory py-16 md:py-24">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-teal/10 opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center md:mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal/20 bg-teal/10 px-5 py-2 text-sm font-bold text-teal-dark">
            <Sparkles className="h-4 w-4" />
            قبل وبعد
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-charcoal md:text-4xl">
            {content.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium leading-relaxed text-charcoal/70 md:text-lg">
            {content.subtitle}
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto aspect-[3/4] max-w-xl cursor-ew-resize touch-none select-none overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-teal/15 md:max-w-2xl md:rounded-[2.5rem]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          role="slider"
          aria-label="مقارنة قبل وبعد — حرّك الخط لليمين أو اليسار"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
        >
          <Image
            src={content.afterImage}
            alt={content.afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-cover"
            draggable={false}
            priority={false}
          />

          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src={content.beforeImage}
              alt={content.beforeAlt}
              fill
              sizes="(max-width: 768px) 100vw, 672px"
              className="object-cover"
              draggable={false}
              priority={false}
            />
          </div>

          <span className="pointer-events-none absolute left-4 top-4 z-30 rounded-full bg-charcoal/75 px-4 py-1.5 text-sm font-extrabold text-white backdrop-blur-sm">
            {content.beforeLabel}
          </span>
          <span className="pointer-events-none absolute right-4 top-4 z-30 rounded-full bg-teal px-4 py-1.5 text-sm font-extrabold text-white shadow-md">
            {content.afterLabel}
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 z-20 w-1 -translate-x-1/2 bg-white shadow-[0_0_16px_rgba(0,0,0,0.45)]"
            style={{ left: `${position}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] border-gold bg-white text-teal shadow-xl">
              <ChevronsLeftRight className="h-6 w-6" strokeWidth={2.5} />
            </div>
          </div>

          <p className="pointer-events-none absolute bottom-4 left-1/2 z-30 -translate-x-1/2 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-charcoal/70 shadow-md backdrop-blur-sm md:text-sm">
            ← حرّك الخط للمقارنة →
          </p>
        </div>
      </div>
    </section>
  )

}
