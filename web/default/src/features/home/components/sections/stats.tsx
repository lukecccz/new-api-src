import { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const { end, suffix = '', prefix = '', duration = 1600, decimals = 0 } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals]
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

interface StatsProps {
  className?: string
}

export function Stats(_props: StatsProps) {
  const { t } = useTranslation()

  const stats = [
    { end: 100, suffix: 'M+', label: t('累计请求量') },
    { end: 50, suffix: '+', label: t('接入 AI 模型') },
    { end: 99.9, suffix: '%', label: t('服务可用率'), decimals: 1 },
    { end: 10, suffix: 'K+', label: t('活跃用户') },
  ]

  return (
    <div className='relative z-10 border-y border-[#F3D7B5] bg-white/50 backdrop-blur-sm'>
      <div className='mx-auto max-w-6xl px-6 py-10 md:py-14'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center ${
                i > 0 ? 'md:border-l md:border-[#F3D7B5]' : ''
              }`}
            >
              <span
                className='text-3xl font-bold tracking-tight md:text-4xl'
                style={{
                  background:
                    'linear-gradient(135deg, #FF6A00 0%, #FFB000 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <Counter end={s.end} suffix={s.suffix} decimals={s.decimals} />
              </span>
              <span className='mt-1.5 text-xs text-[#6B7280]'>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
