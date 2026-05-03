import { Link } from '@tanstack/react-router'
import { ArrowRight, Cpu, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()

  return (
    <section className='relative z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-16 md:pt-40 md:pb-28'>
      {/* Warm radial glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10'
        style={{
          background: [
            'radial-gradient(ellipse 70% 55% at 50% -10%, oklch(0.85 0.12 55 / 55%) 0%, transparent 65%)',
            'radial-gradient(ellipse 40% 35% at 80% 60%, oklch(0.80 0.10 41 / 20%) 0%, transparent 70%)',
            'radial-gradient(ellipse 30% 30% at 20% 70%, oklch(0.88 0.09 75 / 25%) 0%, transparent 70%)',
          ].join(', '),
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black_20%,transparent_100%)]'
        style={{
          backgroundImage:
            'radial-gradient(circle, oklch(0.62 0.21 41 / 0.15) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Badge */}
      <div
        className='landing-animate-fade-up mb-6 flex items-center gap-2 rounded-full border border-[#F3D7B5] bg-white/70 px-4 py-1.5 text-xs font-medium shadow-sm backdrop-blur-sm'
        style={{ animationDelay: '0ms' }}
      >
        <Zap className='size-3.5 text-[#FF6A00]' />
        <span className='text-[#6B7280]'>{t('Powered by 50+ AI Providers')}</span>
      </div>

      <div className='flex max-w-3xl flex-col items-center text-center'>
        <h1
          className='landing-animate-fade-up text-[clamp(2.2rem,5.5vw,3.8rem)] leading-[1.12] font-bold tracking-tight opacity-0'
          style={{ animationDelay: '60ms', fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          <span className='text-[#111827]'>
            TokenHub
            <br />
          </span>
          <span
            style={{
              background:
                'linear-gradient(135deg, #FF6A00 0%, #FFB000 60%, #FF8C00 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t('AI 模型聚合网关')}
          </span>
        </h1>
        <p
          className='landing-animate-fade-up mt-5 max-w-xl text-base leading-relaxed text-[#6B7280] opacity-0 md:text-lg'
          style={{ animationDelay: '120ms' }}
        >
          {systemName || 'TokenHub'}{' '}
          {t(
            '聚合 50+ AI 供应商，一个 API 端点管理所有模型。统一计费、精细限速、实时监控。'
          )}
        </p>
        <div
          className='landing-animate-fade-up mt-8 flex flex-wrap items-center justify-center gap-3 opacity-0'
          style={{ animationDelay: '200ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='group h-11 rounded-xl px-6 text-sm font-semibold shadow-md shadow-orange-200/40'
              style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }}
              asChild
            >
              <Link to='/dashboard'>
                {t('进入控制台')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                className='group h-11 rounded-xl px-6 text-sm font-semibold shadow-md shadow-orange-200/40'
                style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB000)' }}
                asChild
              >
                <Link to='/sign-up'>
                  {t('注册')}
                  <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
                </Link>
              </Button>
              <Button
                variant='outline'
                className='h-11 rounded-xl border-[#F3D7B5] bg-white/70 px-6 text-sm font-medium backdrop-blur-sm hover:border-[#FF6A00]/40 hover:bg-orange-50/60'
                asChild
              >
                <Link to='/sign-in'>{t('登录')}</Link>
              </Button>
            </>
          )}
        </div>

        {/* Quick trust signals */}
        <div
          className='landing-animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4 opacity-0'
          style={{ animationDelay: '300ms' }}
        >
          {[
            { icon: <Cpu className='size-3.5' />, text: t('OpenAI 兼容接口') },
            { icon: <Zap className='size-3.5' />, text: t('毫秒级响应') },
            { icon: <ArrowRight className='size-3.5' />, text: t('无需信用卡') },
          ].map((item) => (
            <div
              key={item.text}
              className='flex items-center gap-1.5 text-xs text-[#6B7280]'
            >
              <span className='text-[#FF6A00]'>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <div
        className='landing-animate-fade-up mt-14 w-full opacity-0'
        style={{ animationDelay: '380ms' }}
      >
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
