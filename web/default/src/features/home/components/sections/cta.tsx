import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { AnimateInView } from '@/components/animate-in-view'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(props: CTAProps) {
  const { t } = useTranslation()

  if (props.isAuthenticated) {
    return null
  }

  return (
    <section className='relative z-10 overflow-hidden px-6 py-24 md:py-32'>
      {/* Warm gradient background blob */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background: [
            'radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.88 0.10 55 / 45%) 0%, transparent 70%)',
            'radial-gradient(ellipse 40% 40% at 70% 30%, oklch(0.82 0.12 41 / 25%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />

      <AnimateInView
        className='mx-auto max-w-2xl rounded-3xl border border-[#F3D7B5] bg-white/70 p-10 text-center shadow-lg shadow-orange-100/40 backdrop-blur-sm md:p-16'
        animation='scale-in'
      >
        <div className='mb-4 flex justify-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl border border-[#F3D7B5] bg-gradient-to-br from-orange-50 to-amber-100 shadow-sm'>
            <Sparkles className='size-5 text-[#FF6A00]' />
          </div>
        </div>
        <h2 className='text-2xl font-bold leading-tight tracking-tight text-[#111827] md:text-4xl'>
          {t('准备好简化')}
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FF6A00 0%, #FFB000 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('你的 AI 集成？')}
          </span>
        </h2>
        <p className='mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#6B7280] md:text-base'>
          {t('免费开始，无需信用卡，慷慨额度，立即体验智算 API 网关的强大功能。')}
        </p>
        <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <Button
            className='group h-11 w-full rounded-xl px-8 text-sm font-semibold shadow-md shadow-orange-200/40 sm:w-auto'
            style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }}
            asChild
          >
            <Link to='/sign-up'>
              {t('立即免费注册')}
              <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Link>
          </Button>
          <Button
            variant='outline'
            className='h-11 w-full rounded-xl border-[#F3D7B5] bg-white/80 px-8 text-sm font-medium hover:border-[#FF6A00]/40 hover:bg-orange-50/60 sm:w-auto'
            asChild
          >
            <Link to='/pricing'>{t('查看定价方案')}</Link>
          </Button>
        </div>
      </AnimateInView>
    </section>
  )
}
