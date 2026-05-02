import { Settings, Zap, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('配置渠道'),
      desc: t('添加 API 密钥，配置供应商渠道，设置访问权限和限速规则'),
      icon: <Settings className='size-6' strokeWidth={1.5} />,
      color: '#FF6A00',
      bg: 'from-orange-50 to-amber-50',
    },
    {
      num: '2',
      title: t('接入使用'),
      desc: t('使用统一的 OpenAI 兼容端点，无缝替换现有集成，一行代码搞定'),
      icon: <Zap className='size-6' strokeWidth={1.5} />,
      color: '#FFB000',
      bg: 'from-amber-50 to-yellow-50',
    },
    {
      num: '3',
      title: t('实时监控'),
      desc: t('追踪用量、成本与性能指标，通过实时分析优化 AI 支出'),
      icon: <BarChart3 className='size-6' strokeWidth={1.5} />,
      color: '#F59E0B',
      bg: 'from-yellow-50 to-orange-50',
    },
  ]

  return (
    <section className='relative z-10 border-t border-[#F3D7B5] px-6 py-24 md:py-32'>
      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <p className='mb-3 text-xs font-semibold uppercase tracking-widest text-[#FF6A00]'>
            {t('使用流程')}
          </p>
          <h2 className='text-2xl font-bold tracking-tight text-[#111827] md:text-3xl'>
            {t('三步即可开始')}
          </h2>
        </AnimateInView>

        <div className='relative grid gap-6 md:grid-cols-3 md:gap-8'>
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className='absolute top-14 right-[20%] left-[20%] hidden h-px bg-gradient-to-r from-transparent via-[#F3D7B5] to-transparent md:block'
          />

          {steps.map((step, i) => (
            <AnimateInView
              key={step.num}
              delay={i * 120}
              animation='fade-up'
              className='group relative flex flex-col items-center rounded-2xl border border-[#F3D7B5] bg-white/80 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-orange-100/50 backdrop-blur-sm'
            >
              <div className='relative mb-5'>
                <div
                  className={`flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.bg} border border-[#F3D7B5]`}
                  style={{ color: step.color }}
                >
                  {step.icon}
                </div>
                <div
                  className='absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full text-xs font-bold text-white shadow-sm'
                  style={{ background: step.color }}
                >
                  {step.num}
                </div>
              </div>
              <h3 className='mb-2 text-base font-semibold text-[#111827]'>{step.title}</h3>
              <p className='max-w-[240px] text-sm leading-relaxed text-[#6B7280]'>
                {step.desc}
              </p>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  )
}
